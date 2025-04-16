import React, { useContext, useEffect, useState } from 'react';
import CalBurned from '../components/Dashboard_Comp/CalBurned';
import Workout from '../components/Dashboard_Comp/workout';
import Journey from '../components/Dashboard_Comp/journey';
import WeeklyCalsBurned from '../components/Dashboard_Comp/weeklycals';
import WorkoutCategories from '../components/Dashboard_Comp/workoutCategory';
import AddExercise from '../components/Dashboard_Comp/addworkout';
import TodaysWorkout from '../components/Dashboard_Comp/todaysWorkout';
import User from '../assets/icons/user.png'
import { Link } from "react-router-dom";
import {  fetchexercisesdata } from '../pages/utils/fetch';
import { WorkoutContext } from '../context/exercisetrain.jsx'
import { UserContext } from '../context/usercontext.jsx';
const Home = () => {
  const { workoutData, setworkoutData} = useContext(WorkoutContext)
  const {userInfo}=useContext(UserContext)
  console.log(userInfo)
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchexercisesdata(new Date);
      setworkoutData(prev => data || prev);
    };

    fetchData();

  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-center mt-4">
      <div className="home-container box-border overflow-hidden flex flex-col items-center justify-center w-[90vw] mt-8 mx-auto">
        <div className='flex justify-between w-full'>
          <div className="flex items-center ">
            <Link to="../acount"><img src={User} loading='eager' className='h-12' /></Link><h1 className='ms-4 text-3xl font-bold  text-gray-600 ' >Today</h1>
          </div>
          <div className=" font-semibold  items-center flex gap-2"> <p className='text-3xl'>{userInfo.streak_count||1}</p> <div className=' flex text-sm flex-col p-0 m-0 leading-none gap-0'><span>DAYS</span><span>STREAK</span></div></div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2  mt-7 gap-4 items-center justify-center ">
          <CalBurned />
          <Workout />
          <Journey />
          <WeeklyCalsBurned />
          <WorkoutCategories />
          <AddExercise />
        </div>
        <TodaysWorkout data={workoutData} />
      </div>
    </div>

  );
};

export default Home;