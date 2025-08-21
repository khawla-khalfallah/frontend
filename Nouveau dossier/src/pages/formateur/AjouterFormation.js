import React, { useState } from 'react';
import axios from 'axios';
import NavbarMinimal from '../../components/NavbarMinimal';
import SidebarFormateur from '../../components/SidebarFormateur';
import { useNavigate } from 'react-router-dom';


const AjouterFormation = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const formateurId = storedUser?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/formations', {
        titre,
        description,
        prix,
        date_debut: dateDebut,
        date_fin: dateFin,
        formateur_id: formateurId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setMessage('✅ Formation ajoutée avec succès');
      setTimeout(() => {
        navigate('/formateur/MesFormationsFormateur'); // redirection après 1.5s
      }, 1500);
      // Optionnel : reset
      setTitre('');
      setDescription('');
      setPrix('');
      setDateDebut('');
      setDateFin('');
    } catch (error) {
      console.error('Erreur lors de l’ajout', error);
      setMessage('❌ Une erreur est survenue');
    }
  };

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarFormateur />
        <div className="container mt-4">
          <h2 className="text-primary fw-bold">➕ Ajouter une Formation</h2>

          {message && <div className="alert alert-info">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Titre</label>
              <input type="text" className="form-control" value={titre} onChange={(e) => setTitre(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Prix</label>
              <input type="number" className="form-control" value={prix} onChange={(e) => setPrix(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Date début</label>
              <input type="date" className="form-control" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Date fin</label>
              <input type="date" className="form-control" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-success">✅ Créer la formation</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjouterFormation;
