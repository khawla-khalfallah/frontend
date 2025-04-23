import React, { useState } from 'react';
import axios from '../../config/axios';

const EditRecruteurForm = ({ recruteur, onSuccess }) => {
  const [entreprise, setEntreprise] = useState(recruteur.entreprise || '');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`/api/recruteurs/${recruteur.id}`, {
        entreprise
      });
      alert("Recruteur modifié !");
      setError('');
      onSuccess(); // 🔁 recharge la liste
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la modification.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>✏️ Modifier le recruteur : {recruteur.user.nom} {recruteur.user.prenom}</h5>

      <input
        type="text"
        className="form-control mb-2"
        value={entreprise}
        onChange={(e) => setEntreprise(e.target.value)}
        placeholder="Nom de l'entreprise"
        required
      />

      {error && <div className="text-danger mb-2">{error}</div>}

      <button type="submit" className="btn btn-warning me-2">✅ Modifier</button>
      <button type="button" className="btn btn-secondary" onClick={onSuccess}>❌ Annuler</button>
    </form>
  );
};

export default EditRecruteurForm;
