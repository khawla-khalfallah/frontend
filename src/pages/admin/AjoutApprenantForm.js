import React, { useState } from 'react';
import axios from '../../config/axios';

const AjoutApprenantForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    niveau_etude: '',
  });

  const [errors, setErrors] = useState({}); // ← Pour afficher les erreurs

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/apprenants', formData);
      alert("✅ Apprenant ajouté avec succès !");
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        niveau_etude: '',
      });
      setErrors({});
      onSuccess(); // Recharge la liste
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log('🛑 Erreurs Laravel :', error.response.data.errors);
        setErrors(error.response.data.errors); // ← On récupère les erreurs de validation
      } else {
        alert("Erreur inconnue.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          className="form-control"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        {errors.nom && <div className="text-danger">{errors.nom[0]}</div>}
      </div>

      <div className="mb-2">
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          className="form-control"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
        {errors.prenom && <div className="text-danger">{errors.prenom[0]}</div>}
      </div>

      <div className="mb-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="text-danger">{errors.email[0]}</div>}
      </div>

      <div className="mb-2">
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <div className="text-danger">{errors.password[0]}</div>}
      </div>

      <div className="mb-2">
        <input
          type="text"
          name="niveau_etude"
          placeholder="Niveau d'étude"
          className="form-control"
          value={formData.niveau_etude}
          onChange={handleChange}
          required
        />
        {errors.niveau_etude && <div className="text-danger">{errors.niveau_etude[0]}</div>}
      </div>

      <button className="btn btn-success" type="submit">✅ Ajouter</button>
    </form>
  );
};

export default AjoutApprenantForm;
