import React, { useState, useEffect, useRef } from 'react';
import levelimg from '../../../assets/icons/icons8-level-50.png'
import targetimg from '../../../assets/icons/target.png'
import bodypartimg from '../../../assets/icons/body-part.png'
import equipmnetimg from '../../../assets/icons/equipment.png'
import categoryimg from '../../../assets/icons/category.png'
const Details = ({ exerciseDetail }) => {

    if (!exerciseDetail) {
        return <div>No data found</div>
    }

    // Fallback image
    const fallbackImg =
        'https://media.istockphoto.com/vectors/no-image-available-sign-vector-id1138179183?k=6&m=1138179183&s=612x612&w=0&h=prMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE=';

    // Image state & refs
    const [currentImage, setCurrentImage] = useState('');
    const intervalRef = useRef(null);
    const imageIndex = useRef(0);
    const cardRef = useRef(null);

    useEffect(() => {
        // Stop previous interval when exercise changes
        clearInterval(intervalRef.current);

        // Update staticImages based on new exercise
        const staticImages = [
            `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exerciseDetail.id}/0.jpg`,
            `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exerciseDetail.id}/1.jpg`,
        ];

        setCurrentImage(staticImages[0]); // Reset to first image
        imageIndex.current = 0;

        // Start observer for animation
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    startAnimation(staticImages);
                } else {
                    stopAnimation(staticImages);
                }
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            observer.disconnect();
            stopAnimation();
        };
    }, [exerciseDetail]); // ✅ Restart animation when new exercise loads

    const startAnimation = (staticImages) => {
        intervalRef.current = setInterval(() => {
            imageIndex.current = (imageIndex.current + 1) % staticImages.length;
            setCurrentImage(staticImages[imageIndex.current]);
        }, 450); // Switch every 450ms
    };

    const stopAnimation = () => {
        clearInterval(intervalRef.current);
    };

    return (
        <section className="text-gray-600 body-font overflow-hidden flex justify-around">
            <div
                className="container mx-auto flex px-5 py-5 items-start justify-around flex-col lg:flex-row  mt-3"
                ref={cardRef} 
            >   <div>
                
            </div>
                
                <img
                    className="xl:w-6/6 lg:w-3/6 md:w-5/6 w-full mx-auto mb-5 object-cover object-center rounded-lg lg:mt-2 lg:ml-3 "
                    src={currentImage || fallbackImg}
                    alt={exerciseDetail.name}
                    loading='lazy'
                    onError={(e) => (e.target.src = fallbackImg)}
                />
                <div className="text-center lg:w-2/3 w-full flex flex-col items-center lg:ml-8 lg:mr-8">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900  mt-9 lg:mb-8">
                        {exerciseDetail.name}
                    </h1>
                    <p className="mb-4 leading-relaxed">{exerciseDetail.instructions}</p>

                    <div className="flex flex-col items-start space-y-2 mt-2 capitalize">

                        <div className="flex items-center space-x-2">
                            <button className="w-14 text-gray-700 bg-teal-50 border-0 py-2 px-4 focus:outline-none hover:bg-teal-100 rounded-lg mr-3">
                                <img src={levelimg} alt="equipment" />
                            </button>
                            <span className="text-gray-700">{exerciseDetail.level}</span>
                        </div>

                        {exerciseDetail.secondaryMuscles &&
                            (<div className="flex items-center space-x-2">
                                <button className="w-16 text-white bg-teal-50 border-0 py-1 px-4 focus:outline-none hover:bg-teal-100 rounded-lg">
                                    <img src={targetimg} alt="target" />
                                </button>
                                {(exerciseDetail.primaryMuscles).map((item, index) => (

                                    <span key={index}>{item}</span> // Renders each muscle name
                                ))}
                            </div>)}

                        {exerciseDetail.secondaryMuscles && exerciseDetail.secondaryMuscles.length > 0 &&
                            (<div className="flex items-center space-x-2">
                                <button className="w-16 text-gray-700 bg-teal-50 border-0 py-2 px-4 focus:outline-none hover:bg-teal-100 rounded-lg">
                                    <img src={bodypartimg} alt="body part" />
                                </button>
                                <span className="text-gray-700">{(exerciseDetail.secondaryMuscles).map((item, index) => (
                                    <span key={index}>{index > 0 ? `, ${item}` : item}</span> // Renders each muscle name
                                ))}</span>
                            </div>)}

                        {exerciseDetail.equipment &&
                            (<div className="flex items-center space-x-2">
                                <button className="w-16 text-gray-700 bg-teal-50 border-0 py-2 px-4 focus:outline-none hover:bg-teal-100 rounded-lg">
                                    <img src={equipmnetimg} alt="equipment" />
                                </button>
                                <span className="text-gray-700">{exerciseDetail.equipment}</span>
                            </div>)}
                        
                        {exerciseDetail.equipment &&
                        (<div className="flex items-center space-x-2">
                            <button className="w-14 text-gray-700 bg-teal-50 border-0 py-2 px-4 focus:outline-none hover:bg-teal-100 rounded-lg mr-3">
                                <img src={categoryimg} alt="equipment" />
                            </button>
                            <span className="text-gray-700">{exerciseDetail.category}</span>
                        </div>)}

                    </div>

                </div>
            </div>
        </section>


    );
}
export default Details;
