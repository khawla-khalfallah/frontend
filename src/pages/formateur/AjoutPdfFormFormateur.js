import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <form onSubmit={handleSubmit} className="mt-3">
      {message && <p>{message}</p>}

      <input
        type="text"
        name="titre"
        className="form-control mb-2"
        placeholder="Titre du PDF"
        value={formData.titre}
        onChange={handleChange}
        required
      />

      <input
        type="file"
        name="fichier"
        className="form-control mb-2"
        onChange={handleChange}
        required
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

      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? "En cours..." : "Ajouter PDF"}
      </button>
    </form>
  );
};

export default AjoutPdfFormFormateur;
