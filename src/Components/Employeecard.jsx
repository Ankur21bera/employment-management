import React from 'react'
import { PencilIcon, TrashIcon } from 'lucide-react'

const Employeecard = ({ employee, onDelete, onEdit }) => {



  return (
    <div className="border rounded-lg p-4 text-center hover:shadow-sm transition">

      <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center bg-indigo-100 rounded-full text-indigo-600 font-semibold">
        {employee.firstName[0]}{employee.lastName[0]}
      </div>

      <h3 className="font-medium">
        {employee.firstName} {employee.lastName}
      </h3>

      <p className="text-sm text-gray-500">
        {employee.position}
      </p>

      <p className="text-xs text-gray-400">
        {employee.department}
      </p>

      {!employee.isDeleted && (
        <div className="flex justify-center gap-3 mt-3">

          <button onClick={() => onEdit(employee)}>
            <PencilIcon className="w-4 cursor-pointer h-4 text-gray-500 hover:text-indigo-600" />
          </button>

          <button onClick={() => onDelete(employee._id || employee.id)}>
            <TrashIcon className='w-4 cursor-pointer h-4 text-red-500 hover:text-red-800'/>
          </button>

        </div>
      )}

    </div>
  )
}

export default Employeecard