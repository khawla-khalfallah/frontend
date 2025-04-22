import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import AjoutUtilisateurForm from './AjoutUtilisateurForm';
import EditUtilisateurForm from './EditUtilisateurForm';



const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);



  const fetchUsers = () => {
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
  
    try {
      await axios.delete(`/api/users/${id}`);
      alert("Utilisateur supprimé !");
      fetchUsers(); // 🔁 Recharge la liste après suppression
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };
  

  return (
    <div>
      <h2>👥 Liste des Utilisateurs</h2>
        <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
          ➕ Ajouter un utilisateur
        </button>

          {showForm && (
            <AjoutUtilisateurForm onSuccess={() => {
              setShowForm(false);
              fetchUsers(); // recharger la liste
            }} />
          )}
          {editingUser && (
            <EditUtilisateurForm
              user={editingUser}
              onSuccess={() => {
                setEditingUser(null); // cacher le formulaire
                fetchUsers();         // recharger la liste
              }}
            />
          )}
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nom}</td>
              <td>{u.prenom}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditingUser(u)}
                >
                  ✏️ Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>
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

export default UsersList;
