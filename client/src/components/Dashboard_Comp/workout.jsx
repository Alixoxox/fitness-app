import React, { useContext, useEffect,useState } from 'react'
import { WorkoutContext } from '../../context/exercisetrain';
import workoutimg from  '../../assets/icons/workout.png'
const workout = () => {
  const {workoutData}=useContext(WorkoutContext)
  const[workoutno,setworkoutno]=useState(0)
  useEffect(()=>{
    const totalex=async()=>{
      const no_of_ex=workoutData.length||0
      console.log(no_of_ex)
      setworkoutno(no_of_ex)
    }
    totalex()
  },[workoutData])

  return (
    <div className='shadow-sm p-4 flex flex-col max-h-65 '>
      <span className='mt-2 text-2xl font-bold flex items-center justify-between text-blue-400'>Workouts<img src={workoutimg} loading='lazy' className='w-6 h-6' /></span>
     <div className='p-4'>
      <div className='w-full  mt-4 flex flex-col ms-1'>
        
        <span className='text-3xl font-bold p-1 text-gray-700'>{workoutno}</span> 
        <span className='text-gray-500 mt-1'>Total No of Workouts Today</span>

      </div>
      <div className='w-full  mt-4 flex flex-col ms-1 p-1 '>
      <span className='text-2xl font-bold text-gray-700'>Strength + HIIT</span>
      <span className='text-gray-500 mt-1'>Todays Workout Types</span>
      </div>
      </div>
    </div>
  );
}

export default workout
