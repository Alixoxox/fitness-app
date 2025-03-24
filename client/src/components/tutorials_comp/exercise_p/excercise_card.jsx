import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ExerciseCard = ({ name, id, exercise, scrolling }) => {
  const fallbackImg =
    'https://media.istockphoto.com/vectors/no-image-available-sign-vector-id1138179183?k=6&m=1138179183&s=612x612&w=0&h=prMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE=';

  // Image array (cycling between these images)
  const staticImages = [
    `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${id}/0.jpg`,
    `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${id}/1.jpg`,
  ];

  const [currentImage, setCurrentImage] = useState(staticImages[0]);
  const cardRef = useRef(null);
  const intervalRef = useRef(null);
  const imageIndex = useRef(0); // Stores current image index

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.3 } // Trigger when 30% visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, []);

  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      imageIndex.current = (imageIndex.current + 1) % staticImages.length;
      setCurrentImage(staticImages[imageIndex.current]);
    }, 450); // Change every 300ms
  };

  const stopAnimation = () => {
    clearInterval(intervalRef.current);
    setCurrentImage(staticImages[0]); // Reset to first image
  };

  return (
    <div className='hover:scale-105 transition-transform duration-300 mt-3 min-w-52 md:min-w-80 lg:min-w-110'>
      <Link to={`../tutorials/exercise/${id}`} ref={cardRef} className="hover:cursor-pointer transition-transform duration-300  box-border "     onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)} >
        <img
          src={currentImage || fallbackImg}
          alt={name}
          className="w-[90%] max-h-[36vh] mx-auto rounded-lg object-cover transition-transform duration-300 ease-in-out"
          loading="lazy"
          onError={(e) => (e.target.src = fallbackImg)}
        />
        <div className="flex flex-wrap gap-1 mt-2 ml-10">
          {exercise.primaryMuscles && (
            <button className="px-2 py-[2px] text-xs bg-red-300 hover:bg-red-400 text-gray-800 rounded shadow-sm capitalize">
              {exercise.primaryMuscles}
            </button>
          )}

          {scrolling && (exercise.category && (
            <button className="px-2 py-[2px] text-xs bg-blue-300 hover:bg-blue-400 text-gray-800 rounded shadow-sm capitalize">
              {exercise.category}
            </button>
          ))}


          {scrolling && (exercise.level && (
            <button className="px-2 py-[2px] text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 rounded shadow-sm capitalize">
              {exercise.level}
            </button>
          ))}

          {Array.isArray(exercise.secondaryMuscles)
            ? exercise.secondaryMuscles.map((muscle, index) => (
              <button
                key={index}
                className="px-2 py-[2px] text-xs bg-red-300 hover:bg-red-400 text-gray-800 rounded shadow-sm capitalize"
              >
                {muscle}
              </button>
            ))
            : exercise.secondaryMuscles && (
              <button className="px-2 py-[2px] text-xs bg-red-300 hover:bg-red-400 text-gray-800 rounded shadow-sm capitalize">
                {exercise.secondaryMuscles}
              </button>
            )}
        </div>


        <p className="text-lg text-center font-bold mt-2 capitalize">{name}</p>
      </Link>
    </div>


  );
};

export default ExerciseCard;
