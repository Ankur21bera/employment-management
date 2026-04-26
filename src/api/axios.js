import axios from 'axios';


const api = axios.create({
    baseURL:(import.meta.VITE_BASE_URL || "https://employment-backend.vercel.app") + "/api"
})

api.interceptors.request.use((config)=>{
    const token = sessionStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default api