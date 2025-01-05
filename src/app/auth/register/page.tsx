"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, mobile, password, role } = formData;
    if (!name || !email || !mobile || !password || role === 'Select your role') {
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
        setFormData({ name: '', email: '', mobile: '', password: '', role: '' });
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
    <div className="rounded-xl shadow-md shadow-orange-50 md:p-4 p-2  border border-yellow-200  dark:border-yellow-100 px-8">
      <div className="flex flex-col items-center md:mb-4 justify-center">
        <Image
          src="https://res.cloudinary.com/dbqq41bpc/image/upload/v1735976619/Screenshot_2025-01-04_131130-removebg-preview_vd8xei.png"
          width={600}
          height={600}
          alt="logo"
          className="w-20 h-20 rounded-full"
        />
        <h1 className='text-2xl'>Register</h1>
      </div>
      <form onSubmit={handleSubmit}>

        <div className="flex md:flex-row flex-col  justify-center items-center gap-2 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your Name"
            className="w-80 p-3 border border-gray-700 outline-none bg-transparent rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your Email"
            className="w-80 p-3 border border-gray-700 outline-none bg-transparent rounded-md"
          />
        </div>
        </div>

        <div className="flex md:flex-row flex-col gap-2 justify-center items-center mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Enter your Mobile Number"
            className="w-80 p-3 border border-gray-700 outline-none bg-transparent rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-80 p-3 border border-gray-700 outline-none bg-transparent rounded-md"
          >
            <option>Select your role</option>
            <option>Admin</option>
            <option>User</option>
          </select>
        </div>
        </div>
       
        <div className='mb-4'>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your Password"
            className="w-full p-3 border border-gray-700 outline-none bg-transparent rounded-md"
          />
        </div>
        

        <div className="text-sm mb-4 text-right">
          <Link href="/auth/login" className=" hover:underline">
            Already have an Account
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full border ${
            loading ? 'bg-yellow-300' : 'border-bgYellow bg-bgDimLight'
          } text-black font-medium py-3 rounded-md md:mb-4 mb-2`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="text-center text-yellow-500">or</div>

           
        <button
          type="button"
          className="w-full border border-bgSky text-black dark:text-white flex items-center justify-center py-3 rounded-md md:mt-4 mt-2"
        >
          <Image
            src="https://res.cloudinary.com/dbqq41bpc/image/upload/v1735940046/search_1_bx6h7g.png"
            width={1000}
            height={1000}
            alt="google logo"
            className="w-8 h-6 pe-3"
          />
          Login With Google
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
