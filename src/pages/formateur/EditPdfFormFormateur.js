import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const EditPdfFormFormateur = ({ pdf, onSuccess, onClose, formateurId }) => {
  const [formData, setFormData] = useState({
    titre: pdf?.titre || '',
    fichier: null,
    formation_id: pdf?.formation_id || ''
  });
  const [formations, setFormations] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Charger seulement les formations du formateur connecté
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const res = await axios.get(`/formations?formateur_id=${formateurId}`);
        setFormations(res.data); // adapter selon la structure de ton API
      } catch (err) {
        console.error(err);
        setMessage('Erreur lors du chargement des formations.');
      }
    };
    fetchFormations();
  }, [formateurId]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage('');

    try {
      const data = new FormData();
      data.append('titre', formData.titre);
      data.append('formation_id', formData.formation_id);
      if (formData.fichier) data.append('fichier', formData.fichier);
      data.append('_method', 'PUT'); // ⚡ important pour la mise à jour

      await axios.post(`/pdfs/${pdf.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage('✅ PDF mis à jour avec succès !');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      if (err.response) {
        setErrors(err.response.data.errors || {});
        setMessage(err.response.data.message || 'Erreur serveur.');
      } else {
        setMessage('Impossible de contacter le serveur.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-pdf-form">
      <h2>Modifier PDF</h2>
      {message && <p className={errors ? 'error' : 'success'}>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Titre :</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
          />
          {errors.titre && <span className="error">{errors.titre}</span>}
        </div>

        <div>
          <label>Fichier PDF :</label>
          <input type="file" name="fichier" accept="application/pdf" onChange={handleChange} />
          {errors.fichier && <span className="error">{errors.fichier}</span>}
        </div>

        <div>
          <label>Formation :</label>
          <select
            name="formation_id"
            value={formData.formation_id}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner une formation</option>
            {formations.map(f => (
              <option key={f.id} value={f.id}>{f.titre}</option>
            ))}
          </select>
          {errors.formation_id && <span className="error">{errors.formation_id}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'En cours...' : 'Mettre à jour'}
        </button>
        {onClose && <button type="button" onClick={onClose}>Annuler</button>}
      </form>
    </div>
  );
};

export default EditPdfFormFormateur;
