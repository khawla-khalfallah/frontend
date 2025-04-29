import React from "react";

function Entretiens() {
  return (
    <div className="container mt-4">
      <h2>Planifier les Entretiens</h2>
      <p>Voici la liste des entretiens à planifier :</p>
      <ul>
        <li>Entretien 1 : John Doe - 10/03/2025</li>
        <li>Entretien 2 : Jane Smith - 12/03/2025</li>
        <li>Entretien 3 : Sam Brown - 15/03/2025</li>
        {/* Liste des entretiens */}
      </ul>
    </div>
  );
}

export default Entretiens;

