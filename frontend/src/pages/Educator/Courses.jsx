import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import home1 from '../../assets/home1.jpg';
import axios from 'axios';
import { serverUrl } from '../../App';
import  {setCourseData}  from '../../redux/courseSlice.js';

const Courses = () => {
  const userData = useSelector(state => state.user.user);
const creatorCourseData = useSelector(
  state => state.course.createCourseData
);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  useEffect(() => {
    const getCourses = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/course/getcreator`,
          { withCredentials: true }
        );

        dispatch(setCourseData(result.data));
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    getCourses();
  }, [dispatch]);

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='w-full p-4 sm:p-6'>

        {/* 🔹 Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>
          <div className='flex items-center gap-3'>
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className='text-xl cursor-pointer'
            />

            <h1 className='text-2xl font-bold text-gray-800'>
              My Courses
            </h1>

            <button
              className='bg-black text-white px-4 py-2 rounded hover:bg-gray-600'
              onClick={() => navigate("/createcourse")}
            >
              Create Course
            </button>
          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className='border px-4 py-2 text-left'>Course</th>
                <th className='border px-4 py-2 text-left'>Price</th>
                <th className='border px-4 py-2 text-left'>Status</th>
                <th className='border px-4 py-2 text-left'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {creatorCourseData?.length > 0 ? (
                creatorCourseData.map((course, index) => (
                  <tr key={index} className='border-b hover:bg-gray-50'>

                    {/* Course */}
                    <td className='border px-4 py-2'>
                      <div className='flex flex-col gap-2'>
                        <img
                          src={course.thumbnail || home1}
                          alt="course"
                          className='h-[80px] w-[120px] object-cover rounded-md'
                        />
                        <span className='font-medium'>{course.title}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className='border px-4 py-2'>
                      {course?.price? <td className='px-4 py-3'>{course?.price}</td> : <td className='px-4 py-3'>0.00</td>}
                    </td>

                    {/* Status */}
                    <td className='border px-4 py-2'>
                      <span className={`px-3 py-1 rounded-full text-xs ${course.isPublished ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {course.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className='border px-4 py-2'>
                      <button className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer' onClick={() => navigate(`/editcourse/${course?._id}`)}>
                        Edit
                      </button>
                      <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2 cursor-pointer'>
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className='text-center py-6 text-gray-500'>
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE UI ================= */}
        <div className="md:hidden space-y-4 mt-4">

          {creatorCourseData?.length > 0 ? (
            creatorCourseData.map((course, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4">

                {/* Image + Title */}
                <div className="flex items-center gap-4">
                  <img
                    src={course.thumbnail || home1}
                    alt="course"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {course.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                     {course.isPublished ? "Published" : "Draft"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status:</span>
                   <span className={`px-3 py-1 rounded-full text-xs ${course.isPublished ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {course.isPublished ? "Published" : "Draft"}
                      </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </div>

              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No courses found
            </p>
          )}

        </div>

      </div>
    </div>
  );
};

export default Courses;