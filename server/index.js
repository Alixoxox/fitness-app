import { PORT } from "./config/dotenv.js";
import express from "express";
import cors from "cors";
import workoutsessionRouter from "./routes/workout_session.js";
import workoutexerciseRouter from "./routes/workout_ex.js";
import userRoutes from "./routes/user.js";
import WorkoutPlansRoute from './routes/workout_plans.js'
import WorkoutPlanExRoute from './routes/workout_day_ex.js'
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api", workoutsessionRouter);
app.use("/api", workoutexerciseRouter);
app.use('/api',WorkoutPlansRoute);
app.use('/api',WorkoutPlanExRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
