import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Infos() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState(null);

  // Fonction pour gérer le changement des champs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/contact", formData);

      setStatus({ type: "success", message: res.data.message });

      // vider le formulaire
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: "Erreur lors de l’envoi. Réessayez." });
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <img src="/images/logo.jpg" alt="DreamLearn Logo" style={{ height: "50px" }} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">ACCUEIL</Link>
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

      {/* Section À Propos */}
      <section className="intro bg-light p-5 text-center">
        <div className="container">
          <h2 className="display-4 text-primary">Bienvenue sur DreamLearn</h2>
          <p className="lead">Une plateforme d'apprentissage en ligne innovante et inclusive.</p>
        </div>
      </section>

      {/* Section Contact */}
      <section className="contact p-5 text-center">
        <div className="container">
          <h2 className="display-4 text-primary">Nous Contacter</h2>
          <p className="lead">Vous avez des questions ? Nous sommes là pour vous aider.</p>

          {status && (
            <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre email"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Envoyer</button>
          </form>
        </div>
      </section>

      {/* Section Lieu */}
      <section className="lieu bg-light p-5 text-center">
        <div className="container">
          <h2 className="display-4 text-primary">Notre Localisation</h2>
          <p className="lead">Nous sommes situés à Djerba Houmt Souk</p>
          <iframe
            title="Localisation Houmt Souk"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13499.032894702688!2d9.71681319602911!3d33.8781053913291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13d75513d30b8e7b%3A0x2d9d100f518e540b!2sHoumt%20Souk%2C%20Djerba!5e0!3m2!1sfr!2stn!4v1710184792921!5m2!1sfr!2stn"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center p-3 mt-5">
        <div className="container d-flex justify-content-between align-items-center">
          <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f fa-2x"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Infos;
