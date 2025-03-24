import React,{useContext} from 'react';

import HorizontalScrolBar from './SrollBar';
import { ExerciseContext } from "../../../context/Exercisecontent";


const SearchExe = () => {
    const { exercises,searchState, setsearchState, setExercise,bodyParts} = useContext(ExerciseContext);

    const handleSearch = (event) => {
        event.preventDefault(); // Prevents page reload
    
        if (searchState.trim()) {
            const searchLower = searchState.toLowerCase();
    
            console.log('Search State:', searchLower); // Log the search term
    
            const searchResults = exercises.filter(exercise =>
                // Checking for the search term in the exercise name, muscles, level, force, or category
                exercise.name.toLowerCase().includes(searchLower) ||
                exercise.primaryMuscles?.some(muscle => muscle.toLowerCase().includes(searchLower)) ||
                exercise.secondaryMuscles?.some(muscle => muscle.toLowerCase().includes(searchLower)) ||
                exercise.level?.toLowerCase().includes(searchLower) ||
                exercise.force?.toLowerCase().includes(searchLower) ||
                exercise.category?.toLowerCase().includes(searchLower)
            );
    
            console.log('Exercises searched:', searchResults);
            setExercise(searchResults); // ✅ Update exercises correctly
            setsearchState(''); // ✅ Reset search state after search
        }
    }
    return (
        <div className="flex flex-col items-center text-center w-full p-4">
            <p className="text-4xl text-gray-700 font-bold mb-5 p-3">
                Awesome Exercises <br /> You Should Know
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center justify-center w-full max-w-2xl space-x-3">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        id="simple-search"
                        className="w-full flex-grow bg-gray-200 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 pl-10"
                        value={searchState}
                        onChange={(e) => setsearchState(e.target.value.toLowerCase())}
                        placeholder="Enter Exercise name..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    Search
                </button>
            </form>
        <br /><br />
            <HorizontalScrolBar bodyParts={bodyParts} />
        </div>
    );
};

export default SearchExe;
