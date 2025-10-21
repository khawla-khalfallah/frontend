import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutPublic from "../../layouts/LayoutPublic";
import "./Apropos.css"; // ✅ Nouveau fichier CSS

function Infos() {
  const [formData, setFormData] = useState({
    name: "",
    prenom: "",
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
      setFormData({ name: "", prenom: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: "Erreur lors de l’envoi. Réessayez." });
    }
  };

  return (
    <LayoutPublic>
      {/* Section Intro futuriste */}
      <header className="apropos-header position-relative text-white text-center">
        <div className="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
        <div className="header-content position-absolute top-50 start-50 translate-middle">
          <h1 className="fw-bold">À Propos de DreamLearn</h1>
          <p className="lead">Une plateforme d'apprentissage en ligne moderne, inclusive et immersive.</p>
        </div>
      </header>

      {/* Section Contact avec carte blanche */}
      <section className="apropos-section">
        <div className="container">
          <div className="apropos-card">
            <h2 className="section-title">Nous Contacter</h2>
            <p className="section-subtitle">Vous avez des questions ? Nous sommes là pour vous aider.</p>

            {status && (
              <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
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
              <div className="col-md-6">
                <label htmlFor="prenom" className="form-label">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  required
                />
              </div>
              <div className="col-md-12">
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
              <div className="col-md-12">
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
              <div className="col-12 text-center">
                <button type="submit" className="btn-modern">Envoyer</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Section Localisation */}
      <section className="apropos-section">
        <div className="container">
          <div className="apropos-card text-center">
            <h2 className="section-title">Notre Localisation</h2>
            <p className="section-subtitle">Nous sommes situés à Djerba Houmt Souk</p>
            <iframe
              title="Localisation Houmt Souk"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13499.032894702688!2d9.71681319602911!3d33.8781053913291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13d75513d30b8e7b%3A0x2d9d100f518e540b!2sHoumt%20Souk%2C%20Djerba!5e0!3m2!1sfr!2stn!4v1710184792921!5m2!1sfr!2stn"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "15px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </LayoutPublic>
  );
}

export default Infos;
