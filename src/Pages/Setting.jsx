import React, { useEffect, useState } from 'react'
import { dummyProfileData } from '../assets/assets';
import Loading from '../Components/Loading';
import { Lock } from 'lucide-react';
import Profileform from '../Components/Profileform';
import Changepasswordmodal from '../Components/Changepasswordmodal';

const Setting = () => {
  const [profile,setProfile] = useState(null);
  const [loading,setLoading] = useState(true);
  const [showPasswordModal,setShowPasswordModal] = useState(false);

  const fetchProfile = async() => {
    setProfile(dummyProfileData);
    setTimeout(()=>{
     setLoading(false);
    },1000)
  }

  useEffect(()=>{
    fetchProfile();
  },[])

  if(loading) return <Loading/>
  return (
    <div className='animate-fade-in'>
      <div className='page-header'>
       <h1 className='page-title'>Settings</h1>
       <p className='page-subtitle'>Manage your account and preferences</p>
      </div>
      {profile && <Profileform initialData={profile} onSuccess={fetchProfile}/>}
      <div className='card max-w-md p-6 flex items-center justify-between'>
       <div className='flex items-center gap-3'>
       <div className='p-2.5 bg-slate-100 rounded-lg'>
        <Lock className='w-5 h-5 text-slate-600'/>
       </div>
       <div>
        <p className='font-medium text-slate-900'>Password</p>
        <p>Update Your Password</p>
       </div>
       </div>
       <button className='btn-secondary text-sm cursor-pointer' onClick={()=>setShowPasswordModal(true)}>
        Change
       </button>
      </div>
      <Changepasswordmodal open={showPasswordModal} onClose={()=>setShowPasswordModal(false)}/>
    </div>
  )
}

export default Setting