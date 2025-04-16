import React from 'react'

const Exerciseitem = ({exercise}) => {
  const images = `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[0]}`; 
  return (
    <div className='flex flex-row justify-center items-center gap-2 mt-3 mb-2'>
      <img src={images} className='rounded-full h-16 w-16' alt="" />
      <span className='text-gray-600 text-lg font-bold'>{exercise.name}</span>
    </div>
  )
}

export default Exerciseitem
