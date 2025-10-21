import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutPublic from "../../layouts/LayoutPublic"; // ✅ Import du layout
import ElearningImage from '../../assets/e-learning-platform-development.jpg'; // adapte le chemin et l'extension
import "./Register.css";


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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Gestion des inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // ✅ handleSubmit avec commentaires explicatifs
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // 1. Vérifier que le rôle est bien choisi
    if (!formData.role) {
      setErrorMessage("Veuillez sélectionner un rôle !");
      return;
    }

    try {
      // 2. Configuration Axios pour CSRF
      axios.defaults.withCredentials = true;

      // 3. Récupération du CSRF Token
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      let response;

      // 4. Cas FORMATEUR → création avec CV obligatoire
      if (formData.role === "formateur") {
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

        // 5. Envoi inscription (Formateur)
        response = await axios.post("http://127.0.0.1:8000/api/users", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // 6. Pas de login auto → afficher un message + redirection
        if (response.status === 201) {
          if (window.confirm("✅ Votre compte formateur est créé ! ⏳ Il doit être validé par un administrateur avant connexion.\n\nCliquez sur OK pour retourner à l’accueil.")) {
            navigate("/"); // redirection accueil
          }
        }


        return; // ❌ On stoppe ici → pas de tentative de login auto
      }

      // 7. Cas APPRENANT ou RECRUTEUR
      const dataToSend = {
        ...formData,
        specialite: formData.role === "formateur" ? formData.specialite : "",
        bio: formData.role === "formateur" ? formData.bio : "",
        entreprise: formData.role === "recruteur" ? formData.entreprise : "",
        niveau_etude: formData.role === "apprenant" ? formData.niveau_etude : "",
      };

      response = await axios.post("http://127.0.0.1:8000/api/users", dataToSend);

      // 8. Connexion automatique si inscription réussie
      if (response.status === 201) {
        try {
          const loginResponse = await axios.post(
            "http://127.0.0.1:8000/api/login",
            { email: formData.email, password: formData.password },
            { headers: { "Content-Type": "application/json", Accept: "application/json" } }
          );

          // 9. Sauvegarde token + user
          localStorage.setItem("token", loginResponse.data.token);
          localStorage.setItem("user", JSON.stringify(loginResponse.data.user));

          // 10. Redirection selon rôle
          navigate(
            loginResponse.data.user.role === "apprenant"
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
      // 11. Gestion des erreurs backend
      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors).flat();
        setErrorMessage(errors.join("\n"));
      } else {
        setErrorMessage(error.response?.data?.message || "Erreur lors de l'inscription");
      }
    }
  };
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (

    <LayoutPublic>
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="register-wrapper row">

          {/* ✅ Image à gauche */}
          <div className="col-md-6 d-none d-md-flex align-items-center">
            <img src={ElearningImage} alt="DreamLearn Login" className="img-fluid rounded" style={{ maxWidth: '105%', height: 'auto' }} />
          </div>

          {/* ✅ Formulaire */}
          <div className="col-12 col-lg-6 p-5 d-flex flex-column justify-content-center">
            <h1 className="text-primary fw-bold text-center mb-2">DreamLearn</h1>
            <p className="text-muted text-center mb-4">
              Inscrivez-vous et commencez à apprendre 🚀
            </p>

            {message && <div className="alert alert-success">{message}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
              {/* Prénom */}
              <div className="mb-3">
                <label className="form-label">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  name="prenom"
                  onChange={handleChange}
                  required
                  pattern="^[a-zA-ZÀ-ÿ\s]+$"
                  title="Seulement des lettres et espaces"
                />
              </div>

              {/* Nom */}
              <div className="mb-3">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  name="nom"
                  onChange={handleChange}
                  required
                  pattern="^[a-zA-ZÀ-ÿ\s]+$"
                  title="Seulement des lettres et espaces"
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  required
                  pattern="^[\w\.-]+@([\w-]+\.)+[a-zA-Z]{2,}$"
                  title="Veuillez entrer une adresse email valide"
                />
              </div>

              {/* Mot de passe */}
              <div className="mb-3 text-start">
                <label className="form-label">Mot de passe</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                    required
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$"
                    title="Min 8 caractères avec majuscule, minuscule, chiffre et caractère spécial"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={toggleShowPassword}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    title={showPassword ? "Masquer" : "Afficher"}
                  >
                    {showPassword ? (
                      // œil (afficher)
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      // œil barré (masquer)
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.36 18.36 0 0 1 5.06-5.94"></path>
                        <path d="M1 1l22 22"></path>
                        <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>


              {/* Confirmation */}
              <div className="mb-3 text-start">
                <label className="form-label">Confirmer le mot de passe</label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    name="password_confirmation"
                    value={formData.password_confirmation || ""}
                    onChange={handleChange}
                    required
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$"
                    title="Doit correspondre au mot de passe"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={toggleShowConfirmPassword}
                    aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    title={showConfirmPassword ? "Masquer" : "Afficher"}
                  >
                    {showConfirmPassword ? (
                      // œil (afficher)
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      // œil barré (masquer)
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.36 18.36 0 0 1 5.06-5.94"></path>
                        <path d="M1 1l22 22"></path>
                        <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>


              {/* Rôle */}
              <div className="mb-3">
                <label className="form-label">Votre rôle :</label><br />
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="role" value="apprenant" onChange={handleChange} />
                    <label className="form-check-label">Apprenant</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="role" value="formateur" onChange={handleChange} />
                    <label className="form-check-label">Formateur</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="role" value="recruteur" onChange={handleChange} />
                    <label className="form-check-label">Recruteur</label>
                  </div>
                </div>
              </div>

              {/* Champs dynamiques */}
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
                  <div className="mb-3">
                    <label className="form-label">CV (PDF/DOC)</label>
                    <input type="file" className="form-control" name="cv" accept=".pdf,.doc,.docx"
                      onChange={(e) => setFormData({ ...formData, cv: e.target.files[0] })} />
                  </div>
                </>
              )}

              {formData.role === "recruteur" && (
                <div className="mb-3">
                  <label className="form-label">Entreprise</label>
                  <input type="text" className="form-control" name="entreprise" onChange={handleChange} required />
                </div>
              )}

              {/* Bouton */}
              <button type="submit" className="btn btn-primary">
                S'inscrire
              </button>

              <p className="mt-3 text-center">
                Déjà un compte ?{" "}
                <Link to="/login" className="text-primary">
                  Connectez-vous
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </LayoutPublic>

  );
}

export default Register;
