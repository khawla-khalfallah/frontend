import React from "react";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaChartLine,
  FaVideo,
  FaCertificate,
  FaCog,
  FaUser
} from "react-icons/fa";
import NavbarMinimal from "../components/NavbarMinimal";

function Certifications() {
  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="bg-dark text-white p-3 vh-100 d-flex flex-column"
          style={{ width: "250px" }}
        >
          <h2 className="text-center">Apprenant</h2>
          <ul className="nav flex-column">
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/profil">
                <FaUser /> Mon Profil
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/formations">
                <FaBook /> Mes Formations
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
              <Link
                className="nav-link text-white"
                to="/apprenant/certifications"
              >
                <FaCertificate /> Certifications
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/settings">
                <FaCog /> Paramètres
              </Link>
            </li>
          </ul>
          <footer className="mt-auto text-center">
            <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
          </footer>
        </div>

        {/* Contenu principal - Certifications */}
        <div
          className="p-5"
          style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}
        >
          <div className="bg-white shadow rounded p-4">
            <h2
              className="text-success mb-4 text-center"
              style={{ fontWeight: "bold" }}
            >
              🏅 Mes Certifications
            </h2>
            <p className="text-center text-muted mb-5">
              Voici les certifications que vous avez obtenues :
            </p>

            {/* Certification 1 */}
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">📜 Développement Web</h5>
                <p className="card-text">Date d'obtention : 20/12/2024</p>
              </div>
            </div>

            {/* Certification 2 */}
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">📜 Algorithmie</h5>
                <p className="card-text">Date d'obtention : 15/01/2025</p>
              </div>
            </div>

            {/* Tu pourras générer dynamiquement depuis l'API ici */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certifications;
