import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

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
    <div className="container mt-5">
      <h2>Réinitialiser le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" placeholder="Email" name="email" onChange={handleChange} required />
        <input type="password" className="form-control mt-2" placeholder="Nouveau mot de passe" name="password" onChange={handleChange} required />
        <input type="password" className="form-control mt-2" placeholder="Confirmez le mot de passe" name="password_confirmation" onChange={handleChange} required />
        <button className="btn btn-success mt-3" type="submit">Réinitialiser</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default ResetPassword;
