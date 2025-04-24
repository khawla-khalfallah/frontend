import React, { useState,useEffect} from 'react';
import axios from '../../config/axios';

const EditFormateurForm = ({ formateur, onSuccess }) => {
  const [specialite, setSpecialite] = useState('');
  const [bio, setBio] = useState('');
  useEffect(() => {
    setSpecialite(formateur.specialite || '');
    setBio(formateur.bio || '');
  }, [formateur]);
    
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`/api/formateurs/${formateur.user_id}`, {
        specialite,
        bio
      });
      alert("Formateur modifié !");
      setError('');
      onSuccess(); // 🔁 recharge la liste
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la modification");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Modifier le formateur : {formateur.user.nom} {formateur.user.prenom}</h5>

      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          value={specialite}
          onChange={(e) => setSpecialite(e.target.value)}
          placeholder="Spécialité"
          required
        />
      </div>

      <div className="mb-2">
        <textarea
          className="form-control"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          required
        />
      </div>

      {error && <div className="text-danger mb-2">{error}</div>}

      <button className="btn btn-warning me-2" type="submit">✅ Modifier</button>
      <button className="btn btn-secondary" type="button" onClick={onSuccess}>❌ Annuler</button>
    </form>
  );
};

export default EditFormateurForm;
