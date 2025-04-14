import React from "react";

function Settings() {
  return (
    <div className="container mt-4">
      <h2>Paramètres</h2>
      <p>Gérez vos paramètres de compte :</p>
      <form>
        <div className="mb-3">
          <label className="form-label">Nom d'utilisateur</label>
          <input type="text" className="form-control" placeholder="Nom d'utilisateur" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input type="password" className="form-control" placeholder="Mot de passe" />
        </div>
        <button type="submit" className="btn btn-primary">Sauvegarder les modifications</button>
      </form>
    </div>
  );
}

export default Settings;
