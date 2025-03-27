import React, { useState } from 'react'

const addworkout = () => {
  const [exercise, setExercise] = useState("");
  return (
    <div className='shadow-sm py-1 flex flex-col h-65'>
      <h1 className="text-2xl ms-3 font-bold text-blue-400 mb-1 ">Add A New Exercise</h1>
      <h3 className='text-sm ms-3 text-gray-400 mb-3'>Current Workout Exercises:</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (exercise.trim()) {
            //addExercise(exercise);
            setExercise("");
          }
        }}
        className="flex flex-col items-center">
        <textarea
          type="text"
          rows="5"
          placeholder={`             #Legs
            - Back Squats
            - 5 sets x 15 reps
            - 30 kg
            - 10 min`}
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className=" border border-gray-300 rounded-md h-32 p-1.5 text-sm w-[90%] outline-gray-300 "
        />
        <button type="submit" className="flex text-white ms-2 mb-2 mt-3 bg-indigo-500 border-0 py-0.5  px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg" >
          Add Exercise
        </button>
      </form>

    </div>
  )
}

export default addworkout
