import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

const AjoutSeanceForm = ({ onSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titreSeance: '',
    date: '',
    heureDebut: '',
    heureFin: '',
    lienRoom: '',
    formation_id: '',
  });

  const [formations, setFormations] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/formations')
      .then(res => setFormations(res.data))
      .catch(() => alert('Erreur lors du chargement des formations'));
  }, []);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/seances', formData);
      alert('Séance ajoutée !');
      setErrors({});
      if (onSuccess) onSuccess();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        alert('Erreur lors de l’ajout.');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <h5>➕ Ajouter une séance</h5>

        <input
          name="titreSeance"
          className="form-control mb-2"
          placeholder="Titre"
          value={formData.titreSeance}
          onChange={handleChange}
        />
        {errors.titreSeance && <div className="text-danger mb-2">{errors.titreSeance[0]}</div>}

        <input
          type="date"
          name="date"
          className="form-control mb-2"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <div className="text-danger mb-2">{errors.date[0]}</div>}

        <input
          type="time"
          name="heureDebut"
          className="form-control mb-2"
          value={formData.heureDebut}
          onChange={handleChange}
        />
        {errors.heureDebut && <div className="text-danger mb-2">{errors.heureDebut[0]}</div>}

        <input
          type="time"
          name="heureFin"
          className="form-control mb-2"
          value={formData.heureFin}
          onChange={handleChange}
        />
        {errors.heureFin && <div className="text-danger mb-2">{errors.heureFin[0]}</div>}

        <input
          name="lienRoom"
          className="form-control mb-2"
          placeholder="Lien de la visioconférence"
          value={formData.lienRoom}
          onChange={handleChange}
        />
        {errors.lienRoom && <div className="text-danger mb-2">{errors.lienRoom[0]}</div>}

        <select
          name="formation_id"
          className="form-control mb-2"
          value={formData.formation_id}
          onChange={handleChange}
        >
          <option value="">🎓 Choisir une formation</option>
          {formations.map(f => (
            <option key={f.id} value={f.id}>{f.titre}</option>
          ))}
        </select>
        {errors.formation_id && <div className="text-danger mb-2">{errors.formation_id[0]}</div>}

        <button type="submit" className="btn btn-success">✅ Ajouter</button>
      </form>

      {/* Bouton pour naviguer vers la page création room 100ms */}
      <button
        onClick={() => navigate('/create-seance')}
        className="btn btn-primary"
      >
        ➕ Créer une nouvelle séance
      </button>
    </>
  );
};

export default AjoutSeanceForm;
