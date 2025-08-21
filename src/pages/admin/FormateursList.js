import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import AjoutFormateurForm from './AjoutFormateurForm';
import EditFormateurForm from './EditFormateurForm';




const FormateursList = () => {
  const [formateurs, setFormateurs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFormateur, setEditingFormateur] = useState(null);



  const fetchFormateurs = () => {
    axios.get('http://localhost:8000/api/formateurs')
      .then(res => setFormateurs(res.data))
      .catch(err => console.error(err));
  };
  const handleEdit = (formateur) => {
    setEditingFormateur(formateur);
  };
  useEffect(() => {
    fetchFormateurs();
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce formateur ?")) return;
  
    try {
      await axios.delete(`http://localhost:8000/api/formateurs/${id}`);
      alert("Formateur supprimé !");
      fetchFormateurs(); // 🔁 recharge la liste
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };
  
  return (
    <div>
      <h2>👨‍🏫 Liste des Formateurs</h2>
      {editingFormateur && (
        <EditFormateurForm
            formateur={editingFormateur}
            onSuccess={() => {
            setEditingFormateur(null);
            fetchFormateurs();
            }}
        />
        )}
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom complet</th>
            <th>Email</th>
            <th>Spécialité</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formateurs.map(f => (
            <tr key={f.user_id}>
              <td>{f.user_id}</td>
              <td>{f.user?.nom} {f.user?.prenom}</td>
              <td>{f.user?.email}</td>
              <td>{f.specialite}</td>
              <td>{f.bio}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(f)}
                >
                  ✏️ Modifier
                </button>
                <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(f.user_id)}
                    >
                        🗑 Supprimer
                    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
  ➕ Ajouter un formateur
</button>

{showForm && (
  <AjoutFormateurForm onSuccess={() => {
    setShowForm(false);
    fetchFormateurs(); // 🔁 recharge la liste
  }} />
)}
    </div>
  );
};

export default FormateursList;
