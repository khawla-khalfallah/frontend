import React from "react";

function ExamApprenant() {
  return (
    <div className="container mt-4">
      <h2>Mes Examens</h2>
      <p>Voici la liste des examens auxquels vous êtes inscrits :</p>
      <ul>
        <li>Examen 1 : Mathématiques - 10/03/2025</li>
        <li>Examen 2 : Programmation - 12/03/2025</li>
        <li>Examen 3 : Histoire - 15/03/2025</li>
        {/* Liste des examens */}
      </ul>
      <button className="btn btn-primary">Passer un Examen</button>
    </div>
  );
}

export default ExamApprenant;
