import React, { useContext } from "react";
import BodyPart from "./BodyPart";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { ExerciseContext } from "../../../context/Exercisecontent";
import rightarrow from "../../../assets/icons/right-arrow.png";
import leftarrow from "../../../assets/icons/left-arrow.png";
import ExerciseCard from "./excercise_card";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <button className="mr-2 p-1" onClick={() => scrollPrev()}>
      <img src={leftarrow} loading='lazy' alt="Left Arrow" />
    </button>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <button className="ml-2 p-1" onClick={() => scrollNext()}>
      <img src={rightarrow} loading="lazy" alt="Right Arrow" />
    </button>
  );
};

const ScrollBar = ({ bodyParts, primaryMuscles, equipment }) => {
  const { exercises } = useContext(ExerciseContext);

  const equipmentExercises = equipment
    ? exercises?.filter(
      (exercise) =>
        exercise.equipment && exercise.equipment.includes(equipment) // Check if equipment matches
    ).slice(0, 11)
    : [];


  const filteredExercises = primaryMuscles
    ? exercises?.filter(
      (exercise) =>
        Array.isArray(exercise.primaryMuscles) &&
        primaryMuscles.some((muscle) => exercise.primaryMuscles.includes(muscle))
    ).slice(0, 11)
    : [];
  const exercisesToShow = filteredExercises.length > 0
    ? filteredExercises
    : equipmentExercises.length > 0
      ? equipmentExercises
      : [];

  return (
    <div className="w-full">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{ scrollBehavior: "smooth" }}>
        <style>{`::-webkit-scrollbar { display: none; }`}</style>

        {/* Render BodyParts */}
        {bodyParts?.map((item, index) => (
          <div key={index} itemID={index.toString()} className="mx-2 p-2">
            <BodyPart item={item} />
          </div>
        ))}

        {exercisesToShow.length > 0 ? (
          exercisesToShow.map((updated_ex) => (
            <div key={updated_ex.id || Math.random()} className="md:ml-4 md:mr-4">
              <ExerciseCard
                name={updated_ex.name}
                id={updated_ex.id}
                exercise={updated_ex}
              />
            </div>
          ))
        ) :null}
      </ScrollMenu>
    </div>
  )
}

export default ScrollBar