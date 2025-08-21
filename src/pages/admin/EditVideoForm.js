import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';

const EditVideoForm = ({ video, onSuccess }) => {
  const [formData, setFormData] = useState({
    titre:'',
    url:'',
    description:'',
    formation_id:''
  });
  useEffect(() => {
        setFormData({
          titre: video.titre|| '',
          url: video.url|| '',
          description: video.description|| '',
          formation_id: video.formation_id|| '',
        });
      }, [video]);
  const [formations, setFormations] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/formations').then(res => setFormations(res.data));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/videos/${video.id}`, formData);
      alert('Vidéo modifiée !');
      onSuccess();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        alert('Erreur lors de la modification.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>✏️ Modifier la vidéo #{video.id}</h5>

      <input name="titre" className="form-control mb-2" value={formData.titre} onChange={handleChange} />
      {errors.titre && <div className="text-danger">{errors.titre[0]}</div>}

      <input name="url" className="form-control mb-2" value={formData.url} onChange={handleChange} />
      {errors.url && <div className="text-danger">{errors.url[0]}</div>}

      <textarea name="description" className="form-control mb-2" value={formData.description} onChange={handleChange}></textarea>
      {errors.description && <div className="text-danger">{errors.description[0]}</div>}

      <select name="formation_id" className="form-control mb-2" value={formData.formation_id} onChange={handleChange}>
        <option value="">🎓 Choisir une formation</option>
        {formations.map(f => (
          <option key={f.id} value={f.id}>{f.titre}</option>
        ))}
      </select>
      {errors.formation_id && <div className="text-danger">{errors.formation_id[0]}</div>}

      <button className="btn btn-warning me-2">✅ Modifier</button>
      <button type="button" className="btn btn-secondary" onClick={onSuccess}>❌ Annuler</button>
    </form>
  );
};

export default EditVideoForm;
