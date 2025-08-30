import React, { useState,useEffect} from 'react';
import axios from '../../config/axios';

const EditFormateurForm = ({ formateur, onSuccess }) => {
  const [specialite, setSpecialite] = useState('');
  const [bio, setBio] = useState('');
  const [cv, setCv] = useState(null);

  useEffect(() => {
    setSpecialite(formateur.specialite || '');
    setBio(formateur.bio || '');
  }, [formateur]);
    
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('specialite', specialite);
    formDataToSend.append('bio', bio);
    if (cv) {
      formDataToSend.append('cv', cv);
    }
    formDataToSend.append('_method', 'PUT');

    await axios.post(`http://localhost:8000/api/formateurs/${formateur.user_id}`, formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Formateur modifié !");
    setError('');
    onSuccess(); // recharge la liste
  } catch (err) {
    console.error(err);
    setError("Erreur lors de la modification");
  }
};


  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Modifier le formateur : {formateur.user.nom} {formateur.user.prenom}</h5>

      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          value={specialite}
          onChange={(e) => setSpecialite(e.target.value)}
          placeholder="Spécialité"
          required
        />
      </div>

      <div className="mb-2">
        <textarea
          className="form-control"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          required
        />
      </div>

      <div className="mb-2">
        <label>CV :</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setCv(e.target.files[0])}
        />
        {formateur.cv_url && (
          <small>
            CV actuel : <a href={`http://127.0.0.1:8000${formateur.cv_url}`} target="_blank" rel="noopener noreferrer">Voir CV</a>
          </small>
        )}
      </div>


      {error && <div className="text-danger mb-2">{error}</div>}

      <button className="btn btn-warning me-2" type="submit">✅ Modifier</button>
      <button className="btn btn-secondary" type="button" onClick={onSuccess}>❌ Annuler</button>
    </form>
  );
};

export default EditFormateurForm;
