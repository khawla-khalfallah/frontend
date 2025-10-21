import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import LayoutPublic from "../../layouts/LayoutPublic"; // ✅ Import du layout
import "./ResetPassword.css"; // ✅ Import du style



function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", password_confirmation: "" });
  const [message, setMessage] = useState("");
  // États pour afficher/masquer les mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/reset-password", { ...form, token });
      setMessage(res.data.message);
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur.");
    }
  };

  return (
    <LayoutPublic>
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="reset-container p-5">
          <h1 className="text-center mb-3">Réinitialiser le mot de passe</h1>
          <p className="text-muted text-center mb-4">
            Entrez votre email et votre nouveau mot de passe 🔐
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Adresse email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="exemple@mail.com"
                onChange={handleChange}
                required
              />
            </div>
            {/* Champ nouveau mot de passe */}
            <div className="mb-3 text-start">
              <label className="form-label">Nouveau mot de passe</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  placeholder="********"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleShowPassword}
                  title={showPassword ? "Masquer" : "Afficher"}
                >
                  {showPassword ? (
                    // Icône œil ouvert
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    // Icône œil barré
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.36 18.36 0 0 1 5.06-5.94"></path>
                      <path d="M1 1l22 22"></path>
                      <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Champ confirmation */}
            <div className="mb-3 text-start">
              <label className="form-label">Confirmer le mot de passe</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  name="password_confirmation"
                  placeholder="********"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleShowConfirmPassword}
                  title={showConfirmPassword ? "Masquer" : "Afficher"}
                >
                  {showConfirmPassword ? (
                    // Icône œil ouvert
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    // Icône œil barré
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.36 18.36 0 0 1 5.06-5.94"></path>
                      <path d="M1 1l22 22"></path>
                      <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Réinitialiser
            </button>
          </form>

          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
    </LayoutPublic>
  );
}

export default ResetPassword;
