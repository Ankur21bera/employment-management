import React, { useCallback, useEffect, useState } from 'react'
import { dummyEmployeeData, dummyPayslipData } from '../assets/assets';
import Loading from '../Components/Loading';
import Paysliplist from '../Components/Paysliplist';
import Generatepayslipform from '../Components/Generatepayslipform';
import { useAuth } from '../Context/Authcontext';
import api from '../api/axios';
import toast from 'react-hot-toast';
const Payslip = () => {
  const [paySlips,setPaySlips] = useState([]);
  const [employees,setEmployees] = useState([]);
  const [loading,setLoading] = useState(true);
  const {user} = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const fetchPaySlips = useCallback(async()=>{
    try {
      const res = await api.get('/payslips/get-slip')
      setPaySlips(res.data.data || [])
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    } finally{
      setLoading(false)
    }
  },[])

  useEffect(()=>{
    fetchPaySlips();
  },[fetchPaySlips])

  useEffect(()=>{
    if(isAdmin) api.get("/employees/employment-details").then((res)=>setEmployees(res.data.filter((e)=>!e.isDeleted))).catch(()=>{})
  },[isAdmin])

  if(loading) return <Loading/>
  return (
    <div className='animate-fade-in'>
     <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
      <div>
        <h1 className='page-title'>Payslips</h1>
        <p className='page-subtitle'>{isAdmin?"Generate and manage employee payslips":"Your Payslip History"}</p>
      </div>
      {isAdmin && <Generatepayslipform employees={employees} onSuccess={fetchPaySlips}/>}
     </div>
     <Paysliplist payslips={paySlips} isAdmin={isAdmin}/>
    </div>
  )
}

export default Payslip