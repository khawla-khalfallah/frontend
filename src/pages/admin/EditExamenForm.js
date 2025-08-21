import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';

const EditExamenForm = ({ examen, onSuccess }) => {
  const [formData, setFormData] = useState({
    date_examen:'',
    note:''
  });
 useEffect(() => {
    setFormData({
      date_examen: examen.date_examen || '',
      note: examen.note|| ''
    });
  }, [examen]);
    
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/examens/${examen.id}`, formData);
      alert("Examen modifié !");
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
      <h5>✏️ Modifier examen #{examen.id}</h5>

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
        value={formData.note}
        onChange={handleChange}
      />
      {errors.note && <div className="text-danger mb-2">{errors.note[0]}</div>}

      <button type="submit" className="btn btn-warning me-2">✅ Modifier</button>
      <button type="button" className="btn btn-secondary" onClick={onSuccess}>❌ Annuler</button>
    </form>
  );
};

export default EditExamenForm;
