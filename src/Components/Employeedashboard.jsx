import { ArrowRightIcon, CalendarIcon, FileTextIcon, IndianRupeeIcon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const Employeedashboard = ({data}) => {
    const emp = data.employee;

    const cards = [
        {
            icon:CalendarIcon,
            value:data.currentMonthAttendance,
            title:"Days Present",
            subtitle:"This Month"
        },
        {
            icon:FileTextIcon,
            value:data.pendingLeaves,
            title:"Pending Leaves",
            subtitle:"Awaiting Approval"
        },
        {
            icon:IndianRupeeIcon,
            value:data.latestPayslip ? `$${data.latestPayslip.netSalary?.toLocaleString()}` : "N/A",
            title:"Latest Payslip",
            subtitle:"Most Recent Payout"
        },
    ]
  return (
    <div className='animate-fade-in p-4 sm:p-6'>
      <div className='mb-6'>
       <h1 className='text-2xl sm:text-3xl font-bold text-slate-900'>Welcome,{emp?.firstName}</h1>
       <p className='text-sm text-slate-500 mt-1'>
        {emp?.position} • {emp?.department || "No Department"}
       </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
       {cards.map((card,index)=>(
        <div className='relative bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-sm transition-all duration-200 flex items-center justify-between group' key={index}>
          <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-300 group-hover:bg-indigo-500 transition-all'></div>
           <div className='ml-2'>
            <p className='text-sm text-slate-500'>{card.title}</p>
            <p className='text-2xl font-bold text-slate-900 mt-1'>{card.value}</p>
            <p className='text-xs text-slate-400 mt-1'>{card.subtitle}</p>
           </div>
           <card.icon className='size-10 p-2 rounded-lg bg-slate-100 text-slate-600 group hover:bg-indigo-50 group-hover:text-indigo-600 transition'/>
        </div>
       ))}
      </div>
      <div className='flex flex-col sm:flex-row gap-3'>
       <Link className='flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition w-full sm:w-auto' to="/attendance">
         Mark Attendance
         <ArrowRightIcon className='w-4 h-4'/>
       </Link>
       <Link to="/leave" className='flex items-center justify-center px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-medium transition w-full sm:w-auto'>
       Apply For Leave
       </Link>
      </div>
    </div>
  )
}

export default Employeedashboard