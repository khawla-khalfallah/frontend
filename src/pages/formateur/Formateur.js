import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarFormateur from "../../components/SidebarFormateur";
import "./Formateur.css";

function FormateurDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <NavbarMinimal />

      {/* Bouton hamburger visible seulement en mobile */}
      <button
        className="menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      <div className="d-flex">
        {/* Sidebar : affichage conditionnel */}
        <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <SidebarFormateur />
        </div>

        {/* Contenu principal */}
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>📚 Bienvenue, cher Formateur</h1>
            <p>
              Accédez rapidement à vos formations, examens et classements.
            </p>
          </div>

          <div className="dashboard-cards">
            <Link to="/formateur/MesFormationsFormateur" className="dashboard-card card-blue">
              <div className="card-icon">📘</div>
              <h3>Mes Formations</h3>
              <p>Consultez et gérez vos formations en cours.</p>
            </Link>

            <Link to="/formateur/GestionExamens" className="dashboard-card card-green">
              <div className="card-icon">📝</div>
              <h3>Mes Examens</h3>
              <p>Créez et suivez vos examens.</p>
            </Link>

            <Link to="/formateur/BayesianRanking" className="dashboard-card card-yellow">
              <div className="card-icon">🏆</div>
              <h3>Classement</h3>
              <p>Consultez le classement des formations.</p>
            </Link>

            <Link to="/formateur/SettingsFormateur" className="dashboard-card card-purple">
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

export default FormateurDashboard;
