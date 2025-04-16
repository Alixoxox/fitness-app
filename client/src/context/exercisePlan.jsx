import React, { use } from 'react'
import { createContext, useState } from 'react'
export const ExercisePlan = createContext();
const ExercisePlanProvider = ({ children }) => {

    const [planName, setPlanName] = useState('New Routine');
    const [focus, setFocus] = useState('Maintaining');
    const [level, setLevel] = useState('Beginner');
    const [dayTag, setDayTag] = useState('Weekday');
    const [planDescription, setPlanDescription] = useState('');
    const [progduraion,setProgduration]=useState(3)
    const [days, setDays] = useState([
        {
            name: 'Day 1',
            exercises:[],
            totaltime: 0
        }
    ]);
    //add days data below then save to db as workout session and do some alters and then show current plan and show some recomended plans and also disperse the data across for those days
    const [PlanData,setPlanData]=useState({planName:planName,focus:focus,level:level,dayTag:dayTag,progduraion:progduraion,planDescription:planDescription}) // or workout session changes internally
    const [viewExercises,setviewExercises]=useState(false) // show ex library
    const [currentDayIndex, setCurrentDayIndex] = useState(0);

    return (
        <ExercisePlan.Provider value={{ currentDayIndex, setCurrentDayIndex,  planName, setPlanDescription, setPlanName, setFocus, setLevel, setDayTag, focus, level, dayTag, planDescription,  days, setDays,viewExercises,setviewExercises,progduraion,setProgduration,PlanData,setPlanData}}>
            {children}
        </ExercisePlan.Provider>
    );
};

export default ExercisePlanProvider
