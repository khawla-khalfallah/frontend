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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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

            <div className="mb-3">
              <label className="form-label">Nouveau mot de passe</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="********"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirmer le mot de passe</label>
              <input
                type="password"
                className="form-control"
                name="password_confirmation"
                placeholder="********"
                onChange={handleChange}
                required
              />
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
