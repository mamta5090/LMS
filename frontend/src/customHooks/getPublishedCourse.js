import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setCourseData } from '../redux/courseSlice';
import axios from 'axios';
import { serverUrl } from '../App';

const getPublishedCourse = async() => {
    const dispatch=useDispatch();

    useEffect(()=>{
        const getCourseData=async()=>{
            
    try {
        const result=await axios.get(`${serverUrl}/api/course/getpublishedcoures`,{withCredentials:true});
        dispatch(setCourseData(result.data));
        console.log(result.data);
    } catch (error) {
        console.error('Error fetching published courses:', error);
    }
        }
        getCourseData();
    },[])
}


 
