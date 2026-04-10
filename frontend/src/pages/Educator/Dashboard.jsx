import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


const Dashboard = () => {
  const userData = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Fetch Courses
//   useEffect(() => {
//     const getCourses = async () => {
//       try {
//         const result = await axios.get(
//           `${serverUrl}/api/course/getcreator`,
//           { withCredentials: true }
//         );

//         console.log(result.data);
//         dispatch(setCourseData(result.data));
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getCourses();
//   }, [dispatch]);

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='w-full px-6 py-10 bg-gray-50 space-y-10'>

        {/* 🔹 Back Button */}
        <FaArrowLeft 
          onClick={() => navigate(-1)} 
          className='text-gray-900 text-xl cursor-pointer' 
        />

        {/* 🔹 Profile Card */}
        <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-row items-center gap-6'>

          {/* Profile Image / Initial */}
          {
            userData?.photoUrl ? (
              <img 
                src={userData.photoUrl} 
                alt="user" 
                className='w-16 h-16 rounded-full object-cover'
              />
            ) : (
              <div className='w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold'>
                {userData?.name?.slice(0,1)?.toUpperCase() || "U"}
              </div>
            )
          }

          {/* User Info */}
          <div className='text-center md:text-left space-y-2'>
            <h1 className='text-2xl font-bold text-gray-800'>
              Welcome, {userData?.name || 'Educator'}! 👋
            </h1>

            <h2 className='text-lg font-semibold text-gray-700'>
              Total Earning: ₹0
            </h2>

            <p className='text-gray-600 text-sm'>
              {userData?.description || "Start creating courses for your students"}
            </p>

            {/* Button */}
            <button
              className='mt-3 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800'
              onClick={() => navigate("/courses")}
            >
              Create Courses
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;