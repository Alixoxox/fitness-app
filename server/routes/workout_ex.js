import workout_ex_db from "../models/workout_ex.js";
import express from "express";
import { authenicate } from "../middleware/authenicate.js";

const router=express.Router()
//fetch exercise data
router.post('/data/exercise',authenicate,(req,res)=>{
    const {session_id}=req.body

    if (!session_id) {
        return res.status(400).json({ message: "Missing session_id" });
    }
    const sql=`SELECT * FROM workout_exercises WHERE session_id=?`;
    workout_ex_db.query(sql,[session_id],(error,result)=>{
        if (error) {
            return res.status(500).json({ message: "Error while fetching data", error });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Session not found" });
        }
        
        res.json(result);
    });
});

   
//post exercise data or add exercise to workout
router.post('/exercise/new',authenicate,(req,res)=>{
   try{
    console.log("entered add workout func")
    const{session_id,name,category,sets,reps,weight,duration,caloriesBurned}=req.body // dont need user id front end instead need session id accuired by first fetch it
    if (!session_id || !name || !category) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const sql=`INSERT INTO workout_exercises (session_id, name, category, sets, reps, weight, duration, calories_burned) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    console.log("Executing SQL:", sql);
console.log("With Values:", [session_id, name, category, sets, reps, weight, duration, caloriesBurned]);
    workout_ex_db.query(sql,[session_id,name,category,sets,reps,weight,duration,caloriesBurned],(error,result)=>{
        if(error){
            res.json({message:"error encountered fetching check if session_id is accurate"})
        }
       res.json(result)
      
    });
    }
    catch(error){
        console.error("Server error:", error.message);
        res.status(500).json({ message: "Internal server error." });
   }
})
router.post('/data/calsburned',async(req,res)=>{
    try{
        const {session_id}=req.body
        const sql=`SELECT calories_burned from workout_exercises WHERE session_id=?`
        workout_ex_db.query(sql,[session_id],async(err,qres)=>{
            if(err){
                console.log(err)
            }
            if (!qres || !Array.isArray(qres)) {
                return res.json({ totalCaloriesBurned: 0 }); // Default value if no data
            }
        
            const total =  qres.reduce((sum, cals) => sum + (cals.calories_burned || 0), 0)
          
            res.json({ totalCalories: total });
        })
    }catch(error){
        console.log(error)
    }
})

router.post('/data/categories',authenicate,(req,res)=>{
    const {session_id}=req.body
    console.log(session_id)
    const sql=`SELECT category FROM my_local_db.workout_exercises WHERE session_id=?;`
    
    workout_ex_db.query(sql,[session_id],(err,qres)=>{
        if(err){
            console.log(err)
        }
        if (!qres || !Array.isArray(qres) || qres.length===0) {
            return res.json( {data:[{category:'all' }]}); // Default value if no data
        }
        console.log(qres)
        res.json({data:qres});
    })
    })


export default router;