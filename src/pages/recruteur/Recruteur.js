// import React from "react";
// import { Link } from "react-router-dom";
// import { FaUsers, FaBriefcase, FaClipboardList } from "react-icons/fa";
// import NavbarMinimal from "../../components/NavbarMinimal";


// function Recruteur() {
//   return (
//     <div>
//       {/* 🔹 Navbar en haut */}
//       <NavbarMinimal />

//       <div className="d-flex">
//         {/* 🔹 Sidebar à gauche */}
//         <nav className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "250px" }}>
//           <h3 className="text-center">Recruteur</h3>
//           <ul className="nav flex-column flex-grow-1">
//             <li className="nav-item my-2">
//               <Link className="nav-link text-white" to="/recruteur/profil">
//                 <FaBriefcase className="me-2" /> Mon Profil
//               </Link>
//             </li>
//             <li className="nav-item my-2">
//               <Link className="nav-link text-white" to="/recruteur/candidatures">
//                 <FaClipboardList className="me-2" /> Voir les Candidatures
//               </Link>
//             </li>
//             <li className="nav-item my-2">
//               <Link className="nav-link text-white" to="/recruteur/paramètres">
//                 <FaUsers className="me-2" /> Paramètres
//               </Link>
//             </li>
//           </ul>

//           {/* Copyright en bas */}
//           <footer className="mt-auto text-center">
//             <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
//           </footer>
//         </nav>

//         {/* 🔹 Contenu principal */}
//         <div className="container-fluid p-4 ">
//           <h1 className="mb-4">Tableau de bord</h1>
//           <p>Bienvenue dans l’espace recruteur !</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Recruteur;
// src/pages/recruteur/Recruteur.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarRecruteur from "../../components/SidebarRecruteur";
// import "./Recruteur.css";

function Recruteur() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      {/* 🔹 Navbar */}
      <NavbarMinimal />

      {/* 🔹 Bouton hamburger (mobile) */}
      <button
        className="menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      <div className="d-flex">
        {/* 🔹 Sidebar */}
        <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <SidebarRecruteur />
        </div>

        {/* 🔹 Contenu principal */}
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>👋 Bienvenue, cher Recruteur</h1>
            <p>Accédez rapidement à votre profil, candidatures et paramètres.</p>
          </div>

          {/* 🔹 Cards */}
          <div className="dashboard-cards">
            <Link to="/recruteur/profil" className="dashboard-card card-blue">
              <div className="card-icon">📂</div>
              <h3>Mon Profil</h3>
              <p>Consultez et modifiez vos informations personnelles.</p>
            </Link>

            <Link to="/recruteur/candidatures" className="dashboard-card card-green">
              <div className="card-icon">📄</div>
              <h3>Candidatures</h3>
              <p>Consultez et gérez les candidatures reçues.</p>
            </Link>

            <Link to="/recruteur/paramètres" className="dashboard-card card-purple">
              <div className="card-icon">⚙️</div>
              <h3>Paramètres</h3>
              <p>Gérez vos préférences et notifications.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recruteur;
