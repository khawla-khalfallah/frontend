import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import AjoutPdfForm from './AjoutPdfForm';
import EditPdfForm from './EditPdfForm';

const PdfsList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPdf, setEditingPdf] = useState(null);

  const fetchPdfs = () => {
    axios.get('/api/pdfs')
      .then(res => setPdfs(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce PDF ?")) return;
    try {
      await axios.delete(`/api/pdfs/${id}`);
      alert("PDF supprimé !");
      fetchPdfs();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div>
      <h2>📄 Liste des PDFs</h2>

      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        ➕ Ajouter un PDF
      </button>

      {showForm && (
        <AjoutPdfForm onSuccess={() => {
          setShowForm(false);
          fetchPdfs();
        }} />
      )}

      {editingPdf && (
        <EditPdfForm
          pdf={editingPdf}
          onSuccess={() => {
            setEditingPdf(null);
            fetchPdfs();
          }}
        />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Fichier</th>
            <th>Formation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pdfs.map(pdf => (
            <tr key={pdf.id}>
              <td>{pdf.id}</td>
              <td>{pdf.titre}</td>
              <td>
                <a href={`/storage/${pdf.fichier}`} target="_blank" rel="noreferrer">
                  📥 Télécharger
                </a>
              </td>
              <td>{pdf.formation?.titre}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingPdf(pdf)}>✏️Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(pdf.id)}>🗑Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PdfsList;
