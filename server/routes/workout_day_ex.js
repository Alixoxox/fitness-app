import workout_day_ex from '../models/workout_day_ex.js';
import express from "express";
import { authenicate } from "../middleware/authenicate.js";
import workout_ex from '../models/workout_ex.js';
import workout_plans from '../models/workout_plans.js';

const router = express.Router();

router.post('/PlanExercises', authenicate, (req, res) => {
    const user_id = req.user.id;
    let { days, workout_plan_id, session_id } = req.body;
    workout_plan_id = parseInt(workout_plan_id);

    // If workout_plan_id is not provided, fetch it from the database
    if (!workout_plan_id) {
        console.error('Missing workoutPlanId before inserting!');
        const planIdQuery = `SELECT id FROM workout_plans WHERE user_id = ? ORDER BY id DESC LIMIT 1`;

        workout_plans.query(planIdQuery, [user_id], (err, qres) => {
            if (err) {
                console.error("Error fetching workout plan ID:", err);
                return res.status(500).json({ error: 'Failed to fetch workout plan ID' });
            }

            if (qres.length > 0) {
                workout_plan_id = qres[0].id;
                console.log('Fetched workout_plan_id:', workout_plan_id);
            } else {
                return res.status(404).json({ error: 'Workout plan not found' });
            }

            // Continue with the exercises after workout_plan_id is fetched
            processExercises(days, workout_plan_id, session_id, res);
        });
    } else {
        // Continue with the exercises if workout_plan_id is provided
        processExercises(days, workout_plan_id, session_id, res);
    }
});

const processExercises = (days, workout_plan_id, session_id, res) => {
    // Loop through the days and exercises to insert them into the DB
    days.forEach(day => {
        const { name,exercises } = day;
        let DayNo=name
        exercises.forEach((ex) => {
            const { Image, name, category, sets, reps, weight, duration } = ex;
            const calsBurned=calcCalories(category,duration)
            // Step 1: Check if exercise already exists
            const checkExQuery = `SELECT id FROM workout_exercises WHERE session_id = ? AND NAME = ? LIMIT 1`;

            workout_ex.query(checkExQuery, [session_id, name], (err, results) => {
                if (err) {
                    console.error("Error checking for existing exercise:", err);
                    return;
                }

                if (results.length > 0) {
                    // Exercise already exists, use the existing exercise_id
                    const exercise_id = results[0].id;
                    console.log("Exercise exists. Using exercise_id:", exercise_id);

                    // Step 2: Insert into `workout_day_exercises` to link it to the day
                    const insertDayExerciseQuery = `
                        INSERT INTO workout_day_exercises (workout_plan_id, session_id, exercise_id,DayNo) 
                        VALUES (?, ?, ?)`;

                    workout_day_ex.query(insertDayExerciseQuery, [workout_plan_id, session_id, exercise_id,DayNo], (err) => {
                        if (err) {
                            console.error("Error linking exercise to workout day:", err);
                        } else {
                            console.log("Exercise linked to workout day successfully");
                        }
                    });
                } else {
                    // Exercise doesn't exist, insert it
                    const insertExerciseQuery = `
                        INSERT INTO workout_exercises (session_id, name, category, sets, reps, weight, duration, calories_burned,completed, Image_url) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?) 
                        ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`;

                    workout_ex.query(insertExerciseQuery, [session_id, name, category, sets, reps, weight || 0, duration || 0,calsBurned, false, Image], (err, qres) => {
                        if (err) {
                            console.error("Error inserting exercise:", err);
                            return;
                        }
                        const exercise_id = qres.insertId;
                        console.log("Exercise inserted. New exercise_id:", exercise_id);

                        // Step 2: Insert into `workout_day_exercises` to link it to the day
                        const insertDayExerciseQuery = `
                            INSERT INTO workout_day_exercises (workout_plan_id, session_id, exercise_id,DayNo)
                            VALUES (?, ?, ?)`;

                        workout_day_ex.query(insertDayExerciseQuery, [workout_plan_id, session_id, exercise_id,DayNo], (err) => {
                            if (err) {
                                console.error("Error linking exercise to workout day:", err);
                            } else {
                                console.log("Exercise linked to workout day successfully!");
                            }
                        });
                    });
                }
            });
        });
    });

    // Send a success response after all exercises have been processed
    res.status(200).json({ message: 'Exercises successfully added to workout plan' });
};


const calcCalories=( category, duration)=>{
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
    if (!isNaN(duration) && duration > 0) {
       return metValue * 75 * (duration / 60);
    } else {
       return 0;  // Default to 0 if duration is invalid
    }
   
}


export default router;
