import React from 'react';
import { useSelector } from 'react-redux';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-3xl p-8 md:p-10 max-w-md w-full border border-gray-100 relative">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className='absolute top-8 left-8 p-2 rounded-full hover:bg-gray-100 transition-colors'
          aria-label="Go back"
        >
          <FaArrowLeft className='text-gray-600' />
        </button>

        <div className="flex flex-col items-center">
          {/* Profile Image Wrapper */}
          <div className="relative mb-6">
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-4xl font-bold text-white">
                  {userData?.name?.charAt(0) || "U"}
                </span>
              </div>
            )}
          </div>

          {/* Header Info */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{userData?.name || "User Name"}</h2>
            <p className="text-indigo-600 font-medium text-sm uppercase tracking-wide">
              {userData?.role || "Student"}
            </p>
          </div>

          {/* Details Section */}
          <div className='w-full space-y-5 border-t border-gray-50 pt-8'>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</span>
              <span className="text-gray-700 font-medium">{userData?.email || "N/A"}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Bio</span>
              <span className="text-gray-600 text-sm leading-relaxed">
                {userData?.description || "No bio available yet."}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Enrolled Course</span>
              <span className="text-gray-700 font-medium">{userData?.courseName || "Not enrolled"}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 w-full">
            <button className="w-full bg-black text-white py-3.5 rounded-2xl font-semibold hover:bg-gray-800 transform active:scale-95 transition-all shadow-md" onClick={()=>navigate("/editprofile")}>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;