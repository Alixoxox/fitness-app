import React, { useContext, useState } from 'react'
import { addExercise } from '../../pages/utils/create';
import { WorkoutContext } from '../../context/exercisetrain';

const addworkout = () => {

  const {setworkoutData,setrefreshtrigger}=useContext(WorkoutContext)
  const [exercise, setExercise] = useState("");

  const handleChange = async (e) => {

    e.preventDefault();
    const lines = exercise.split("\n").map(line => line.replace("- ", "").trim());
    const category = lines[0]?.replace(/^-/, "").trim() || "";
    const exname = lines[1]?.replace(/^-/, "").trim() || "";
    const setsxreps = lines[2] ? lines[2].replace(/^-/, "").split('x').map(val => val.trim()) : ["", ""];
    const weight = lines[3]?.replace(/^-/, "").split(" ")[0]?.trim() || ""; 
    const duration = lines[4]?.replace(/^-/, "").trim() || "";
  
    let sets = setsxreps[0] || "";
    sets=sets.includes(' ') ? sets.split(' ')[0] : sets;
    let reps = setsxreps[1] || "";
    reps=reps.includes(' ') ? reps.split(' ')[0] : reps || "";
    console.log({ exname, category, sets, reps, weight, duration });
  
    if (!exname || !category || !sets || !reps || !weight || !duration) {
      setExercise("You must fill in the required details");
      return;
    }
    const msg = await addExercise(exname, category , sets , reps, weight , duration);
    if(msg){
      setworkoutData(prev => [...prev, { exname, category, sets, reps, weight, duration }]);
      setrefreshtrigger(prev=>prev+1)
    }
    setExercise(msg);
    setTimeout(()=>{setExercise("")},10000)
  };
  
  return (
    <div className='shadow-sm py-1 flex flex-col h-65'>
      <h1 className="text-2xl ms-3 font-bold text-blue-400 mb-1 ">Add A New Exercise</h1>
      <h3 className='text-sm ms-3 text-gray-400 mb-3'>Current Workout Exercises:</h3>
      <form
        onSubmit={handleChange}
        className="flex flex-col items-center">
        <textarea
          type="text"
          rows="5"
          placeholder={`             -Legs
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
