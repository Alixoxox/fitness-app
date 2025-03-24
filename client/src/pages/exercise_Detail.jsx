import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ExerciseContext } from '../context/Exercisecontent'
import Details from '../components/tutorials_comp/exer_Details/Details'
import SimilarExercises from '../components/tutorials_comp/exer_Details/SimilarEx'
import ErrorBoundary from '../pages/utils/ErrorBoundary'

const exercise_D = () => {
  const { setexerciseDetail, exercises, exerciseDetail } = useContext(ExerciseContext)
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const DetailedexData = exercises.find((ex) => ex.id === id);
      if (DetailedexData) {
        setexerciseDetail(DetailedexData);
      }
    };
  
    fetchDetails();
  }, [id]);

  return (
    <div>
      <ErrorBoundary>
        <Details exerciseDetail={exerciseDetail} />
        <SimilarExercises exerciseDetail={exerciseDetail} />
      </ErrorBoundary>

    </div>
  )
}

export default exercise_D
