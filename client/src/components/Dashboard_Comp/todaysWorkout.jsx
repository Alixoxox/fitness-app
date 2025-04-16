import React from 'react'
import WorkoutCard from './workoutcard'

const todaysWorkout = ({ selectedDate, data = [] }) => {
  return (
    <div className="mt-6 flex flex-col w-full">
      <h1 className="text-3xl font-bold text-blue-400 mb-4 px-4"> Exercises Completed For {selectedDate ? selectedDate.toLocaleDateString() : "Today"}</h1>
       <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4'>
        {data.length > 0 ? (
          data.map((workout,index) => <WorkoutCard key={index} data={workout} />)
        ) : (
          <p className="text-gray-500">No workouts available.</p> // Show message instead of crashing
        )}
      </div> </div>
  )
}

export default todaysWorkout
