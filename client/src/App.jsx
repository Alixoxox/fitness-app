import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/home.jsx';
import Dashboard from './pages/dashboard.jsx';
import Exercise_workout from './pages/exercise_train.jsx';
import Navbar from "./components/Navbar.jsx";
import Tutorials from "./pages/tutorials.jsx";
import Workout_history from './pages/exercise_history.jsx'
import Workout_discover from './pages/exercise_plans.jsx'
import "./App.css";
import { ExerciseProvider } from "./context/Exercisecontent.jsx";
import Exercise_D from "./pages/exercise_Detail.jsx";
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
function App() {
  return (
    <ExerciseProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/tutorials/exercise/:id" element={<Exercise_D />} />
          <Route path="/workout/train" element={<Exercise_workout />} />
          <Route path='/workout/discover' element={<Workout_discover/>} />
          <Route path='/workout/history' element={<Workout_history/> } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ExerciseProvider>
  );
}

export default App;