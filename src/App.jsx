import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loginlanding from './Pages/Loginlanding'
import Layout from './Pages/Layout'
import Dashboard from './Pages/Dashboard'
import Employees from './Pages/Employees'
import Attendance from './Pages/Attendance'
import Leave from './Pages/Leave'
import Payslip from './Pages/Payslip'
import Setting from './Pages/Setting'
import Printpayslip from './Pages/Printpayslip'
import Loginform from './Components/Loginform'


const App = () => {

  return (
    <>
    <Toaster/>
    <Routes>
      <Route path='/login' element={<Loginlanding/>}/>
      <Route path='/login/admin' element={<Loginform role="admin" title="Admin Portal" subtitle="Sign In To Manage The Organisation"/>}/>
      <Route path='/login/employee' element={<Loginform role="employee" title="Employee Portal" subtitle="Sign In To Access your account"/>}/>
      <Route element={<Layout/>}>
       <Route path='/dashboard' element={<Dashboard/>}/>
       <Route path='/employees' element={<Employees/>}/>
       <Route path='/attendance' element={<Attendance/>}/>
       <Route path='/leave' element={<Leave/>}/>
       <Route path='/payslips' element={<Payslip/>}/>
       <Route path='/settings' element={<Setting/>}/>
      </Route>
      <Route path='/print/payslips/:id' element={<Printpayslip/>}/>
      <Route path='*' element={<Navigate to="/dashboard" replace/>}/>
    </Routes>
    </>
  )
}

export default App