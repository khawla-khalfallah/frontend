import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/acceuil/Home";
import Register from "./pages/acceuil/Register";
import Login from "./pages/acceuil/Login";
import Apropos from "./pages/acceuil/Apropos";
import Apprenant from "./pages/apprenant/Apprenant";
import ProfilApprenant from "./pages/apprenant/ProfilApprenant";
import MesFormations from "./pages/apprenant/MesFormations";
import FormationDetails from "./pages/apprenant/FormationDetails";
import MesExamens from "./pages/apprenant/MesExamens";
import PasserExamen from "./pages/apprenant/PasserExamen";
import Progres from "./pages/apprenant/Progres";
import Visio from "./pages/apprenant/Visio";
import Certifications from "./pages/apprenant/Certifications";
import SettingsApprenant from "./pages/apprenant/SettingsApprenant";
import Formateur from "./pages/formateur/Formateur";
import ProfilFormateur from "./pages/formateur/ProfilFormateur";
import MesFormationsFormateur from "./pages/formateur/MesFormationsFormateur";
import AjouterQuestion from "./pages/formateur/AjouterQuestion"
import AjouterFormation from "./pages/formateur/AjouterFormation";
import MesExamensFormateur from "./pages/formateur/MesExamensFormateur";
import AjouterExamen from "./pages/formateur/AjouterExamen"
import MesEtudiants from "./pages/formateur/MesEtudiants";
import Evaluations from "./pages/formateur/Evaluations"; 
import SettingsFormateur from "./pages/formateur/SettingsFormateur"
import Recruteur from "./pages/recruteur/Recruteur";
import Offres from "./pages/recruteur/Offres";
import Candidatures from "./pages/recruteur/Candidatures";
import Entretiens from "./pages/recruteur/Entretiens";
import TablesList from './pages/Test';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersList from './pages/admin/UsersList';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apropos" element={<Apropos />}/>
        <Route path="/apprenant" element={<Apprenant />} />
        <Route path="/apprenant/profil" element={<ProfilApprenant />} />
        <Route path="/apprenant/formations" element={<MesFormations />} />
        <Route path="/apprenant/formations/:id" element={<FormationDetails />} />
        <Route path="/apprenant/examens" element={<MesExamens />} />
        <Route path="/apprenant/examens/:id/passer" element={<PasserExamen />} />
        <Route path="/apprenant/progres" element={<Progres />} />
        <Route path="/apprenant/visio" element={<Visio />} />
        <Route path="/apprenant/certifications" element={<Certifications />} />
        <Route path="/apprenant/settingsApprenant" element={<SettingsApprenant />} />
        <Route path="/formateur/Formateur" element={<Formateur/>}/>
        <Route path="/formateur/ProfilFormateur" element={<ProfilFormateur />} />
        <Route path="/formateur/MesFormationsFormateur" element={<MesFormationsFormateur />} />
        <Route path="/formateur/AjouterFormation" element={<AjouterFormation />} />
        <Route path="/formateur/MesExamensFormateur" element={<MesExamensFormateur />} />
        <Route path="/formateur/AjouterQuestion/:examenId" element={<AjouterQuestion />} />
        <Route path="/formateur/AjouterExamen" element={<AjouterExamen />} />
        <Route path="/formateur/MesEtudiants" element={<MesEtudiants />} />
        <Route path="/formateur/Evaluations" element={<Evaluations />} />
        <Route path="/formateur/SettingsFormateur" element={<SettingsFormateur />} />
        <Route path="/recruteur" element={<Recruteur />} />
        <Route path="/recruteur/offres" element={<Offres/>} />
        <Route path="/recruteur/candidatures" element={<Candidatures/>} />
        <Route path="/recruteur/entretiens" element={<Entretiens/>} />
        <Route path="/tables" element={<TablesList />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersList />} />
      </Routes>
    </Router>
    
  );
}


export default App;
