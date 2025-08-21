import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const EditPdfForm = ({ pdf, onSuccess }) => {
  const [formData, setFormData] = useState({
    titre:'',
    formation_id: '',
    fichier: null
  });
 useEffect(() => {
      setFormData({
        titre: pdf.titre|| '',
        formation_id: pdf.formation_id|| '',
        fichier: pdf.fichier|| '',
      });
    }, [pdf]);

  const [formations, setFormations] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/formations').then(res => setFormations(res.data));
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'fichier') {
      setFormData({ ...formData, fichier: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('titre', formData.titre);
    data.append('formation_id', formData.formation_id);

    // ✅ Ajouter le fichier SEULEMENT si l'utilisateur en a choisi un
    if (formData.fichier && formData.fichier instanceof File) {
      data.append('fichier', formData.fichier);
    }

    try {
      await axios.post(`http://localhost:8000/api/pdfs/${pdf.id}?_method=PUT`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("PDF modifié !");
      setErrors({});
      onSuccess();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
        alert("Erreur lors de la modification.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4" encType="multipart/form-data">
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
      {pdf.fichier && (
        <div className="mb-2">
          📎 Fichier actuel : 
          <a href={`http://dreamlearn.local/storage/${pdf.fichier}`} 
          target="_blank" rel="noopener noreferrer">
            Voir le PDF</a>
        </div>
      )}

      <input
        type="file"
        name="fichier"
        accept="application/pdf"
        className="form-control mb-2"
        onChange={handleChange}
      />
      {errors.fichier && <div className="text-danger mb-2">{errors.fichier[0]}</div>}

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

      <button type="submit" className="btn btn-warning me-2">✅ Modifier</button>
      <button type="button" className="btn btn-secondary" onClick={onSuccess}>❌ Annuler</button>
    </form>
  );
};

export default EditPdfForm;
