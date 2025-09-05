// import React from "react";
// import { Link } from "react-router-dom";
// import { FaCertificate, FaCog, FaUser, FaBook, FaChartLine, FaTrophy } from "react-icons/fa";


// function SidebarFormateur() {
//   return (
//     <div className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "250px" }}>
//       <h2 className="text-center">Formateur</h2>
//       <ul className="nav flex-column">
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/Formateur">
//             <i className="fas fa-home me-2"></i> Accueil
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/ProfilFormateur">
//             <FaUser /> Mon Profil
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/MesFormationsFormateur">
//             <FaBook /> Mes Formations
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/GestionExamens">
//             <FaBook /> Gestion des Examens
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/CreerExamen">
//             <FaBook /> Creer Examen
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/ListeQuestions">
//             <FaBook /> Listte des Questions
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/EditQuestion">
//             <FaBook /> Edit des Questions
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/AjouterQuestion">
//             <FaBook /> Ajouter Question
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formations/ranking">
//             <FaTrophy /> Classement
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/AjouterFormation">
//             ➕ Ajouter Formation
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/MesExamensFormateur">
//             <FaCertificate /> Mes Examens
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/AjouterExamen">
//             ➕ Ajouter Examen
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/MesEtudiants">
//             <FaUser /> Mes Étudiants
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/Evaluations">
//             <FaChartLine /> Évaluations
//           </Link>
//         </li>
//         <li className="nav-item py-2">
//           <Link className="nav-link text-white" to="/formateur/SettingsFormateur">
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
// export default SidebarFormateur
// src/components/SidebarFormateur.js
// src/components/SidebarFormateur.js
// src/components/SidebarFormateur.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaBook, FaUser, FaCog, FaChartLine, FaTrophy, FaList, FaPlus, FaChevronDown, FaChevronUp 
} from "react-icons/fa";

function SidebarFormateur() {
  const [examensOpen, setExamensOpen] = useState(false);
  const [formationsOpen, setFormationsOpen] = useState(false);

  return (
    <div className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "240px" }}>
      <h2 className="text-center mb-4">📚 Formateur</h2>
      <ul className="nav flex-column gap-2">
        
        {/* Profil */}
        <li className="nav-item">
          <Link className="nav-link text-white" to="/formateur/ProfilFormateur">
            <FaUser className="me-2"/> Profil
          </Link>
        </li>

        {/* Formations collapsible */}
        <li className="nav-item">
          <button 
            className="btn btn-link nav-link text-white w-100 d-flex justify-content-between align-items-center"
            onClick={() => setFormationsOpen(!formationsOpen)}
          >
            <span><FaBook className="me-2"/> Formations</span>
            {formationsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </li>
        {formationsOpen && (
          <ul className="nav flex-column ms-3">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/formateur/MesFormationsFormateur">📘 Mes Formations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/formateur/GestionRessourcesFormateur">📘 Gestion des Formations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/formateur/AjouterFormation">➕ Ajouter Formation</Link>
            </li>
          </ul>
        )}

        {/* Examens collapsible */}
        <li className="nav-item">
          <button 
            className="btn btn-link nav-link text-white w-100 d-flex justify-content-between align-items-center"
            onClick={() => setExamensOpen(!examensOpen)}
          >
            <span><FaList className="me-2"/> Examens</span>
            {examensOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </li>
        {examensOpen && (
          <ul className="nav flex-column ms-3">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/formateur/GestionExamens">📂 Gestion Examens</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/formateur/CreerExamen">➕ Créer Examen</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/formateur/MesExamensFormateur">📑 Mes Examens</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/formateur/AjouterExamen">➕ Ajouter Examen</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/formateur/ListeQuestions">📋 Liste Questions</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/formateur/AjouterQuestion">➕ Ajouter Question</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/formateur/EditQuestion">✏️ Modifier Question</Link>
            </li>
          </ul>
        )}

        {/* Étudiants */}
        <li className="nav-item">
          <Link className="nav-link text-white" to="/formateur/MesEtudiants">
            <FaUser className="me-2"/> Mes Étudiants
          </Link>
        </li>

        {/* Évaluations */}
        <li className="nav-item">
          <Link className="nav-link text-white" to="/formateur/Evaluations">
            <FaChartLine className="me-2"/> Évaluations
          </Link>
        </li>

        {/* Classement */}
        <li className="nav-item">
          <Link className="nav-link text-white" to="/formations/ranking">
            <FaTrophy className="me-2"/> Classement
          </Link>
        </li>

        {/* Paramètres */}
        <li className="nav-item mt-auto">
          <Link className="nav-link text-white" to="/formateur/SettingsFormateur">
            <FaCog className="me-2"/> Paramètres
          </Link>
        </li>
      </ul>

      <footer className="mt-auto text-center small text-muted">
        © 2025 DreamLearn
      </footer>
    </div>
  );
}
export default SidebarFormateur;
