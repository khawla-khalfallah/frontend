// import React from "react";
// import { Link } from "react-router-dom";
// import { FaBook, FaChartLine, FaVideo, FaCertificate, FaCog, FaUser } from "react-icons/fa";
// import NavbarMinimal from "../components/NavbarMinimal";

// function Formation() {
//   return (
//     <div>
//       <NavbarMinimal />
//       <div className="d-flex">
//         {/* Sidebar identique au Dashboard */}
//         <div className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "250px" }}>
//           <h2 className="text-center">Apprenant</h2>
//           <ul className="nav flex-column">
//             <li className="nav-item py-2">
//               <Link className="nav-link text-white" to="/apprenant/profil">
//                 <FaUser /> Mon Profil
//               </Link>
//             </li>
//             <li className="nav-item py-2">
//               <Link className="nav-link text-white" to="/apprenant/formations">
//                 <FaBook /> Mes Formations
//               </Link>
//             </li>
//             <li className="nav-item py-2">
//               <Link className="nav-link text-white" to="/apprenant/examens">
//                 <FaCertificate /> Mes Examens
//               </Link>
//             </li>
//             <li className="nav-item py-2">
//               <Link className="nav-link text-white" to="/apprenant/progres">
//                 <FaChartLine /> Progrès
//               </Link>
//             </li>
//             <li className="nav-item py-2">
//               <Link className="nav-link text-white" to="/apprenant/visio">
//                 <FaVideo /> Visioconférences
//               </Link>
//             </li>
//             <li className="nav-item py-2">
//               <Link className="nav-link text-white" to="/apprenant/certifications">
//                 <FaCertificate /> Certifications
//               </Link>
//             </li>
//             <li className="nav-item py-2">
//               <Link className="nav-link text-white" to="/apprenant/settings">
//                 <FaCog /> Paramètres
//               </Link>
//             </li>
//           </ul>
//           <footer className="mt-auto text-center">
//             <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
//           </footer>
//         </div>

//         {/* Contenu Principal - Mes Cours */}
//         <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//           <div className="bg-white shadow rounded p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
//             <h2 className="text-primary mb-4 text-center" style={{ fontWeight: "bold" }}>
//               📚 Mes Formations
//             </h2>
//             <div className="border rounded p-4">
//               <ul className="list-group">
//                 <li className="list-group-item d-flex justify-content-between align-items-center">
//                   Introduction à la programmation
//                   {/* <span className="badge bg-success">Complété</span> */}
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between align-items-center">
//                   Développement web
//                   {/* <span className="badge bg-warning text-dark">En cours</span> */}
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between align-items-center">
//                   Algorithmie
//                   {/* <span className="badge bg-primary">Débuté</span> */}
//                 </li>
//                 {/* Ajouter dynamiquement ici */}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Formation;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaChartLine, FaVideo, FaCertificate, FaCog, FaUser } from "react-icons/fa";
import axios from "axios";
import NavbarMinimal from "../components/NavbarMinimal";

function Formation() {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/inscrits", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assure-toi que le token est stocké ici
      },
    })
    .then((res) => {
      // Extraire uniquement les objets formation
      const formationsInscrites = res.data.map((inscrit) => inscrit.formation);
      setFormations(formationsInscrites);
    })
    .catch((err) => {
      console.error("Erreur lors du chargement des formations :", err);
    });
  }, []);

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

        {/* Contenu Principal - Mes Formations */}
        <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          <div className="bg-white shadow rounded p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2 className="text-primary mb-4 text-center" style={{ fontWeight: "bold" }}>
              📚 Mes Formations
            </h2>
            <div className="border rounded p-4">
              <ul className="list-group">
                {formations.length > 0 ? (
                  formations.map((formation) => (
                    <li
                      key={formation.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {formation.titre}
                      <button className="btn btn-primary btn-sm">Accéder</button>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-center">
                    Aucune formation trouvée.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formation;

