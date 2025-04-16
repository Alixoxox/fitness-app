import React, { useState } from 'react'
import { createContext } from 'react'

export const WorkoutContext = createContext();

export const WorkoutContextProvider = ({ children }) => {
  const [workoutData, setworkoutData] = useState([]);
  const [refreshtrigger,setrefreshtrigger]=useState(0)
    
    return (
        <WorkoutContext.Provider value={{workoutData,setworkoutData,refreshtrigger,setrefreshtrigger}}>
            {children}
        </WorkoutContext.Provider>
    );
};
export default WorkoutContextProvider;
