import React, { useState } from 'react';
import axios from '../../config/axios';

const EditApprenantForm = ({ apprenant, onSuccess }) => {
  const [niveau, setNiveau] = useState(apprenant.niveau_etude || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/apprenants/${apprenant.id}`, {
        niveau_etude: niveau
      });
      alert("Apprenant modifié !");
      setError('');
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la modification");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Modifier l'apprenant : {apprenant.user.nom} {apprenant.user.prenom}</h5>
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          value={niveau}
          onChange={(e) => setNiveau(e.target.value)}
          placeholder="Niveau d'étude"
          required
        />
      </div>
      {error && <div className="text-danger mb-2">{error}</div>}
      <button className="btn btn-warning me-2" type="submit">✅ Modifier</button>
      <button className="btn btn-secondary" type="button" onClick={onSuccess}>❌ Annuler</button>
    </form>
  );
};

export default EditApprenantForm;
