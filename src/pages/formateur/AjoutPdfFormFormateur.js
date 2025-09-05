import React, { useEffect, useState } from "react";
import axios from "axios";

const AjoutPdfFormFormateur = ({ formateurId, token, onSuccess }) => {
  const [formData, setFormData] = useState({
    titre: "",
    fichier: null,
    formation_id: ""
  });
  const [formations, setFormations] = useState([]);

  // Charger seulement les formations de ce formateur
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
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      onSuccess();
      setFormData({ titre: "", fichier: null, formation_id: "" });
    } catch (err) {
      console.error("Erreur ajout PDF:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        type="text"
        name="titre"
        placeholder="Titre du PDF"
        className="form-control mb-2"
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
      <button type="submit" className="btn btn-primary">Ajouter PDF</button>
    </form>
  );
};

export default AjoutPdfFormFormateur;
