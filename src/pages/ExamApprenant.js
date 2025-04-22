import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaChartLine, FaVideo, FaCertificate, FaCog, FaUser, FaEdit } from "react-icons/fa";
import NavbarMinimal from "../components/NavbarMinimal";

function ExamApprenant() {
  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        {/* Sidebar identique au Dashboard */}
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

        {/* Contenu principal - Examens */}
        <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-primary mb-4 text-center" style={{ fontWeight: "bold" }}>
              📝 Mes Examens
            </h2>
            <p className="mb-4 text-center text-muted">Voici la liste des examens auxquels vous êtes inscrits :</p>
            <ul className="list-group mb-4">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                📘 <strong>Mathématiques</strong> <span>📅 10/03/2025</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                💻 <strong>Programmation</strong> <span>📅 12/03/2025</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                🏛️ <strong>Histoire</strong> <span>📅 15/03/2025</span>
              </li>
            </ul>
            <div className="text-center">
              <button className="btn btn-success">
                <FaEdit className="me-2" /> Passer un Examen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamApprenant;
