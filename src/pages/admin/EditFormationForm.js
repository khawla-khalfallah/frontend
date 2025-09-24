import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';

const EditFormationForm = ({ formation, onSuccess }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    prix:  '',
    date_debut:'',
    date_fin: ''
  });
   useEffect(() => {
      setFormData({
        titre: formation.titre|| '',
        description : formation.description|| '',
        prix : formation.prix|| '',
        date_debut : formation.date_debut|| '',
        date_fin: formation.date_fin|| '',
      });
    }, [formation]);

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    // 🚨 Vérification côté front
    if (formData.date_fin && formData.date_fin < today) {
      alert("❌ La date de fin doit être supérieure ou égale à aujourd’hui.");
      return;
    }

    if (formData.date_debut && formData.date_fin && formData.date_fin < formData.date_debut) {
      alert("❌ La date de fin doit être après ou égale à la date de début.");
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/formations/${formation.id}`, formData);
      alert("Formation modifiée !");
      setErrors({});
      onSuccess(); // 🔁 recharge la liste
    } catch (err) {
      console.error(err);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        alert("Erreur lors de la modification.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>✏️ Modifier : {formation.titre}</h5>

      <input
        name="titre"
        className="form-control mb-2"
        value={formData.titre}
        onChange={handleChange}
        required
      />
      {errors.titre && <div className="text-danger">{errors.titre[0]}</div>}

      <textarea
        name="description"
        className="form-control mb-2"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="number"
        name="prix"
        className="form-control mb-2"
        value={formData.prix}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date_debut"
        className="form-control mb-2"
        value={formData.date_debut}
        onChange={handleChange}
        min={new Date().toISOString().split("T")[0]} // empêche date début passée

      />

      <input
        type="date"
        name="date_fin"
        className="form-control mb-2"
        value={formData.date_fin}
        onChange={handleChange}
        min={formData.date_debut || new Date().toISOString().split("T")[0]} // empêche date fin < date_debut
      />

      <button className="btn btn-warning me-2" type="submit">✅ Modifier</button>
      <button className="btn btn-secondary" type="button" onClick={onSuccess}>❌ Annuler</button>
    </form>
  );
};

export default EditFormationForm;
