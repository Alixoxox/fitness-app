import { createContext, useState, useEffect } from "react";
import { fetchData } from "../pages/utils/fetch";
export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]); //hardcode or store all the exercises 
  const [exercise, setExercise] = useState(); // search those 
  const [bodyPart, setBodyPart] = useState(null);
  const [searchState, setsearchState] = useState('');
  const [bodyParts, setBodyParts] = useState(['all',
    "quadriceps", "shoulders", "abdominals", "chest", "hamstrings",
    "triceps", "biceps", "lats", "middle back", "calves",
    "lower back", "forearms", "glutes", "traps",
    "adductors", "abductors", "neck"
  ]);
  const [exerciseDetail,setexerciseDetail]=useState({})

  useEffect(() => {
    const fetchExercises = async () => {
      const exerciseData = await fetchData('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json');
      setExercises(exerciseData);
    };
    fetchExercises();
  }, []);

  return (
    <ExerciseContext.Provider value={{ bodyParts, setBodyParts, exercises, setExercises, bodyPart, setBodyPart, searchState, setsearchState ,exercise,setExercise,exerciseDetail,setexerciseDetail}}>
      {children}
    </ExerciseContext.Provider>
  );
};