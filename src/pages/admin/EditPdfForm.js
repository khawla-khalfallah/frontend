import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const EditPdfForm = ({ pdf, onSuccess }) => {
  const [formData, setFormData] = useState({
    titre: pdf.titre || '',
    formation_id: pdf.formation_id || ''
  });

  const [formations, setFormations] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('/api/formations').then(res => setFormations(res.data));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`/api/pdfs/${pdf.id}`, formData);
      alert("PDF modifié !");
      setErrors({});
      onSuccess();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        alert("Erreur lors de la modification.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>✏️ Modifier le PDF #{pdf.id}</h5>

      <input
        type="text"
        name="titre"
        className="form-control mb-2"
        value={formData.titre}
        onChange={handleChange}
        required
      />
      {errors.titre && <div className="text-danger mb-2">{errors.titre[0]}</div>}

      <select
        name="formation_id"
        className="form-control mb-2"
        value={formData.formation_id}
        onChange={handleChange}
        required
      >
        <option value="">🎓 Choisir une formation</option>
        {formations.map(f => (
          <option key={f.id} value={f.id}>{f.titre}</option>
        ))}
      </select>
      {errors.formation_id && <div className="text-danger mb-2">{errors.formation_id[0]}</div>}

      <button className="btn btn-warning me-2" type="submit">✅ Modifier</button>
      <button className="btn btn-secondary" type="button" onClick={onSuccess}>❌ Annuler</button>
    </form>
  );
};

export default EditPdfForm;
