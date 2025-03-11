import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./components/login";
import Home from "./components/home";
import Disciplinas from "./components/disciplinas";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/disciplinas" element={<Disciplinas />} />
      </Routes>
    </Router>
  )
}

export default App