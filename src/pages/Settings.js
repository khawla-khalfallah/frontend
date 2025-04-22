import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ajout de l'importation pour Link
import { FaUser, FaBook, FaCertificate, FaChartLine, FaVideo, FaCog } from "react-icons/fa"; // Ajout des icônes
import NavbarMinimal from "../components/NavbarMinimal"; // Ajout de l'importation de NavbarMinimal si tu l'as

function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas !");
      return;
    }

    // Tu pourrais ici envoyer les données à ton API Laravel pour les mettre à jour

    setMessage("Modifications enregistrées avec succès !");
  };

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="bg-dark text-white p-3 vh-100 d-flex flex-column"
          style={{ width: "250px" }}
        >
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
              <Link
                className="nav-link text-white"
                to="/apprenant/certifications"
              >
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
                <label className="form-label">Nom d'utilisateur</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              <button type="submit" className="btn btn-primary w-100">
                Sauvegarder les modifications
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
