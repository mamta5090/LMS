import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo1 from '../assets/logo1.jpg';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/userSlice';

const Login = () => {
  const dispatch=useDispatch();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const userData=useSelector((state)=>state.user.userData)

  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      const result=await axios.post(`${serverUrl}/api/auth/login`,{email,password},{withCredentials:true})
      toast.success("Login successful")
      console.log(result.data)
     dispatch(setUserData(result.data.user));
      navigate("/")
    }catch(err){
      console.log(err);
      toast.error(err.response?.data?.message || "Server is offline or Network Error");
    }
  }
  const [show,setShow]=useState(false)
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-200">
      
      <form className="w-[90%] md:w-[800px] h-[600px] flex rounded-lg shadow-lg overflow-hidden bg-white" onSubmit={handleLogin}>
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 gap-4">
          <h2 className="text-2xl font-bold">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />

        
        <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-2 border rounded outline-none focus:border-black"
            />
            <div 
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShow(!show)}
            >
              {!show ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button type='submit' className="w-full bg-black text-white py-2 rounded">
            Login
          </button>

<span onClick={()=>navigate("/forget")} className="cursor-pointer">Forget your password ?</span>

          <div className="w-[80%] flex items-center gap-2">
<div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
<div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center '>Or continue </div>
<div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
          </div>

          <div className="w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center ">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
            <span className="text-sm" >Login with Google</span>

          </div>
                <p>create a new account? <a href="/signup" className="text-blue-500">Sign up</a></p>
        </div>



        {/* Right Section */}
        <div className="hidden md:block w-1/2 ">
          <img 
            src={logo1} 
            alt="Logo" 
            className="w-full h-full object-cover"
          />
        </div>

      </form>
      
    </div>
  );
};

export default Login;