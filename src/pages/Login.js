import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import api from '../api';
// import axiosInstance from '../config/axios';

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
      
      // await axiosInstance.get('/sanctum/csrf-cookie');
      const response = await api.post('/login', formData);
      const { token, user } = response.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      // Redirection selon le rôle
      const role = user.role;
      if (role === "admin") {
        navigate("/admin"); 
      } else if (role === "formateur") {
        navigate("/formateur");
      } else if (role === "apprenant") {
        navigate("/apprenant");
      } else if (role === "recruteur") {
        navigate("/recruteur");
      } else {
        navigate("/");
      }
      
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Identifiants invalides.");
      } else {
        alert("Erreur réseau ou serveur.");
      }
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <img src="/images/logo.jpg" alt="DreamLearn Logo" style={{ height: '50px' }} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">ACCUEIL</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/apropos">À PROPOS</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">CONNEXION</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">S'INSCRIRE</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Section Connexion */}
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="row shadow-lg p-4 rounded bg-light login-container">
          {/* Image DreamLearn */}
          <div className="col-md-6 d-none d-md-flex align-items-center">
            <img src="/images/about.jpg" alt="DreamLearn Login" className="img-fluid rounded" />
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

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center p-3 mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>

          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
              <i className="fab fa-facebook-f fa-2x"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
