import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import AjoutSeanceForm from './AjoutSeanceForm';
import EditSeanceForm from './EditSeanceForm';

const SeancesList = () => {
  const [seances, setSeances] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSeance, setEditingSeance] = useState(null);

  const fetchSeances = () => {
    axios.get('/api/seances')
      .then(res => setSeances(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchSeances();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm("Supprimer cette séance ?")) return;
    try {
      await axios.delete(`/api/seances/${id}`);
      alert("Séance supprimée !");
      fetchSeances();
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div>
      <h2>🎥 Liste des Séances</h2>

      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        ➕ Ajouter une séance
      </button>

      {showForm && (
        <AjoutSeanceForm onSuccess={() => {
          setShowForm(false);
          fetchSeances();
        }} />
      )}

      {editingSeance && (
        <EditSeanceForm
          seance={editingSeance}
          onSuccess={() => {
            setEditingSeance(null);
            fetchSeances();
          }}
        />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre_Seance</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Formation</th>
            <th>Room</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {seances.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.titreSeance}</td>
              <td>{s.date}</td>
              <td>{s.heureDebut} → {s.heureFin}</td>
              <td>{s.formation?.titre}</td>
              <td><a href={s.lienRoom} target="_blank" rel="noreferrer">🔗 Accéder</a></td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingSeance(s)}>✏️Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>🗑Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeancesList;
