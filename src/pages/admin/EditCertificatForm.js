import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const EditCertificatForm = ({ certificat, onSuccess }) => {
  const [formData, setFormData] = useState({
    date_obtention: '',
    apprenant_id: ''
  });
  useEffect(() => {
    setFormData({
      date_obtention: certificat.date_obtention || '',
      apprenant_id: certificat.apprenant_id || ''
    });
  }, [certificat]);
    

  const [apprenants, setApprenants] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/apprenants')
      .then(res => setApprenants(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/certificats/${certificat.id}`, formData);
      alert("Certificat modifié !");
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
      <h5>✏️ Modifier le certificat #{certificat.id}</h5>

      <input
        type="date"
        name="date_obtention"
        className="form-control mb-2"
        value={formData.date_obtention}
        onChange={handleChange}
        required
      />
      {errors.date_obtention && <div className="text-danger mb-2">{errors.date_obtention[0]}</div>}

      <select
        name="apprenant_id"
        className="form-control mb-2"
        value={formData.apprenant_id}
        onChange={handleChange}
        required
      >
        <option value="">👤 Choisir un apprenant</option>
        {apprenants.map(a => (
          <option key={a.user_id} value={a.user_id}>
            {a.user?.nom} {a.user?.prenom}
          </option>
        ))}
      </select>
      {errors.apprenant_id && <div className="text-danger mb-2">{errors.apprenant_id[0]}</div>}

      <button className="btn btn-warning me-2" type="submit">✅ Modifier</button>
      <button className="btn btn-secondary" type="button" onClick={onSuccess}>❌ Annuler</button>
    </form>
  );
};

export default EditCertificatForm;
