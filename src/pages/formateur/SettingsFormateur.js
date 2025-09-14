// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import NavbarMinimal from "../../components/NavbarMinimal";
// import SidebarFormateur from "../../components/SidebarFormateur";
// import "./SettingsFormateur.css"

// function SettingsFormateur() {
//   const [user, setUser] = useState(null);
//   const [nom, setNom] = useState("");
//   const [prenom, setPrenom] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [bio, setBio] = useState("");
//   const [specialite, setSpecialite] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios.get("http://localhost:8000/api/profile", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//         setUser(res.data);
//         setNom(res.data.nom);
//         setPrenom(res.data.prenom);
//         setEmail(res.data.email);
//         setBio(res.data.formateur?.bio || "");
//         setSpecialite(res.data.formateur?.specialite || "");
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password && password !== confirmPassword) {
//       setMessage("❌ Les mots de passe ne correspondent pas !");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     try {
//          await axios.put(`http://localhost:8000/api/formateurs/${user.formateur.user_id}`, { 
//             nom,
//         prenom,
//         email,
//         password,
//         bio,
//         specialite
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setMessage("✅ Profil mis à jour avec succès !");
//     } catch (error) {
//       console.error("Erreur mise à jour :", error);
//       setMessage("❌ Une erreur est survenue.");
//     }
//   };

//   return (
//     <div>
//       <NavbarMinimal />
//       <div className="d-flex">
//         <SidebarFormateur />
//         {/* Contenu principal */}
//         <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//           <div className="bg-white shadow rounded p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
//             <h2 className="text-primary mb-4 text-center" style={{ fontWeight: "bold" }}>
//               ⚙️ Paramètres du compte Formateur
//             </h2>

//             {message && <div className="alert alert-info text-center">{message}</div>}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Nom</label>
//                 <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Prénom</label>
//                 <input type="text" className="form-control" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Mot de passe</label>
//                 <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Confirmer le mot de passe</label>
//                 <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Bio</label>
//                 <textarea className="form-control" value={bio} onChange={(e) => setBio(e.target.value)} rows="3"></textarea>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Spécialité</label>
//                 <input type="text" className="form-control" value={specialite} onChange={(e) => setSpecialite(e.target.value)} />
//               </div>

//               <div className="text-center mt-4">
//                 <button className="btn btn-primary" type="submit">💾 Enregistrer</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SettingsFormateur;
import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutFormateur from "../../layouts/FormateurLayout"; // ✅ layout commun

import "./SettingsFormateur.css";

function SettingsFormateur() {
  const [user, setUser] = useState(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setNom(res.data.nom);
        setPrenom(res.data.prenom);
        setEmail(res.data.email);
        setBio(res.data.formateur?.bio || "");
        setSpecialite(res.data.formateur?.specialite || "");
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage("❌ Les mots de passe ne correspondent pas !");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:8000/api/formateurs/${user.formateur.user_id}`,
        {
          nom,
          prenom,
          email,
          password,
          bio,
          specialite,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("✅ Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur mise à jour :", error);
      setMessage("❌ Une erreur est survenue.");
    }
  };

  return (
   <LayoutFormateur>
        <div className="settings-form-container">
          <div className="settings-form-card">
            <h2>⚙️ Paramètres du compte Formateur</h2>

            {message && <div className="alert">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirmer le mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea
                  className="form-control"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="3"
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Spécialité</label>
                <input
                  type="text"
                  className="form-control"
                  value={specialite}
                  onChange={(e) => setSpecialite(e.target.value)}
                />
              </div>

              <div className="text-center mt-4">
                <button className="btn btn-primary" type="submit">
                  💾 Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </LayoutFormateur>
  );
}

export default SettingsFormateur;
