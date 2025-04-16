import { fetchworkoutsession } from "./fetch";
export const addExercise = async (exname, category, sets, reps, weight, duration, caloriesBurned) => {
    if (![exname, category, sets, reps, weight, duration].every(val => val)) { 
        return "You must fill in the required details in function"; 
    }

    const token = localStorage.getItem("authtoken");
    if (!token) return "You must be Logged in to add additional exercises";

    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
        session_id = await fetchworkoutsession(new Date().toLocaleDateString('en-CA'));
    }
    
    const durationNum = parseFloat(duration)||0;//extracts the number ignore letter
    console.log('Starting calorie calculation');

    if (!caloriesBurned) {
        const strengthTrainingMETs = {
            quadriceps: 5, shoulders: 4.5, abdominals: 3.8, chest: 5, hamstrings: 4.8, legs: 5, 
            triceps: 3.5, biceps: 3.5, lats: 5, "middle back": 4.8, core: 4, calves: 4, 
            "lower back": 4.2, forearms: 3.2, glutes: 4.5, traps: 4.5, adductors: 4, abductors: 4, neck: 3
        };
    
        const cardioMETs = {
            "walking (slow)": 2.5, "walking (moderate)": 3.8, "walking (fast)": 5, "running (slow)": 8, 
            "running (moderate)": 10, "running (fast)": 12, "jump rope": 12, "cycling (slow)": 4, 
            "cycling (moderate)": 8, "cycling (fast)": 10, "rowing (moderate)": 7, "rowing (intense)": 12, 
            "jumping jacks": 8, "burpees": 10
        };
    
        const sportsMETs = {
            basketball: 6.5, football: 7, "tennis (singles)": 7.3, "tennis (doubles)": 5, 
            "boxing (sparring)": 10, "martial Arts": 10, "swimming (leisure)": 6, "swimming (intense)": 10
        };   

        let metValue = 3.0;

        for (const key in strengthTrainingMETs) {
            if (category.toLowerCase().includes(key)) {
                metValue = strengthTrainingMETs[key];
                break;
            }
        }
        if (metValue === 3.0) {
            for (const key in cardioMETs) {
                if (category.toLowerCase().includes(key)) {
                    metValue = cardioMETs[key];
                    break;
                }
            }
        }
        if (metValue === 3.0) {
            for (const key in sportsMETs) {
                if (category.toLowerCase().includes(key)) {
                    metValue = sportsMETs[key];
                    break;
                }
            }
        }
        if (!isNaN(durationNum) && durationNum > 0) {
            caloriesBurned = metValue * 75 * (durationNum / 60);
        } else {
            caloriesBurned = 0;  // Default to 0 if duration is invalid
        }
    }

    console.log("Calories Burned:", caloriesBurned);

    const response = await fetch('http://localhost:5000/api/exercise/new', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.trim().replace(/^"|"$/g, "")}`
        },
        body: JSON.stringify({ session_id: session_id, name: exname, category: category, sets: sets, reps: reps, weight: weight, duration: durationNum, caloriesBurned: caloriesBurned })});

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
    
};
