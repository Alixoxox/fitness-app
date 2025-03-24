import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/home.jsx';
import Exercise from './pages/exercise_p.jsx';
import Navbar from "./components/Navbar.jsx";
import Tutorials from "./pages/tutorials.jsx";
import "./App.css";
import { ExerciseProvider } from "./context/Exercisecontent.jsx";
import Exercise_D from "./pages/exercise_Detail.jsx";
function App() {
  return (
    <ExerciseProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorials" element={<Tutorials />} />
       <Route path="/tutorials/exercise/:id" element={<Exercise_D />} />
        <Route path="/workout" element={<Exercise />} />
      </Routes>
    </BrowserRouter>
    </ExerciseProvider>
  );
}

export default App;