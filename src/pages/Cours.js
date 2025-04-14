import React from "react";

function Cours() {
  return (
    <div className="container mt-4">
      <h2>Mes Cours</h2>
      <p>Voici la liste de vos cours actuels :</p>
      <ul>
        <li>Cours 1 : Introduction à la programmation</li>
        <li>Cours 2 : Développement web</li>
        <li>Cours 3 : Algorithmie</li>
        {/* Ajoute dynamiquement les cours ici */}
      </ul>
    </div>
  );
}

export default Cours;
