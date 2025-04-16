import workout_plans from '../models/workout_plans.js'
import express from "express";
import { authenicate } from "../middleware/authenicate.js";

const router=express.Router()


router.post('/NewPlan',authenicate,(req,res)=>{
    try{
        const {planName,focus,level,dayTag,progduraion,planDescription}=req.body
        const user_id = req.user.id;
        const sql=`INSERT INTO workout_plans (user_id,day_tag,focus,level,plan_description,plan_name,prog_duration) VALUES (?,?,?,?,?,?,?)`
        workout_plans.query(sql,[user_id,dayTag,focus,level,planDescription,planName,progduraion],(err,qres)=>{
            if(err){
                console.log(err)
                return res.json({ message: "Database error" });
            }
            res.json({message:"success",workout_plan_id:qres.insertId})
        })
    }catch(error){
        console.log(error)
    }
})



export default router