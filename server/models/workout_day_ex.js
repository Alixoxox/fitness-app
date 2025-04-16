import mysql from "mysql2";
import {
  DB_HOST,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_USER,
} from "../config/dotenv.js";

const workout_day_ex = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

workout_day_ex.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database for workouts day exercises!");
});

//exercises enterd by user
const sql=`CREATE TABLE IF NOT EXISTS workout_day_exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workout_plan_id INT NOT NULL,  -- The plan that this workout day belongs to
    session_id INT NOT NULL,  -- Link to the workout session
    exercise_id INT NOT NULL,  -- Links to the specific exercise in that session
    completed BOOLEAN DEFAULT FALSE,  -- To track if the exercise has been completed
    DayNo INT NOT NULL,
    FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES workout_exercises(id) ON DELETE CASCADE
  );`

workout_day_ex.query(sql,(err,res)=>{
    if(err){
        console.log("Error encountered",err)
    }
})

export default workout_day_ex