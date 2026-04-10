import React from 'react';
import { LuMonitor, LuSmartphone, LuShieldCheck, LuBrainCircuit, LuDatabase, LuBoxes } from "react-icons/lu";
import { SiFigma } from "react-icons/si";
import { FaArrowRight } from "react-icons/fa";

const ExploreCourses = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-12 font-sans">
      
      {/* --- LEFT SECTION: CONTENT --- */}
      <div className="lg:w-[35%] space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Explore <br /> 
          <span className="text-black">Our Courses</span>
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem vel 
          iure explicabo laboriosam accusantium expedita laudantium 
          facere magnam.
        </p>
        
        {/* Custom Button with Arrow in Circle */}
        <button className="flex items-center justify-between bg-black text-white pl-8 pr-2 py-2 rounded-full group hover:bg-gray-800 transition-all shadow-md">
          <span className="font-semibold text-lg mr-4">Explore Courses</span>
          <div className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
            <FaArrowRight size={18} />
          </div>
        </button>
      </div>

      {/* --- RIGHT SECTION: GRID OF ICONS (Manual) --- */}
      <div className="lg:w-[60%] grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        
        {/* 1. Web Development */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-[#F3E8FF] text-[#9333EA] rounded-2xl flex items-center justify-center text-4xl shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <LuMonitor />
          </div>
          <span className="text-xs font-bold text-gray-600 text-center uppercase tracking-tight">Web Devlopment</span>
        </div>

        {/* 2. UI UX Designing */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-[#DCFCE7] text-[#16A34A] rounded-2xl flex items-center justify-center text-4xl shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <SiFigma />
          </div>
          <span className="text-xs font-bold text-gray-600 text-center uppercase tracking-tight">UI UX Designing</span>
        </div>

        {/* 3. App Development */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-[#FEE2E2] text-[#DC2626] rounded-2xl flex items-center justify-center text-4xl shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <LuSmartphone />
          </div>
          <span className="text-xs font-bold text-gray-600 text-center uppercase tracking-tight">App Devlopment</span>
        </div>

        {/* 4. Ethical Hacking */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-[#F3E8FF] text-[#7E22CE] rounded-2xl flex items-center justify-center text-4xl shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <LuShieldCheck />
          </div>
          <span className="text-xs font-bold text-gray-600 text-center uppercase tracking-tight">Ethical Hacking</span>
        </div>

        {/* 5. AI/ML */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-[#DCFCE7] text-[#15803D] rounded-2xl flex items-center justify-center text-4xl shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <LuBrainCircuit />
          </div>
          <span className="text-xs font-bold text-gray-600 text-center uppercase tracking-tight">AI/ML</span>
        </div>

        {/* 6. Data Science */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-[#FEE2E2] text-[#B91C1C] rounded-2xl flex items-center justify-center text-4xl shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <LuBoxes />
          </div>
          <span className="text-xs font-bold text-gray-600 text-center uppercase tracking-tight">Data Science</span>
        </div>

        {/* 7. Data Analytics */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-[#F3E8FF] text-[#6B21A8] rounded-2xl flex items-center justify-center text-4xl shadow-sm hover:scale-105 transition-transform cursor-pointer">
            {/* <LuBarChart /> */}
          </div>
          <span className="text-xs font-bold text-gray-600 text-center uppercase tracking-tight">Data Analytics</span>
        </div>

        {/* 8. AI Tools */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-[#DCFCE7] text-[#166534] rounded-2xl flex items-center justify-center text-4xl shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <LuDatabase />
          </div>
          <span className="text-xs font-bold text-gray-600 text-center uppercase tracking-tight">AI Tools</span>
        </div>

      </div>
    </div>
  );
};

export default ExploreCourses;