import React, { useEffect, useState } from "react";
import axios from "axios";
import LayoutApprenant from "../../layouts/LayoutApprenant"; // ✅ Utilisation du layout
import "./ToutesLesFormations.css";

function ToutesLesFormations() {
  const [formations, setFormations] = useState([]);
  const [inscriptions, setInscriptions] = useState([]); // stocker les formations inscrites
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/formations");
        setFormations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchInscriptions = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/inscrits/moi", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // extraire les IDs des formations
        const inscritsIds = res.data.map((i) => i.formation.id);
        setInscriptions(inscritsIds);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFormations();
    fetchInscriptions();
  }, [token]);

  const handleInscription = async (formationId) => {
    try {
      await axios.post(
        "http://localhost:8000/api/inscrits/moi",
        { formation_id: formationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Inscription réussie !");
      setInscriptions([...inscriptions, formationId]);// ajouter formation à la liste
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur d'inscription");
    }
  };
  // Vérifie si la date de fin est expirée
  const isExpired = (dateFin) => {
    const today = new Date();
    return new Date(dateFin) < today;
  };

  return (
    <LayoutApprenant>
      <div className="toutes-formations-container">
        {/* Header */}
        <div className="header">
          <h2 className="title">📚 Toutes les Formations</h2>
          <span className="badge">
            {formations.length} disponibles
          </span>
        </div>

        {/* Liste des formations */}
        <div className="formations-grid">
          {formations.length > 0 ? (
            formations.map((formation) => (
              <div key={formation.id} className="formation-card">
                <div className="card-header">
                  🎓
                </div>
                <div className="card-body">
                  <h5 className="card-title">{formation.titre}</h5>
                  {/* <p className="card-description">
                    {formation.description.length > 120
                      ? formation.description.slice(0, 120) + "..."
                      : formation.description}
                  </p> */}
                  {/* 🔹 nom et prénom */}
                  <p className="formateur-name">
                    👤 Formateur :{" "}
                    {formation.formateur?.user
                      ? `${formation.formateur.user.prenom} ${formation.formateur.user.nom}`
                      : "Nom non disponible"}
                  </p>
                  {/* 🔹 Prix */}
                  <p className="formation-price">
                    💰 Prix : {formation.prix ? formation.prix + " TND" : "Gratuite"}
                  </p>

                  {/* 🔹 Dates */}
                  <p className="formation-dates">
                    📅 Du {formation.date_debut} au {formation.date_fin}
                  </p>

                  {/* Bouton inscription avec vérification de date */}
                  <button
                    onClick={() => handleInscription(formation.id)}
                    className={`btn ${inscriptions.includes(formation.id)
                      ? "btn-inscrit"
                      : isExpired(formation.date_fin)
                        ? "btn-expire"
                        : "btn-inscrire"
                      }`}
                    disabled={
                      inscriptions.includes(formation.id) ||
                      isExpired(formation.date_fin)
                    } // désactiver si déjà inscrit OU expirée
                  >
                    {inscriptions.includes(formation.id)
                      ? "✅ Déjà inscrit"
                      : isExpired(formation.date_fin)
                        ? "⛔ Expirée"
                        : "S'inscrire"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-formation">
              Aucune formation disponible pour le moment.
            </p>
          )}
        </div>
      </div>
    </LayoutApprenant>
  );
}

export default ToutesLesFormations;
