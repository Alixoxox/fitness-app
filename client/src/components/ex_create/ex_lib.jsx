import React, { useContext, useState } from 'react'
import { ExerciseContext } from '../../context/Exercisecontent'
import Exerciseitem from './Exerciseitem'
import SearchBar from './searchbar'
import CategorySearch from './CategorySearch'
import { ExercisePlan } from '../../context/exercisePlan'
import { Link } from 'react-router-dom'


const ExLib = () => {
    const { setDays, currentDayIndex } = useContext(ExercisePlan)
    const { bodyParts, exercises } = useContext(ExerciseContext)
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const handleCheckboxChange = (exercise) => {
        setSelectedExercises(prev =>
            prev.includes(exercise)
                ? prev.filter(ex => ex !== exercise) //remove ex
                : [...prev, exercise] //add ex
        );
        addExercise(exercise)
    };

    const addExercise = (exercise) => {
        setDays(prev => {
            const updatedDays = [...prev];
            const currentDay = updatedDays[currentDayIndex];
            const Image = `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[0]}`
            const alreadyExists = currentDay.exercises.some(ex => ex.id === exercise.id);
            const time=7, sets=3, reps=12,restTime=3
            if (alreadyExists) {
                currentDay.exercises = currentDay.exercises.filter(ex => ex.id !== exercise.id);
            } else {
                const exerciseWithImage = { ...exercise, Image ,time,sets,reps,restTime};

                currentDay.exercises.push(exerciseWithImage);
            }
            return updatedDays;
        });
    };


    const handleSearch = (term) => {
        if (term.trim() === "") {
            setSearchResults(exercises);
        } else {
            const filteredExercises = exercises.filter((exercise) =>
                exercise.name.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(filteredExercises);
        }
    };

    const search = (bodypart, equipment) => {
        const filteredExercises = exercises.filter((exercise) => {
            const matchesBodyPart = bodypart
                ? exercise.primaryMuscles.some(muscle => muscle && muscle === bodypart)
                : true; // If no bodypart filter, don't filter by bodypart

            const matchesEquipment = equipment
                ? exercise.equipment && exercise.equipment === equipment
                : true;

            return matchesBodyPart && matchesEquipment;
        });

        setSearchResults(filteredExercises);
    };


    return (
        <div className='shadow-lg p-5'>
            <h1 className='font-bold text-gray-500 text-3xl mb-2'>Exercise Library</h1>
            <SearchBar placeholder="Search items..." onSearch={handleSearch} />
            <span className='text-gray-500 text-md font-bold '>Or Search By</span>
            <CategorySearch bodyParts={bodyParts} onSearch={search} className="mb-3" />
            {(searchResults.length !== 0 ? searchResults : exercises).slice(0, 30).map((exercise, index) => (
                <div className='flex flex-row justify-between' key={index} >
                    <Link to={`../tutorials/exercise/${exercise.id}`}> 
                    <Exerciseitem exercise={exercise} id={exercise.id} />
                    </Link>
                    <input
                        type="checkbox"
                        checked={selectedExercises.includes(exercise)}
                        onChange={() => handleCheckboxChange(exercise)}
                    />
                </div>
            ))}
        </div>
    );
};

export default ExLib;
