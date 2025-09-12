// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import NavbarMinimal from "../../components/NavbarMinimal";
// import SidebarApprenant from "../../components/SidebarApprenant";

// function MesFormations() {
//   const [formations, setFormations] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     axios.get("http://localhost:8000/api/inscrits/mes", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((res) => {
//       // L'API retourne déjà les formations filtrées pour l'apprenant connecté
//       const formattedFormations = res.data.map(inscrit => ({
//         ...inscrit.formation,
//         date_inscription: inscrit.date_inscription
//       }));
//       setFormations(formattedFormations);
//     })
//     .catch((err) => {
//       console.error("Erreur lors du chargement des formations :", err);
//     });
//   }, [token]);
//   return (
//     <div>
//       <NavbarMinimal />
//       <div className="d-flex">
//         <SidebarApprenant/>
//         {/* Contenu Principal - Mes Formations */}
//         <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//           <div className="bg-white shadow rounded p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
//             <h2 className="text-primary mb-4 text-center" style={{ fontWeight: "bold" }}>
//               📚 Mes Formations
//             </h2>
//             <div className="border rounded p-4">
//             <ul className="list-group">
//                 {formations.length > 0 ? (
//                   formations.map((formation) => (
//                     <li
//                       key={formation.id}
//                       className="list-group-item d-flex justify-content-between align-items-center"
//                     >
//                       <div>
//                         <h6 className="mb-1">{formation.titre}</h6>
//                         <small className="text-muted">📅 Inscrit le {formation.date_inscription}</small>
//                       </div>
//                       <Link to={`/apprenant/formations/${formation.id}`} className="btn btn-primary btn-sm">
//                         Accéder
//                       </Link>
//                     </li>
//                   ))
//                 ) : (
//                   <li className="list-group-item text-center">
//                     Aucune formation trouvée.
//                   </li>
//                 )}
//             </ul>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default MesFormations;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LayoutApprenant from "../../layouts/LayoutApprenant"; // ✅ Utilisation du layout
import "./MesFormations.css";

function MesFormations() {
  const [formations, setFormations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/inscrits/mes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const formattedFormations = res.data.map((inscrit) => ({
          ...inscrit.formation,
          date_inscription: inscrit.date_inscription,
        }));
        setFormations(formattedFormations);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des formations :", err);
      });
  }, [token]);

  return (
    <LayoutApprenant>
      <div className="main-content">
        <div className="mes-formations-container">
          <h2 className="title">📚 Mes Formations</h2>

          {formations.length > 0 ? (
            <div className="formations-grid">
              {formations.map((formation) => (
                <div key={formation.id} className="formation-card">
                  <div className="formation-header">
                    <h5>{formation.titre}</h5>
                  </div>
                  <p className="formation-date">
                    📅 Inscrit le{" "}
                    <span className="date">
                      {new Date(formation.date_inscription).toLocaleDateString(
                        "fr-FR"
                      )}
                    </span>
                  </p>
                  <div className="btn-container">
                    <Link
                      to={`/apprenant/formations/${formation.id}`}
                      className="btn-access"
                    >
                      Accéder
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-formation">Aucune formation trouvée.</p>
          )}
        </div>
      </div>
    </LayoutApprenant>
  );
}

export default MesFormations;
