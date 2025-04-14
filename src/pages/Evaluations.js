import React from "react";

function Evaluations() {
  return (
    <div className="container mt-4">
      <h2>Évaluations</h2>
      <p>Évaluations des étudiants :</p>
      <div className="card">
        <h5>Cours : Introduction à la programmation</h5>
        <p>Évaluation finale : 85%</p>
      </div>
      <div className="card">
        <h5>Cours : Développement web</h5>
        <p>Évaluation finale : 90%</p>
      </div>
      {/* Ajoute des évaluations dynamiquement */}
    </div>
  );
}

export default Evaluations;
