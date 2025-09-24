import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import AjoutFormationForm from './AjoutFormationForm';
import EditFormationForm from './EditFormationForm';

const FormationsList = () => {
  const [formations, setFormations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFormation, setEditingFormation] = useState(null);

  const [apprenants, setApprenants] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState(null);

  const fetchFormations = () => {
    axios.get('http://localhost:8000/api/formations')
      .then(res => setFormations(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchFormations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette formation ?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/formations/${id}`);
      alert("Formation supprimée !");
      fetchFormations();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };
  // un état pour stocker les apprenants
  const fetchApprenants = (formationId, formationTitle) => {
    axios.get(`http://localhost:8000/api/formations/${formationId}/apprenants`)
      .then(res => {
        setApprenants(res.data);
        setSelectedFormation(formationTitle);
      })
      .catch(err => console.error(err));
  };
  return (
    <div>
      <h2>📚 Liste des Formations</h2>

      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        ➕ Ajouter une formation
      </button>

      {showForm && (
        <AjoutFormationForm onSuccess={() => {
          setShowForm(false);
          fetchFormations();
        }} />
      )}

      {editingFormation && (
        <EditFormationForm
          formation={editingFormation}
          onSuccess={() => {
            setEditingFormation(null);
            fetchFormations();
          }}
        />
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Formateur</th>
            <th>Prix</th>
            <th>Date_Début</th>
            <th>Date_Fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formations.map(f => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.titre}</td>
              <td>{f.description}</td>
              <td>{f.formateur?.user?.nom} {f.formateur?.user?.prenom}</td>
              <td>{f.prix} DT</td>
              <td>{f.date_debut}</td>
              <td>{f.date_fin}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => fetchApprenants(f.id, f.titre)}
                >
                  👀 Voir Apprenants
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditingFormation(f)}
                >
                  ✏️ Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(f.id)}
                >
                  🗑 Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedFormation && (
        <div className="mt-4">
          <h3>👩‍🎓 Apprenants inscrits à la formation {selectedFormation}</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {apprenants.length > 0 ? (
                apprenants.map(a => (
                  <tr key={a.id}>
                    <td>{a.nom}</td>
                    <td>{a.prenom}</td>
                    <td>{a.email}</td>
                    <td>{a.note ?? "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Aucun apprenant inscrit</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default FormationsList;
