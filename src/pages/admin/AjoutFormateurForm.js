import React, { useState } from 'react';
import axios from '../../config/axios';

const AjoutFormateurForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    specialite: '',
    bio: '',
    cv: null
  });

  const [errors, setErrors] = useState({});

   const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      setFormData({ ...formData, cv: files[0] }); // récupérer le fichier
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

    const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nom", formData.nom);
      formDataToSend.append("prenom", formData.prenom);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("specialite", formData.specialite);
      formDataToSend.append("bio", formData.bio);
      if (formData.cv) {
        formDataToSend.append("cv", formData.cv);
      }

      await axios.post('http://localhost:8000/api/formateurs', formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Formateur ajouté !");
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
      <h5>➕ Ajouter un formateur</h5>

      <input name="nom" className="form-control mb-2" placeholder="Nom" onChange={handleChange} required />
      {errors.nom && <div className="text-danger">{errors.nom[0]}</div>}
      <input name="prenom" className="form-control mb-2" placeholder="Prénom" onChange={handleChange}  required/>
      {errors.prenom && <div className="text-danger">{errors.prenom[0]}</div>}
      <input name="email" type="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} required />
      {errors.email && <div className="text-danger">{errors.email[0]}</div>}
      <input name="password" type="password" className="form-control mb-2" placeholder="Mot de passe" onChange={handleChange} required />
      {errors.password && <div className="text-danger">{errors.password[0]}</div>}
      <input name="specialite" className="form-control mb-2" placeholder="Spécialité" onChange={handleChange}  required/>
      {errors.specialite && <div className="text-danger">{errors.specialite[0]}</div>}
      <textarea name="bio" className="form-control mb-2" placeholder="Bio" onChange={handleChange} required></textarea>
      {errors.bio && <div className="text-danger">{errors.bio[0]}</div>}
       <input type="file" className="form-control mb-2" name="cv" onChange={handleChange} required />
      {errors.cv && <div className="text-danger">{errors.cv[0]}</div>}
      
      <button type="submit" className="btn btn-success">✅ Ajouter</button>
    </form>
  );
};

export default AjoutFormateurForm;
