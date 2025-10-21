import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditSeanceForm.css";

const EditSeanceForm = ({ seance, formateurId, token, formations = [], onSuccess, onCancel }) => {
  const [titreSeance, setTitreSeance] = useState("");
  const [date, setDate] = useState("");
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [lienRoom, setLienRoom] = useState("");
  const [formationId, setFormationId] = useState("");
  const [formationsList, setFormationsList] = useState(formations || []);

  const [message, setMessage] = useState(null); // string or null
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Remplir le formulaire à chaque changement de la prop seance
  useEffect(() => {
    if (seance) {
      setTitreSeance(seance.titreSeance || "");
      setDate(seance.date || "");
      setHeureDebut(seance.heureDebut || "");
      setHeureFin(seance.heureFin || "");
      setLienRoom(seance.lienRoom || "");
      setFormationId(seance.formation_id ? String(seance.formation_id) : "");
    }
    setMessage(null);
    setErrors({});
  }, [seance]);
  // Charger uniquement les formations du formateur connecté
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/formateurs/${formateurId}/formations`,
          { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
        );
        setFormationsList(res.data || []);
      } catch (err) {
        console.error("Erreur chargement formations :", err.response?.data || err.message);
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
    setLoading(true);
    setMessage(null);
    setErrors({});

    if (!seance?.id) {
      setMessage("Erreur interne : id de la séance introuvable.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        titreSeance,
        date,
        heureDebut: formatTime(heureDebut),
        heureFin: formatTime(heureFin),
        lienRoom,
        formation_id: formationId ? parseInt(formationId, 10) : null,
      };

      const res = await axios.put(
        `http://localhost:8000/api/seances/${seance.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
      );

      const data = res.data || {};
      setMessage(data.message || "Séance modifiée avec succès ✅");
      if (onSuccess) onSuccess(data.seance || data);
    } catch (err) {
      console.error("Erreur modification séance (frontend) :", err.response?.data || err.message);

      if (err.response?.status === 422 && err.response?.data?.errors) {
        setErrors(err.response.data.errors || {});
        const flat = Object.values(err.response.data.errors).flat();
        setMessage(flat.join(" — "));
      } else if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("❌ Impossible de modifier la séance (erreur réseau ou serveur).");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="edit-seance-card">
      <h5>✏️ Modifier la séance</h5>

      {message && <div className="alert alert-info">{message}</div>}

      {/* Champs titre, date, heures, lien, formation */}
      <div className="mb-2">
        <label>Titre</label>
        <input
          type="text"
          className={`form-control ${errors.titreSeance ? "is-invalid" : ""}`}
          value={titreSeance}
          onChange={(e) => setTitreSeance(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label>Date</label>
        <input
          type="date"
          className={`form-control ${errors.date ? "is-invalid" : ""}`}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label>Heure début</label>
        <input
          type="time"
          className={`form-control ${errors.heureDebut ? "is-invalid" : ""}`}
          value={heureDebut}
          onChange={(e) => setHeureDebut(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label>Heure fin</label>
        <input
          type="time"
          className={`form-control ${errors.heureFin ? "is-invalid" : ""}`}
          value={heureFin}
          onChange={(e) => setHeureFin(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label>Lien de la salle</label>
        <input
          type="url"
          className={`form-control ${errors.lienRoom ? "is-invalid" : ""}`}
          value={lienRoom}
          onChange={(e) => setLienRoom(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label>Formation associée</label>
        <select
          className={`form-select ${errors.formation_id ? "is-invalid" : ""}`}
          value={formationId}
          onChange={(e) => setFormationId(e.target.value)}
          required
        >
          <option value="">Sélectionnez une formation</option>
          {formationsList.map((f) => (
            <option key={f.id} value={f.id}>
              {f.titre}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex gap-2 mt-3">
        <button type="submit" className="btn-orange" disabled={loading}>
          {loading ? "Enregistrement..." : "Modifier"}
        </button>
        <button type="button" className="btn-secondary-uniform" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>

  );
};

export default EditSeanceForm;
