import React, { useEffect, useState } from "react";
import home1 from "../assets/home1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import axios from "axios";
import { setCourseData } from "../redux/courseSlice";
import Card from "./Card";

const CardPage = () => {
    const dispatch=useDispatch();
    const {courseData}=useSelector(state=>state.course);
    const [popularCourses,setPopularCourses]=useState([]);

   useEffect(() => {
  setPopularCourses(courseData.slice(0, 6));
}, [courseData]);

 useEffect(() => {
    const getCourses = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/course/getpublishedcoures`
        );

        dispatch(setCourseData(result.data));
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    getCourses();
  }, [dispatch]);

  return (
   <div className='relative flex items-center justify-center flex-col'>
    <h1 className='md-text-[40px] text-[30px] font-semibold text-center mt-[30px] px-[20px]'>
        Our Popular Courses
    </h1>
    <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]'>

    </span>
    <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 px-[20px] mb-[30px]'>
        {
            popularCourses.map((course)=>(
                <Card key={course._id} thumbnail={course.thumbnail || home1} title={course.title} category={course.category} price={course?.price || "0.00"} id={course._id} />
            ))
        }
    </div>
   </div>
  );
};

export default CardPage;