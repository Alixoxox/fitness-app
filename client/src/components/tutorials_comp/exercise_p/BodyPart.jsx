import React,{useContext} from "react";

import { ExerciseContext } from "../../../context/Exercisecontent";

const BodyPart = ({ item }) => {
  const { bodyPart, setBodyPart,setExercise,exercises} = useContext(ExerciseContext);

  return (
    <div
  className="flex flex-col mx-0.5 justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300 hover:shadow-lg box-border  "
  onClick={() => {
    if (item === "all") {
      setExercise(exercises);
    } else {
      const filteredExercises = exercises.filter(
        (ex) =>
          Array.isArray(ex.primaryMuscles) &&
          ex.primaryMuscles.some((muscle) => muscle.toLowerCase() === item.toLowerCase())
      );

      setExercise(filteredExercises); // ✅ Now this is correctly placed
    }

    setBodyPart(item);
  }}
  style={{
    borderTop: bodyPart === item  ? "4px solid #00FFFF" : "4px solid transparent",
    backgroundColor: "#fff",
    borderBottomLeftRadius: "20px",
    cursor: "pointer",
    height: "20vh",
    minWidth:'120px',
    width: "20vw",
    paddingTop: "20px", // Reduced padding
    transition: "border 0.3s ease, background-color 0.3s ease",
  }}
>
  {/* Image */}
  <img src={`/assets/body-parts/${item.trim()}.png`} alt="dumbbell" className="w-15 h-auto mb-2"  onError={(e) => (e.target.src ='/assets/body-parts/all.png')}/>

  {/* Text */}
  <p className="text-lg font-semibold mt-2 text-black capitalize">{item}</p>
</div>

  );
};

export default BodyPart;

