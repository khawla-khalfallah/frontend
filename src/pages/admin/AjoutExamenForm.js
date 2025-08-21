import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const AjoutExamenForm = ({ onSuccess }) => {
  const [formations, setFormations] = useState([]);
  const [apprenants, setApprenants] = useState([]);
  const [formData, setFormData] = useState({
    date_examen: '',
    note: '',
    formation_id: '',
    apprenant_id: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/formations')
      .then(res => setFormations(res.data));
    axios.get('http://localhost:8000/api/apprenants')
      .then(res => setApprenants(res.data));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/examens', formData);
      alert("Examen ajouté !");
      onSuccess();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        alert("Erreur lors de l'ajout.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>➕ Ajouter un examen</h5>

      <input
        type="date"
        name="date_examen"
        className="form-control mb-2"
        value={formData.date_examen}
        onChange={handleChange}
        required
      />
      {errors.date_examen && <div className="text-danger mb-2">{errors.date_examen[0]}</div>}

      <input
        type="number"
        name="note"
        className="form-control mb-2"
        placeholder="Note"
        value={formData.note}
        onChange={handleChange}
      />
      {errors.note && <div className="text-danger mb-2">{errors.note[0]}</div>}

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
      {errors.formation_id && <div className="text-danger mb-2">{errors.formation_id[0]}</div>}

      <select
        name="apprenant_id"
        className="form-control mb-2"
        value={formData.apprenant_id}
        onChange={handleChange}
        required
      >
        <option value="">👨‍🎓 Choisir un apprenant</option>
        {apprenants.map(a => (
          <option key={a.user_id} value={a.user_id}>
            {a.user?.nom} {a.user?.prenom}
          </option>
        ))}
      </select>
      {errors.apprenant_id && <div className="text-danger mb-2">{errors.apprenant_id[0]}</div>}

      <button type="submit" className="btn btn-success">✅ Ajouter</button>
    </form>
  );
};

export default AjoutExamenForm;
