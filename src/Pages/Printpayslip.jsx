// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { dummyPayslipData } from '../assets/assets';
// import { format } from 'date-fns'
// import Loading from '../Components/Loading';

// const Printpayslip = () => {
//   const { id } = useParams();
//   const [paySlip, setPaySlip] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setPaySlip(dummyPayslipData.find((slip) => slip._id === id))
//     setTimeout(() => setLoading(false), 500)
//   }, [id])

//   if (loading) return <Loading />
//   if (!paySlip) return <p className='text-center py-12 text-slate-400'>Payslip Not Found</p>

//   return (
//     <div className='max-w-3xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-sm animate-fade-in'>

//       {/* HEADER */}
//       <div className='text-center border-b border-slate-200 pb-5 mb-6'>
//         <h1 className='text-2xl font-bold text-slate-900'>Payslip</h1>
//         <p className='text-slate-500 text-sm mt-1'>
//           {format(new Date(paySlip.year, paySlip.month - 1), "MMMM yyyy")}
//         </p>
//       </div>

//       {/* EMPLOYEE DETAILS */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10 mb-8 text-sm'>

//         <div>
//           <p className='text-xs text-slate-400 mb-1'>Employee Name</p>
//           <p className='font-semibold text-slate-900'>
//             {paySlip.employee?.firstName} {paySlip.employee?.lastName}
//           </p>
//         </div>

//         <div>
//           <p className='text-xs text-slate-400 mb-1'>Position</p>
//           <p className='font-medium text-slate-800'>
//             {paySlip.employee?.position}
//           </p>
//         </div>

//         <div>
//           <p className='text-xs text-slate-400 mb-1'>Email</p>
//           <p className='text-slate-700 break-all'>
//             {paySlip.employee?.email}
//           </p>
//         </div>

//         <div>
//           <p className='text-xs text-slate-400 mb-1'>Period</p>
//           <p className='text-slate-700'>
//             {format(new Date(paySlip.year, paySlip.month - 1), "MMMM yyyy")}
//           </p>
//         </div>

//       </div>

//       {/* SALARY TABLE */}
//       <div className='rounded-lg border border-slate-200 overflow-hidden mb-8'>
//         <table className='w-full text-sm'>

//           <thead>
//             <tr className='bg-slate-50'>
//               <th className='text-left py-3 px-4 text-xs text-slate-500 uppercase'>Description</th>
//               <th className='text-right py-3 px-4 text-xs text-slate-500 uppercase'>Amount</th>
//             </tr>
//           </thead>

//           <tbody>

//             <tr className='border-t'>
//               <td className='py-3 px-4'>Basic Salary</td>
//               <td className='py-3 px-4 text-right'>
//                 ₹{paySlip.basicSalary?.toLocaleString()}
//               </td>
//             </tr>

//             <tr className='border-t'>
//               <td className='py-3 px-4'>Allowances</td>
//               <td className='py-3 px-4 text-right text-emerald-600'>
//                 +₹{paySlip.allowances?.toLocaleString()}
//               </td>
//             </tr>

//             <tr className='border-t'>
//               <td className='py-3 px-4'>Deductions</td>
//               <td className='py-3 px-4 text-right text-red-500'>
//                 -₹{paySlip.deductions?.toLocaleString()}
//               </td>
//             </tr>

//             <tr className='border-t bg-slate-50 font-semibold'>
//               <td className='py-3 px-4 text-slate-900'>Net Salary</td>
//               <td className='py-3 px-4 text-right text-slate-900'>
//                 ₹{paySlip.netSalary?.toLocaleString()}
//               </td>
//             </tr>

//           </tbody>
//         </table>
//       </div>

//       {/* BUTTON */}
//       <div className='text-center print:hidden'>
//         <button
//           onClick={() => window.print()}
//           className='bg-indigo-600 text-white px-6 py-2 rounded-md cursor-pointer text-sm hover:bg-indigo-700 transition'
//         >
//           Print Payslip
//         </button>
//       </div>

//     </div>
//   )
// }

// export default Printpayslip

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import Loading from '../Components/Loading'
import api from '../api/axios'
import toast from 'react-hot-toast'

const Printpayslip = () => {
  const { id } = useParams();
  const [paySlip, setPaySlip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayslip = async () => {
      try {
        const res = await api.get(`/payslips/${id}`);
        setPaySlip(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to load payslip");
      } finally {
        setLoading(false);
      }
    };

    fetchPayslip();
  }, [id]);

  if (loading) return <Loading />
  if (!paySlip) return <p className='text-center py-12 text-slate-400'>Payslip Not Found</p>

  return (
    <div className='max-w-3xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-sm animate-fade-in'>

      <div className='text-center border-b border-slate-200 pb-5 mb-6'>
        <h1 className='text-2xl font-bold text-slate-900'>Payslip</h1>
        <p className='text-slate-500 text-sm mt-1'>
          {format(new Date(paySlip.year, paySlip.month - 1), "MMMM yyyy")}
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10 mb-8 text-sm'>

        <div>
          <p className='text-xs text-slate-400 mb-1'>Employee Name</p>
          <p className='font-semibold text-slate-900'>
            {paySlip.employee?.firstName} {paySlip.employee?.lastName}
          </p>
        </div>

        <div>
          <p className='text-xs text-slate-400 mb-1'>Position</p>
          <p className='font-medium text-slate-800'>
            {paySlip.employee?.position}
          </p>
        </div>

        <div>
          <p className='text-xs text-slate-400 mb-1'>Email</p>
          <p className='text-slate-700 break-all'>
            {paySlip.employee?.email}
          </p>
        </div>

        <div>
          <p className='text-xs text-slate-400 mb-1'>Period</p>
          <p className='text-slate-700'>
            {format(new Date(paySlip.year, paySlip.month - 1), "MMMM yyyy")}
          </p>
        </div>

      </div>

      <div className='rounded-lg border border-slate-200 overflow-hidden mb-8'>
        <table className='w-full text-sm'>

          <thead>
            <tr className='bg-slate-50'>
              <th className='text-left py-3 px-4 text-xs text-slate-500 uppercase'>Description</th>
              <th className='text-right py-3 px-4 text-xs text-slate-500 uppercase'>Amount</th>
            </tr>
          </thead>

          <tbody>

            <tr className='border-t'>
              <td className='py-3 px-4'>Basic Salary</td>
              <td className='py-3 px-4 text-right'>
                ₹{paySlip.basicSalary?.toLocaleString()}
              </td>
            </tr>

            <tr className='border-t'>
              <td className='py-3 px-4'>Allowances</td>
              <td className='py-3 px-4 text-right text-emerald-600'>
                +₹{paySlip.allowances?.toLocaleString()}
              </td>
            </tr>

            <tr className='border-t'>
              <td className='py-3 px-4'>Deductions</td>
              <td className='py-3 px-4 text-right text-red-500'>
                -₹{paySlip.deductions?.toLocaleString()}
              </td>
            </tr>

            <tr className='border-t bg-slate-50 font-semibold'>
              <td className='py-3 px-4 text-slate-900'>Net Salary</td>
              <td className='py-3 px-4 text-right text-slate-900'>
                ₹{paySlip.netSalary?.toLocaleString()}
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <div className='text-center print:hidden'>
        <button
          onClick={() => window.print()}
          className='bg-indigo-600 text-white px-6 py-2 rounded-md cursor-pointer text-sm hover:bg-indigo-700 transition'
        >
          Print Payslip
        </button>
      </div>

    </div>
  )
}

export default Printpayslip