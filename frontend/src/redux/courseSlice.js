import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    createCourseData: [],
  },
  reducers: {
    setCourseData: (state, action) => {
      state.createCourseData = action.payload;
    },
  },
});

export const { setCourseData } = courseSlice.actions; // ✅ VERY IMPORTANT
export default courseSlice.reducer;