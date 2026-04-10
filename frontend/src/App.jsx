import React from 'react'
import { Navigate, Route ,Routes} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { useSelector } from 'react-redux';
import Forget from './pages/Forget'
import EditProfile from './pages/EditProfile';
import Dashboard from './pages/Educator/Dashboard';
import Courses from './pages/Educator/Courses';
import CreateCourses from './pages/Educator/CreateCourses';
import EditCourse from './pages/Educator/EditCourse';
//import getCreatorCourse from './customHooks/getCreatorCourse';


export const serverUrl="http://localhost:8000";

const App = () => {
  const {userData}=useSelector(state=>state.user)

  return (
<>

<ToastContainer />
   <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/login" />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/profile" element={userData ? <EditProfile /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={userData?.role === "educator" ? <Dashboard /> : <Navigate to="/login" />}/>
        <Route path="/courses" element={userData?.role === "educator" ? <Courses /> : <Navigate to="/login" />}/>
        <Route path='/createcourse' element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to="/login" />} />
          <Route path='/editcourse/:courseId' element={userData?.role === "educator" ? <EditCourse /> : <Navigate to="/login" />} />
      </Routes>
   </>
  )
}

export default App
