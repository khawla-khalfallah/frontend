import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import AjoutInscritForm from './AjoutInscritForm';
import EditInscritForm from './EditInscritForm';

const InscritsList = () => {
  const [inscrits, setInscrits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingInscrit, setEditingInscrit] = useState(null);

  const fetchInscrits = () => {
    axios.get('http://localhost:8000/api/inscrits')
      .then(res => setInscrits(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchInscrits();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette inscription ?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/inscrits/${id}`);
      alert("Inscription supprimée !");
      fetchInscrits();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div>
      <h2>📌 Liste des Inscriptions</h2>

      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        ➕ Nouvelle inscription
      </button>

      {showForm && (
        <AjoutInscritForm onSuccess={() => {
          setShowForm(false);
          fetchInscrits();
        }} />
      )}

      {editingInscrit && (
        <EditInscritForm
          inscrit={editingInscrit}
          onSuccess={() => {
            setEditingInscrit(null);
            fetchInscrits();
          }}
        />
      )}

      <table className="table table-striped mt-3">
      <thead>
        <tr>
            <th>ID</th> 
            <th>Apprenant</th> 
            <th>Formation</th>
            <th>Date d'inscription</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {inscrits.map((i, idx) => (
            <tr key={idx}>
            <td>{i.id_inscrit}</td>
            {/* <td>{i.apprenant?.user?.nom} {i.apprenant?.user?.prenom}</td> 👈 Ajouté */}
            <td>
  {i.apprenant?.user
    ? `${i.apprenant.user.nom} ${i.apprenant.user.prenom}`
    : <span className="text-danger">❌ Apprenant introuvable</span>}
</td>

            <td>{i.formation?.titre}</td>
            <td>{i.date_inscription}</td>
            <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingInscrit(i)}>✏️ Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(i.id_inscrit)}>🗑 Supprimer</button>
            </td>
            </tr>
        ))}
        </tbody>

      </table>
    </div>
  );
};

export default InscritsList;