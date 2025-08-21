import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const AjoutInscritForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    apprenant_id: '',
    formation_id: '',
  });
  const [apprenants, setApprenants] = useState([]);
  const [formations, setFormations] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/apprenants').then(res => setApprenants(res.data));
    axios.get('http://localhost:8000/api/formations').then(res => setFormations(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/inscrits', formData);
      alert("Inscription ajoutée !");
      onSuccess();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else if (err.response?.status === 409) {
        alert("⚠️ L'apprenant est déjà inscrit à cette formation.");
      } else {
        alert("Erreur lors de l'ajout.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>➕ Ajouter une inscription</h5>

      <select name="apprenant_id" className="form-control mb-2" onChange={handleChange} required>
        <option value="">👤 Choisir un apprenant</option>
        {apprenants.map(a => (
          <option key={a.user_id} value={a.user_id}>{a.user?.nom} {a.user?.prenom}</option>
        ))}
      </select>
      {errors.apprenant_id && <div className="text-danger">{errors.apprenant_id[0]}</div>}

      <select name="formation_id" className="form-control mb-2" onChange={handleChange} required>
        <option value="">📚 Choisir une formation</option>
        {formations.map(f => (
          <option key={f.id} value={f.id}>{f.titre}</option>
        ))}
      </select>
      {errors.formation_id && <div className="text-danger">{errors.formation_id[0]}</div>}

      <button type="submit" className="btn btn-success">✅ Inscrire</button>
    </form>
  );
};

export default AjoutInscritForm;