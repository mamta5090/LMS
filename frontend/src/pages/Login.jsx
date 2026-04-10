import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Use Link for internal navigation
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import logo1 from '../assets/logo1.jpg';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  // userData from Redux (can be used to redirect if already logged in)
  const userData = useSelector((state) => state.user.userData);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`, 
        { email, password }, 
        { withCredentials: true }
      );
      
      toast.success("Login successful");
      dispatch(setUserData(result.data.user));
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server is offline or Network Error");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-200 p-4">
      
      <form 
        className="w-full max-w-[800px] h-auto md:h-[600px] flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden bg-white" 
        onSubmit={handleLogin}
      >
        
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 gap-4">
          <h2 className="text-2xl font-bold">Login</h2>

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />

          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded outline-none focus:border-black"
            />
            <div 
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShow(!show)}
            >
              {!show ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button 
            type='submit' 
            className="w-full bg-black text-white py-2 rounded cursor-pointer hover:bg-gray-800 transition-colors"
          >
            Login
          </button>

          <span 
            onClick={() => navigate("/forget")} 
            className="cursor-pointer text-sm text-gray-600 hover:underline"
          >
            Forgot your password?
          </span>

          <div className="w-[80%] flex items-center gap-2 my-2">
            <div className='flex-1 h-[0.5px] bg-[#c4c4c4]'></div>
            <div className='text-[13px] text-[#6f6f6f] uppercase'>Or continue</div>
            <div className='flex-1 h-[0.5px] bg-[#c4c4c4]'></div>
          </div>

          <button 
            type="button"
            className="w-[80%] h-[40px] border border-black rounded-[5px] flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Login with Google</span>
          </button>

          <p className="text-sm mt-2">
            Create a new account? 
            <Link to="/signup" className="text-blue-500 ml-1 hover:underline">Sign up</Link>
          </p>
        </div>

        {/* Right Section - Visual */}
        <div className="hidden md:block w-1/2">
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