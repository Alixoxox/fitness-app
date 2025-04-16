import mysql from "mysql2";
import {
  DB_HOST,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_USER,
} from "../config/dotenv.js";

const workout_session = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

workout_session.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database for workouts session!");
});

const sql = `CREATE TABLE IF NOT EXISTS workout_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  session_date DATE NOT NULL DEFAULT (CURRENT_DATE),
  workout_name VARCHAR(50) NOT NULL,  
  completed BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`;

workout_session.query(sql, (err, result) => {
  if (err) {
    console.log("smthng went wrong in the workout.js", err);
  }
});

export default workout_session;
