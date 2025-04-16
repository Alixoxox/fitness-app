import mysql from "mysql2";
import {
  DB_HOST,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_USER,
} from "../config/dotenv.js";

const Plans_db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

Plans_db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database for Workout Plans!");
});

const sql=`
CREATE TABLE IF NOT EXISTS workout_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    day_tag VARCHAR(10) NOT NULL,  -- e.g. 'Day 1', 'Day 2'
    focus VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    plan_description TEXT,
    plan_name VARCHAR(100),
    prog_duration INT, -- in days
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );`
Plans_db.query(sql,(err,res)=>{
    if (err) {
        console.log("something wen wrong while creating table", error);
      }
})

export default Plans_db