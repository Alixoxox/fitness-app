import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/home.jsx';
import Dashboard from './pages/dashboard.jsx';
import Navbar from "./components/Navbar.jsx";
import Tutorials from "./pages/tutorials.jsx";
import Workout_history from './pages/exercise_history.jsx'
import Create_plan from './pages/create_plan.jsx'
import "./App.css";
import { ExerciseProvider } from "./context/Exercisecontent.jsx";
import Exercise_D from "./pages/exercise_Detail.jsx";
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import { UserContextProvider } from './context/usercontext.jsx'
import WorkoutContextProvider from "./context/exercisetrain.jsx";
import ExercisePlanProvider from "./context/exercisePlan.jsx";
function App() {
  return (
    <UserContextProvider>
      <WorkoutContextProvider>
        <ExerciseProvider>
          <ExercisePlanProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/tutorials/exercise/:id" element={<Exercise_D />} />
              <Route path='/workout/create' element={<Create_plan />} />
              <Route path='/workout/history' element={<Workout_history />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<Home />} /> {/*change element to account*/}
            </Routes>
          </BrowserRouter>
          </ExercisePlanProvider>
        </ExerciseProvider>
      </WorkoutContextProvider>
    </UserContextProvider>
  );
}

export default App;