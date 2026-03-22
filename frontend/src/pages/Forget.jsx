import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Forget = () => {

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Send OTP
  const sendOtp = async () => {
    try {
      setLoading(true);
      const result =await axios.post(`${serverUrl}/api/auth/sendotp`, { email });

      toast.success(result.data.message);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    try {
      setLoading(true);

      const result = await axios.post(
        `${serverUrl}/api/auth/verifyotp`,
        { otp, email },
        { withCredentials: true }
      );

      toast.success(result.data.message);
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset Password
  const resetPassword = async () => {
    try {
      if (newPassword !== conPassword) {
        return toast.error("Passwords do not match");
      }

      setLoading(true);

      const result = await axios.post(
        `${serverUrl}/api/auth/resetpassword`,
        { email, password: newPassword },
        { withCredentials: true }
      );

      toast.success(result.data.message);
      setStep(1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center">Forget Password</h2>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <button
                className="w-full bg-black text-white py-2 rounded flex justify-center"
                onClick={sendOtp}
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                ) : "Send OTP"}
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center">Verify OTP</h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <button
                className="w-full bg-black text-white py-2 rounded flex justify-center"
                onClick={verifyOtp}
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                ) : "Verify OTP"}
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-center">Reset Password</h2>

            <div className="flex flex-col gap-3">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <button
                className="w-full bg-black text-white py-2 rounded flex justify-center"
                onClick={resetPassword}
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                ) : "Update Password"}
              </button>
            </div>
          </>
        )}

        {/* Back */}
        <p className="text-center text-sm">
          Back to{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Forget;