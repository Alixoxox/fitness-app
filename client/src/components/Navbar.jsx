import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icons/top_logo.png";
import user from "../assets/icons/healthy.png";
const Navbar = () => {
  useEffect(() => {
    const isuser = async () => {
      try {
        const authtoken = localStorage.getItem("authtoken")
        if (authtoken) {
          setLogged(true)
        } else { setLogged(false) }
      } catch (err) {
        console.log(err)
      }
    }
    isuser()
  }, [])

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
              Workout  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <Link to="/workout/create" className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setActive("workout");
                    setIsDropdownOpen(false);
                  }}>
                  Create Routine
                </Link>

                <Link to="/workout/history" className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setActive("workout");
                    setIsDropdownOpen(false);
                  }}>
                  History
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
              <Link to="../login" className="px-3 py-1 border bg-blue-500 text-white border-blue-500 rounded  hover:bg-blue-600 hover:text-white transition ">Login</Link>
            </nav>
          ) : (
            <Link to="/account">
              <img src={user} alt="User" className="w-10 h-10 rounded-full" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col ms-10 space-y-4 py-4 ">
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <span className="flex items-center gap-1 hover:cursor-pointer" onClick={() => setdropped(prev => !prev)}>Workout  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg> </span>
          {dropped && (<div className="ms-5 gap-y-1 flex flex-col">
            <Link to='/workout/create' className="text-gray-600 " onClick={() => setIsOpen(false)}>Create Routine</Link>

            <Link to="/workout/history" className="text-gray-600 " onClick={() => setIsOpen(false)}> History</Link>
          </div>)}
          <Link to="/tutorials" onClick={() => setIsOpen(false)}>Tutorials</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
