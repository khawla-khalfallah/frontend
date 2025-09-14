// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import NavbarMinimal from '../../components/NavbarMinimal';
// import SidebarFormateur from "../../components/SidebarFormateur";


// function ProfilFormateur() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8000/api/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error("Erreur lors du chargement du profil :", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <div>
//       <NavbarMinimal />
//       <div className="d-flex">
//        <SidebarFormateur/>
//         {/* Contenu principal */}
//         <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//           <div className="bg-white shadow rounded p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
//             <h2 className="text-primary mb-4 text-center" style={{ fontWeight: "bold" }}>
//               👤 Mon Profil
//             </h2>
//             {user ? (
//               <div className="border rounded p-4">
//                 <h5 className="text-dark mb-3">Nom : <span className="text-secondary">{user.nom}</span></h5>
//                 <h5 className="text-dark mb-3">Prénom : <span className="text-secondary">{user.prenom}</span></h5>
//                 {user.formateur && (
//                     <>
//                       <h5 className="text-dark mb-3">
//                       Bio : <span className="text-secondary">{user.formateur.bio}</span> </h5>
//                       <h5 className="text-dark mb-3">
//                       Spécialité  : <span className="text-secondary">{user.formateur.specialite}</span></h5>
//                     </>
//               )}
//                 <p className="mb-2">📧 <strong>Email :</strong> {user.email}</p>
//                 <p className="badge bg-info text-dark ms-2">🎓 <strong>Statut :</strong> {user.role}</p>

//                 {/* Bouton Modifier */}
//                 <div className="mt-4 text-center">
//                   <Link to="/formateur/SettingsFormateur" className="btn btn-primary">
//                     ✏️ Modifier le Profil
//                   </Link>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-center">Chargement du profil...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfilFormateur;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LayoutFormateur from "../../layouts/FormateurLayout"; // ✅ layout commun
import "./ProfilFormateur.css"; // tu peux copier ProfilApprenant.css si tu veux le même style

function ProfilFormateur() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du profil :", error);
      }
    };
    fetchProfile();
  }, []);

  const getInitials = (prenom, nom) => {
    if (!prenom && !nom) return "U";
    return `${prenom?.charAt(0) || ""}${nom?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <LayoutFormateur>
      <div className="profile-content">
        <div className="profile-card">
          <h2 className="profile-title">👤 Mon Profil</h2>

          {user ? (
            <div className="profile-details">
              <div className="avatar-container">
                <div className="avatar">{getInitials(user.prenom, user.nom)}</div>
              </div>

              <div className="detail-row">
                <span className="label">Nom :</span>
                <span className="value">{user.nom}</span>
              </div>

              <div className="detail-row">
                <span className="label">Prénom :</span>
                <span className="value">{user.prenom}</span>
              </div>

              {user.formateur && (
                <>
                  <div className="detail-row">
                    <span className="label">Bio :</span>
                    <span className="value">{user.formateur.bio}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Spécialité :</span>
                    <span className="value">{user.formateur.specialite}</span>
                  </div>
                </>
              )}

              <div className="detail-row">
                <span className="label">📧 Email :</span>
                <span className="value">{user.email}</span>
              </div>

              <div className="detail-row">
                <span className="label">Statut :</span>
                <span className="badge">{user.role}</span>
              </div>

              <div className="btn-container">
                <Link to="/formateur/SettingsFormateur" className="btn-edit">
                  ✏️ Modifier le Profil
                </Link>
              </div>
            </div>
          ) : (
            <p className="loading">Chargement du profil...</p>
          )}
        </div>
      </div>
    </LayoutFormateur>
  );
}

export default ProfilFormateur;
