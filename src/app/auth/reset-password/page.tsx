"use client"
import Image from 'next/image'; 
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Resetpassword: React.FC = () => {
  const [formData, setFormData] = useState({
    password: '',confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { password } = formData;
    if (!password) {
      toast.error('Please fill out all fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful!');
        setFormData({password: ''});
      } else {
        toast.error(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return ( 
    <>
    <div className="rounded-xl shadow-md shadow-orange-50 md:p-4 p-2  border border-yellow-200  dark:border-yellow-100 px-8">
      <div className="flex flex-col items-center mb-4 justify-center">
        <Image
          src="https://res.cloudinary.com/dbqq41bpc/image/upload/v1735976619/Screenshot_2025-01-04_131130-removebg-preview_vd8xei.png"
          width={600}
          height={600}
          alt="logo"
          className="w-20 h-20 rounded-full"
        />
        <h1 className='text-2xl'>Recover Password</h1>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
 
      <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your Password"
            className="w-80 p-3 border border-gray-700 outline-none bg-transparent rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Please Confirm Password"
            className="w-80 p-3 border border-gray-700 outline-none bg-transparent rounded-md"
          />
        </div>

        
        <button
          type="submit"
          disabled={loading}
          className={`w-full border ${
            loading ? 'bg-yellow-300' : 'border-bgYellow bg-bgDimLight'
          } text-black font-medium py-3 rounded-md mb-4`}
        >
          {loading ? 'Updating Password ...' : 'Reset Password'}
        </button>
 
      </form>
    </div>
    
    
    </>
      
  );
};

export default Resetpassword;

