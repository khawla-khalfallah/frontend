import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import image from "../../assets/imageacceuil.jpg";
import axios from "axios";
import FormationCard from "../apprenant/FormationCard";

function Home() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [m, setM] = useState(10); // Seuil de confiance par défaut
  const [C, setC] = useState(3.5); // Note globale par défaut
  const navigate = useNavigate();

  const handleViewDetails = (formationId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Afficher une alerte et rediriger vers la page d'inscription
      if (window.confirm("Vous devez créer un compte pour voir les détails de la formation. Voulez-vous vous inscrire maintenant ?")) {
        navigate("/register");
      }
    } else {
      navigate(`/formations/${formationId}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // Charger les formations avec leurs évaluations
    axios.get("http://localhost:8000/api/formations?withEvaluations=true", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // Calculer les scores bayésiens pour chaque formation
      const formationsWithScores = response.data.map(formation => {
        const v = formation.evaluations?.length || 0;
        const R = formation.evaluations?.reduce((sum, e) => sum + e.note, 0) / v || 0;
        
        // Calcul du score bayésien
        const bayesian_score = v > 0 
          ? (v / (v + m)) * R + (m / (v + m)) * C 
          : C;

        // Calcul de la durée en jours
        const dateDebut = new Date(formation.date_debut);
        const dateFin = new Date(formation.date_fin);
        const dureeEnMs = dateFin - dateDebut;
        const dureeEnJours = Math.ceil(dureeEnMs / (1000 * 60 * 60 * 24));

        return {
          ...formation,
          average_rating: R,
          bayesian_score,
          evaluations_count: v,
          duree: dureeEnJours
        };
      });

      setFormations(formationsWithScores);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error loading data:", error);
      setLoading(false);
    });
  }, [m, C]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

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
      
      <div className="container mt-5">
        <h2 className="text-center mb-4">Nos Formations</h2>
        
        {/* Paramètres de calcul */}
        <div className="card mb-4">
          <div className="card-body">
            <h5>Paramètres de classement</h5>
            <div className="row">
              <div className="col-md-6">
                <label>Seuil de confiance (m): {m}</label>
                <input 
                  type="range" 
                  className="form-range" 
                  min="1" 
                  max="20" 
                  value={m}
                  onChange={(e) => setM(Number(e.target.value))}
                />
                <small className="text-muted">
                  Plus m est élevé, plus on se fie à la moyenne globale
                </small>
              </div>
              <div className="col-md-6">
                <label>Note globale (C): {C.toFixed(1)}</label>
                <input 
                  type="range" 
                  className="form-range" 
                  min="1" 
                  max="5" 
                  step="0.1"
                  value={C}
                  onChange={(e) => setC(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {formations.map((formation) => (
            <div className="col" key={formation.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{formation.titre}</h5>
                  <p className="card-text">{formation.description}</p>
                  
                  {/* Ajout des informations de date et prix */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span><strong>Début:</strong> {new Date(formation.date_debut).toLocaleDateString()}</span>
                      <span><strong>Fin:</strong> {new Date(formation.date_fin).toLocaleDateString()}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <span><strong>Durée:</strong> {formation.duree} jours</span>
                      <span><strong>Prix:</strong> {formation.prix} TND</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h6>Score pondéré: {formation.bayesian_score?.toFixed(2) || 'N/A'}</h6>
                    <div className="progress">
                      <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: `${(formation.bayesian_score / 5) * 100}%` }}
                        aria-valuenow={formation.bayesian_score}
                        aria-valuemin="0"
                        aria-valuemax="5"
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h6>Moyenne: {formation.average_rating?.toFixed(2) || 'N/A'}</h6>
                    <div className="progress">
                      <div 
                        className="progress-bar bg-info" 
                        role="progressbar" 
                        style={{ width: `${(formation.average_rating / 5) * 100}%` }}
                        aria-valuenow={formation.average_rating}
                        aria-valuemin="0"
                        aria-valuemax="5"
                      ></div>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-primary">
                      {formation.evaluations_count || 0} avis
                    </span>
                    <button
                      onClick={() => handleViewDetails(formation.id)}
                      className="btn btn-outline-primary"
                    >
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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