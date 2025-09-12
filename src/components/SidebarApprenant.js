// import React from "react";
// import { Link } from "react-router-dom";
// import { FaCertificate, FaCog, FaUser, FaBook, FaTrophy} from "react-icons/fa";

// function SidebarApprenant() {
//   return (
//     <div className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "250px" }}>
//       <h2 className="text-center">Apprenant</h2>
//       <ul className="nav flex-column">
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/apprenant/profil">
//             <FaUser /> Mon Profil
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/apprenant/formations">
//             <FaBook /> Mes Formations
//           </Link>
//         </li>
//           <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/apprenant/lesformations">
//             <FaBook /> Toute les Formations
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formations/ranking">
//             <FaTrophy /> Classement
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/apprenant/examens">
//             <FaCertificate /> Mes Examens
//           </Link>
//         </li>
//         {/* <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/apprenant/progres">
//             <FaChartLine /> Progrès
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/apprenant/visio">
//             <FaVideo /> Visioconférences
//           </Link>
//         </li> */}
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/apprenant/certifications">
//             <FaCertificate /> Certifications
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/apprenant/SettingsApprenant">
//             <FaCog /> Paramètres
//           </Link>
//         </li>
//       </ul>
//       <footer className="mt-auto text-center">
//         <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
//       </footer>
//     </div>





//   );
// }
// export default SidebarApprenant
import React from "react";
import { Link } from "react-router-dom";
import { FaCertificate, FaCog, FaUser, FaBook, FaTrophy } from "react-icons/fa";
import './SidebarApprenant.css'; // on crée ce fichier

function SidebarApprenant() {
  return (
    <div className="sidebar-apprenant">
      <h2 className="sidebar-title">Apprenant</h2>
      <ul className="sidebar-tabs">
        <li>
          <Link className="sidebar-btn" to="/apprenant/profil">
            <FaUser className="tab-icon" /> Mon Profil
          </Link>
        </li>
        <li>
          <Link className="sidebar-btn" to="/apprenant/formations">
            <FaBook className="tab-icon" /> Mes Formations
          </Link>
        </li>
        <li>
          <Link className="sidebar-btn" to="/apprenant/lesformations">
            <FaBook className="tab-icon" /> Toutes les Formations
          </Link>
        </li>
        <li>
          <Link className="sidebar-btn" to="/formations/ranking">
            <FaTrophy className="tab-icon" /> Classement
          </Link>
        </li>
        <li>
          <Link className="sidebar-btn" to="/apprenant/examens">
            <FaCertificate className="tab-icon" /> Mes Examens
          </Link>
        </li>
        {/* <li>
          <Link className="sidebar-btn" to="/apprenant/certifications">
            <FaCertificate className="tab-icon" /> Certifications
          </Link>
        </li> */}
        <li>
          <Link className="sidebar-btn" to="/apprenant/SettingsApprenant">
            <FaCog className="tab-icon" /> Paramètres
          </Link>
        </li>
      </ul>
      <footer className="sidebar-footer">
        <p>© 2025 DreamLearn. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default SidebarApprenant;
