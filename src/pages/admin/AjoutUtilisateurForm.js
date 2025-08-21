import React, { useState } from 'react';
import axios from '../../config/axios';

const AjoutUtilisateurForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
    niveau_etude: '',
    specialite: '',
    bio: '',
    entreprise: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/users', formData);
      alert("Utilisateur ajouté !");
      setErrors({});
      onSuccess();
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        alert("Erreur lors de l'ajout.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input name="nom" className="form-control" placeholder="Nom" onChange={handleChange} />
        {errors.nom && <div className="text-danger">{errors.nom[0]}</div>}
      </div>
      <div className="mb-2">
        <input name="prenom" className="form-control" placeholder="Prénom" onChange={handleChange} />
        {errors.prenom && <div className="text-danger">{errors.prenom[0]}</div>}
      </div>
      <div className="mb-2">
        <input name="email" type="email" className="form-control" placeholder="Email" onChange={handleChange} />
        {errors.email && <div className="text-danger">{errors.email[0]}</div>}
      </div>
      <div className="mb-2">
        <input name="password" type="password" className="form-control" placeholder="Mot de passe" onChange={handleChange} />
        {errors.password && <div className="text-danger">{errors.password[0]}</div>}
      </div>
      <div className="mb-2">
        <input name="password_confirmation" type="password" className="form-control" placeholder="Confirmer le mot de passe" onChange={handleChange}/>
        {errors.password && <div className="text-danger">{errors.password[0]}</div>}
    </div>

      <div className="mb-2">
        <select name="role" className="form-control" onChange={handleChange}>
          <option value="">-- Choisir un rôle --</option>
          <option value="apprenant">Apprenant</option>
          <option value="formateur">Formateur</option>
          <option value="recruteur">Recruteur</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <div className="text-danger">{errors.role[0]}</div>}
       
        {formData.role === 'apprenant' && (
            <div className="mb-2">
                <input name="niveau_etude" className="form-control" placeholder="Niveau d'étude" onChange={handleChange} />
                {errors.niveau_etude && <div className="text-danger">{errors.niveau_etude[0]}</div>}
            </div>
            )}
        {formData.role === 'formateur' && (
            <>
            <div className="mb-2">
                <input name="specialite" className="form-control" placeholder="Spécialité" onChange={handleChange} />
                {errors.specialite && <div className="text-danger">{errors.specialite[0]}</div>}
                </div>
                <div className="mb-2">
                <textarea name="bio" className="form-control" placeholder="Bio" onChange={handleChange} />
                {errors.bio && <div className="text-danger">{errors.bio[0]}</div>}
                </div>
            </>
            )}
        {formData.role === 'recruteur' && (
            <div className="mb-2">
                <input name="entreprise" className="form-control" placeholder="Nom de l'entreprise" onChange={handleChange} />
                {errors.entreprise && <div className="text-danger">{errors.entreprise[0]}</div>}
            </div>
            )}

      </div>
      <button type="submit" className="btn btn-success">✅ Ajouter</button>
    </form>
  );
};

export default AjoutUtilisateurForm;
