import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateSeance.css";

const CreateSeance = ({ formateurId, token, onSuccess }) => {
  const [titreSeance, setTitreSeance] = useState("");
  const [date, setDate] = useState("");
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [lienRoom, setLienRoom] = useState("");
  const [formationId, setFormationId] = useState("");
  const [formations, setFormations] = useState([]);
  const [message, setMessage] = useState("");
  // Charger uniquement les formations du formateur connecté
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/formateurs/${formateurId}/formations`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFormations(res.data);
      } catch (err) {
        console.error("❌ Erreur chargement formations :", err);
        setMessage("❌ Impossible de charger vos formations.");
      }
    };
    if (formateurId) fetchFormations();
  }, [formateurId, token]);
  const formatTime = (time) => {
    if (time && time.length === 5) {
      return time + ":00"; // 14:30 → 14:30:00
    }
    return time;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/seances",
        {
          titreSeance,
          date,
          heureDebut: formatTime(heureDebut),
          heureFin: formatTime(heureFin),
          lienRoom,
          formation_id: formationId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Séance ajoutée avec succès !");
      setTitreSeance("");
      setDate("");
      setHeureDebut("");
      setHeureFin("");
      setLienRoom("");
      setFormationId("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("❌ Erreur ajout séance :", err.response || err.message);
      setMessage("❌ Impossible d’ajouter la séance.");
    }
  };

  return (
    <div className="seance-form-card">
      <h5 className="form-title"> 💻 Ajouter une Séance</h5>
      <form onSubmit={handleSubmit} className="seance-form-card">
        <div className="mb-3">
          <label>Titre de la séance</label>
          <input
            type="text"
            className="form-control"
            value={titreSeance}
            onChange={(e) => setTitreSeance(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Heure début</label>
          <input
            type="time"
            className="form-control"
            value={heureDebut}
            onChange={(e) => setHeureDebut(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Heure fin</label>
          <input
            type="time"
            className="form-control"
            value={heureFin}
            onChange={(e) => setHeureFin(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Lien (Google Meet, Zoom...)</label>
          <input
            type="url"
            className="form-control"
            value={lienRoom}
            onChange={(e) => setLienRoom(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Formation</label>
          <select
            className="form-select"
            value={formationId}
            onChange={(e) => setFormationId(e.target.value)}
            required
          >
            <option value="">-- Sélectionner une formation --</option>
            {formations.map((f) => (
              <option key={f.id} value={f.id}>
                {f.titre}
              </option>
            ))}
          </select>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-warning-uniform">
            ➕  Ajouter Séance
          </button>
        </div>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default CreateSeance;