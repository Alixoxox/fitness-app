import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ExerciseContext } from '../context/Exercisecontent'
import Details from '../components/tutorials_comp/exer_Details/Details'
import SimilarExercises from '../components/tutorials_comp/exer_Details/SimilarEx'
import ErrorBoundary from '../pages/utils/ErrorBoundary'

const exercise_D = () => {
  const { setexerciseDetail, exercises, exerciseDetail ,setExercises} = useContext(ExerciseContext)
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails =async ()=>{

      let DetailedexData;
      if (exercises && exercises.length > 0) {
        DetailedexData = exercises.find((ex) => ex.id === id);
      }
      
      if(!DetailedexData){
        try{
          let response=await fetch(`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json`)
          if(response.ok){
            response = await response.json();
            setExercises(response)
            DetailedexData = response.find((ex) => ex.id === id);
          }
        }catch(err){
          console.log(err)
        }
      }
      setexerciseDetail(DetailedexData);
    }
    fetchDetails();
  }, [id,exercises,exerciseDetail]);

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
