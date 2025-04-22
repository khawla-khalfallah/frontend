import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import AjoutApprenantForm from './AjoutApprenantForm'; // ⬅️ on l'ajoute après
import EditApprenantForm from './EditApprenantForm';


const ApprenantsList = () => {
  const [apprenants, setApprenants] = useState([]);
  const [showForm, setShowForm] = useState(false); // ⬅️ pour afficher/masquer le formulaire
  const [editingApprenant, setEditingApprenant] = useState(null);


  const fetchApprenants = () => {
    axios.get('/api/apprenants')
      .then(res => setApprenants(res.data))
      .catch(err => console.error(err));
  };
  const handleEdit = (apprenant) => {
    setEditingApprenant(apprenant);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet apprenant ?")) return;
  
    try {
      await axios.delete(`/api/apprenants/${id}`);
      alert("Apprenant supprimé !");
      fetchApprenants();
    } catch (error) {
      console.error("Erreur suppression :", error.response?.data);
      alert("Erreur lors de la suppression : " + error.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchApprenants();
  }, []);
  {editingApprenant && (
    <EditApprenantForm
      apprenant={editingApprenant}
      onSuccess={() => {
        setEditingApprenant(null);
        fetchApprenants();
      }}
    />
  )}
  return (
    <div>
      <h2>👶 Liste des Apprenants</h2>
  
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        ➕ Ajouter un apprenant
      </button>
  
      {showForm && (
        <AjoutApprenantForm
          onSuccess={() => {
            setShowForm(false);
            fetchApprenants();
          }}
        />
      )}
  
      {/* ✅ FORMULAIRE DE MODIFICATION */}
      {editingApprenant && (
        <EditApprenantForm
          apprenant={editingApprenant}
          onSuccess={() => {
            setEditingApprenant(null);
            fetchApprenants();
          }}
        />
      )}
  
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom complet</th>
            <th>Email</th>
            <th>Niveau d'étude</th>
            <th>Actions</th> {/* ✅ Ajout de colonne pour boutons */}
          </tr>
        </thead>
        <tbody>
          {apprenants.map((a) => (
            <tr key={a.user_id}>
              <td>{a.user_id}</td>
              <td>{a.user?.nom} {a.user?.prenom}</td>
              <td>{a.user?.email}</td>
              <td>{a.niveau_etude}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(a)}
                >
                  ✏️ Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(a.id)}
                >
                  🗑 Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default ApprenantsList;
