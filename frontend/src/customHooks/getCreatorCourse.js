// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { serverUrl } from "../App";
// import  setCourseData  from "../redux/courseSlice.js"; 

// const getCreatorCourse = () => {
//   const dispatch = useDispatch();
//   const userData=useSelector(state=>state.user.userData);

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
// };

// export default getCreatorCourse;