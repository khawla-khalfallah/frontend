import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarMinimal from '../../components/NavbarMinimal';
import SidebarFormateur from '../../components/SidebarFormateur';

const AjouterExamen = () => {
  const [formData, setFormData] = useState({
    date_examen: '',
    note: '',
    formation_id: '',
    apprenant_id: ''
  });
  const [formations, setFormations] = useState([]);
  const [apprenants, setApprenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Récupérer les formations
        const formationsResponse = await axios.get('http://localhost:8000/api/formations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormations(formationsResponse.data);

        // Récupérer les apprenants
        const apprenantsResponse = await axios.get('http://localhost:8000/api/apprenants', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApprenants(apprenantsResponse.data);

      } catch (error) {
        setMessage({ text: 'Erreur lors du chargement des données', type: 'error' });
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.post('http://localhost:8000/api/examens', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage({ text: '✅ Examen ajouté avec succès', type: 'success' });
      
      setTimeout(() => {
        navigate('/formateur/examens'); // Adaptez cette route selon votre configuration
      }, 1500);

      // Réinitialisation du formulaire
      setFormData({
        date_examen: '',
        note: '',
        formation_id: '',
        apprenant_id: ''
      });

    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      setMessage({ 
        text: error.response?.data?.message || '❌ Erreur lors de l\'ajout de l\'examen', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarFormateur />
        <div className="container mt-4">
          <h2 className="text-primary fw-bold">➕ Ajouter un Examen</h2>

          {message.text && (
            <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Date de l'examen</label>
              <input
                type="datetime-local"
                className="form-control"
                name="date_examen"
                value={formData.date_examen}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Note (optionnel)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="20"
                className="form-control"
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Formation</label>
              <select
                className="form-select"
                name="formation_id"
                value={formData.formation_id}
                onChange={handleChange}
                required
                disabled={loading || formations.length === 0}
              >
                <option value="">{loading ? 'Chargement...' : 'Sélectionnez une formation'}</option>
                {formations.map(formation => (
                  <option key={formation.id} value={formation.id}>
                    {formation.titre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Apprenant</label>
              <select
                className="form-select"
                name="apprenant_id"
                value={formData.apprenant_id}
                onChange={handleChange}
                required
                disabled={loading || apprenants.length === 0}
              >
                <option value="">{loading ? 'Chargement...' : 'Sélectionnez un apprenant'}</option>
                {apprenants.map(apprenant => (
                  <option key={apprenant.user_id} value={apprenant.user_id}>
                    {apprenant.user?.prenom} {apprenant.user?.nom}
                  </option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'En cours...' : '✅ Créer l\'examen'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjouterExamen;