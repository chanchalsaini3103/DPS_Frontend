import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/Navbar";
import DpsLoginPage from "./components/DpsLoginPage";
import Register from "./components/Register";
import ParentDashboard from "./components/ParentDashboard";


function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<AppNavbar />} />
        <Route path="/dps-login" element={<DpsLoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ParentDashboard />} />

      </Routes>
    </Router>
    </>
   
  );
}

export default App;
