import React from "react";

function Etudiants() {
  return (
    <div className="container mt-4">
      <h2>Étudiants</h2>
      <p>Liste des étudiants inscrits à vos cours :</p>
      <ul>
        <li>Étudiant 1 : Ahmed</li>
        <li>Étudiant 2 : Sarah</li>
        <li>Étudiant 3 : Ali</li>
        {/* Liste d'étudiants dynamiquement */}
      </ul>
    </div>
  );
}

export default Etudiants;
