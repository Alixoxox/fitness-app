import React from 'react'
import hourglass from '../../assets/icons/hourglass.png'
import kettlebel from '../../assets/icons/kettlebell.png'
import sets from '../../assets/icons/sets.png'
const workoutcard = ({ data }) => {

    return (
        <div key={data.id} className='shadow-sm p-3  flex flex-col  overflow-hidden rounded-sm ms-1 '>
            <span className='bg-blue-100 text-blue-600 w-23 rounded-lg px-1'> #{data.category || "other"}</span>
            <h1 className='text-xl font-semibold mt-2 text-gray-700'>{data.name}</h1>
            <div className='flex mt-3 mb-4 '><img src={sets} laoding='lazy' className='h-5 mr-3' /><div className='flex'><span className=' mr-2' >Count:</span><span>{data.sets} sets x {data.reps} reps</span></div></div>

            <div className='flex justify-between'><div className='flex'><img src={kettlebel} loading='lazy' className='h-5 mr-2' /><span>{data.weight}</span></div>  <div className='flex'><img src={hourglass} loading='lazy' className='leading-none h-5 mr-2' /> <span>{data.duration}</span></div></div>


        </div>
    )
}

export default workoutcard
