import React, { useContext, useState } from 'react';
import { ExerciseContext } from "../../../context/Exercisecontent";
import Exercise_card from "./excercise_card";

const Exercise = () => {
  const { exercises, exercise} = useContext(ExerciseContext);
  
  //pagination

  const [page, setPage] = useState(0);
  const itemsPerPage = 12;

  if (!exercises || exercises.length === 0) {
    return <p>Loading or No Exercises Found</p>;
  }

  const display_ex = exercise || exercises;
  const totalPages = Math.ceil(display_ex.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };



  return (
    <div id="Exercises" className="mt-5 p-5">
      <h3 className="mb-4 text-3xl text-gray-700 font-bold">Showing Results</h3>

      {/* Exercise Cards */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 xl:gap-8 w-full">
          {display_ex
            .filter(exercise => exercise.id !== "Alternating_Cable_Shoulder_Press")
            .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
            .map((exercise) => (
              <div key={exercise.id} className="md:ml-4 md:mr-4">
                <Exercise_card 
                  name={exercise.name} 
                  id={exercise.id} 
                  image={exercise.images} 
                  exercise={exercise} 
                  scrolling={'no'}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-3">
        <button 
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
        >
          Prev
        </button>

        <span className="px-4 py-1">{page + 1} / {totalPages}</span>

        <button 
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => handlePageChange(page + 1)}
          disabled={page + 1 === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Exercise;
