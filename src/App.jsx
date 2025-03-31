import { useState,useEffect } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from "./appwrite/auth"
import { login,logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'



function App() {
  
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentuser()
    .then((userData) => {
        console.log("✅ User data:", userData);  // ✅ Improved log
        if (userData) {
            dispatch(login( userData ));
        } else {
            console.log("🚪 No session found — user is logged out."); // ✅ Added log
            dispatch(logout());
        }
    })
    .catch((error) => {
        console.warn("⚠️ Session check failed:", error.message);  // ✅ Added error handling
        dispatch(logout());
    })
    .finally(() => setLoading(false));
}, []);

  if(loading){
    return <div>Loading...</div>
  }
  else{
    return(
      <div className='min-h-screen flex flex-wrap content-between'>
        <div className='w-full block'>
          <Header/>
          <main>
            <Outlet/> 
          </main>
          <Footer/>
        </div>
      </div>
    )
  }
}

export default App
