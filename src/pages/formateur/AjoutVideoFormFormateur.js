import React, { useEffect, useState } from "react";
import axios from "axios";

const AjoutVideoFormFormateur = ({ formateurId, token, onSuccess }) => {
  const [formData, setFormData] = useState({
    titre: "",
    url: "",
    description: "",
    formation_id: ""
  });
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/formateurs/${formateurId}/formations`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFormations(res.data);
      } catch (err) {
        console.error("Erreur chargement formations:", err);
      }
    };
    fetchFormations();
  }, [formateurId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/videos", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSuccess();
      setFormData({ titre: "", url: "", description: "", formation_id: "" });
    } catch (err) {
      console.error("Erreur ajout vidéo:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        type="text"
        name="titre"
        placeholder="Titre de la vidéo"
        className="form-control mb-2"
        value={formData.titre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="url"
        placeholder="URL de la vidéo"
        className="form-control mb-2"
        value={formData.url}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="form-control mb-2"
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
      <button type="submit" className="btn btn-primary">Ajouter Vidéo</button>
    </form>
  );
};

export default AjoutVideoFormFormateur;
