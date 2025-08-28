import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBriefcase, FaClipboardList } from "react-icons/fa";
import NavbarMinimal from "../../components/NavbarMinimal";


function Recruteur() {
  return (
    <div>
      {/* 🔹 Navbar en haut */}
      <NavbarMinimal />

      <div className="d-flex">
        {/* 🔹 Sidebar à gauche */}
        <nav className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "250px" }}>
          <h3 className="text-center">Recruteur</h3>
          <ul className="nav flex-column flex-grow-1">
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

          {/* Copyright en bas */}
          <footer className="mt-auto text-center">
            <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
          </footer>
        </nav>

        {/* 🔹 Contenu principal */}
        <div className="container-fluid p-4 ">
          <h1 className="mb-4">Tableau de bord</h1>
          <p>Bienvenue dans l’espace recruteur !</p>
        </div>
      </div>
    </div>
  );
}

export default Recruteur;
