import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AjoutApprenantForm from './AjoutApprenantForm';
import EditApprenantForm from './EditApprenantForm';

const ApprenantsList = () => {
  const [apprenants, setApprenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingApprenant, setEditingApprenant] = useState(null);

  const fetchApprenants = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:8000/api/apprenants", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApprenants(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des apprenants:", err);
      setError("Erreur lors du chargement des apprenants");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet apprenant ?")) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/apprenants/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Apprenant supprimé avec succès");
      fetchApprenants();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert(`Erreur lors de la suppression: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    fetchApprenants();
  }, []);

  if (loading) return <div className="text-center mt-4">Chargement en cours...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👶 Liste des Apprenants</h2>
      
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        ➕ {showForm ? 'Annuler' : 'Ajouter un apprenant'}
      </button>

      {showForm && (
        <AjoutApprenantForm 
          onSuccess={() => {
            setShowForm(false);
            fetchApprenants();
          }}
        />
      )}

      {editingApprenant && (
        <EditApprenantForm
          apprenant={editingApprenant}
          onSuccess={() => {
            setEditingApprenant(null);
            fetchApprenants();
          }}
        />
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nom complet</th>
              <th>Email</th>
              <th>Niveau d'étude</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apprenants.length > 0 ? (
              apprenants.map((apprenant) => (
                <tr key={apprenant.id}>
                  <td>{apprenant.id}</td>
                  <td>{apprenant.user?.nom} {apprenant.user?.prenom}</td>
                  <td>{apprenant.user?.email}</td>
                  <td>{apprenant.niveau_etude}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => setEditingApprenant(apprenant)}
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(apprenant.id)}
                    >
                      🗑 Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">Aucun apprenant trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprenantsList;