import React from 'react'
import WorkoutCard from './workoutcard'
const todaysWorkout = ({selectedDate}) => {
  
    const exercises= [
      { name: "Back Squats", category: "Legs", sets: 5, reps: "15", weight: "30kg", duration: "10 min" },
      { name: "Bench Press", category: "Chest", sets: 4, reps: "10", weight: "40kg", duration: "10 min" },
      { name: "Deadlifts", category: "Back", sets: 4, reps: "8", weight: "60kg", duration: "12 min" },
      { name: "Overhead Press", category: "Shoulders", sets: 4, reps: "10", weight: "25kg", duration: "10 min" },
      { name: "Bicep Curls", category: "Arms", sets: 3, reps: "12", weight: "15kg", duration: "6 min" },
      { name: "Tricep Dips", category: "Arms", sets: 3, reps: "12", weight: "Bodyweight", duration: "6 min" },
      { name: "Plank", category: "Core", sets: 3, reps: "Hold", duration: "1 min each" },
    ]

  return (
    <div className="mt-6 flex flex-col w-full">
  <h1 className="text-3xl font-bold text-blue-400 mb-4 px-4"> Workout For {selectedDate ? selectedDate.toLocaleDateString() : "Today"}</h1>
  <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4'>
    {exercises.map((workout) => (
      <WorkoutCard key={workout.name} data={workout} />
    ))}
  </div>
</div>
  )
}

export default todaysWorkout
