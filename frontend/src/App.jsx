import React from 'react'
import { Navigate, Route ,Routes} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { useSelector } from 'react-redux';
import Forget from './pages/Forget'
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

export const serverUrl="http://localhost:8000";

const App = () => {
  const {userData}=useSelector(state=>state.user)

  return (
<>

<ToastContainer />
   <Routes>
    <Route path="/" element={userData? <Home/> : <Navigate to={<Login/>}/>} />
    <Route path="/login" element={!userData? <Login />: <Navigate to="/" />} />
    <Route path="/signup" element={!userData? <SignUp/> : <Navigate to={<Login/>}/>} />
    <Route path="/forget" element={<Forget/>} />
      <Route path="/profile" element={<Profile/>} />
            <Route path="/editprofile" element={<EditProfile/>} />
   </Routes>
   </>
  )
}

export default App
