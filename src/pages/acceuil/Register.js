import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
    niveau_etude: "",
    specialite: "",
    bio: "",
    entreprise: "",
    cv: null,
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Gestion des inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ handleSubmit avec commentaires explicatifs
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.role) {
      setErrorMessage("Veuillez sélectionner un rôle !");
      return;
    }

    try {
      // 1. Configuration Axios
      axios.defaults.withCredentials = true;

      // 2. Récupération CSRF Token
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      let response;

      // 3. Préparation des données et envoi inscription
      if (formData.role === "formateur") {
        // Si Formateur → on utilise FormData pour inclure le CV
        const formDataToSend = new FormData();
        formDataToSend.append("nom", formData.nom);
        formDataToSend.append("prenom", formData.prenom);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("password_confirmation", formData.password_confirmation);
        formDataToSend.append("role", formData.role);
        formDataToSend.append("specialite", formData.specialite);
        formDataToSend.append("bio", formData.bio);

        if (formData.cv) {
          formDataToSend.append("cv", formData.cv);
        }

        // 3. Envoi inscription (Formateur)
        response = await axios.post("http://127.0.0.1:8000/api/users", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Autres rôles → envoi JSON normal
        const dataToSend = {
          ...formData,
          specialite: formData.role === "formateur" ? formData.specialite : "",
          bio: formData.role === "formateur" ? formData.bio : "",
          entreprise: formData.role === "recruteur" ? formData.entreprise : "",
          niveau_etude: formData.role === "apprenant" ? formData.niveau_etude : "",
        };

        // 3. Envoi inscription (Autres rôles)
        response = await axios.post("http://127.0.0.1:8000/api/users", dataToSend);
      }

      // 4. Connexion automatique
      if (response.status === 201) {
        try {
          const loginResponse = await axios.post(
            "http://127.0.0.1:8000/api/login",
            { email: formData.email, password: formData.password },
            { headers: { "Content-Type": "application/json", Accept: "application/json" } }
          );

          // 5. Stockage des infos
          localStorage.setItem("token", loginResponse.data.token);
          localStorage.setItem("user", JSON.stringify(loginResponse.data.user));

          // 6. Redirection
          navigate(
            loginResponse.data.user.role === "formateur"
              ? "/formateur/Formateur"
              : loginResponse.data.user.role === "apprenant"
              ? "/apprenant"
              : loginResponse.data.user.role === "recruteur"
              ? "/recruteur"
              : "/"
          );
        } catch (loginError) {
          console.error("Erreur connexion auto:", loginError);
          setMessage("Inscription réussie! Veuillez vous connecter");
          navigate("/login");
        }
      }
    } catch (error) {
      // Gestion erreurs
      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors).flat();
        setErrorMessage(errors.join("\n"));
      } else {
        setErrorMessage(error.response?.data?.message || "Erreur lors de l'inscription");
      }
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
              <li className="nav-item"><Link className="nav-link" to="/">ACCUEIL</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/apropos">À PROPOS</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">CONNEXION</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">S'INSCRIRE</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Formulaire */}
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="row shadow-lg p-4 rounded bg-light register-container">
          <div className="col-md-6 d-none d-md-flex align-items-center">
            <img src="/images/about.jpg" alt="Inscription DreamLearn" className="img-fluid rounded" />
          </div>

          <div className="col-md-6 p-4">
            <h1 className="text-primary fw-bold text-center">DreamLearn</h1>
            <p className="text-muted text-center">Inscrivez-vous et commencez à apprendre</p>
            {message && <div className="alert alert-success">{message}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Prénom</label>
                <input type="text" className="form-control" name="prenom" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Nom</label>
                <input type="text" className="form-control" name="nom" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Mot de passe</label>
                <input type="password" className="form-control" name="password" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmer le mot de passe</label>
                <input type="password" className="form-control" name="password_confirmation" onChange={handleChange} required />
              </div>

              {/* Sélection rôle */}
              <div className="mb-3">
                <label className="form-label">Votre rôle :</label><br />
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="role" value="apprenant" onChange={handleChange} />
                  <label className="form-check-label">Apprenant</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="role" value="formateur" onChange={handleChange} />
                  <label className="form-check-label">Formateur</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="role" value="recruteur" onChange={handleChange} />
                  <label className="form-check-label">Recruteur</label>
                </div>
              </div>

              {formData.role === "apprenant" && (
                <div className="mb-3">
                  <label className="form-label">Niveau d'étude</label>
                  <input type="text" className="form-control" name="niveau_etude" onChange={handleChange} required />
                </div>
              )}

              {formData.role === "formateur" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Spécialité</label>
                    <input type="text" className="form-control" name="specialite" onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Biographie</label>
                    <textarea className="form-control" name="bio" rows="3" onChange={handleChange} required></textarea>
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label">CV (PDF/DOC)</label>
                    <input
                      type="file"
                      className="form-control"
                      name="cv"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFormData({ ...formData, cv: e.target.files[0] })}
                    />
                  </div>
                </>
              )}

              {formData.role === "recruteur" && (
                <div className="mb-3">
                  <label className="form-label">Entreprise</label>
                  <input type="text" className="form-control" name="entreprise" onChange={handleChange} required />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100">S'inscrire</button>

              <p className="mt-3 text-center">
                Déjà un compte ? <Link to="/login" className="text-primary">Connectez-vous</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center p-3 mt-5">
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

export default Register;
