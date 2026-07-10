import Course from "../model/course.model.js";
import razorpay from 'razorpay'
import User from "../model/user.model.js";
import dotenv from "dotenv"
dotenv.config()
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
})

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.price === undefined || course.price === null || course.price === 0) {
      return res.status(200).json({ amount: 0, id: "free", currency: "INR" });
    }

    const options = {
      amount: Math.round(course.price * 100),
      currency: 'INR',
      receipt: `receipt_${courseId}`,
    };

    const order = await razorpayInstance.orders.create(options);
    return res.status(200).json(order);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: `Order creation failed ${err}` });

  }
};



export const verifyPayment = async (req, res) => {
  try {
        const {razorpay_order_id, courseId, userId} = req.body;

        // Direct enrollment (free course) when no razorpay_order_id
        if (!razorpay_order_id) {
          if (!userId) return res.status(400).json({ message: "User ID is required" });
          const user = await User.findById(userId);
          if (!user) return res.status(404).json({ message: "User not found" });
          if (!user.enrolledCourses.includes(courseId)) {
            user.enrolledCourses.push(courseId);
            await user.save();
          }
          const course = await Course.findById(courseId).populate("lectures");
          if (!course) return res.status(404).json({ message: "Course not found" });
          if (!course.enrolledStudents.includes(userId)) {
            course.enrolledStudents.push(userId);
            await course.save();
          }
          return res.status(200).json({ message: "Enrolled successfully" });
        }

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid') {
      const user = await User.findById(userId);
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }

      const course = await Course.findById(courseId).populate("lectures");
      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }

      return res.status(200).json({ message: "Payment verified and enrollment successful" });
    } else {
      return res.status(400).json({ message: "Payment verification failed (invalid signature)" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error during payment verification" });
  }
};
