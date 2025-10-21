import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarApprenant from "../../components/SidebarApprenant";
import "./Apprenant.css";

function Apprenant() {
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
          <SidebarApprenant />
        </div>

        {/* Contenu principal */}
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>🎓 Bienvenue, cher Apprenant</h1>
            <p>
              Accédez rapidement à vos cours, examens, certifications et classements.
            </p>
          </div>

          <div className="dashboard-cards">
            <Link to="/apprenant/formations" className="dashboard-card card-blue">
              <div className="card-icon">📚</div>
              <h3>Mes Formations</h3>
              <p>Consultez vos formations en cours.</p>
            </Link>

            <Link to="/apprenant/examens" className="dashboard-card card-green">
              <div className="card-icon">📝</div>
              <h3>Mes Examens</h3>
              <p>Testez vos connaissances.</p>
            </Link>

            <Link to="/formations/ranking" className="dashboard-card card-yellow">
              <div className="card-icon">🏆</div>
              <h3>Classement</h3>
              <p>Découvrez les formations les mieux notées.</p>
            </Link>

            {/* <Link to="/apprenant/certifications" className="dashboard-card card-purple">
              <div className="card-icon">🎖️</div>
              <h3>Certifications</h3>
              <p>Retrouvez vos certificats obtenus.</p>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apprenant;
