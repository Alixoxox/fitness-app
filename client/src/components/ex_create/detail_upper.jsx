import React, { useContext, useEffect, useState } from 'react'
import { ExercisePlan } from '../../context/exercisePlan';

const Detailsupper = () => {
  const {days, setDays, currentDayIndex, setCurrentDayIndex,setviewExercises,viewExercises } = useContext(ExercisePlan)
  const [isChecked, setIsChecked] = useState(false);
  const handleAddDay = () => {
    setDays([...days, {
      name: `Day ${days.length + 1}`,
      exercises: [],
    }]);
  };

  const cleardayExercises = ()=>{
    setCurrentDayIndex(0)
    setDays([{
      name: `Day ${currentDayIndex + 1}`,
      exercises: [],
  
    }])
  }
  let [maxdays,setmaxdays]=useState(7)

  useEffect(()=>{
    if(isChecked===true){
      setmaxdays(6)
    }else{
      setmaxdays(7)
    }
  },[isChecked])

  useEffect(() => {
    let totaltime = 0;
    const updatedDays = days.map(day => {
      let dayTime = 0;
  
      if (day?.exercises?.length>0 && Array.isArray(day.exercises)) {
        day.exercises.forEach(ex => {
          dayTime += (ex.time || 0) + (ex.rest || 3);
        });
      }
      totaltime += dayTime;
      return {
        ...day,
        totaltime: dayTime,
      };
    });
    const issame = JSON.stringify(updatedDays) === JSON.stringify(days);
    if (!issame) {
      setDays(updatedDays);
    }
  }, [days]);
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {Array.isArray(days) && days.length > 0 && days.slice(0, maxdays).map((day, index) => (
          <button key={index} onClick={() => {setCurrentDayIndex(index) }} className="border border-gray-300 rounded-lg px-3 py-1.5 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400" >Day {index+1}</button>
        ))}
        <button className="text-blue-500" onClick={handleAddDay}>
          + Add a day
        </button>
      </div>

      <div className="relative flex items-center justify-between mb-3">
       
        <div className="text-center flex-1">
          <h2 className="text-2xl font-bold flex justify-center items-center mt-1 mb-4 gap-2">
            Exercises For Day {currentDayIndex+1}
          </h2>
          <div className="flex justify-center items-center gap-6 mt-2">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{days[currentDayIndex] && (<>Est time: {days[currentDayIndex].totaltime} mins</> )}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span>{days[currentDayIndex] && (<> {days[currentDayIndex].exercises.length} exercise</>)}</span>
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-row gap-3 ">
        <button className="border  border-gray-300 px-2 py-1 rounded flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
            <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
          </svg>
          Copy
        </button>
        <button className="border border-gray-300 px-2 py-1 rounded flex items-center gap-1 hover:border-blue-500" onClick={cleardayExercises}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Delete
        </button>
        <div className="flex items-center flex-row ">
          <label htmlFor="restDay" className="cursor-pointer text-gray-600 flex gap-2">
            <span
              className={`w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center mt-1  ${isChecked ? 'bg-blue-400' : 'bg-white'}`}
            />
            Rest Day
          </label>
          <input
            type="checkbox"
            id="restDay"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="hidden"
          />
        </div>
      </div><div className='flex justify-end'>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1.5 rounded flex " onClick={()=>setviewExercises(prev=>!prev)}>
          {!viewExercises? "Add Exercise" : "Overview Plan"}
        </button>

      </div>
    </div>
  )
}

export default Detailsupper
