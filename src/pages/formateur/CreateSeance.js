import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateSeance = ({ token, onSuccess }) => {
  const [titreSeance, setTitreSeance] = useState("");
  const [date, setDate] = useState("");
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [lienRoom, setLienRoom] = useState("");
  const [formationId, setFormationId] = useState("");
  const [formations, setFormations] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/formations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormations(res.data);
      } catch (err) {
        console.error("❌ Erreur chargement formations :", err);
      }
    };
    fetchFormations();
  }, [token]);
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
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <div className="mb-3">
        <label className="form-label">Titre de la séance</label>
        <input
          type="text"
          className="form-control"
          value={titreSeance}
          onChange={(e) => setTitreSeance(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Heure début</label>
        <input
          type="time"
          className="form-control"
          value={heureDebut}
          onChange={(e) => setHeureDebut(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Heure fin</label>
        <input
          type="time"
          className="form-control"
          value={heureFin}
          onChange={(e) => setHeureFin(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Lien (Google Meet, Zoom...)</label>
        <input
          type="url"
          className="form-control"
          value={lienRoom}
          onChange={(e) => setLienRoom(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Formation</label>
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

      <button type="submit" className="btn btn-primary">Ajouter</button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default CreateSeance;
