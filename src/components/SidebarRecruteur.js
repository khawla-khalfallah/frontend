import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBriefcase, FaClipboardList, FaChevronDown, FaChevronUp } from "react-icons/fa";
import './SidebarRecruteur.css'; // CSS similaire à sidebar-formateur

function SidebarRecruteur() {
  const [candidaturesOpen, setCandidaturesOpen] = useState(false);
  const [parametresOpen, setParametresOpen] = useState(false);

  return (
    <div className="sidebar-recruteur">
      <h2 className="sidebar-title">Recruteur</h2>

      <ul className="sidebar-tabs">
        {/* Profil */}
        <li>
          <Link className="sidebar-btn" to="/recruteur/profil">
            <FaBriefcase className="tab-icon" /> Mon Profil
          </Link>
        </li>

        {/* Candidatures */}
        <li>
          <Link className="sidebar-btn" to="/recruteur/candidatures">
            <FaClipboardList className="tab-icon" /> Voir les Candidatures
          </Link>
        </li>

        {/* Paramètres */}
        <li>
          <Link className="sidebar-btn" to="/recruteur/paramètres">
            <FaUsers className="tab-icon" /> Paramètres
          </Link>
        </li>
      </ul>

      <footer className="sidebar-footer">
        <p>© 2025 DreamLearn. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
export default SidebarRecruteur;
