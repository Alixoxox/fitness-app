import user_db from "../models/user_db.js";
import bcrypt from "bcrypt";
import express from "express";
const router = express.Router();
import { SECRET_KEY } from "../config/dotenv.js";
import jwt from "jsonwebtoken";
router.post("/signup", async (req, res) => {
  const { username, fname, lname, email, password } = req.body;

  // Step 1: Check if the email already exists
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  user_db.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.json({ error: "Database error" });
    }

    if (results.length > 0) {
      // Email already exists
      return res.status(400).json({ error: "Email already in use" });
    }

    // Step 2: Check if the username already exists
    const checkUsernameQuery = "SELECT * FROM users WHERE username = ?";
    user_db.query(checkUsernameQuery, [username], async (err, results) => {
      if (err) {
        console.error("Error checking username:", err);
        return res.json({ error: "Database error" });
      }

      if (results.length > 0) {
        // Username already exists
        return res.status(400).json({ error: "Username already in use" });
      }

      // Step 3: Hash the password
      const hashedpass = await bcrypt.hash(password, 10);

      // Step 4: Insert new user
      const sql =
        "INSERT INTO users (username, fname, lname, email, password,last_login_date) VALUES (?, ?, ?, ?, ?,?)";
      const date = new Date().toLocaleDateString("en-ca");
      user_db.query(
        sql,
        [username, fname, lname, email, hashedpass, date],
        (err, results) => {
          if (err) {
            console.error("Error inserting user:", err);
            return res.json({ error: "Database error" });
          }
          let streak = 1;
          // Step 5: Generate JWT token
          const newUser = {
            id: results.insertId,
            username,
            fname,
            lname,
            email,
            streak,
          };
          const token = jwt.sign(newUser, SECRET_KEY, { expiresIn: "24h" });

          // Step 6: Send response with the token
          res.status(201).json({ message: "User created successfully", token });
        }
      );
    });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  user_db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const user = results[0]; // Get user record from database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const updateSql = `UPDATE users
        SET last_login_date = CURRENT_DATE, streak_count = streak_count + 1
        WHERE username = ?
AND last_login_date = CURDATE() - INTERVAL 1 DAY;`;

      user_db.query(updateSql, [user.username], (err, qres) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Failed to update user data" });
        } else {
          if (qres.affectedRows) {
            user.streak_count += 1;
          }

          const UserData = {
            id: user.id,
            username: user.username,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            streak_count: user.streak_count,
          };
          const token = jwt.sign(UserData, SECRET_KEY, {
            expiresIn: "24h",
          });
          console.log({ UserData, token });
          return res.json({ UserData, token }); // Send only one response
        }
      });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  });
});

export default router;
