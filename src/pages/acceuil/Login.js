import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import api from '../../api';
import LayoutPublic from "../../layouts/LayoutPublic"; // ✅ Import du layout
import ElearningImage from '../../assets/e-learning-platform-development.jpg'; // adapte le chemin et l'extension
// import axiosInstance from '../config/axios';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert("Veuillez entrer votre email et mot de passe.");
      return;
    }

    try {
      const response = await api.post('/login', formData);
      const { token, user } = response.data;

      // 🔹 Vérifier si c'est un formateur non validé
      if (user.role === "formateur") {
        if (user.status === "en attente") {
          alert("⏳ Votre compte est en attente de validation par l’administrateur.");
          return;
        }
        if (user.status === "refuse") {
          alert("❌ Votre compte formateur a été refusé. Contactez l’administrateur.");
          return;
        }
      }

      // ✅ Si validé → on continue la connexion
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirection selon le rôle
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "formateur") {
        navigate("/formateur/Formateur");
      } else if (user.role === "apprenant") {
        navigate("/apprenant");
      } else if (user.role === "recruteur") {
        navigate("/recruteur");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        // 🔹 Cas refusé → afficher la remarque si dispo
        if (error.response.data.remarque) {
          alert(`❌ Votre inscription a été refusée.\n\nRaison : ${error.response.data.remarque}`);
        } else {
          alert(error.response.data.message || "Identifiants invalides.");
        }
      } else {
        alert("Erreur réseau ou serveur.");
      }
    }
  };

  const toggleShowPassword = () => setShowPassword(s => !s);

  return (
    <LayoutPublic>
      {/* Section Connexion */}
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="row shadow-lg p-4 rounded bg-light login-container">
          {/* Image DreamLearn */}
          <div className="col-md-6 d-none d-md-flex align-items-center">
            <img src={ElearningImage} alt="DreamLearn Login" className="img-fluid rounded" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>

          {/* Formulaire de connexion */}
          <div className="col-md-6 p-4 text-center">
            <h1 className="text-primary fw-bold">DreamLearn</h1>
            <p className="text-muted">Connectez-vous à votre compte</p>

            <div className="mb-3 text-start">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" onChange={handleChange} required />
            </div>

            {/* <div className="mb-3 text-start">
              <label className="form-label">Mot de passe</label>
              <input type="password" className="form-control" name="password" onChange={handleChange} required />
            </div> */}
            {/* Champ mot de passe avec toggle */}
            <div className="mb-3 text-start">
              <label className="form-label">Mot de passe</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-label="Mot de passe"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleShowPassword}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  title={showPassword ? "Masquer" : "Afficher"}
                >
                  {/* Icônes SVG (œil / œil barré) */}
                  {showPassword ? (
                    // eye (afficher)
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    // eye slash (masquer)
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.36 18.36 0 0 1 5.06-5.94"></path>
                      <path d="M1 1l22 22"></path>
                      <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>


            {/* Boutons de connexion directs */}
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleLogin}>
                Se connecter
              </button>
            </div>


            {/* Lien d'inscription et mot de passe oublié */}
            <div className="text-center mt-3">
              <Link to="/forgot-password" className="text-danger">Mot de passe oublié ?</Link>
            </div>
            <p className="mt-3">
              Vous n'avez pas de compte ? <Link to="/register" className="text-primary">Inscrivez-vous</Link>
            </p>
          </div>
        </div>
      </div>

    </LayoutPublic>
  );
}

export default Login;
