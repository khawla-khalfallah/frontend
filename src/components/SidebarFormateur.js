import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaUser, FaCog, FaTrophy, FaList, FaChevronDown, FaChevronUp, FaCertificate } from "react-icons/fa";
import './SidebarFormateur.css';

function SidebarFormateur() {
  const [examensOpen, setExamensOpen] = useState(false);
  const [formationsOpen, setFormationsOpen] = useState(false);

  return (
    <div className="sidebar-formateur">
      <h2 className="sidebar-title">Formateur</h2>
      <ul className="sidebar-tabs">

        {/* Profil */}
        <li>
          <Link className="sidebar-btn" to="/formateur/ProfilFormateur">
            <FaUser className="tab-icon" /> Mon Profil
          </Link>
        </li>

        {/* Formations collapsibles */}
        <li>
          <button className="sidebar-btn" onClick={() => setFormationsOpen(!formationsOpen)}>
            <span><FaBook className="tab-icon" /> Formations</span>
            {formationsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </li>
        {formationsOpen && (
          <ul className="sidebar-tabs" style={{ paddingLeft: "1rem" }}>
            <li>
              <Link className="sidebar-btn" to="/formateur/MesFormationsFormateur">📘 Mes Formations</Link>
            </li>
            <li>
              <Link className="sidebar-btn" to="/formateur/GestionFormations">📘 Gestion des Formations</Link>
            </li>
          </ul>
        )}

        {/* Examens collapsibles */}
        <li>
          <button className="sidebar-btn" onClick={() => setExamensOpen(!examensOpen)}>
            <span><FaList className="tab-icon" /> Examens</span>
            {examensOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </li>
        {examensOpen && (
          <ul className="sidebar-tabs" style={{ paddingLeft: "1rem" }}>
            <li>
              <Link className="sidebar-btn" to="/formateur/GestionExamens">📂 Gestion Examens</Link>
            </li>
            <li>
              <Link className="sidebar-btn" to="/formateur/AjouterExamen">➕ Créer Examen</Link>
            </li>
          </ul>
        )}

        {/* Certifications */}
        <li>
          <Link className="sidebar-btn" to="/formateur/Certifications">
            <FaCertificate className="tab-icon" /> Certifications
          </Link>
        </li>

        {/* Classement */}
        <li>
          <Link className="sidebar-btn" to="/formateur/BayesianRanking">
            <FaTrophy className="tab-icon" /> Classement
          </Link>
        </li>

        {/* Paramètres */}
        <li>
          <Link className="sidebar-btn" to="/formateur/SettingsFormateur">
            <FaCog className="tab-icon" /> Paramètres
          </Link>
        </li>

      </ul>

      <footer className="sidebar-footer">
        <p>© 2025 DreamLearn. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default SidebarFormateur;
