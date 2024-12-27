import React from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LogoutBtn({style}) {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    function logoutHandler(){
      toast.success('Logout successfully!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        authService.logout().
        then(() => dispatch(logout()))
        navigate("/");
    }
  return (
    <button 
    className={`inline-bock px-6 py-2 text-gray-50 bg-violet-600 font-bold rounded-sm ${style}`}
    onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutBtn