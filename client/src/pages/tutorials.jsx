import React  from "react";
import banner from "../assets/images/banner.jpg";
import SearchExercises from '../components/tutorials_comp/exercise_p/searchExe'
import Exercise_part_page from '../components/tutorials_comp/exercise_p/exercise'
const Tutorials = () => {
  
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between overflow-hidden " style={{ 'boxSizing': 'border-box' }}>
        {/* Text Section */}
        <div className="w-full sm:w-1/2 justify-center px-6 sm:text-left md:ml-6 lg:ml-20">
          <h1 className="text-3xl  text-blue-400 font-bold mt-4 ">Fitness Club</h1>
          <p className="text-5xl  text-gray-700 mt-4">Sweat, Smile And Repeat </p>
          <p className="text-2xl  text-gray-700 mt-4 mb-3 sm:mr-2">Check Out the Most Effective Exercises </p>
          <button className="z-1 relative flex mt-6 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={()=>{window.scrollTo({ top: 800, behavior: "smooth" });}}>
            Explore Exercises
          </button>
          <div className="hidden  sm:flex w-auto ">
            <p className="text-[17vw] leading-none font-bold text-blue-200 opacity-60 ml-[1vw]">Exercise</p>
          </div>
        </div>


        {/* Image Section (Hidden on Medium and Smaller) */}
        <div className="z-2 leading-none md:w-auto hidden sm:flex justify-end w-1/2 items-start ">
          <img
            src={banner}
            alt="Tutorial Banner"
            className="shadow-lg w-auto" 
            loading='eager'
            style={{ borderBottomLeftRadius: "100px", maxWidth: "60vw", maxHeight: "92vh" }}
          />
        </div>
      </div>
      <br />
      <SearchExercises />

      <Exercise_part_page />
    </>
  );
};

export default Tutorials;
