import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditVideoFormFormateur.css";

const EditVideoFormFormateur = ({ video, token, formateurId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    titre: video.titre || "",
    url: video.url || "",
    description: video.description || "",
    formation_id: video.formation_id ? parseInt(video.formation_id, 10) : "",
  });

  const [formations, setFormations] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 📌 Charger les formations du formateur
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/formateurs/${formateurId}/formations`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFormations(res.data);
      } catch (err) {
        console.error("❌ Erreur chargement formations:", err);
        setMessage("❌ Impossible de charger les formations.");
      }
    };

    if (formateurId) fetchFormations();
  }, [formateurId, token]);

  // 📌 Gérer changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "formation_id" ? parseInt(value, 10) : value,
    });
  };

  // 📌 Soumission formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.put(
        `http://localhost:8000/api/videos/${video.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("✅ Vidéo mise à jour avec succès !");
      onSuccess();
    } catch (err) {
      console.error("❌ Erreur mise à jour vidéo:", err.response || err.message);

      if (err.response?.status === 422) {
        setMessage("❌ Vérifiez les champs, certains sont invalides.");
      } else if (err.response?.status === 403) {
        setMessage("🚫 Vous n'êtes pas autorisé à modifier cette vidéo.");
      } else {
        setMessage("⚠️ Erreur serveur lors de la mise à jour.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="video-form-card mt-3">
      {message && <p className="alert">{message}</p>}

      <input
        type="text"
        name="titre"
        className="form-control mb-2"
        placeholder="Titre de la vidéo"
        value={formData.titre}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="url"
        className="form-control mb-2"
        placeholder="URL de la vidéo"
        value={formData.url}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        className="form-control mb-2"
        placeholder="Description (optionnelle)"
        value={formData.description}
        onChange={handleChange}
      />

      <select
        name="formation_id"
        className="form-control mb-2"
        value={formData.formation_id}
        onChange={handleChange}
        required
      >
        <option value="">-- Choisir une formation --</option>
        {formations.map((f) => (
          <option key={f.id} value={f.id}>
            {f.titre}
          </option>
        ))}
      </select>

      <div className="d-flex gap-2">
        <button type="submit" className="btn-orange" disabled={loading}>
          {loading ? "En cours..." : "Modifier"}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
};

export default EditVideoFormFormateur;
