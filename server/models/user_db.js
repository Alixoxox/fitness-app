import mysql from "mysql2";
import {
  DB_HOST,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_USER,
} from "../config/dotenv.js";

const user_db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

user_db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database for users!");
});
const sql = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  last_login_date DATE NOT NULL,
  streak_count INT DEFAULT 0
);`;

user_db.query(sql, (error, result) => {
  if (error) {
    console.log("something wen wrong while creating table", error);
  }
});

export default user_db;
