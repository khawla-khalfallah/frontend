import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const EditInscritForm = ({ inscrit, onSuccess }) => {
  const [formData, setFormData] = useState({
    apprenant_id: inscrit.apprenant_id,
    formation_id: inscrit.formation_id
  });
  const [apprenants, setApprenants] = useState([]);
  const [formations, setFormations] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      apprenant_id: inscrit.apprenant_id,
      formation_id: inscrit.formation_id
    });
  }, [inscrit]);

  useEffect(() => {
    // Charger les apprenants avec les données utilisateur
    axios.get('http://localhost:8000/api/apprenants?with_user=true')
      .then(res => setApprenants(res.data))
      .catch(err => console.error("Erreur chargement apprenants:", err));
    
    axios.get('http://localhost:8000/api/formations')
      .then(res => setFormations(res.data))
      .catch(err => console.error("Erreur chargement formations:", err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/inscrits/${inscrit.id_inscrit}`, formData);
      alert("Inscription modifiée !");
      setErrors({});
      onSuccess();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else if (err.response?.status === 409) {
        alert("⚠️ L'apprenant est déjà inscrit à cette formation.");
      } else {
        alert("Erreur lors de la modification.");
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>✏️ Modifier l'inscription #{inscrit.id_inscrit}</h5>

      <select
        name="apprenant_id"
        className="form-control mb-2"
        value={formData.apprenant_id}
        onChange={handleChange}
        required
      >
        <option value="">👤 Choisir un apprenant</option>
        {apprenants.map(a => (
          a.user && (
            <option key={a.user_id} value={a.user_id}>
              {a.user.nom} {a.user.prenom}
            </option>
          )
        ))}
      </select>
      {errors.apprenant_id && (
        <div className="text-danger mb-2">{errors.apprenant_id[0]}</div>
      )}

      <select
        name="formation_id"
        className="form-control mb-2"
        value={formData.formation_id}
        onChange={handleChange}
        required
      >
        <option value="">📚 Choisir une formation</option>
        {formations.map(f => (
          <option key={f.id} value={f.id}>{f.titre}</option>
        ))}
      </select>
      {errors.formation_id && (
        <div className="text-danger mb-2">{errors.formation_id[0]}</div>
      )}

      <button className="btn btn-warning me-2" type="submit">✅ Modifier</button>
      <button className="btn btn-secondary" type="button" onClick={onSuccess}>❌ Annuler</button>
    </form>
  );
};

export default EditInscritForm;