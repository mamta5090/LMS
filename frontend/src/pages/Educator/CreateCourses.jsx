import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import setCourseData from '../../redux/courseSlice.js';

const CreateCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title,setTitle]=useState("");
  const [category,setCategory]=useState("");
  const [loading,setLoading]=useState(false);

  const handleCreateCourse=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
        const result=await axios.post(`${serverUrl}/api/course/create`,{title,category},{withCredentials:true});
        dispatch(setCourseData(result.data.course)); 
                toast.success("Course Created Successfully");// Update Redux with the new course
        navigate("/courses");
        console.log(result.data.course);
    }catch(error){
        console.log(error);
        toast.error("Failed to create course");

    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaArrowLeft 
          onClick={() => navigate(-1)} 
          className="text-xl cursor-pointer" 
        />
        <h1 className="text-2xl font-bold text-gray-800">
          Create Course
        </h1>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <form  className="space-y-5" onSubmit={handleCreateCourse}>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter course title"
             value={title}
                onChange={(e)=>setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

        

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option >Select Option</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Science">Data Science</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="Web Development">Web Development</option>
              <option value="Others">Others</option>
              <option value="AI/ML">AI/ML</option>
              <option value="App Development">App Development</option>
              <option value="Data Analytics">Data Analytics</option>
              
            </select>
          </div>

        
        

        

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
             {loading ? "Creating..." : "Create Course"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateCourses;