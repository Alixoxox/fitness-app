import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authImage from "../assets/images/AuthImage.jpg";
import { verifyuserinfo } from './utils/fetch';
import { UserContext } from '../context/usercontext';
const Login = () => {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
   const { userInfo, setUserInfo } = useContext(UserContext);
   
  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevent default form submission
    const userdata=await verifyuserinfo(userInfo)
    
    if (!userdata) {
      console.error("Invalid user info");
      return; // Stop execution if userdata is invalid
    }

    setUserInfo(userdata)
    navigate("/dashboard"); // Navigate to dashboard after login
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
        ...prev, [name]: value,  // ..prev means the prev remains same only updated changes
    }));
};

  return (
    <div className="flex h-[90vh] items-center justify-center bg-gray-100">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 w-[80vw] sm:w-[90vw] h-[78vh]">
        {/* Image Section */}
        <div className="md:flex justify-center items-center hidden text-white h-full">
          <img src={authImage} className="object-cover w-full h-full" alt="Auth" />
        </div>

        {/* Login Form */}
        <div className="flex justify-center items-center h-[70vh] sm:h-auto mt-4 sm:mt-0 text-black shadow-lg">
          <div className="flex flex-col justify-start space-y-3 p-2 w-[85%] py-4">
            <span className="text-3xl font-bold text-gray-600">Welcome Back Friend 🖐️</span>
            <span className="text-sm text-gray-500">Please Login With Your Credentials</span>

            <form onSubmit={handleSubmit} className="py-2 ">
              <div className="mb-4 py-0.5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email" name="email"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                  placeholder="your@email.com" 
                  required value={userInfo.email || ''} onChange={handleChange}
                />
              </div>

              <div className="mb-4 py-0.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input 
                  type="password" 
                  id="password" name="password"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                  placeholder="Enter your password" 
                  required value={userInfo.password || ''} onChange={handleChange}
                />
                <a href="#" className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none">
                  Forgot Password?
                </a>
              </div>

              <div className="flex  py-0.5 items-center justify-between mb-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" 
                    checked={remember} 
                    onChange={() => setRemember(!remember)} 
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link to="../signup" className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none">
                  Create Account
                </Link>
              </div>

              <button 
                type="submit" 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
