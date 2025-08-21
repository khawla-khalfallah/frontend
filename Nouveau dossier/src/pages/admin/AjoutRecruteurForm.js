import React, { useState } from 'react';
import axios from '../../config/axios';

const AjoutRecruteurForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    entreprise: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/recruteurs', formData);
      alert("Recruteur ajouté !");
      setErrors({});
      onSuccess();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        alert("Erreur lors de l'ajout.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>➕ Ajouter un recruteur</h5>

      <input name="nom" className="form-control mb-2" placeholder="Nom" onChange={handleChange} required />
      {errors.nom && <div className="text-danger">{errors.nom[0]}</div>}

      <input name="prenom" className="form-control mb-2" placeholder="Prénom" onChange={handleChange} required />
      {errors.prenom && <div className="text-danger">{errors.prenom[0]}</div>}

      <input name="email" type="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} required />
      {errors.email && <div className="text-danger">{errors.email[0]}</div>}

      <input name="password" type="password" className="form-control mb-2" placeholder="Mot de passe" onChange={handleChange} required />
      {errors.password && <div className="text-danger">{errors.password[0]}</div>}

      <input name="entreprise" className="form-control mb-2" placeholder="Entreprise" onChange={handleChange} required />
      {errors.entreprise && <div className="text-danger">{errors.entreprise[0]}</div>}

      <button type="submit" className="btn btn-success">✅ Ajouter</button>
    </form>
  );
};

export default AjoutRecruteurForm;
