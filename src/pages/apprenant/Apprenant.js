// import React from "react";
// import { Link } from "react-router-dom";
// import NavbarMinimal from "../../components/NavbarMinimal";
// import SidebarApprenant from "../../components/SidebarApprenant";

// function Apprenant() {
//   return (
//     <div>
//       <NavbarMinimal />
//       <div className="d-flex">
//         <SidebarApprenant />
//         <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//           <div className="bg-white shadow rounded p-4 text-center">
//             <h1 className="text-primary mb-3" style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
//               🎓 Bienvenue sur votre espace Apprenant
//             </h1>
//             <p className="text-secondary fs-5">
//               Commencez votre apprentissage en explorant les différentes sections disponibles dans le menu à gauche.
//             </p>
//             <div className="d-flex justify-content-center mt-4 gap-3 flex-wrap">
//               <Link to="/apprenant/formations" className="btn btn-outline-primary btn-lg">
//                 📚 Mes Formations
//               </Link>
//               <Link to="/apprenant/examens" className="btn btn-outline-success btn-lg">
//                 📝 Mes Examens
//               </Link>
//               {/* <Link to="/apprenant/progres" className="btn btn-outline-info btn-lg">
//                 📈 Suivre mon Progrès
//               </Link> */}
//               <Link to="/formations/ranking" className="btn btn-outline-warning btn-lg">
//                 🏆 Classement des Formations
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Apprenant;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarApprenant from "../../components/SidebarApprenant";
import "./Apprenant.css";

function Apprenant() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <NavbarMinimal />
      {/* Bouton hamburger visible seulement en mobile */}
      <button
        className="menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      <div className="d-flex">
        {/* Sidebar : affichage conditionnel */}
        <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <SidebarApprenant />
        </div>

        {/* Contenu principal */}
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>🎓 Bienvenue, cher Apprenant</h1>
            <p>
              Accédez rapidement à vos cours, examens, certifications et classements.
            </p>
          </div>

          <div className="dashboard-cards">
            <Link to="/apprenant/formations" className="dashboard-card card-blue">
              <div className="card-icon">📚</div>
              <h3>Mes Formations</h3>
              <p>Consultez et continuez vos formations en cours.</p>
            </Link>

            <Link to="/apprenant/examens" className="dashboard-card card-green">
              <div className="card-icon">📝</div>
              <h3>Mes Examens</h3>
              <p>Testez vos connaissances et suivez vos résultats.</p>
            </Link>

            <Link to="/formations/ranking" className="dashboard-card card-yellow">
              <div className="card-icon">🏆</div>
              <h3>Classement</h3>
              <p>Découvrez les formations les mieux notées.</p>
            </Link>

            {/* <Link to="/apprenant/certifications" className="dashboard-card card-purple">
              <div className="card-icon">🎖️</div>
              <h3>Certifications</h3>
              <p>Retrouvez vos certificats obtenus.</p>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apprenant;
