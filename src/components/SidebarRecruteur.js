import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBriefcase, FaClipboardList } from "react-icons/fa";

function SidebarRecruteur() {
  return (
    <nav
      className="bg-dark text-white p-3 vh-100 d-flex flex-column"
      style={{ width: "250px" }}
    >
      <h3 className="text-center">Recruteur</h3>
      <ul className="nav flex-column flex-grow-1">
        {/* Exemple d'élément menu */}
        <li className="nav-item my-2">
          <Link className="nav-link text-white" to="/recruteur/profil">
            <FaBriefcase className="me-2" /> Mon Profil
          </Link>
        </li>
        <li className="nav-item my-2">
          <Link className="nav-link text-white" to="/recruteur/candidatures">
            <FaClipboardList className="me-2" /> Voir les Candidatures
          </Link>
        </li>
        <li className="nav-item my-2">
          <Link className="nav-link text-white" to="/recruteur/paramètres">
            <FaUsers className="me-2" /> Paramètres
          </Link>
        </li>
      </ul>

      <footer className="mt-auto text-center">
        <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
      </footer>
    </nav>
  );
}

export default SidebarRecruteur;
