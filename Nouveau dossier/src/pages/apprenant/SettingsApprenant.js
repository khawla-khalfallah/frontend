import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarApprenant from "../../components/SidebarApprenant";


function SettingsApprenant() {
  const [user, setUser] = useState(null);
  const [niveauEtude, setNiveauEtude] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:8000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setNom(res.data.nom);
        setPrenom(res.data.prenom);
        setUser(res.data);
        setEmail(res.data.email);
        setNiveauEtude(res.data.apprenant?.niveau_etude || "");
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
      await axios.put(`http://localhost:8000/api/apprenants/${user.apprenant.id}`, {
        nom,
        prenom,
        email,
        password,
        niveau_etude: niveauEtude
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage("✅ Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur mise à jour :", error);
      setMessage("❌ Une erreur est survenue.");
    }
  };

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
       <SidebarApprenant/>
        {/* Contenu principal - Paramètres */}
        <div
          className="p-5"
          style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}
        >
          <div className="bg-white shadow rounded p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2 className="text-primary mb-4 text-center" style={{ fontWeight: "bold" }}>
              ⚙️ Paramètres du compte
            </h2>
            
            {/* Message de succès ou d'erreur */}
            {message && <div className="alert alert-info text-center">{message}</div>}

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
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmer le mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Niveau d'étude</label>
                <input
                  type="text"
                  className="form-control"
                  value={niveauEtude}
                  onChange={(e) => setNiveauEtude(e.target.value)}
                />
              </div>
              <div className="text-center mt-4">
              <button className="btn btn-primary" type="submit">💾 Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsApprenant;
