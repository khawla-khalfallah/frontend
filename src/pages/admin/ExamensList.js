import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import AjoutExamenForm from './AjoutExamenForm';
import EditExamenForm from './EditExamenForm';

const ExamensList = () => {
  const [examens, setExamens] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExamen, setEditingExamen] = useState(null);

  const fetchExamens = () => {
    axios.get('http://localhost:8000/api/examens')
      .then(res => setExamens(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchExamens();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet examen ?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/examens/${id}`);
      alert("Examen supprimé !");
      fetchExamens();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div>
      <h2>📑 Liste des Examens</h2>

      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        ➕ Ajouter un examen
      </button>

      {showForm && (
        <AjoutExamenForm onSuccess={() => {
          setShowForm(false);
          fetchExamens();
        }} />
      )}

      {editingExamen && (
        <EditExamenForm
          examen={editingExamen}
          onSuccess={() => {
            setEditingExamen(null);
            fetchExamens();
          }}
        />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Apprenant</th>
            <th>Formation</th>
            <th>Date_Examen</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {examens.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.apprenant?.user?.nom} {e.apprenant?.user?.prenom}</td>
              <td>{e.formation?.titre}</td>
              <td>{e.date_examen}</td>
              <td>{e.note ?? '-'}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditingExamen(e)}
                >
                  ✏️ Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(e.id)}
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

export default ExamensList;
