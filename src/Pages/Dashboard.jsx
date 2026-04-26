import React, { useEffect, useState } from 'react'
import Loading from '../Components/Loading'
import Employeedashboard from '../Components/Employeedashboard'
import Admindashboard from '../Components/Admindashboard'
import api from '../api/axios'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/dashboard/get-dashboard')
      .then((res) => setData(res.data))
      .catch((err) =>
        toast.error(err.response?.data?.error || err?.message)
      )
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading />

  if (!data)
    return (
      <p className='text-center text-slate-500 py-12'>
        Failed To Load Dashboard Data
      </p>
    )

  // ✅ role based render
  if (data.role === "ADMIN") {
    return <Admindashboard data={data} />
  } else {
    return <Employeedashboard data={data} />
  }
}

export default Dashboard