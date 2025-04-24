import React from "react";
import { Link } from "react-router-dom";
import { FaVideo, FaCertificate, FaCog, FaUser, FaBook, FaChartLine } from "react-icons/fa";
import NavbarMinimal from "../../components/NavbarMinimal";

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
            <Link className="nav-link text-white" to="/apprenant/certifications">
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

        {/* Contenu Principal amélioré */}
        <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          <div className="bg-white shadow rounded p-4 text-center">
            <h1 className="text-primary mb-3" style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
              🎓 Bienvenue sur votre espace Apprenant
            </h1>
            <p className="text-secondary fs-5">
              Commencez votre apprentissage en explorant les différentes sections disponibles dans le menu à gauche.
            </p>
            <div className="d-flex justify-content-center mt-4 gap-3 flex-wrap">
              <Link to="/apprenant/formations" className="btn btn-outline-primary btn-lg">
                📚 Mes Formations
              </Link>
              <Link to="/apprenant/examens" className="btn btn-outline-success btn-lg">
                📝 Mes Examens
              </Link>
              <Link to="/apprenant/progres" className="btn btn-outline-info btn-lg">
                📈 Suivre mon Progrès
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apprenant;

