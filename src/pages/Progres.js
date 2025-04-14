import React from "react";

function Progres() {
  return (
    <div className="container mt-4">
      <h2>Progrès</h2>
      <p>Voici votre progression :</p>
      <div className="card">
        <h5>Cours : Introduction à la programmation</h5>
        <p>Progrès : 80%</p>
      </div>
      <div className="card">
        <h5>Cours : Développement web</h5>
        <p>Progrès : 60%</p>
      </div>
      {/* Affiche la progression des cours de l'apprenant */}
    </div>
  );
}

export default Progres;
