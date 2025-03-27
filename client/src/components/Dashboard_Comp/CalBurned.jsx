import React, { useState } from 'react'
import ProgressCircle from './progressBar';
import flag from '../../assets/icons/flag.png'
import cutlery from '../../assets/icons/cutlery.png'
import dumbel from '../../assets/icons/dumbbel.png'
import fire from '../../assets/icons/fire.png'
const CalBurned = () => {
  const [burned] = useState(500);
  const [totalCals] = useState(2029)


  return (
    <div className='shadow-sm p-4 flex flex-col max-h-65'>
      <span className='mt-2 ms-2 text-2xl font-bold flex items-center justify-between text-blue-400'>Calories Burned<img src={fire} loading="eager" className='w-6 h-6 '/></span>
      <span className='text-sm mt-1 ms-2'>Remaining = Goal - Food + Exercise</span>
      <div className='w-full ms-4 mt-4 flex flex-row items-center'>
        <div className='w-[60%]'><ProgressCircle burnedCals={burned} totalCals={totalCals} /></div>
        
        
        {/* Moves this div all the way to the right */}
        <div className='w-[40%] flex flex-col ml-auto  gap-y-3'>
          <div className='flex flex-row '><img src={flag} loading='eager' alt="" className=" h-10 w-10 mr-1 sm:mr-3" /><div className='flex leading-none flex-col'><span className='text-xs font-semibold'>Base Goal</span><span className='font-bold text-sm'>{totalCals}</span></div></div>

          <div className='flex flex-row '><img src={cutlery} loading='eager' alt="" className=" h-10 w-10 mr-1 sm:mr-3" /><div className='flex leading-none flex-col'><span className='text-xs font-semibold'>Food</span><span className='font-bold text-sm'>0</span></div></div>

          <div className='flex flex-row '><img src={dumbel} loading='eager' className=" h-10 w-10 mr-1 sm:mr-3" /><div className='flex leading-none flex-col'><span className='text-xs font-semibold'>Exercise</span><span className='font-bold text-sm mb-2'>0</span></div></div>
          
        </div>
      </div>
    </div>
  );
}

export default CalBurned
