import React, { useState } from "react";
import api from "../../api";

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
    <div className="container mt-5">
      <h2>Mot de passe oublié</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          className="form-control"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="btn btn-primary mt-3" type="submit">Envoyer</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default ForgotPassword;
