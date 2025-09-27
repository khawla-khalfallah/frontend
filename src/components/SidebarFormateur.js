// // src/components/SidebarFormateur.js
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { 
//   FaBook, FaUser, FaCog, FaTrophy, FaList, FaChevronDown, FaChevronUp 
// } from "react-icons/fa";

// function SidebarFormateur() {
//   const [examensOpen, setExamensOpen] = useState(false);
//   const [formationsOpen, setFormationsOpen] = useState(false);

//   return (
//     <div className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "240px" }}>
//       <h2 className="text-center mb-4">📚 Formateur</h2>
//       <ul className="nav flex-column gap-2">
        
//         {/* Profil */}
//         <li className="nav-item">
//           <Link className="nav-link text-white" to="/formateur/ProfilFormateur">
//             <FaUser className="me-2"/> Profil
//           </Link>
//         </li>

//         {/* Formations collapsible */}
//         <li className="nav-item">
//           <button 
//             className="btn btn-link nav-link text-white w-100 d-flex justify-content-between align-items-center"
//             onClick={() => setFormationsOpen(!formationsOpen)}
//           >
//             <span><FaBook className="me-2"/> Formations</span>
//             {formationsOpen ? <FaChevronUp /> : <FaChevronDown />}
//           </button>
//         </li>
//         {formationsOpen && (
//           <ul className="nav flex-column ms-3">
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/formateur/MesFormationsFormateur">📘 Mes Formations</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/formateur/GestionFormations">📘 Gestion des Formations</Link>
//             </li>
//           </ul>
//         )}

//         {/* Examens collapsible */}
//         <li className="nav-item">
//           <button 
//             className="btn btn-link nav-link text-white w-100 d-flex justify-content-between align-items-center"
//             onClick={() => setExamensOpen(!examensOpen)}
//           >
//             <span><FaList className="me-2"/> Examens</span>
//             {examensOpen ? <FaChevronUp /> : <FaChevronDown />}
//           </button>
//         </li>
//         {examensOpen && (
//           <ul className="nav flex-column ms-3">
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/formateur/GestionExamens">📂 Gestion Examens</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/formateur/AjouterExamen">➕ Créer Examen</Link>
//             </li>
//           </ul>
//         )}

//         {/* Étudiants */}
//         {/* <li className="nav-item">
//           <Link className="nav-link text-white" to="/formateur/MesEtudiants">
//             <FaUser className="me-2"/> Mes Étudiants
//           </Link>
//         </li> */}

//         {/* Évaluations */}
//         {/* <li className="nav-item">
//           <Link className="nav-link text-white" to="/formateur/Evaluations">
//             <FaChartLine className="me-2"/> Évaluations
//           </Link>
//         </li> */}

//         {/* Classement */}
//         <li className="nav-item">
//           <Link className="nav-link text-white" to="/formateur/BayesianRanking">
//             <FaTrophy className="me-2"/> Classement
//           </Link>
//         </li>

//         {/* Paramètres */}
//         <li className="nav-item mt-auto">
//           <Link className="nav-link text-white" to="/formateur/SettingsFormateur">
//             <FaCog className="me-2"/> Paramètres
//           </Link>
//         </li>
//       </ul>

//       <footer className="mt-auto text-center small text-muted">
//         © 2025 DreamLearn
//       </footer>
//     </div>
//   );
// }
// export default SidebarFormateur;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaUser, FaCog, FaTrophy, FaList, FaChevronDown, FaChevronUp, FaCertificate } from "react-icons/fa";
import './SidebarFormateur.css';

function SidebarFormateur() {
  const [examensOpen, setExamensOpen] = useState(false);
  const [formationsOpen, setFormationsOpen] = useState(false);

  return (
    <div className="sidebar-formateur">
      <h2 className="sidebar-title">Formateur</h2>
      <ul className="sidebar-tabs">

        {/* Profil */}
        <li>
          <Link className="sidebar-btn" to="/formateur/ProfilFormateur">
            <FaUser className="tab-icon" /> Mon Profil
          </Link>
        </li>

        {/* Formations collapsibles */}
        <li>
          <button className="sidebar-btn" onClick={() => setFormationsOpen(!formationsOpen)}>
            <span><FaBook className="tab-icon" /> Formations</span>
            {formationsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </li>
        {formationsOpen && (
          <ul className="sidebar-tabs" style={{ paddingLeft: "1rem" }}>
            <li>
              <Link className="sidebar-btn" to="/formateur/MesFormationsFormateur">📘 Mes Formations</Link>
            </li>
            <li>
              <Link className="sidebar-btn" to="/formateur/GestionFormations">📘 Gestion des Formations</Link>
            </li>
          </ul>
        )}

        {/* Examens collapsibles */}
        <li>
          <button className="sidebar-btn" onClick={() => setExamensOpen(!examensOpen)}>
            <span><FaList className="tab-icon" /> Examens</span>
            {examensOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </li>
        {examensOpen && (
          <ul className="sidebar-tabs" style={{ paddingLeft: "1rem" }}>
            <li>
              <Link className="sidebar-btn" to="/formateur/GestionExamens">📂 Gestion Examens</Link>
            </li>
            <li>
              <Link className="sidebar-btn" to="/formateur/AjouterExamen">➕ Créer Examen</Link>
            </li>
          </ul>
        )}

        {/* Certifications */}
        <li>
          <Link className="sidebar-btn" to="/formateur/Certifications">
            <FaCertificate className="tab-icon" /> Certifications
          </Link>
        </li>

        {/* Classement */}
        <li>
          <Link className="sidebar-btn" to="/formateur/BayesianRanking">
            <FaTrophy className="tab-icon" /> Classement
          </Link>
        </li>

        {/* Paramètres */}
        <li>
          <Link className="sidebar-btn" to="/formateur/SettingsFormateur">
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

export default SidebarFormateur;
