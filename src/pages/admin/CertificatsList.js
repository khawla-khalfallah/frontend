import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import AjoutCertificatForm from './AjoutCertificatForm';
import EditCertificatForm from './EditCertificatForm';

const CertificatsList = () => {
  const [certificats, setCertificats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCertificat, setEditingCertificat] = useState(null);

  const fetchCertificats = () => {
    axios.get('/api/certificats')
      .then(res =>{ setCertificats(res.data);   
        console.log('📦 certificats rechargés', res.data); // 🔍 tu dois y voir le nouveau apprenant
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCertificats();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm("Supprimer ce certificat ?")) return;
    try {
      await axios.delete(`/api/certificats/${id}`);
      alert("Certificat supprimé !");
      fetchCertificats();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div>
      <h2>🏆 Liste des certificats</h2>

      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        ➕ Ajouter un certificat
      </button>

      {showForm && (
        <AjoutCertificatForm onSuccess={() => {
          setShowForm(false);
          fetchCertificats();
        }} />
      )}

      {editingCertificat && (
        <EditCertificatForm
          certificat={editingCertificat}
          onSuccess={() => {
            setEditingCertificat(null);
            fetchCertificats();
          }}
        />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Apprenant</th>
            <th>Date d'obtention</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {certificats.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.apprenant?.user?.nom} {c.apprenant?.user?.prenom}</td>
              <td>{c.date_obtention}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingCertificat(c)}>✏️ Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>🗑 Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CertificatsList;
