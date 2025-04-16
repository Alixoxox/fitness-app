import React, { useContext } from 'react';
import ExDetail from '../components/ex_create/detail'
import Plan_overview from '../components/ex_create/plan_overview';
import { ExercisePlan } from '../context/exercisePlan';
import ExLib from '../components/ex_create/ex_lib';
import { savePlanDataDb,savePlanExercises } from './utils/Plan_data_fetch';
const RoutineBuilder = () => {
  const { viewExercises,PlanData,days } = useContext(ExercisePlan)
  const SaveInfo = async()=>{
    //redirect to funct to save deets
    let x=0
    console.log(days)
    console.log(PlanData)
    const exercisesmade=days.some((day)=>day.exercises.length > 0)
    if(exercisesmade){
      console.log("data going to be saved to db")
      x=await savePlanDataDb(PlanData);
      console.log("workout_plan_id",x)
      savePlanExercises(days,x);
    }
  }

  return (
    <div className="max-w-6xl mt-3 mx-auto">
      <div className="text-gray-500 m-1 gap-2 flex flex-col"><span className='text-3xl font-bold'>Routine Builder - Your Workout Planner Online</span>Create, collaborate, and share workout programs with the Jefit workout planner online.</div>
      <div className="flex gap-4 my-2 flex-row justify-end mr-3">

        <button className="px-3 py-1.5 bg-gray-200 text-sm hover:bg-gray-300 rounded-xl flex items-center gap-2">
          <span>Download</span>
        </button>
        <button className="bg-blue-500 text-sm hover:bg-blue-600 text-white px-3 py-1.5 rounded-xl flex items-center gap-2" onClick={() => SaveInfo()}>
          <span>Finish Editing</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
        {!viewExercises && (<div className="col-span-1 bg-neutral-150 px-3 ">
          <Plan_overview />
        </div>)}

        <div className="col-span-1 md:col-span-2 p-4 shadow-lg">
          <ExDetail />
        </div>

        {viewExercises && (<div className="col-span-1 bg-neutral-150 px-3 ">
          <ExLib />
        </div>)}

      </div>

    </div>
  );
};

export default RoutineBuilder;