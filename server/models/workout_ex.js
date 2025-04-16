import mysql from "mysql2";
import {
  DB_HOST,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_USER,
} from "../config/dotenv.js";

const workout_ex = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

workout_ex.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database for workouts exercises!");
});
 
//exercise library
const sql = `CREATE TABLE IF NOT EXISTS workout_exercises (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  category VARCHAR(30) NOT NULL,
  sets INT NOT NULL,
  reps VARCHAR(10) NOT NULL,
  weight VARCHAR(20) NOT NULL,
  duration VARCHAR(20) NOT NULL,
  calories_burned INT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  Image_url VARCHAR(255),
  FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE
);`;
workout_ex.query(sql, (error, result) => {
  if (error) {
    console.log("something wen wrong while creating table", error);
  }
});

export default workout_ex;
