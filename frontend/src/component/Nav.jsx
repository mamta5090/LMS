import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/userSlice';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);      
  const [showHam, setShowHam] = useState(false); 

  const userData = useSelector((state) => state.user.userData);

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
      dispatch(setUserData(null));
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        withCredentials: true,
      });
      dispatch(setUserData(res.data.user));
    } catch (err) {
      dispatch(setUserData(null));
    }
  };

  useEffect(() => {
    if (!userData) getCurrentUser();
  }, []);

  return (
    <div className="w-full h-[70px] fixed top-0 px-5 flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm z-50">

      {/* 🔷 Logo */}
      <div className="flex items-center">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/graduation-cap.png"
          alt="logo"
          className="w-10 p-1 border-2 border-black rounded"
        />
      </div>

      {/* 🍔 Hamburger (Mobile Only) */}
      <HiOutlineBars3
        className="text-3xl cursor-pointer lg:hidden"
        onClick={() => setShowHam(true)}
      />

      {/* 💻 Desktop Menu */}
      <div className="hidden lg:flex items-center gap-4 relative">

        {userData ? (
          <>
            {/* Profile Circle */}
            <div
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {userData?.name?.charAt(0).toUpperCase()}
            </div>

            {/* Dashboard */}
            {userData.role === "educator" && (
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
              >
                Dashboard
              </Link>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-black rounded-lg text-sm hover:bg-gray-100"
            >
              Logout
            </button>

            {/* Dropdown */}
            {show && (
        <div className='absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border border-black shadow-md'>
          <span className='bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600' onClick={()=>navigate("/profile")}>
            My Profile
          </span>
          <span className='bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600'>
            My Courses
          </span>
        </div>
      )}
    </>
  ) : (
          <>
            <CgProfile className="w-8 h-8 text-gray-600" />
            <Link
              to="/login"
              className="px-4 py-2 bg-black text-white rounded-lg text-sm"
            >
              Login
            </Link>
          </>
        )}
      </div>

     <div
  className={`fixed top-0 left-0 w-full h-[100vh] bg-black/80 flex flex-col items-center justify-center gap-6 z-50 lg:hidden transition-transform duration-500 ${
    showHam ? "translate-x-0" : "translate-x-full"
  }`}
>
  {/* Close Button */}
  <button
    className="absolute top-5 right-5 text-white text-3xl"
    onClick={() => setShowHam(false)}
  >
    ✕
  </button>

  {userData ? (
    <>
      {/* User Name */}
      <h2 className="text-white text-xl font-bold">
        {userData.name}
      </h2>

      {/* Profile */}
      <Link
        to="/profile"
        className="text-white text-lg hover:underline"
        onClick={() => setShowHam(false)}
      >
        My Profile
      </Link>

      {/* Courses */}
      <Link
        to="/courses"
        className="text-white text-lg hover:underline"
        onClick={() => setShowHam(false)}
      >
        My Courses
      </Link>

      {/* Dashboard */}
      {userData.role === "educator" && (
        <Link
          to="/dashboard"
          className="text-white text-lg hover:underline"
          onClick={() => setShowHam(false)}
        >
          Dashboard
        </Link>
      )}

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="text-white text-lg hover:text-gray-300"
      >
        Logout
      </button>
    </>
  ) : (
    <Link
      to="/login"
      className="text-white text-lg"
      onClick={() => setShowHam(false)}
    >
      Login
    </Link>
  )}
</div>
    </div>
  );
};

export default Nav;