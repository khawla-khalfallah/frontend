import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarMinimal from '../../components/NavbarMinimal';
import SidebarFormateur from '../../components/SidebarFormateur';
import { Modal } from 'bootstrap';
import { useNavigate } from 'react-router-dom';


const MesExamensFormateur = () => {
  const [examens, setExamens] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  const storedUser = JSON.parse(localStorage.getItem('user'));
  const formateurId = storedUser?.id;

  const [selectedExamen, setSelectedExamen] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editNote, setEditNote] = useState('');

  const openEditModal = (examen) => {
    setSelectedExamen(examen);
    setEditDate(examen.date_examen);
    setEditNote(examen.note || '');
    const modal = new Modal(document.getElementById('editExamenModal'));
    modal.show();
  };
  const handleUpdateExamen = async () => {
    try {
      const payload = {
        date_examen: editDate
      };

      // Ajouter la note seulement si elle est modifiable
      if (selectedExamen?.note !== null && selectedExamen?.note !== undefined) {
        payload.note = editNote;
      }

      await axios.put(
        `http://localhost:8000/api/examens/${selectedExamen.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const updatedExamens = examens.map(ex =>
        ex.id === selectedExamen.id
          ? {
            ...ex,
            date_examen: editDate,
            note: selectedExamen?.note !== null && selectedExamen?.note !== undefined ? editNote : ex.note
          }
          : ex
      );

      setExamens(updatedExamens);

      const modal = Modal.getInstance(document.getElementById('editExamenModal'));
      modal.hide();
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    }
  };
  const handleAddQuestion = (examenId) => {
    // Redirige vers une nouvelle page ou affiche un formulaire dans une modal
    navigate(`/formateur/AjouterQuestion/${examenId}`);
  };
  
  useEffect(() => {
    const fetchExamens = async () => {
      if (!formateurId) return;

      try {
        const response = await axios.get(`http://localhost:8000/api/formateurs/${formateurId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        // Récupérer tous les examens depuis les formations du formateur
        const formations = response.data.formations || [];
        const allExamens = formations.flatMap(f =>
          (f.examens || []).map(e => ({
            ...e,
            titre_formation: f.titre,
            nom_apprenant: e.apprenant?.user?.name || 'Non défini',
            date_examen: e.date_examen,
            note: e.note
          }))
        );
        setExamens(allExamens);
      } catch (error) {
        console.error('Erreur lors du chargement des examens :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamens();
  }, [formateurId]);

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarFormateur />
        <div className="container mt-4">
          <h2 className="text-primary fw-bold mb-4">📄 Vos Examens</h2>

          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : examens.length === 0 ? (
            <div className="alert alert-warning">Aucun examen trouvé.</div>
          ) : (
            <div className="row">
              {examens.map((examen) => (
                <div className="col-md-6 col-lg-4 mb-4" key={examen.id}>
                  <div className="card border-secondary shadow-sm h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold text-secondary">
                        📘 {examen.titre_formation}
                      </h5>
                      <p className="card-text">📅 Date de l’examen : <strong>{examen.date_examen}</strong></p>
                      <p className="card-text">🧑 Apprenant : <strong>{examen.apprenant?.user?.nom} {examen.apprenant?.user?.prenom}</strong>                      </p>
                      <p className="card-text">📝 Note : <strong>{examen.note ?? 'Non notée'}</strong></p>
                      <div className="mt-auto d-flex justify-content-between">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => openEditModal(examen)}
                        >
                          ✏️ Modifier
                        </button>

                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={() => handleAddQuestion(examen.id)}
                          >
                          ➕ Ajouter Questions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="modal fade" id="editExamenModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modifier l'examen</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Date de l'examen</label>
                <input
                  type="date"
                  className="form-control"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Note</label>
                <input
                  type="number"
                  className="form-control"
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  disabled={selectedExamen?.note === null || selectedExamen?.note === undefined}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateExamen}>Enregistrer</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MesExamensFormateur;
