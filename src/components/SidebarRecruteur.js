// import React from "react";
// import { Link } from "react-router-dom";
// import { FaUsers, FaBriefcase, FaClipboardList } from "react-icons/fa";

// function SidebarRecruteur() {
//   return (
//     <nav
//       className="bg-dark text-white p-3 vh-100 d-flex flex-column"
//       style={{ width: "250px" }}
//     >
//       <h3 className="text-center">Recruteur</h3>
//       <ul className="nav flex-column flex-grow-1">
//         {/* Exemple d'élément menu */}
//         <li className="nav-item my-2">
//           <Link className="nav-link text-white" to="/recruteur/profil">
//             <FaBriefcase className="me-2" /> Mon Profil
//           </Link>
//         </li>
//         <li className="nav-item my-2">
//           <Link className="nav-link text-white" to="/recruteur/candidatures">
//             <FaClipboardList className="me-2" /> Voir les Candidatures
//           </Link>
//         </li>
//         <li className="nav-item my-2">
//           <Link className="nav-link text-white" to="/recruteur/paramètres">
//             <FaUsers className="me-2" /> Paramètres
//           </Link>
//         </li>
//       </ul>

//       <footer className="mt-auto text-center">
//         <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
//       </footer>
//     </nav>
//   );
// }

// export default SidebarRecruteur;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBriefcase, FaClipboardList, FaChevronDown, FaChevronUp } from "react-icons/fa";
import './SidebarRecruteur.css'; // CSS similaire à sidebar-formateur

function SidebarRecruteur() {
  const [candidaturesOpen, setCandidaturesOpen] = useState(false);
  const [parametresOpen, setParametresOpen] = useState(false);

   return (
    <div className="sidebar-recruteur">
      <h2 className="sidebar-title">Recruteur</h2>

      <ul className="sidebar-tabs">
        {/* Profil */}
        <li>
          <Link className="sidebar-btn" to="/recruteur/profil">
            <FaBriefcase className="tab-icon" /> Mon Profil
          </Link>
        </li>

        {/* Candidatures */}
        <li>
          <Link className="sidebar-btn" to="/recruteur/candidatures">
            <FaClipboardList className="tab-icon" /> Voir les Candidatures
          </Link>
        </li>

        {/* Paramètres */}
        <li>
          <Link className="sidebar-btn" to="/recruteur/paramètres">
            <FaUsers className="tab-icon" /> Paramètres
          </Link>
        </li>
      </ul>

      <footer className="sidebar-footer">
        <p>© 2025 DreamLearn. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
export default SidebarRecruteur;
