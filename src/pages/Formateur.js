import React from "react";
import { Link } from "react-router-dom";
import NavbarMinimal from "../components/NavbarMinimal";

function Formateur() {
  return (
    <div>
        <NavbarMinimal />
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "250px" }}>
        <h3 className="text-center">Formateur</h3>
        <ul className="nav flex-column">
          <li className="nav-item my-2">
            <Link className="nav-link text-white" to="/formateur">
              <i className="fas fa-home me-2"></i>Accueil
            </Link>
          </li>
          <li className="nav-item my-2">
            <Link className="nav-link text-white" to="/formateur/profil">
              <i className="fas fa-user me-2"></i>Mon Profil
            </Link>
          </li>
          <li className="nav-item my-2">
            <Link className="nav-link text-white" to="/formateur/cours">
              <i className="fas fa-book me-2"></i>Mes Cours
            </Link>
          </li>
          <li className="nav-item my-2">
            <Link className="nav-link text-white" to="/formateur/examens">
              <i className="fas fa-pencil-alt me-2"></i>Gérer les Examens
            </Link>
          </li>

          <li className="nav-item my-2">
            <Link className="nav-link text-white" to="/formateur/etudiants">
              <i className="fas fa-user-graduate me-2"></i>Étudiants
            </Link>
          </li>
          <li className="nav-item my-2">
            <Link className="nav-link text-white" to="/formateur/evaluations">
              <i className="fas fa-star me-2"></i>Évaluations
            </Link>
          </li>
          <li className="nav-item my-2">
            <Link className="nav-link text-white" to="/formateur/settings">
              <i className="fas fa-cog me-2"></i>Paramètres
            </Link>
          </li>
        </ul>
        <footer className="mt-auto text-center">
          <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
        </footer>
      </nav>
      
      {/* Contenu principal */}
      <div className="container-fluid p-4">
        <h1 className="mb-4">Tableau de bord</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm p-3 mb-4 bg-primary text-white">
              <h4><i className="fas fa-book"></i> Cours</h4>
              <p>5 Cours actifs</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 mb-4 bg-success text-white">
              <h4><i className="fas fa-user-graduate"></i> Étudiants</h4>
              <p>120 Étudiants inscrits</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 mb-4 bg-warning text-dark">
              <h4><i className="fas fa-star"></i> Avis</h4>
              <p>Note moyenne : 4.7/5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Formateur;

