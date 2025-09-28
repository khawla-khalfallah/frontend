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

            <div className="mb-3 text-start">
              <label className="form-label">Mot de passe</label>
              <input type="password" className="form-control" name="password" onChange={handleChange} required />
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
