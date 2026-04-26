// import { CalendarDays, FileText, Loader2, Send, X } from 'lucide-react';
// import React, { useState } from 'react'
// import api from '../api/axios';
// import toast from 'react-hot-toast';

// const Applyleavemodal = ({open,onClose,onSuccess}) => {
//     const [loading,setLoading] = useState(false);
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);
//     const minDate = tomorrow.toISOString().split('T')[0];

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const formData = new FormData(e.target);
//         const payload = {
//           type:formData.get("type"),
//           startDate:formData.get("startDate"),
//           endDate:formData.get("endDate"),
//           reason:formData.get("reason")
//         }
//         try {
//           await api.post("/leave/create-leaves",payload);
//           toast.success("Leave Applied Successfully");
//           onSuccess && onSuccess();
//           onClose()
//         } catch (error) {
//           toast.error(error?.response?.data?.error || "Failed to apply leave")
//         } finally{
//           setLoading(false)
//         }
//     }

//     if(!open) return null
//   return (
//     <div onClick={onClose} className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
//      <div onClick={(e)=>e.stopPropagation()} className='relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in'>
//       <div className='flex items-center justify-between p-6 pb-0'>
//        <div>
//         <h2 className='text-lg font-semibold text-slate-800'>Apply For Leave</h2>
//         <p className='text-sm text-slate-400 mt-0.5'>Submit Leave Request For Approval</p>
//        </div>
//        <button onClick={onClose} className='p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 cursor-pointer'>
//         <X className='w-5 h-5'/>
//        </button>
//       </div>
//       <form className='p-6 space-y-5' onSubmit={handleSubmit}>
//        <div>
//         <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
//          <FileText className='w-4 h-4 text-slate-400'/>
//          Leave Type
//         </label>
//         <select name="type"required>
//             <option value="SICK">Sick Leave</option>
//             <option value="CASUAL">Casual Leave</option>
//             <option value="ANNUAL">Annual Leave</option>
//         </select>
//        </div>
//        <div>
//         <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
//             <CalendarDays className='w-4 h-4 text-slate-400'/>
//             Duration
//         </label>
//         <div className='grid grid-cols-2 gap-4'>
//          <div>
//             <span className='block text-xs text-slate-400 mb-1'>From</span>
//             <input type="date" name='startDate' min={minDate} required/>
//          </div>
//          <div>
//             <span className='block text-xs text-slate-400 mb-1'>To</span>
//             <input type="date" name='endDate' min={minDate} required/>
//          </div>
//         </div>
//         <div>
//             <label className="text-sm font-medium text-slate-700 mb-2 block">Reason</label>
//             <textarea name="reason" required rows={3} className='resize-none' placeholder='Briefly Descript What Reason To Apply Leave'/>
//         </div>
//         <div className='flex gap-3 pt-2'>
//           <button onClick={onClose} type='button' className='btn-secondary flex-1 cursor-pointer'>
//             Cancel
//           </button>
//           <button onClick={onClose} disabled={loading} type='submit' className='btn-primary flex-1 flex items-center justify-center gap-2 cursor-pointer'>
//             {loading?<Loader2 className='w-4 h-4 animate-spin'/>:<Send className='w-4 h-4'/>}
//             {loading?"Submitting...":"Submit"}
//           </button>
//         </div>
//        </div>
//       </form>
//      </div>
//     </div>
//   )
// }

// export default Applyleavemodal

import { CalendarDays, FileText, Loader2, Send, X } from 'lucide-react';
import React, { useState } from 'react'
import api from '../api/axios';
import toast from 'react-hot-toast';

const Applyleavemodal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const payload = {
      type: formData.get("type"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      reason: formData.get("reason")
    };

    try {
      await api.post("/leave/create-leaves", payload);

      toast.success("Leave Applied Successfully ✅");

      onSuccess && onSuccess();
      onClose();

    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to apply leave ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div onClick={onClose} className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
      <div onClick={(e) => e.stopPropagation()} className='relative bg-white rounded-2xl shadow-2xl w-full max-w-lg'>

        {/* HEADER */}
        <div className='flex items-center justify-between p-6 pb-0'>
          <div>
            <h2 className='text-lg font-semibold text-slate-800'>Apply For Leave</h2>
            <p className='text-sm text-slate-400 mt-0.5'>Submit Leave Request</p>
          </div>
          <button onClick={onClose} className='p-2 rounded-lg hover:bg-slate-100'>
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* FORM */}
        <form className='p-6 space-y-5' onSubmit={handleSubmit}>

          {/* TYPE */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <FileText className='w-4 h-4' />
              Leave Type
            </label>

            <select name="type" required className='w-full border px-3 py-2 rounded-md'>
              <option value="">Select Type</option>
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>

          {/* DATE */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <CalendarDays className='w-4 h-4' />
              Duration
            </label>

            <div className='grid grid-cols-2 gap-4'>
              <input type="date" name='startDate' min={minDate} required className='border px-3 py-2 rounded-md' />
              <input type="date" name='endDate' min={minDate} required className='border px-3 py-2 rounded-md' />
            </div>
          </div>

          {/* REASON */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Reason</label>
            <textarea
              name="reason"
              required
              rows={3}
              className='w-full border px-3 py-2 rounded-md resize-none'
              placeholder='Reason for leave'
            />
          </div>

          {/* BUTTONS */}
          <div className='flex gap-3 pt-2'>
            <button onClick={onClose} type='button' className='border flex-1 px-4 py-2 rounded-md'>
              Cancel
            </button>

            <button disabled={loading} type='submit' className='bg-indigo-600 text-white flex-1 px-4 py-2 rounded-md flex items-center justify-center gap-2'>
              {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Send className='w-4 h-4' />}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Applyleavemodal;