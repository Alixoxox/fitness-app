import React, { useContext, useEffect } from 'react'
import Details_upper from './detail_upper';
import empty from "../../assets/icons/safety-box.png"
import { ExercisePlan } from '../../context/exercisePlan';
const detail = () => {
    const { days, setDays, currentDayIndex } = useContext(ExercisePlan)

    useEffect(()=>{
    console.log(days)
    },[days])
    
    const handleDeleteExercise = (exerciseIndex) => {
        const updatedDays = [...days];
        updatedDays[currentDayIndex].exercises.splice(exerciseIndex, 1);
        setDays(updatedDays);
    };

    const handleExerciseChange=(index,label,value)=>{
        const updatedDays =[...days]
        updatedDays[currentDayIndex].exercises[index][label]=value  //change dynamically
        setDays(updatedDays)
    }

    return (
        <div className='w-full'>

            <Details_upper />

            {(days[currentDayIndex] && days[currentDayIndex].exercises && days[currentDayIndex].exercises.length === 0) && (
                <div className="text-center py-8 border rounded-lg bg-gray-50 mt-4 flex flex-col justify-center items-center gap-2">
                    <img src={empty} className="w-[5vw]" />
                    <p className="text-gray-500 font-bold flex flex-col">
                        No exercises added yet
                        <span className="font-medium mb-2">Start building your workout</span>Note:
                        <span className='font-semibold'> Don't Add Exercise to make it Rest day</span>
                    </p>
                </div>
            )}{days.length > 0 && days[currentDayIndex].exercises.map((exercise, index) => (
                
                <div key={index} className="border-b py-4">
                    <div className="flex items-center gap-4">
  
                            {exercise.name != "New Exercise" ? (<img className='w-16 h-16 rounded-full ' src={exercise.Image}></img>) : "N/A"}
                
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{exercise.name}</h3>
                                {exercise.category && <span className="text-sm text-blue-500">{exercise.category}</span>}
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1 text-center ">Sets</div>
                                    <input
                                        type="number"
                                        value={exercise.sets}
                                        name="sets"
                                        placeholder='3'
                                        onChange={(e) => handleExerciseChange(index, 'sets', parseInt(e.target.value))}
                                        className="w-full border p-2 rounded mt-5 lg:mt-0"
                                    />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1 text-center">Reps</div>
                                    <input
                                        type="number"
                                        name="reps"
                                        placeholder='12'
                                        value={exercise.reps}
                                        onChange={(e) => handleExerciseChange(index, 'reps', parseInt(e.target.value))}
                                        className="w-full border p-2 rounded mt-5 lg:mt-0"
                                    />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1 flex items-center ">
                                        Weight (in kgs)
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder='0'
                                        value={exercise.weight}
                                        name='weight'
                                        onChange={(e) => handleExerciseChange(index, 'weight',  parseInt(e.target.value))}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1 flex items-center text-center">
                                        Total Time 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="number"
                                        name='time'
                                        placeholder='7'
                                        value={exercise.time}
                                        onChange={(e) => handleExerciseChange(index, 'time', parseInt(e.target.value))}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className="text-gray-500"
                            onClick={() => handleDeleteExercise(index)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default detail
