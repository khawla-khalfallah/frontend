import React from "react";
import { Link } from "react-router-dom";
import {  FaCertificate, FaCog, FaUser, FaBook, FaChartLine } from "react-icons/fa";


function SidebarFormateur() {
    return (
 <div className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "250px" }}>
 <h2 className="text-center">Formateur</h2>
 <ul className="nav flex-column">
   <li className="nav-item py-2">
     <Link className="nav-link text-white" to="/formateur/Formateur">
       <i className="fas fa-home me-2"></i> Accueil
     </Link>
   </li>
   <li className="nav-item py-2">
     <Link className="nav-link text-white" to="/formateur/ProfilFormateur">
       <FaUser /> Mon Profil
     </Link>
   </li>
   <li className="nav-item py-2">
     <Link className="nav-link text-white" to="/formateur/MesFormationsFormateur">
       <FaBook /> Mes Formations
     </Link>
   </li>
   <li className="nav-item py-2">
     <Link className="nav-link text-white" to="/formateur/AjouterFormation">
       ➕ Ajouter Formation
     </Link>
   </li>
   <li className="nav-item py-2">
     <Link className="nav-link text-white" to="/formateur/MesExamensFormateur">
       <FaCertificate /> Mes Examens
     </Link>
   </li>
   <li className="nav-item py-2">
     <Link className="nav-link text-white" to="/formateur/AjouterExamen">
       ➕ Ajouter Examen
     </Link>
   </li>
   <li className="nav-item py-2">
     <Link className="nav-link text-white" to="/formateur/MesEtudiants">
       <FaUser /> Mes Étudiants
     </Link>
   </li>
   <li className="nav-item py-2">
     <Link className="nav-link text-white" to="/formateur/Evaluations">
       <FaChartLine /> Évaluations
     </Link>
   </li>
   <li className="nav-item py-2">
     <Link className="nav-link text-white" to="/formateur/SettingsFormateur">
       <FaCog /> Paramètres
     </Link>
   </li>
 </ul>
 
 <footer className="mt-auto text-center">
   <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
 </footer>
 </div>
   );
}
 export default SidebarFormateur
