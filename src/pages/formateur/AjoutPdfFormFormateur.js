import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AjoutPdfFormFormateur.css"; // ✅ On importe notre style

const AjoutPdfFormFormateur = ({ formateurId, token, onSuccess }) => {
  const [formData, setFormData] = useState({
    titre: "",
    fichier: null,
    formation_id: "",
  });

  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Charger les formations du formateur
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
        setMessage("❌ Erreur lors du chargement des formations.");
      }
    };
    if (formateurId) fetchFormations();
  }, [formateurId, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("titre", formData.titre);
    data.append("fichier", formData.fichier);
    data.append("formation_id", formData.formation_id);

    try {
      await axios.post("http://localhost:8000/api/pdfs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ PDF ajouté avec succès !");
      setFormData({ titre: "", fichier: null, formation_id: "" });
      onSuccess();
    } catch (err) {
      console.error("Erreur ajout PDF:", err.response || err.message);

      if (err.response?.status === 422) {
        setMessage("❌ Erreur validation : Vérifie les champs !");
      } else if (err.response?.status === 403) {
        setMessage("🚫 Vous n'êtes pas autorisé à ajouter ce PDF.");
      } else {
        setMessage("⚠️ Erreur serveur lors de l'ajout du PDF.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-form-card shadow-sm rounded p-4">
      <h5 className="form-title">📑 Ajouter un PDF</h5>
      {message && <p className="form-message">{message}</p>}

      <form onSubmit={handleSubmit} className="mt-3">
        {/* Champ Titre */}
        <div className="mb-3">
          <label className="form-label">Titre du PDF</label>
          <input
            type="text"
            name="titre"
            className="form-control"
            placeholder="Ex : Cours de React"
            value={formData.titre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Upload fichier */}
        <div className="mb-3">
          <label className="form-label">Fichier PDF</label>
          <input
            type="file"
            name="fichier"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        {/* Choix formation */}
        <div className="mb-3">
          <label className="form-label">Formation associée</label>
          <select
            name="formation_id"
            className="form-select"
            value={formData.formation_id}
            onChange={handleChange}
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

        {/* Bouton */}
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-warning-uniform"
            disabled={loading}
          >
            {loading ? "⏳ Ajout en cours..." : "➕ Ajouter PDF"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AjoutPdfFormFormateur;
