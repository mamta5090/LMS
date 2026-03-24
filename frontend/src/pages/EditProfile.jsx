import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();

  // You would typically initialize this state with data from Redux or an API
  const [fullName, setFullName] = useState('Ankush Sahu');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
  // This would be your existing avatar URL
  const currentAvatarUrl = 'path/to/your/avatar/image.jpg'; 

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // You could also generate a preview URL here if needed
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to save the profile changes (including file upload)
    console.log('Saving changes:', { fullName, description, selectedFile });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-2 flex items-center justify-center font-sans">
      <div className="bg-white shadow-lg rounded-3xl px-8 py-2 my-4 md:p-5 max-w-xl w-full border border-gray-100 relative">
        
        {/* Back Button and Title */}
        <div className="flex items-center justify-center mb-2">
          <button 
            onClick={() => navigate(-1)} 
            className='absolute top- left-8 md:left-5 p-2 rounded-full hover:bg-gray-100 transition-colors'
            aria-label="Go back"
          >
            <FaArrowLeft className='text-gray-900 text-xl' />
          </button>
          <h2 className="text-3xl font-bold text-gray-900">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          
          {/* Avatar Preview */}
          <div className="flex justify-center mb-1">
            <div className="relative">
              <img
                src={currentAvatarUrl} 
                alt="Profile Avatar"
                className="w-30 h-30 rounded-full object-cover border-[3px] border-black"
              />
            </div>
          </div>

          {/* Select Avatar Field */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="avatar" className="text-sm font-semibold text-gray-700">Select Avatar</label>
            <div className="relative border border-black rounded-lg p-1 focus-within:ring-2 focus-within:ring-black">
                <input 
                    type="file" 
                    id="avatar" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                />
                <div className="flex items-center gap-3 bg-gray-100 rounded-md p-1 text-gray-900 border border-gray-200">
                    <span className="text-sm font-medium">Choose File</span>
                    <span className="text-sm text-gray-700 truncate">
                        {selectedFile ? selectedFile.name : 'No file chosen'}
                    </span>
                </div>
            </div>
          </div>

          {/* Full Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-5 py-2 border border-black rounded-lg text-gray-900 placeholder:text-gray-500 font-medium focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field (Disabled) */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value="ankush25102002@gmail.com"
              disabled
              className="w-full px-5 py-2 border border-gray-200 rounded-lg text-gray-900 font-medium bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="w-full px-5 py-2 border border-black rounded-lg text-gray-900 placeholder:text-gray-500 font-medium focus:ring-2 focus:ring-black focus:border-black outline-none transition resize-none"
              placeholder="Tell us about yourself"
            />
          </div>

          {/* Save Changes Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-black text-white py-2 rounded-xl font-semibold hover:bg-gray-800 transform active:scale-[0.98] transition-all shadow-md text-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;