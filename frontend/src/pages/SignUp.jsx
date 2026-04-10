import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo1 from '../assets/logo1.jpg';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUserData } from '../redux/userSlice';
import {signInWithPopup} from 'firebase/auth';
import { auth, provider } from "../../utils/firebase.js";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userData=useSelector((state)=>state.user.userData);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      return toast.error("Please select a role (Student or Educator)");
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password, role },
        { withCredentials: true }
      );
      console.log(result.data);
     dispatch(setUserData(result.data.user));
      toast.success("Account created successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

const googleSignUp = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    const user = response.user;
    
    const userRole = role || "student"; // Uses the state variable 'role'

    const result = await axios.post(
      `${serverUrl}/api/auth/googleauth`,
      {
        name: user.displayName,
        email: user.email,
        role: userRole,
      },
      { withCredentials: true }
    );

    // This will now work because the backend sends { user: ... }
    if (result.data.user) {
      dispatch(setUserData(result.data.user));
      toast.success("Google SignUp Successful");
      navigate("/");
    }

  } catch (error) {
    console.error("Frontend Error:", error);
    toast.error(error.response?.data?.message || "Google Sign In Failed");
  }
};

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <form 
        className="w-full md:w-[800px] min-h-[600px] flex rounded-lg shadow-lg overflow-hidden bg-white" 
        onSubmit={handleSubmit}
      >
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 gap-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Let's get started</h2>
            <p className="text-gray-600">Create your account</p>
          </div>

          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:ring-1 focus:ring-black outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:ring-1 focus:ring-black outline-none"
          />

          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-black"
            />
            <div 
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShow(prev=>!prev)}
            >
              {!show ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          <div className='flex gap-5 w-full justify-center'>
            <div
              className={`flex items-center gap-2 border rounded-2xl p-2 px-5 cursor-pointer transition-all ${
                role === "student" ? "border-black bg-gray-100 font-bold" : "border-gray-300"
              }`}
              onClick={() => setRole("student")}
            >
              <p>Student</p>
            </div>
            <div
              className={`flex items-center gap-2 border rounded-2xl p-2 px-5 cursor-pointer transition-all ${
                role === "educator" ? "border-black bg-gray-100 font-bold" : "border-gray-300"
              }`}
              onClick={() => setRole("educator")}
            >
              <p>Educator</p>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Sign Up
          </button>

          <div className="w-full flex items-center gap-2 my-2">
            <div className='flex-1 h-[1px] bg-gray-300'></div>
            <div className='text-sm text-gray-500'>Or continue</div>
            <div className='flex-1 h-[1px] bg-gray-300'></div>
          </div>

          <button 
            type="button"
            onClick={googleSignUp}
            className="w-full h-[40px] border border-black rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
            <span className="text-sm">Sign up with Google</span>
          </button>

          <p className="text-sm">
            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
          </p>
        </div>

        {/* Right Section */}
        <div className="hidden md:block md:w-1/2">
          <img 
            src={logo1} 
            alt="Side Cover" 
            className="w-full h-full object-cover"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;