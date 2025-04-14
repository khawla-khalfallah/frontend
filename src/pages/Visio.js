import React from "react";

function Visio() {
  return (
    <div className="container mt-4">
      <h2>Visioconférences</h2>
      <p>Voici la liste de vos prochaines visioconférences :</p>
      <ul>
        <li>Visioconférence 1 : Introduction au développement web - 10:00 AM</li>
        <li>Visioconférence 2 : Introduction à l'algorithmie - 02:00 PM</li>
        {/* Liste des visioconférences */}
      </ul>
    </div>
  );
}

export default Visio;
