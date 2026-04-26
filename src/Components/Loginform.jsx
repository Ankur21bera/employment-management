import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Loginleftside from './Loginleftside';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '../Context/Authcontext';

const Loginform = ({role,title,subtitle}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
       setError("")
       setLoading(true)
       try {
        await login(email,password,role)
        navigate("/dashboard")
       } catch (error) {
        toast.error(error.response?.data?.error || error.message || "Login Failed")
       } finally {
        setLoading(false)
       }
    }
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
    <Loginleftside/>
    <div className='flex-1 flex items-center justify-center p-6 sm:p-12 bg-white'>
     <div className='w-full max-w-md animate-fade-in'>
      <Link className='inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-2 transition-colors' to="/login">
       <ArrowLeftIcon size={16}/> Back To Portals
      </Link>
      <div className='mb-8'>
       <h1 className='text-2xl sm:text-3xl font-medium text-zinc-800'>{title}</h1>
       <p className='text-slate-500 text-sm sm:text-base mt-2'>{subtitle}</p>
      </div>
      {error && (
        <div className='mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3'>
         <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0'/>
         {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Email Address</label>
            <div className='relative'>
              <Mail size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'/>
              <input className='w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email' required/>
            </div>
        </div>
        <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Password</label>
            <div className='relative'>
              <Lock size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'/>
             <input className='w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' type={showPassword ? "text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password' required />
             <button className='absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700' type='button' onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18}/>:<Eye size={18}/>}</button>
            </div>
        </div>
        <button disabled={loading}  className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors disabled:opacity-70 cursor-pointer' type='submit'>{loading ? "Loggin In...":"Login"}</button>
      </form>
     </div>
    </div>
    </div>
  )
}

export default Loginform