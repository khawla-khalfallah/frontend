import React from "react";

function Offres() {
  return (
    <div className="container mt-4">
      <h2>Gérer les Offres</h2>
      <p>Voici la liste de vos offres d'emploi :</p>
      <ul>
        <li>Offre 1 : Développeur React</li>
        <li>Offre 2 : Développeur Backend Java</li>
        <li>Offre 3 : Designer UI/UX</li>
        {/* Affiche la liste des offres disponibles */}
      </ul>
    </div>
  );
}

export default Offres;
