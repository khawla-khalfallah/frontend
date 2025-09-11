import React from "react";
import { Link } from "react-router-dom";
import { FaCertificate, FaCog, FaUser, FaBook, FaTrophy} from "react-icons/fa";

function SidebarApprenant() {
  return (
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
          <Link className="nav-link text-white" to="/apprenant/lesformations">
            <FaBook /> Toute les Formations
          </Link>
        </li>
        <li className="nav-item py-2">
          <Link className="nav-link text-white" to="/formations/ranking">
            <FaTrophy /> Classement
          </Link>
        </li>
        <li className="nav-item py-2">
          <Link className="nav-link text-white" to="/apprenant/examens">
            <FaCertificate /> Mes Examens
          </Link>
        </li>
        {/* <li className="nav-item py-2">
          <Link className="nav-link text-white" to="/apprenant/progres">
            <FaChartLine /> Progrès
          </Link>
        </li>
        <li className="nav-item py-2">
          <Link className="nav-link text-white" to="/apprenant/visio">
            <FaVideo /> Visioconférences
          </Link>
        </li> */}
        <li className="nav-item py-2">
          <Link className="nav-link text-white" to="/apprenant/certifications">
            <FaCertificate /> Certifications
          </Link>
        </li>
        <li className="nav-item py-2">
          <Link className="nav-link text-white" to="/apprenant/SettingsApprenant">
            <FaCog /> Paramètres
          </Link>
        </li>
      </ul>
      <footer className="mt-auto text-center">
        <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
      </footer>
    </div>





  );
}
export default SidebarApprenant
