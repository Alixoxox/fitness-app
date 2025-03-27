import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icons/top_logo.png";
import user from "../assets/icons/user.png";
import dropdownicon from '../assets/icons/drop-down-list.png'
const Navbar = () => {
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [logged, setLogged] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Fix: Changed null → false
  const [dropped, setdropped] = useState(false)
  return (
    <header className="text-gray-600 body-font bg-white shadow-md w-full">
      <div className="flex justify-between items-center p-3">

        {/* Left: Logo & Mobile Menu */}
        <div className="flex items-center">
          <button
            className="lg:hidden bg-gray-100 px-3 py-2 rounded mr-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
          <Link to="/" className="flex items-center text-gray-900">
            <img src={logo} alt="Logo" loading="eager" className="w-13 h-12 ml-2" />
            <span className="text-3xl ml-4 font-extrabold text-blue-900 font-serif hidden sm:inline">TrackFit</span>
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex space-x-10 text-lg">
          <Link to="/dashboard" className={`px-4 py-2 border-b-2 ${active === "dashboard" ? "border-blue-500" : "border-transparent hover:border-blue-500"}`}
            onClick={() => setActive("dashboard")}>
            Dashboard
          </Link>

          {/* Workout Dropdown */}
          <div className="relative">
            <button
              className={`px-4 py-2 flex items-center gap-2 border-b-2 ${active === "workout" ? "border-blue-500" : "border-transparent hover:border-blue-500"}`}
              onClick={() => setIsDropdownOpen(prev => !prev)} // Fix: Proper toggle
            >
              Workout <img src={dropdownicon} loading="eager" className="h-4 mt-1" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <Link to="/workout/discover" className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setActive("workout");
                    setIsDropdownOpen(false);
                  }}>
                  Discover Plans
                </Link>
                <Link to="/workout/train" className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setActive("workout");
                    setIsDropdownOpen(false);
                  }}>
                  Train
                </Link>
                <Link to="/workout/history" className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setActive("workout");
                    setIsDropdownOpen(false);
                  }}>
                  Workout History
                </Link>
              </div>
            )}
          </div>

          <Link to="/tutorials" className={`px-4 py-2 border-b-2 ${active === "tutorials" ? "border-blue-500" : "border-transparent hover:border-blue-500"}`}
            onClick={() => setActive("tutorials")}>
            Tutorials
          </Link>
        </nav>

        {/* Right: Login/Profile */}
        <div className="flex items-center">
          {!logged ? (
            <nav className="flex items-center space-x-4">
              <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="px-3 py-1 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition">Signup</Link>
            </nav>
          ) : (
            <Link to="/account">
              <img src={user} alt="User" loading="eager" className="w-10 h-10 rounded-full" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col ms-10 space-y-4 py-4 ">
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <span className="flex items-center gap-1 hover:cursor-pointer" onClick={() => setdropped(prev => !prev)}>Workout <img src={dropdownicon} loading="eager" className="h-4" /> </span>
          {dropped && (<div className="ms-5 gap-y-1 flex flex-col">
            <Link to='/workout/discover' className="text-gray-600 " onClick={() => setIsOpen(false)}>Discover Plans</Link>
            <Link to="/workout/train" className="text-gray-600 " onClick={() => setIsOpen(false)}>Train</Link>
            <Link to="/workout/history" className="text-gray-600 " onClick={() => setIsOpen(false)}>Workout History</Link>
          </div>)}
          <Link to="/tutorials" onClick={() => setIsOpen(false)}>Tutorials</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
