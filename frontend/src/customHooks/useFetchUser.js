// import { useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';
// import { serverUrl } from '../App';

// const useFetchUser = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(
//           `${serverUrl}/api/user/getcurrentuser`, 
//           { withCredentials: true }
//         );
        
//         // Ensure you are passing the user object, not the whole response
//         dispatch(setUserData(response.data.user || response.data));
//       } catch (err) {
//         console.error("Fetch user error:", err);
//         dispatch(setUserData(null));
//       }
//     };

//     fetchUser();
//   }, [dispatch]); // Runs once when the app mounts
// };

// export default useFetchUser;