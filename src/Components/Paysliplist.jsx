import React from 'react'
import { format } from 'date-fns'
import { Download } from 'lucide-react'

const Paysliplist = ({ payslips, isAdmin }) => {
  return (
    <div className='card overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='table-modern w-full'>

          {/* HEADER */}
          <thead>
            <tr>
              {isAdmin && <th>Employee</th>}
              <th>Period</th>
              <th>Basic Salary</th>
              <th>Net Salary</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {payslips.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className='text-center py-12 text-slate-400'>
                  No Payslips Found
                </td>
              </tr>
            ) : (
              payslips.map((payslip) => {
                const id = payslip._id || payslip.id;

                return (
                  <tr key={id}>

                    {/* EMPLOYEE */}
                    {isAdmin && (
                      <td className='text-slate-900'>
                        {payslip.employee?.firstName} {payslip.employee?.lastName}
                      </td>
                    )}

                    {/* PERIOD */}
                    <td className='text-slate-500'>
                      {payslip?.year && payslip?.month
                        ? format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")
                        : "-"
                      }
                    </td>

                    {/* BASIC */}
                    <td className='text-slate-500'>
                      ₹{payslip.basicSalary?.toLocaleString()}
                    </td>

                    {/* NET */}
                    <td className='font-medium text-slate-800'>
                      ₹{payslip.netSalary?.toLocaleString()}
                    </td>

                    {/* DOWNLOAD */}
                    <td className='text-center'>
                      <button
                        className='inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-blue-600 bg-blue-50 hover:bg-blue-100 transition'
                        onClick={() => window.open(`/print/payslips/${id}`)}
                      >
                        <Download className='w-3 h-3 mr-1.5' />
                        Download
                      </button>
                    </td>

                  </tr>
                )
              })
            )}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Paysliplist