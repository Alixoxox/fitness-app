import React from 'react'

import ScrollBar from '../exercise_p/SrollBar'
import ErrorBoundary from '../../../pages/utils/ErrorBoundary'

const SimilarEx = ({ exerciseDetail }) => {

  return (
    <div>
      <ErrorBoundary>
        <div className='mt-2  text-gray-600 body-font overflow-hidden capitalize'>
          <h3 className="block md:ml-4 ml-4 title-font sm:text-3xl text-2xl mb-4  font-bold mt-3 justify-start" >Exercises that target the {exerciseDetail.primaryMuscles}</h3>
          <div className='box-border ml-2 mr-2 p-2'>{exerciseDetail?.primaryMuscles && <ScrollBar primaryMuscles={exerciseDetail.primaryMuscles} />}</div>
          {exerciseDetail.equipment && (
            <>
              <h3 className="block md:ml-4 ml-4 title-font sm:text-3xl text-2xl mb-4 font-bold mt-4 justify-start">
                Exercises that use the same equipment
              </h3>
              <div className="box-border ml-2 mr-2 p-2">
                <ScrollBar equipment={exerciseDetail.equipment} />
              </div>
            </>
          )}
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default SimilarEx
