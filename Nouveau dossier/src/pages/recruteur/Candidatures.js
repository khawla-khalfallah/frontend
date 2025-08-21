import React from "react";

function Candidatures() {
  return (
    <div className="container mt-4">
      <h2>Voir les Candidatures</h2>
      <p>Voici la liste des candidatures pour vos offres :</p>
      <ul>
        <li>Candidat 1 : John Doe - Postulé pour Développeur React</li>
        <li>Candidat 2 : Jane Smith - Postulé pour Développeur Backend Java</li>
        <li>Candidat 3 : Sam Brown - Postulé pour Designer UI/UX</li>
        {/* Liste des candidatures */}
      </ul>
    </div>
  );
}

export default Candidatures;
