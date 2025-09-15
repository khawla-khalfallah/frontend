import React, { useState } from "react";
import api from "../../api";
import LayoutPublic from "../../layouts/LayoutPublic"; // ✅ Import du layout
import "./ForgotPassword.css"; // ✅ Import du style



function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur.");
    }
  };

  return (
    <LayoutPublic>
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="forgot-container p-5">
          <h1 className="text-center mb-3">Mot de passe oublié</h1>
          <p className="text-muted text-center mb-4">
            Entrez votre email pour recevoir un lien de réinitialisation 🔑
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Adresse email</label>
              <input
                type="email"
                className="form-control"
                placeholder="exemple@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Envoyer le lien
            </button>
          </form>

          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
    </LayoutPublic>
  );
}

export default ForgotPassword;
