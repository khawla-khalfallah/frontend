import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const AjoutFormationForm = ({ onSuccess }) => {
  const [formateurs, setFormateurs] = useState([]);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    prix: '',
    date_debut: '',
    date_fin: '',
    formateur_id: ''
  });
  const [errors, setErrors] = useState({});

  // Charger les formateurs
  useEffect(() => {
    axios.get('http://localhost:8000/api/formateurs')
      .then(res => setFormateurs(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/formations', formData);
      alert("Formation ajoutée !");
      setErrors({});
      onSuccess();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        alert("Erreur lors de l'ajout.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>➕ Ajouter une formation</h5>

      <input
        name="titre"
        className="form-control mb-2"
        placeholder="Titre"
        value={formData.titre}
        onChange={handleChange}
        required
      />
      {errors.titre && <div className="text-danger">{errors.titre[0]}</div>}

      <textarea
        name="description"
        className="form-control mb-2"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="number"
        name="prix"
        className="form-control mb-2"
        placeholder="Prix"
        value={formData.prix}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date_debut"
        className="form-control mb-2"
        value={formData.date_debut}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date_fin"
        className="form-control mb-2"
        value={formData.date_fin}
        onChange={handleChange}
      />

      <select
        name="formateur_id"
        className="form-control mb-2"
        value={formData.formateur_id}
        onChange={handleChange}
        required
      >
        <option value="">👨‍🏫 Choisir un formateur</option>
        {formateurs.map(f => (
          <option key={f.id} value={f.user_id}>
            {f.user?.nom} {f.user?.prenom}
          </option>
        ))}
      </select>
      {errors.formateur_id && <div className="text-danger">{errors.formateur_id[0]}</div>}

      <button type="submit" className="btn btn-success">✅ Ajouter</button>
    </form>
  );
};

export default AjoutFormationForm;
