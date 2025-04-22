import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Apropos from "./pages/Apropos";
import Formateur from "./pages/Formateur";
import Apprenant from "./pages/Apprenant";
import Recruteur from "./pages/Recruteur";
import Profile from "./pages/Profile"; 
import Etudiants from "./pages/Etudiants";
import Evaluations from "./pages/Evaluations";
import Settings from "./pages/Settings";
import Progres from "./pages/Progres";
import Visio from "./pages/Visio";
import Certifications from "./pages/Certifications";
import Offres from "./pages/Offres";
import Candidatures from "./pages/Candidatures";
import Entretiens from "./pages/Entretiens";
import Exam from "./pages/Exam";  
import ExamApprenant from "./pages/ExamApprenant";
import TablesList from './pages/Test';
import Formation from "./pages/Formation";
import AdminDashboard from './pages/AdminDashboard';
import UsersList from './pages/admin/UsersList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apropos" element={<Apropos />}/>
        <Route path="/formateur" element={<Formateur />} />
        <Route path="/apprenant" element={<Apprenant />} />
        <Route path="/recruteur" element={<Recruteur />} />
        <Route path="/formateur/profil" element={<Profile />} />
        <Route path="/apprenant/profil" element={<Profile />} />
        <Route path="/formateur/formations" element={<Formation/>} />
        <Route path="/apprenant/formations" element={<Formation/>} />
        <Route path="/formateur/etudiants" element={<Etudiants/>} />
        <Route path="/formateur/evaluations" element={<Evaluations/>} />
        <Route path="/formateur/settings" element={<Settings/>} />
        <Route path="/apprenant/settings" element={<Settings/>} />
        <Route path="/apprenant/progres" element={<Progres/>} />
        <Route path="/apprenant/visio" element={<Visio/>} />
        <Route path="/apprenant/certifications" element={<Certifications/>} />
        <Route path="/recruteur/offres" element={<Offres/>} />
        <Route path="/recruteur/candidatures" element={<Candidatures/>} />
        <Route path="/recruteur/entretiens" element={<Entretiens/>} />
        <Route  path="/formateur/examens" element={<Exam/>} />
        <Route path="/apprenant/examens" element={<ExamApprenant/>} />
        <Route path="/tables" element={<TablesList />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersList />} />


      </Routes>
    </Router>
    
  );
}


export default App;
