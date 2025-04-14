import React from "react";

function Profile() {
  return (
    <div className="container mt-4">
      <h2>Mon Profil</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Nom : John Doe</h5>
          <p className="card-text">Email : johndoe@example.com</p>
          <p className="card-text">Status : Apprenant</p>
          {/* Détails du profil de l'apprenant */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
