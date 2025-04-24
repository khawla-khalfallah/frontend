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
import NavbarMinimal from "../../components/NavbarMinimal";

function Progres() {
  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        {/* Sidebar identique */}
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

        {/* Contenu principal - Progrès */}
        <div
          className="p-5"
          style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}
        >
          <div className="bg-white shadow rounded p-4">
            <h2
              className="text-primary mb-4 text-center"
              style={{ fontWeight: "bold" }}
            >
              📈 Mon Progrès
            </h2>
            <p className="text-center text-muted mb-5">
              Suivez votre progression dans chaque cours :
            </p>

            {/* Carte 1 */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  📘 Introduction à la programmation
                </h5>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "80%" }}
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    80%
                  </div>
                </div>
              </div>
            </div>

            {/* Carte 2 */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">💻 Développement web</h5>
                <div className="progress">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: "60%" }}
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    60%
                  </div>
                </div>
              </div>
            </div>

            {/* Tu pourras ajouter d'autres cours dynamiquement ici */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progres;
