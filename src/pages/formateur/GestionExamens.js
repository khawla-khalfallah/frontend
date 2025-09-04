import React, { useState, useEffect } from "react";
import axios from "axios";

function GestionExamens() {
  const [examens, setExamens] = useState([]);
  const [nouvelExamen, setNouvelExamen] = useState({ titre: "" });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token"); // si tu utilises token pour auth

  // Fonction pour récupérer les examens depuis l'API
  const fetchExamens = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/examens", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExamens(res.data);
    } catch (error) {
      console.error("Erreur récupération examens :", error);
    }
  };

  useEffect(() => {
    fetchExamens();
  }, []);

  // Fonction pour créer un nouvel examen
  const handleCreateExamen = async () => {
    if (!nouvelExamen.titre) {
      setMessage("Veuillez saisir un titre pour l'examen.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/examens",
        nouvelExamen,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Examen créé avec succès !");
      setNouvelExamen({ titre: "" });
      fetchExamens(); // rafraîchit la liste
    } catch (error) {
      console.error("Erreur création examen :", error);
      setMessage("Erreur lors de la création de l'examen.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Gestion des Examens</h1>

      {/* Formulaire création examen */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Titre de l'examen"
          value={nouvelExamen.titre}
          onChange={(e) =>
            setNouvelExamen({ ...nouvelExamen, titre: e.target.value })
          }
          style={{ padding: "8px", width: "70%", marginRight: "10px" }}
        />
        <button onClick={handleCreateExamen} style={{ padding: "8px 16px" }}>
          Créer Examen
        </button>
      </div>

      {message && <p>{message}</p>}

      {/* Liste des examens */}
      <ul>
        {examens.length > 0 ? (
          examens.map((examen) => (
            <li key={examen.id}>
              {examen.titre} (ID: {examen.id})
            </li>
          ))
        ) : (
          <p>Aucun examen pour le moment.</p>
        )}
      </ul>
    </div>
  );
}

export default GestionExamens;
