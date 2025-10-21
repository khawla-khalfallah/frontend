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
              <p> Gérez les candidatures reçues.</p>
            </Link>

            <Link to="/recruteur/paramètres" className="dashboard-card card-purple">
              <div className="card-icon">⚙️</div>
              <h3>Paramètres</h3>
              <p>Gérez vos données.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recruteur;
