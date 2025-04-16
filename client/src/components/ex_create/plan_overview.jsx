import React, { useContext, useEffect } from 'react'
import banner from '../../assets/images/create_ex.jpg'
import { ExercisePlan } from '../../context/exercisePlan'
const plan_overview = () => {
    const { planName, setPlanDescription, setPlanName, setFocus, setLevel, setDayTag, focus, level, dayTag, planDescription, setProgduration, progduraion, setPlanData,PlanData } = useContext(ExercisePlan)

    useEffect(() => {
        setPlanData({ planName, focus, level, dayTag, progduraion, planDescription });
        console.log(PlanData)
    }, [planName, focus, level, dayTag, progduraion, planDescription]);
   
    return (
        <div className='shadow-lg p-5'>
            <div className=" rounded-xl overflow-hidden mb-3 leading-none p-0">
                <img src={banner} className='p-0 leading-none' />
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block mb-2">Plan Name</label>
                    <input
                        type="text"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div>
                    <label className="block mb-2">Focus</label>
                    <div className="flex flex-wrap gap-2">
                        <button
                            className={`px-4 py-2 rounded-lg ${focus === 'Maintaining' ? 'bg-black text-white' : 'border border-gray-300'}`}
                            onClick={() => setFocus('Maintaining')}
                        >
                            Maintaining
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${focus === 'Bulking' ? 'bg-black text-white' : 'border border-gray-300'}`}
                            onClick={() => setFocus('Bulking')}
                        >
                            Bulking
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${focus === 'Cutting' ? 'bg-black text-white' : 'border border-gray-300'}`}
                            onClick={() => setFocus('Cutting')}
                        >
                            Cutting
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${focus === 'Sport Specific' ? 'bg-black text-white' : 'border border-gray-300'}`}
                            onClick={() => setFocus('Sport Specific')}
                        >
                            Sport Specific
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block mb-2">Level</label>
                    <div className="flex flex-wrap gap-2">
                        <button
                            className={`px-4 py-2 rounded-lg ${level === 'Beginner' ? 'bg-black text-white' : 'border border-gray-300'}`}
                            onClick={() => setLevel('Beginner')}
                        >
                            Beginner
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${level === 'Intermediate' ? 'bg-black text-white' : 'border border-gray-300'}`}
                            onClick={() => setLevel('Intermediate')}
                        >
                            Intermediate
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${level === 'Advanced' ? 'bg-black text-white' : 'border  border-gray-300'}`}
                            onClick={() => setLevel('Advanced')}
                        >
                            Advanced
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block mb-2">Day Tag</label>
                    <div className="flex flex-wrap gap-2">
                        <button
                            className={`px-4 py-2 rounded-lg ${dayTag === 'Weekday' ? 'bg-black text-white' : 'border border-gray-300'}`}
                            onClick={() => setDayTag('Weekday')}
                        >
                            Weekday
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${dayTag === 'Weekend' ? 'bg-black text-white' : 'border border-gray-300'}`}
                            onClick={() => setDayTag('Weekend')}
                        >
                            Weekend
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block mb-2">Program Duration</label>
                    <div className="flex flex-wrap gap-2">
                        <button
                            className={`px-4 py-2 rounded-lg ${progduraion === 3 ? 'bg-black text-white' : 'border border-gray-300'}`}
                            onClick={() => setProgduration(3)}
                        >
                            3 - Months
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${progduraion === 6 ? 'bg-black text-white' : 'border border-gray-300'}`}
                            onClick={() => setProgduration(6)}
                        >
                            6 - Months
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block mb-2">Plan Description</label>
                    <textarea
                        value={planDescription}
                        onChange={(e) => setPlanDescription(e.target.value)}
                        className="w-full border rounded-lg p-2 h-32"
                        placeholder="Add workout plan description"
                    />
                </div>
            </div>
        </div>
    )
}

export default plan_overview
