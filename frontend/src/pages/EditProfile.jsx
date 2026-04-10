import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setDescription(userData.description || userData.discription || "");
    }
  }, [userData]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

 const handleEditProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description); // Sent as 'description'

    if (selectedFile) {
      // THIS MUST MATCH upload.single("photoUrl") in the backend
      formData.append("photoUrl", selectedFile); 
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/user/profile`, 
        formData, 
        { 
          withCredentials: true,
          // DO NOT set headers manually. Axios does it better for FormData.
        }
      );
      
      // Update Redux with the NEW user object returned from DB
      dispatch(setUserData(result.data.user)); 
      toast.success("Profile Updated Successfully");
      navigate("/"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  // If we have a selected file, create a preview URL
  if (selectedFile) {
    const objectUrl = URL.createObjectURL(selectedFile);
    // You should probably store this in a separate state for the src
    return () => URL.revokeObjectURL(objectUrl); // Cleanup to prevent memory leaks
  }
}, [selectedFile]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex items-center justify-center font-sans">
      <div className="bg-white shadow-lg rounded-3xl px-8 py-8 max-w-xl w-full border border-gray-100 relative">
        
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <button 
            type="button"
            onClick={() => navigate(-1)} 
            className='absolute left-8 p-2 rounded-full hover:bg-gray-100 transition-colors'
          >
            <FaArrowLeft className='text-gray-900 text-xl' />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
        </div>

        <form onSubmit={handleEditProfile} className="space-y-5">
          
          {/* Avatar Preview */}
          <div className="flex justify-center mb-4">
           <img
  src={
    selectedFile 
      ? URL.createObjectURL(selectedFile) 
      : (userData?.photoUrl || `https://ui-avatars.com/api/?name=${userData?.name || 'User'}&background=random`) 
  } 
  alt="Profile Preview"
  className="w-28 h-28 rounded-full object-cover border-[3px] border-black shadow-sm"
/>
          </div>

          {/* Select Avatar */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Change Profile Picture</label>
            <div className="relative border border-dashed border-gray-400 rounded-xl p-2 hover:border-black transition-colors">
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                />
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-2 text-gray-900">
                    <span className="text-xs font-bold bg-white border border-gray-300 px-3 py-1.5 rounded-lg shadow-sm">Choose File</span>
                    <span className="text-sm text-gray-500 truncate">
                        {selectedFile ? selectedFile.name : 'No file chosen'}
                    </span>
                </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
              placeholder="Your full name"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Bio / Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none resize-none transition-all"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-800 active:scale-[0.98] disabled:bg-gray-400 transition-all shadow-lg"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                  Updating...
                </>
              ) : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;