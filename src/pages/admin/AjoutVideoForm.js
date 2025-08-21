import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';

const AjoutVideoForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    titre: '',
    url: '',
    description: '',
    formation_id: ''
  });

  const [formations, setFormations] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/formations').then(res => setFormations(res.data));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/videos', formData);
      alert('Vidéo ajoutée !');
      onSuccess();
      setErrors({});
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        alert('Erreur lors de l\'ajout.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>➕ Ajouter une vidéo</h5>

      <input name="titre" className="form-control mb-2" placeholder="Titre" onChange={handleChange} required />
      {errors.titre && <div className="text-danger">{errors.titre[0]}</div>}

      <input name="url" className="form-control mb-2" placeholder="Lien vidéo (URL)" onChange={handleChange} required />
      {errors.url && <div className="text-danger">{errors.url[0]}</div>}

      <textarea name="description" className="form-control mb-2" placeholder="Description" onChange={handleChange}></textarea>
      {errors.description && <div className="text-danger">{errors.description[0]}</div>}

      <select name="formation_id" className="form-control mb-2" onChange={handleChange} required>
        <option value="">🎓 Choisir une formation</option>
        {formations.map(f => (
          <option key={f.id} value={f.id}>{f.titre}</option>
        ))}
      </select>
      {errors.formation_id && <div className="text-danger">{errors.formation_id[0]}</div>}

      <button className="btn btn-success">✅ Ajouter</button>
    </form>
  );
};

export default AjoutVideoForm;
