import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const EditSeanceForm = ({ seance, onSuccess }) => {
  const [formData, setFormData] = useState({
    titreSeance:'',
    date:'',
    heureDebut:'',
    heureFin:'',
    lienRoom:'',
    formation_id:''
  });
   useEffect(() => {
      setFormData({
        titreSeance: seance.titreSeance|| '',
        date: seance.date||'',
        heureDebut: seance.heureDebut||'',
        heureFin: seance.heureFin||'',
        lienRoom: seance.lienRoom||'',
        formation_id: seance.formation_id||'',
      });
    }, [seance]);
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
      await axios.put(`/api/seances/${seance.id}`, formData);
      alert("Séance modifiée !");
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
      <h5>✏️ Modifier la séance #{seance.id}</h5>

      <input name="titreSeance" className="form-control mb-2" value={formData.titreSeance} onChange={handleChange} />
      {errors.titreSeance && <div className="text-danger mb-2">{errors.titreSeance[0]}</div>}

      <input type="date" name="date" className="form-control mb-2" value={formData.date} onChange={handleChange} />
      {errors.date && <div className="text-danger mb-2">{errors.date[0]}</div>}

      <input type="time" name="heureDebut" className="form-control mb-2" value={formData.heureDebut} onChange={handleChange} />
      {errors.heureDebut && <div className="text-danger mb-2">{errors.heureDebut[0]}</div>}

      <input type="time" name="heureFin" className="form-control mb-2" value={formData.heureFin} onChange={handleChange} />
      {errors.heureFin && <div className="text-danger mb-2">{errors.heureFin[0]}</div>}

      <input name="lienRoom" className="form-control mb-2" value={formData.lienRoom} onChange={handleChange} />
      {errors.lienRoom && <div className="text-danger mb-2">{errors.lienRoom[0]}</div>}

      <select name="formation_id" className="form-control mb-2" value={formData.formation_id} onChange={handleChange}>
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

export default EditSeanceForm;
