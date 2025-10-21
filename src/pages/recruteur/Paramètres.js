import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutRecruteur from "../../layouts/RecruteurLayout"; // Layout commun
// import "./Paramètres.css";


function Parametres() {
  const [user, setUser] = useState(null);
  const [entreprise, setEntreprise] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNom(res.data.nom);
        setPrenom(res.data.prenom);
        setUser(res.data);
        setEmail(res.data.email);
        setEntreprise(res.data.recruteur?.entreprise || "");
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
        `http://localhost:8000/api/recruteurs/${user.recruteur.user_id}`,
        {
          nom,
          prenom,
          email,
          password,
          entreprise,
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
    <LayoutRecruteur>
      <div className="settings-form-container">
        <div className="settings-form-card">
          <h2>⚙️ Paramètres du compte Recruteur</h2>

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
              <label className="form-label">Entreprise</label>
              <input
                type="text"
                className="form-control"
                value={entreprise}
                onChange={(e) => setEntreprise(e.target.value)}
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
    </LayoutRecruteur>
  );
}

export default Parametres;
