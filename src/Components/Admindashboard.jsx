import { Building2Icon, CalendarIcon, FileTextIcon, UserIcon } from 'lucide-react'
import React from 'react'

const Admindashboard = ({data}) => {

    const stats = [
        {
            icon:UserIcon,
            value:data.totalEmployees,
            label:"Total Employees",
            description:"Active Workforce"
        },
        {
            icon:Building2Icon,
            value:data.totalDepartments,
            label:"Departments",
            description:"Organisation Units"
        },
        {
            icon:CalendarIcon,
            value:data.todayAttendance,
            label:"Today's Attendance",
            description:"Active Workforce"
        },
        {
            icon:FileTextIcon,
            value:data.pendingLeaves,
            label:"Pending Leaves",
            description:"Awaiting Approval"
        }
    ]

  return (
    <div className='animate-fade-in p-4 sm:p-6'>
     <div className='mb-6'>
      <h1 className='text-2xl sm:text-3xl font-bold text-slate-900'>Dashboard</h1>
      <p className='text-sm text-slate-500 mt-1'>
         Welcome Back, Admin - Here's Your Overview
      </p>
     </div>
     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8'>
      {stats.map((s,index)=>(
        <div className='relative bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md flex items-center justify-between group transition-all duration-200' key={index}>
         <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-300 group-hover:bg-indigo-500 transition-all cursor-pointer'></div>
         <div className='ml-3'>
          <p className='text-sm text-slate-500'>{s.label}</p>
          <p className='text-2xl font-bold text-slate-900 mt-1'>{s.value}</p>
          <p className='text-xs text-slate-400 mt-1'>{s.description}</p>
         </div>
         <s.icon className='size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition'/>
        </div>
      ))}
     </div>
    </div>
  )
}

export default Admindashboard