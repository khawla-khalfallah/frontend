import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css"; // Pour les styles personnalisés
import image from "../assets/imageacceuil.jpg";

function Home() {
  return (
    <div>
      {/* Navbar accessible */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
        <div className="container">
          <img src="/images/logo.jpg" alt="DreamLearn Logo" style={{ height: '50px' }} aria-hidden="true" />     
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Rechercher" 
                  aria-label="Champ de recherche" 
                />
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" aria-label="Page d'accueil">ACCUEIL</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/apropos" aria-label="À propos de DreamLearn">À PROPOS</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" aria-label="Se connecter">CONNEXION</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register" aria-label="Créer un compte">S'INSCRIRE</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tables" aria-label="Créer un compte">TEST</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Section d'accueil accessible */}
      <header className="header position-relative text-white text-center">
        <img src={image} alt="Illustration représentant l'apprentissage en ligne" className="img-fluid w-100" />
        <div className="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
        <div className="header-content position-absolute top-50 start-50 translate-middle">
          <h1 className="fw-bold">Avec DreamLearn, le savoir est à portée de clic !</h1>
        </div>
      </header>

      {/* Pied de page accessible */}
      <footer className="footer bg-dark text-white text-center p-3 mt-5" role="contentinfo">
        <div className="d-flex justify-content-between align-items-center">
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

export default Home;
