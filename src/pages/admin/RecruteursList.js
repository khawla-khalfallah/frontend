import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import AjoutRecruteurForm from './AjoutRecruteurForm';
import EditRecruteurForm from './EditRecruteurForm';

const RecruteursList = () => {
  const [recruteurs, setRecruteurs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecruteur, setEditingRecruteur] = useState(null);
  

  const fetchRecruteurs = () => {
    axios.get('/api/recruteurs')
      .then(res => setRecruteurs(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchRecruteurs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce recruteur ?")) return;
    try {
      await axios.delete(`/api/recruteurs/${id}`);
      alert("Recruteur supprimé !");
      fetchRecruteurs();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div>
      <h2>👨‍💼 Liste des Recruteurs</h2>

      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        ➕ Ajouter un recruteur
      </button>

      {showForm && (
        <AjoutRecruteurForm onSuccess={() => {
          setShowForm(false);
          fetchRecruteurs();
        }} />
      )}

      {editingRecruteur && (
        <EditRecruteurForm
          recruteur={editingRecruteur}
          onSuccess={() => {
            setEditingRecruteur(null);
            fetchRecruteurs();
          }}
        />
      )}

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recruteurs.map(r => (
            <tr key={r.user_id}>
              <td>{r.user_id}</td>
              <td>{r.user?.nom} {r.user?.prenom}</td>
              <td>{r.user?.email}</td>
              <td>{r.entreprise}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingRecruteur(r)}>
                  ✏️ Modifier
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.id)}>
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

export default RecruteursList;
