import React, { useEffect, useState } from "react";

function Visio() {
  const [visioconferences, setVisioconferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les visioconférences depuis l'API
  useEffect(() => {
    const fetchVisioconferences = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/visioconferences"); // Remplace l'URL par celle de ton API Laravel
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des visioconférences");
        }
        const data = await response.json();
        setVisioconferences(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVisioconferences();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <h2>Visioconférences</h2>
        <p>Chargement des visioconférences...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h2>Visioconférences</h2>
        <p>Une erreur s'est produite : {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Visioconférences</h2>
      <p>Voici la liste de vos prochaines visioconférences :</p>
      <ul>
        {visioconferences.length > 0 ? (
          visioconferences.map((visioconference, index) => (
            <li key={index}>
              {visioconference.titre} - {visioconference.heure}
            </li>
          ))
        ) : (
          <li>Aucune visioconférence à venir.</li>
        )}
      </ul>
    </div>
  );
}

export default Visio;
