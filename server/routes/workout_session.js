import { Router } from "express";
import workout_session_db from "../models/workouts_session.js";
import { authenicate } from "../middleware/authenicate.js";
const router = Router();

//fetch session id + rest of data
router.post("/data/workout", authenicate, async (req, res) => {
  try {
    const user_id = req.user?.id; // ✅ Ensure `user_id` is accessible
    const { Date_search } = req.body;
    console.log("entered the workout_session function");
    if (!user_id) {
      return res.status(400).json({ error: "User ID not found in token" });
    }
    const sql = `SELECT id FROM workout_sessions WHERE user_id = ? AND session_date=?`;
    workout_session_db.query(sql, [user_id, Date_search], (err, result) => {
      if (!result || result.length === 0) {
        res.json({ session_id: null });
      } else {
        res.json({ session_id: result.length > 0 ? result[0].id : null });
      }
    });
  } catch (err) {
    console.error("Error fetching workout session:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create a new workout holder or session id
router.post("/workout/new", authenicate, (req, res) => {
  const user = req.user.id;
  const { workout_name } = req.body;
  const sql = `INSERT INTO workout_sessions (user_id, session_date,workout_name) VALUES(?,?,?)`;
  const date = new Date().toLocaleDateString("en-CA");
  workout_session_db.query(
    sql,
    [user, date, workout_name || "Demo session"],
    (error, result) => {
      if (error) {
        console.log("Caught error post of workout_session", error);
        res.status(500).json({ error: error.message });
      }
      req.user = user;
      res.json({ session_id: result.insertId });
    }
  );
});
export default router;
