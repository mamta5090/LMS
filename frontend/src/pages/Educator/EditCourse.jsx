import React, { useState, useRef, useEffect } from "react";
import home1 from "../../assets/home1.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";

const EditCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [published, setPublished] = useState(false);
  const [selectCourseData, setSelectCourseData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

   const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const {courseId}=useParams();
 const thumb = useRef();
  const getCourseById=async()=>{
    try{
      const result=await axios.get(`${serverUrl}/api/course//getcourse/${courseId}`,{withCredentials:true});
      setSelectCourseData(result.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }

  useEffect(()=>{
    if(selectCourseData){
      setTitle(selectCourseData.title || "");
      setSubtitle(selectCourseData.subtitle || "");
      setDescription(selectCourseData.description || "");
      setCategory(selectCourseData.category || "");
      setLevel(selectCourseData.level || "");
      setPrice(selectCourseData.price || "");
      setPublished(selectCourseData.isPublished || false);
      setFrontendImage(selectCourseData.thumbnail || null);
    }
  },[selectCourseData])

  useEffect(()=>{
    getCourseById()
  },[])

  const handleEditCourse=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("isPublished", published);
    if (backendImage) {
      formData.append("thumbnail", backendImage);
    }
    try{
      const result=await axios.put(`${serverUrl}/api/course/editcourse/${courseId}`, formData, {withCredentials:true});
      console.log("Course updated:", result.data);
      toast.success("Course updated successfully");
      navigate("/courses");
    }catch(error){
      console.error("Error updating course:", error);
      toast.error("error.data.response.message || 'Failed to update course'");
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 p-5 py-2">
      <form
        onSubmit={getCourseById}
        className="max-w-4xl mx-auto bg-white p-6 py-5 rounded shadow"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">← Add Course Details</h2>
          <button
            type="button"
            className="bg-black text-white px-3 py-1 rounded"
          >
            Go to lectures
          </button>
        </div>

        {/* Buttons */}
        <div className="mb-2 space-x-2">
          <button
            type="button"
            className="bg-green-200 px-3 py-1 rounded"
            onClick={() => setPublished(!published)}
          >
            {published ? "Unpublish" : "Publish"}
          </button>

          <button
            type="button"
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove Course
          </button>
        </div>

        {/* Form */}
        <div className="space-y-2">
          {/* Title */}
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Course Title"
              className="w-full border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Subtitle */}
          <div>
            <label>Subtitle</label>
            <input
              type="text"
              placeholder="Subtitle"
              className="w-full border p-2 rounded"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label>Description</label>
            <textarea
              placeholder="Course description"
              className="w-full border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Category + Level + Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              className="border p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option>Web Dev</option>
              <option>Data Science</option>
            </select>

            <select
              className="border p-2 rounded"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
            </select>

            <input
              type="number"
              placeholder="Price ₹"
              className="border p-2 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label>Thumbnail</label>

            <input
              type="file"
              accept="image/*"
              ref={thumb}
              onChange={handleThumbnail}
              className="hidden"
            />

            <div
              className="border h-32 w-48 flex items-center justify-center cursor-pointer"
              onClick={() => thumb.current.click()}
            >
               <img
                src={frontendImage || home1}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="space-x-2">
            <button
              type="button"
              className="border px-4 py-1 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-4 py-1 rounded"
              onClick={handleEditCourse}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;