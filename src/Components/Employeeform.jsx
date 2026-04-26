import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { DEPARTMENTS } from "../assets/assets";

const Employeeform = ({ initialData, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const isEdit = !!initialData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      joinDate: formData.get("joinDate"),
      department: formData.get("department"),
      position: formData.get("position"),
      basicSalary: formData.get("basicSalary"),
      allowances: formData.get("allowances") || 0,
      deductions: formData.get("deductions") || 0,
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      if (isEdit) {
        await api.put(
          `/employees/employee-update/${initialData._id || initialData.id}`,
          payload,
        );
        toast.success("Employee Updated Successfully");
      } else {
        await api.post("/employees/employee-post", payload);
        toast.success("Employee Created Successfully");
      }
      onSuccess();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          defaultValue={initialData?.firstName}
          className="border px-3 py-2 rounded-md text-sm w-full"
          required
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          defaultValue={initialData?.lastName}
          className="border px-3 py-2 rounded-md text-sm w-full"
          required
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone Number"
          defaultValue={initialData?.phone}
          className="border px-3 py-2 rounded-md text-sm w-full"
          required
        />
        <input
          name="joinDate"
          type="date"
          defaultValue={initialData?.joinDate?.split("T")[0]}
          className="border px-3 py-2 rounded-md text-sm w-full"
          required
        />
        <select
          className="border px-3 py-2 rounded-md text-sm w-full"
          name="department"
          defaultValue={initialData?.department}
        >
          <option value="">Select Department</option>
          {DEPARTMENTS.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>
        <input
          name="position"
          type="text"
          placeholder="Position"
          defaultValue={initialData?.position}
          className="border px-3 py-2 rounded-md text-sm w-full"
          required
        />
        <input
          name="basicSalary"
          type="number"
          placeholder="Basic Salary"
          defaultValue={initialData?.basicSalary}
          className="border px-3 py-2 rounded-md text-sm w-full"
          required
        />
        <input
          name="allowances"
          type="number"
          placeholder="Allowances"
          defaultValue={initialData?.allowances}
          className="border px-3 py-2 rounded-md text-sm w-full"
        />

        <input
          name="deductions"
          type="number"
          placeholder="Deductions"
          defaultValue={initialData?.deductions}
          className="border px-3 py-2 rounded-md text-sm w-full"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={initialData?.email}
          className="border px-3 py-2 rounded-md text-sm w-full"
          required
        />
        {!isEdit && (
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border px-3 py-2 rounded-md text-sm w-full"
            required
          />
        )}
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          className="border px-4 py-2 rounded-md cursor-pointer text-sm"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-md text-sm">
          {loading ? "Saving..." : isEdit ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default Employeeform;
