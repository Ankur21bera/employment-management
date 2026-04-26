import React, { useCallback, useEffect, useState } from 'react'
import { DEPARTMENTS, dummyEmployeeData } from '../assets/assets';
import { Plus, Search } from 'lucide-react';
import Employeecard from '../Components/Employeecard';
import Employeeform from '../Components/Employeeform';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Employees = () => {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEmployees = useCallback(async()=>{
   try {
    const url = selectedDept? `/employees?department=${selectedDept}`:"/employees/employment-details";
    const res = await api.get(url)
    setEmployees(res.data)
   } catch (error) {
    console.error("Failed To Fetch Employees");
    console.log(error)
   } finally{
    setLoading(false)
   }
  },[selectedDept])

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmployees = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDelete = async(id) => {
    try {
      await api.delete(`/employees/employee-delete/${id}`);
      toast.success("Employee Delete Successfully");
      fetchEmployees();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed To Delete")
    }
  }

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <h1 className="text-2xl font-semibold">Employees</h1>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center cursor-pointer gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">

        <div className="flex items-center border rounded-md px-3 py-2 w-full sm:w-1/2">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="border cursor-pointer rounded-md px-3 py-2 text-sm w-full sm:w-1/4"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept, i) => (
            <option className='cursor-pointer' key={i} value={dept}>{dept}</option>
          ))}
        </select>

      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {filteredEmployees.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No Employees Found
            </p>
          ) : (
            filteredEmployees.map(emp => (
              <Employeecard
                key={emp.id}
                employee={emp}
                onEdit={setEditEmployee}
                onDelete={handleDelete}
              />
            ))
          )}

        </div>
      )}

      {/* FORM MODAL */}
      {(showForm || editEmployee) && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-3">

          <div className="bg-white w-full max-w-2xl rounded-lg p-5">

            <Employeeform
              initialData={editEmployee}
              onSuccess={() => {
                setShowForm(false);
                setEditEmployee(null);
                fetchEmployees();
              }}
              onCancel={() => {
                setShowForm(false);
                setEditEmployee(null);
              }}
            />

          </div>
        </div>
      )}

    </div>
  )
}

export default Employees