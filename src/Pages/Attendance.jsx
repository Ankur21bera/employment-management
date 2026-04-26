
import React, { useCallback, useEffect, useState } from 'react'
import { dummyAttendanceData } from '../assets/assets';
import Loading from '../Components/Loading';
import Checkinbutton from '../Components/Checkinbutton';
import Attendancestats from '../Components/Attendancestats';
import Attendancehistory from '../Components/Attendancehistory';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Attendance = () => {
  const [history,setHistory] = useState([]);
  const [loading,setLoading] = useState(true);
  const [isDeleted,setIsDeleted] = useState(false)

  const fetchData = useCallback(async()=>{
   try {
    setLoading(true);
    const res = await api.get("/attendance/get-attendance");
    setHistory(res.data.data || []);
    setIsDeleted(res.data.employee?.isDeleted || false);
   } catch (error) {
    toast.error(error?.response?.data?.error || "Failed To Load Attendance Data")
   } finally{
    setLoading(false)
   }
  },[])

  useEffect(()=>{
    fetchData();
  },[fetchData])

  if (loading) return <Loading/>

  const today = new Date();
  today.setHours(0,0,0,0);
  const todayRecord = history.find((r)=>new Date(r.date).toDateString() === today.toDateString())
  return (
    <div className='animate-fade-in'>
      <div className='page-header'>
       <h1 className='page-title'>Attendance</h1>
       <p className='page-subtitle'>Track Your Work Hours And Daily Check Ins</p>
      </div>
      {isDeleted ? (
       <div className='mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center'>
        <p className='text-rose-600'>You can no longer clock or in out because your employee records  have been marked as deleted.</p>
       </div>
      ):(
       <div className='mb-8'>
        <Checkinbutton todayRecord={todayRecord} onAction={fetchData}/>
       </div>
      )}
      <Attendancestats history={history}/>
      <Attendancehistory history={history}/>
    </div>
  )
}

export default Attendance