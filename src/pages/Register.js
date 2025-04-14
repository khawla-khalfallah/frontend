// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios"; // Importer axios
// import "bootstrap/dist/css/bootstrap.min.css";

// function Register() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     password_confirmation: "",  // Ajout de la confirmation du mot de passe
//     role: "",
//   });
//   const [message, setMessage] = useState(""); // Message d'inscription réussie
//   const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.role) {
//       alert("Veuillez sélectionner un rôle avant de vous inscrire !");
//       return;
//     }

//     try {
//       // Active l'envoi des cookies avec les requêtes
//       axios.defaults.withCredentials = true;

//       // Récupérer le token CSRF depuis Sanctum
//       await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

//       // Envoyer la requête d'inscription après récupération du CSRF token
//       const response = await axios.post("http://127.0.0.1:8000/register", formData);

//       if (response.status === 201) {
//           setMessage("✅ Inscription réussie ! Redirection en cours...");

//           setTimeout(() => {
//               navigate(`/${formData.role}`);
//           }, 3000);
//       }
//   } catch (error) {
//       if (error.response) {
//           setErrorMessage(`Erreur : ${error.response.data.message}`);
//       } else {
//           setErrorMessage("Erreur réseau !");
//       }
//   }
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container">
//           <img src="/images/logo.jpg" alt="DreamLearn Logo" style={{ height: "50px" }} />
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item"><Link className="nav-link" to="/">ACCUEIL</Link></li>
//               <li className="nav-item"><Link className="nav-link" to="/apropos">À PROPOS</Link></li>
//               <li className="nav-item"><Link className="nav-link" to="/login">CONNEXION</Link></li>
//               <li className="nav-item"><Link className="nav-link" to="/register">S'INSCRIRE</Link></li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Section Inscription */}
//       <div className="container d-flex align-items-center justify-content-center vh-100">
//         <div className="row shadow-lg p-4 rounded bg-light register-container">
//           <div className="col-md-6 d-none d-md-flex align-items-center">
//             <img src="/images/about.jpg" alt="Inscription DreamLearn" className="img-fluid rounded" />
//           </div>

//           {/* Formulaire d'inscription */}
//           <div className="col-md-6 p-4">
//             <h1 className="text-primary fw-bold text-center">DreamLearn</h1>
//             <p className="text-muted text-center">Inscrivez-vous et commencez à apprendre</p>
//             {message && <div className="alert alert-success">{message}</div>} {/* Message de succès */}
//             {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Message d'erreur */}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Prénom</label>
//                 <input type="text" className="form-control" name="firstName" onChange={handleChange} required />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Nom</label>
//                 <input type="text" className="form-control" name="lastName" onChange={handleChange} required />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <input type="email" className="form-control" name="email" onChange={handleChange} required />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Mot de passe</label>
//                 <input type="password" className="form-control" name="password" onChange={handleChange} required />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Confirmer le mot de passe</label>
//                 <input type="password" className="form-control" name="password_confirmation" onChange={handleChange} required />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Vous êtes :</label>
//                 <select className="form-select" name="role" onChange={handleChange} required>
//                   <option value="">Sélectionnez un rôle</option>
//                   <option value="apprenant">Apprenant</option>
//                   <option value="formateur">Formateur</option>
//                   <option value="recruteur">Recruteur</option>
//                 </select>
//               </div>
//               <button type="submit" className="btn btn-primary w-100">S'inscrire</button>

//               <p className="mt-3 text-center">
//                 Déjà un compte ? <Link to="/login" className="text-primary">Connectez-vous</Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="footer bg-dark text-white text-center p-3 mt-5">
//         <div className="d-flex justify-content-between align-items-center">
//           <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>

//           <div className="social-icons">
//             <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
//               <i className="fab fa-facebook-f fa-2x"></i>
//             </a>
//             <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
//               <i className="fab fa-instagram fa-2x"></i>
//             </a>
//             <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
//               <i className="fab fa-youtube fa-2x"></i>
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Register;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Veuillez sélectionner un rôle avant de vous inscrire !");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setErrorMessage("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      // Active l'envoi des cookies avec les requêtes
      axios.defaults.withCredentials = true;

      // Récupérer le token CSRF depuis Sanctum
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // Envoyer la requête d'inscription après récupération du CSRF token
      const response = await axios.post("http://127.0.0.1:8000/register", formData);

      if (response.status === 201) {
        setMessage("✅ Inscription réussie ! Redirection en cours...");

        setTimeout(() => {
          navigate("/login"); // Rediriger vers la page de connexion ou tableau de bord
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(`Erreur : ${error.response.data.message}`);
      } else {
        setErrorMessage("Erreur réseau !");
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

      {/* Section Inscription */}
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="row shadow-lg p-4 rounded bg-light register-container">
          <div className="col-md-6 d-none d-md-flex align-items-center">
            <img src="/images/about.jpg" alt="Inscription DreamLearn" className="img-fluid rounded" />
          </div>

          {/* Formulaire d'inscription */}
          <div className="col-md-6 p-4">
            <h1 className="text-primary fw-bold text-center">DreamLearn</h1>
            <p className="text-muted text-center">Inscrivez-vous et commencez à apprendre</p>
            {message && <div className="alert alert-success">{message}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Prénom</label>
                <input type="text" className="form-control" name="firstName" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Nom</label>
                <input type="text" className="form-control" name="lastName" onChange={handleChange} required />
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
              <div className="mb-3">
                <label className="form-label">Vous êtes :</label>
                <select className="form-select" name="role" onChange={handleChange} required>
                  <option value="">Sélectionnez un rôle</option>
                  <option value="apprenant">Apprenant</option>
                  <option value="formateur">Formateur</option>
                  <option value="recruteur">Recruteur</option>
                </select>
              </div>
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
