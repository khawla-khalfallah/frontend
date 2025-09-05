import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const EditVideoFormFormateur = ({ video, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    titre: video?.titre || '',
    url: video?.url || '',
    formation_id: video?.formation_id || ''
  });
  const [formations, setFormations] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Charger seulement les formations
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const formationsRes = await axios.get('/formations');
        setFormations(formationsRes.data);
      } catch (err) {
        console.error(err);
        setMessage('Erreur lors du chargement des formations.');
      }
    };
    fetchFormations();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage('');

    try {
      await axios.put(`/videos/${video.id}`, formData);

      setMessage('✅ Vidéo mise à jour avec succès !');
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
    <div className="edit-video-form">
      <h2>Modifier Vidéo</h2>
      {message && <p className={errors ? 'error' : 'success'}>{message}</p>}
      <form onSubmit={handleSubmit}>
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
          <label>URL :</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
          {errors.url && <span className="error">{errors.url}</span>}
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

export default EditVideoFormFormateur;
