import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaChartLine, FaVideo,FaCertificate, FaCog, FaUser} from "react-icons/fa";
import NavbarMinimal from "../components/NavbarMinimal";

function Apprenant() {
  return (
    <div>
      <NavbarMinimal />
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "250px" }}>
        <h2 className="text-center">Apprenant</h2>
        <ul className="nav flex-column">
        <li className="nav-item py-2">
            <Link className="nav-link text-white" to="/apprenant/profil">
              <FaUser /> Mon Profil
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to="/apprenant/cours">
              <FaBook /> Mes Cours
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to="/apprenant/examens">
              <FaCertificate /> Mes Examens
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to="/apprenant/progres">
              <FaChartLine /> Progrès
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to="/apprenant/visio">
              <FaVideo /> Visioconférences
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to="/apprenant/certifications">
              <FaCertificate /> Certifications
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to="/apprenant/settings">
              <FaCog /> Paramètres
            </Link>
          </li>
          {/* Ajouter ces éléments dans la sidebar de l'Apprenant */}
        </ul>
        <footer className="mt-auto text-center">
          <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
        </footer>
      </div>
      </div>
      {/* Contenu Principal */}
      <div className="p-4" style={{ flex: 1 }}>
        <h1>Bienvenue sur votre espace Apprenant</h1>
        <p>Sélectionnez une section dans la barre latérale.</p>
      </div>
    </div>
  );
}

export default Apprenant;

