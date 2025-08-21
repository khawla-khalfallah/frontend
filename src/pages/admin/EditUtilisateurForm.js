import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';

const EditUtilisateurForm = ({ user, onSuccess }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    role: '',
    niveau_etude: '',
    specialite: '',
    bio: '',
    entreprise: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initialData = {
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      niveau_etude: user.apprenant?.niveau_etude || '',
      specialite: user.formateur?.specialite || '',
      bio: user.formateur?.bio || '',
      entreprise: user.recruteur?.entreprise || ''
    };
  
    setFormData(initialData);
  }, [user]);
  

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/users/${user.id}`, formData);
      alert("Utilisateur modifié !");
      setErrors({});
      onSuccess();
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
    <form onSubmit={handleSubmit}>
      <h5>Modifier l'utilisateur : {user.nom} {user.prenom}</h5>

      <div className="mb-2">
        <input name="nom" className="form-control" value={formData.nom} onChange={handleChange} />
        {errors.nom && <div className="text-danger">{errors.nom[0]}</div>}
      </div>

      <div className="mb-2">
        <input name="prenom" className="form-control" value={formData.prenom} onChange={handleChange} />
        {errors.prenom && <div className="text-danger">{errors.prenom[0]}</div>}
      </div>

      <div className="mb-2">
        <input name="email" className="form-control" value={formData.email} onChange={handleChange} />
        {errors.email && <div className="text-danger">{errors.email[0]}</div>}
      </div>

      {formData.role === 'apprenant' && (
        <div className="mb-2">
          <input name="niveau_etude" className="form-control" placeholder="Niveau d'étude" value={formData.niveau_etude} onChange={handleChange} />
        </div>
      )}

      {formData.role === 'formateur' && (
        <>
          <div className="mb-2">
            <input name="specialite" className="form-control" placeholder="Spécialité" value={formData.specialite} onChange={handleChange} />
          </div>
          <div className="mb-2">
            <textarea name="bio" className="form-control" placeholder="Bio" value={formData.bio} onChange={handleChange}></textarea>
          </div>
        </>
      )}

      {formData.role === 'recruteur' && (
        <div className="mb-2">
          <input name="entreprise" className="form-control" placeholder="Entreprise" value={formData.entreprise} onChange={handleChange} />
        </div>
      )}

      <button className="btn btn-warning me-2" type="submit">✅ Modifier</button>
      <button className="btn btn-secondary" type="button" onClick={onSuccess}>❌ Annuler</button>
    </form>
  );
};

export default EditUtilisateurForm;
