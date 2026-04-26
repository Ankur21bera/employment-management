import { Loader2, Save, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Profileform = ({ initialData, onSuccess }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState(initialData || {});

  // ✅ FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/profile-information");
        setData(res.data);
      } catch (err) {
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  // ✅ HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        bio: data.bio
      };

      await api.post("/profile/update-profile", payload);

      // 🔥 refresh updated data
      const res = await api.get("/profile/profile-information");
      setData(res.data);

      setMessage("Profile updated successfully");
      onSuccess && onSuccess();

    } catch (error) {
      setError(error?.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 IMPORTANT: override initialData without changing JSX
  const profile = data;

  return (
    <form onSubmit={handleSubmit} className='card p-5 sm:p-6 mb-6'>

      <h2 className='text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2'>
        <User className='w-5 h-5 text-slate-400'/> Public Profile
      </h2>

      {error && (
        <div className='bg-rose-50 text-rose-700 p-4 rounded-xl text-sm border border-rose-200 mb-6 flex items-start gap-3'>
          <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0'/>
          {error}
        </div>
      )}

      {message && (
        <div className='bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm border-emerald-200 mb-6 flex items-center gap-3'>
          <div className='w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0'/>
          {message}
        </div>
      )}

      <div className='space-y-5'>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Name</label>
            <input
              disabled
              value={`${profile.firstName || ""} ${profile.lastName || ""}`}
              className='bg-slate-50 text-slate-400 cursor-not-allowed'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Email</label>
            <input
              disabled
              value={profile.email || ""}
              className='bg-slate-50 text-slate-400 cursor-not-allowed'
            />
          </div>

          <div className='sm:col-span-2'>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Position</label>
            <input
              disabled
              value={profile.position || ""}
              className='bg-slate-50 text-slate-400 cursor-not-allowed'
            />
          </div>

        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
          <textarea
            disabled={profile.isDeleted}
            name='bio'
            value={profile.bio || ""}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            placeholder='Write A Brief Bio...'
            className={`resize-none ${profile.isDeleted ? "bg-slate-50 text-slate-400 cursor-not-allowed":""}`}
          />
          <p className='text-xs text-slate-400 mt-1.5'>This Will Display On Your Profile.</p>
        </div>

        {profile.isDeleted ? (
          <div className='pt-2'>
            <div className='p-4 bg-rose-50 border border-rose-200 rounded-xl text-center'>
              <p className='text-rose-600 font-medium tracking-tight'>Account Deactivated</p>
              <p className='text-sm text-red-500 mt-0.5'>You Can No Longer Update Your Profile</p>
            </div>
          </div>
        ) : (
          <div className='flex justify-end pt-2'>
            <button type='submit' disabled={loading} className='btn-primary flex items-center gap-2 justify-center w-full sm:w-auto cursor-pointer'>
              {loading ? <Loader2 className='w-4 h-4 animate-spin'/> : <Save className='w-4 h-4'/>}
              Save Changes
            </button>
          </div>
        )}

      </div>
    </form>
  )
}

export default Profileform;