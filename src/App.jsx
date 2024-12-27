import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import './App.css'
import { login, logout } from './features/auth/authSlice';
import authService from './appwrite/auth';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("hello");
    authService.getCurrentUser().
    then((userData)=>{
      if (userData) {
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-50'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  ) : null
}

export default App
