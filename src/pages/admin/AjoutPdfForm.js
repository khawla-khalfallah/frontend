import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const AjoutPdfForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    titre: '',
    fichier: null,
    formation_id: ''
  });
  const [formations, setFormations] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/formations').then(res => setFormations(res.data));
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'fichier') {
      setFormData({ ...formData, fichier: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('titre', formData.titre);
    data.append('fichier', formData.fichier);
    data.append('formation_id', formData.formation_id);

    try {
      await axios.post('http://localhost:8000/api/pdfs', data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('PDF ajouté !');
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
    <form onSubmit={handleSubmit} className="mb-4" encType="multipart/form-data">
      <h5>➕ Ajouter un PDF</h5>

      <input
        type="text"
        name="titre"
        placeholder="Titre"
        className="form-control mb-2"
        onChange={handleChange}
        required
      />
      {errors.titre && <div className="text-danger mb-2">{errors.titre[0]}</div>}

      <input
        type="file"
        name="fichier"
        accept="application/pdf"
        className="form-control mb-2"
        onChange={(e) => setFormData({ ...formData, fichier: e.target.files[0] })}
        required
      />
      {errors.fichier && <div className="text-danger mb-2">{errors.fichier[0]}</div>}

      <select
        name="formation_id"
        className="form-control mb-2"
        onChange={handleChange}
        required
      >
        <option value="">🎓 Choisir une formation</option>
        {formations.map(f => (
          <option key={f.id} value={f.id}>{f.titre}</option>
        ))}
      </select>
      {errors.formation_id && <div className="text-danger mb-2">{errors.formation_id[0]}</div>}

      <button type="submit" className="btn btn-success">✅ Ajouter</button>
    </form>
  );
};

export default AjoutPdfForm;
