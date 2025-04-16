import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import authImage from '../assets/images/banner_peace.jpg';
import { submituserinfo } from './utils/fetch';
import { UserContext } from '../context/usercontext';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev, [name]: value,  // ..prev means the prev remains same only updated changes
        }));
    };
    const handleClick=async(e)=>{
        e.preventDefault();
        submituserinfo(userInfo);
        navigate('../dashboard')
    }
    return (
        <div className="flex h-[90vh] items-center justify-center bg-gray-100">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 w-[90vw] ">

                {/* Form Section (Now on Left) */}
                <div className="flex justify-center items-center sm:h-auto mt-4 sm:mt-0 text-black shadow-2xl box-border py-5">
                    <div className="flex flex-col justify-start space-y-3 p-2 w-[85%]">
                        <span className="text-3xl font-bold text-gray-600">Welcome To TrackFit 🖐️</span>
                        <span className="text-sm text-gray-500 ">Please Enter Your Credentials</span>

                        <form onSubmit={handleClick}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input type="email" id="email" name="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required value={userInfo.email || ""} onChange={handleChange} />
                            </div>

                            <div className="mb-4 flex flex-row w-full gap-4">
                                <div className='w-1/2'>
                                    <label htmlFor="fname" className="block text-sm font-medium text-gray-700 mb-2">Fname</label>
                                    <input type="name" id="fname" name='fname' className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter First name" required value={userInfo.fname || ''} onChange={handleChange} />
                                </div>
                                <div className='w-1/2'>
                                    <label htmlFor="lname" className="block text-sm font-medium text-gray-700 mb-2">Lname</label>
                                    <input type="name" id="lname" name='lname' className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Last name" required value={userInfo.lname || ""} onChange={handleChange} />

                                </div>

                            </div>


                            <div className="mb-4">
                                <label htmlFor="Username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                <input type="name" id="Username" name='username' className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required value={userInfo.username || ''} onChange={handleChange} />

                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input type="password" id="password" name='password' className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required value={userInfo.password || ''} onChange={handleChange} />
                                <a href="#" className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot Password?</a>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
                                </div>
                                <Link to="../login" className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none">Have An Account?</Link>
                            </div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Account</button>
                        </form>
                    </div>
                </div>

                {/* Image Section (Now on Right) */}
                <div className="md:flex justify-center items-center hidden text-white h-full">
                    <img src={authImage} className="object-cover w-full h-full" alt="Auth" />
                </div>

            </div>
        </div>
    );
}

export default Signup;
