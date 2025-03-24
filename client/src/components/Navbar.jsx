import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icons/top_logo.png'; // Ensure this path is correct

const Navbar = () => {
  const [active, setActive] = useState('');

  return (
    <header className="text-gray-600 body-font flex flex-row box-border">
      <div className="container mx-auto flex flex-wrap p-2  pr-8 pl-8 flex-col md:flex-row items-center">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={logo} alt="Logo" style={{ width: "45px", height: "45px" }} />
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <Link
            to="/"
            className={`ml-7 mr-7 border-b-2 ${active === "dashboard"
              ? "border-blue-500"
              : "border-transparent hover:border-blue-500 transition-all duration-300"} `}
            onClick={() => setActive("dashboard")}>
            Dashboard
          </Link>
          <Link
            to="/workout"
            className={`ml-7 mr-7 border-b-2 ${active === "workout"
              ? "border-blue-500"
              : "border-transparent hover:border-blue-500 transition-all duration-300"} `}
            onClick={() => setActive("workout")}>
            Workout
          </Link>
          <Link
            to="/tutorials"
            className={`ml-7 mr-7 border-b-2 ${active === "tutorials"
              ? "border-blue-500 "
              : "border-transparent hover:border-blue-500 transition-all duration-300 "} `}
            onClick={() => setActive("tutorials")}>
            Tutorials
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;