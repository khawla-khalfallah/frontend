import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axios";
import { useNavigate } from "react-router-dom";
import NavbarMinimal from '../../components/NavbarMinimal';
import SidebarFormateur from '../../components/SidebarFormateur';

function GestionExamens() {
  const [examens, setExamens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  // Fonction pour récupérer les examens depuis l'API
  const fetchExamens = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/examens');
      setExamens(response.data);
    } catch (error) {
      console.error("Erreur récupération examens :", error);
      setMessage({ text: 'Erreur lors du chargement des examens', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExamens();
  }, []);

  // Fonction pour supprimer un examen
  const handleDeleteExamen = async (id, titre) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'examen "${titre}" ?`)) {
      return;
    }

    try {
      await axiosInstance.delete(`/api/examens/${id}`);
      setMessage({ text: '✅ Examen supprimé avec succès!', type: 'success' });
      fetchExamens(); // rafraîchit la liste
    } catch (error) {
      console.error("Erreur suppression examen :", error);
      setMessage({ text: '❌ Erreur lors de la suppression', type: 'error' });
    }
  };

  // Fonction pour naviguer vers l'édition d'un examen
  const handleEditExamen = (id) => {
    navigate(`/formateur/AjouterExamen?edit=${id}`);
  };

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarFormateur />
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">📋 Gestion des Examens</h2>
                <button 
                  className="btn btn-success"
                  onClick={() => navigate('/formateur/AjouterExamen')}
                >
                  ➕ Créer un Nouvel Examen
                </button>
              </div>

              {message.text && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}>
                  {message.text}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setMessage({ text: '', type: '' })}
                  ></button>
                </div>
              )}

              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                  </div>
                </div>
              ) : (
                <div className="row">
                  {examens.length > 0 ? (
                    examens.map((examen) => (
                      <div key={examen.id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card h-100 shadow-sm">
                          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">📝 {examen.title || examen.titre}</h6>
                            <span className="badge bg-light text-dark">ID: {examen.id}</span>
                          </div>
                          <div className="card-body">
                            <p className="text-muted mb-2">
                              <strong>Formation:</strong> {examen.formation?.titre || 'N/A'}
                            </p>
                            <p className="text-muted mb-2">
                              <strong>Questions:</strong> {examen.questions?.length || 0}
                            </p>
                            <p className="text-muted mb-2">
                              <strong>Durée:</strong> {examen.duration || 'N/A'} minutes
                            </p>
                            <p className="text-muted mb-2">
                              <strong>Points total:</strong> {examen.total_marks || 'N/A'}
                            </p>
                            {examen.description && (
                              <p className="text-muted small">
                                <strong>Description:</strong> {examen.description.substring(0, 100)}
                                {examen.description.length > 100 ? '...' : ''}
                              </p>
                            )}
                          </div>
                          <div className="card-footer bg-light">
                            <div className="d-flex justify-content-between">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => handleEditExamen(examen.id)}
                                title="Modifier l'examen"
                              >
                                ✏️ Modifier
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDeleteExamen(examen.id, examen.title || examen.titre)}
                                title="Supprimer l'examen"
                              >
                                🗑️ Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <div className="text-center py-5">
                        <div className="mb-4">
                          <i className="fas fa-clipboard-list fa-4x text-muted"></i>
                        </div>
                        <h4 className="text-muted">Aucun examen créé</h4>
                        <p className="text-muted mb-4">
                          Commencez par créer votre premier examen avec des questions.
                        </p>
                        <button 
                          className="btn btn-primary btn-lg"
                          onClick={() => navigate('/formateur/AjouterExamen')}
                        >
                          ➕ Créer Mon Premier Examen
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GestionExamens;
