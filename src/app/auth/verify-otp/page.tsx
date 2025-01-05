"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const VerifyOtp: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: ["", "", "", "","" , ""], 
  });
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); 
    if (value.length > 1) return;

    const newOtp = [...formData.otp];
    newOtp[index] = value;

    setFormData((prev) => ({ ...prev, otp: newOtp }));

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus(); // Move to the next input
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...formData.otp];
      newOtp[index] = "";

      setFormData((prev) => ({ ...prev, otp: newOtp }));

      if (index > 0 && !formData.otp[index]) {
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || formData.otp.includes("")) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp.join(""), // Combine OTP digits
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP verification successful!");
        setFormData({ email: "", otp: ["", "", "", ""] });
      } else {
        toast.error(data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-xl shadow-md shadow-orange-50 md:p-4 p-2 border border-yellow-200 dark:border-yellow-100 px-8">
        <div className="flex flex-col items-center mb-4 justify-center">
          <Image
            src="https://res.cloudinary.com/dbqq41bpc/image/upload/v1735976619/Screenshot_2025-01-04_131130-removebg-preview_vd8xei.png"
            width={600}
            height={600}
            alt="logo"
            className="w-20 h-20 rounded-full"
          />
          <h1 className="text-2xl">Verify OTP</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your Email"
              className="w-80 p-3 border border-gray-700 outline-none bg-transparent rounded-md"
            />
          </div>

          {/* OTP Fields */}
          <div>
            <label className="block text-sm font-medium mb-1">OTP</label>
            <div className="flex justify-center items-center md:space-x-2 space-x-1">
              {formData.otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (otpRefs.current[index] = el!)} // Store refs
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center border border-gray-700 outline-none bg-transparent rounded-md"
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full border ${
              loading ? "bg-yellow-300" : "border-bgYellow bg-bgDimLight"
            } text-black font-medium py-3 rounded-md mb-4`}
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </>
  );
};

export default VerifyOtp;
