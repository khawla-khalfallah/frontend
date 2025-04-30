import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarFormateur from "../../components/SidebarFormateur";
import * as bootstrap from 'bootstrap';


const MesFormationsFormateur = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedFormation, setSelectedFormation] = useState(null);
  const [formValues, setFormValues] = useState({
    titre: '',
    description: '',
    prix: '',
    date_debut: '',
    date_fin: '',
  });

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const formateurId = storedUser?.id;

  useEffect(() => {
    const fetchFormations = async () => {
      if (!formateurId) {
        console.error('Aucun ID formateur trouvé dans le localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/formateurs/${formateurId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFormations(response.data.formations);
      } catch (error) {
        console.error('Erreur lors du chargement des formations', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, [formateurId]);

  const handleEditClick = (formation) => {
    setSelectedFormation(formation);
    setFormValues({
      titre: formation.titre,
      description: formation.description,
      prix: formation.prix,
      date_debut: formation.date_debut,
      date_fin: formation.date_fin,
    });
    const modal = new bootstrap.Modal(document.getElementById('editFormationModal'));
    modal.show();
  };

  const handleEditSave = async () => {
    try {
      const { titre, description, prix, date_debut, date_fin } = formValues;
      await axios.put(`http://localhost:8000/api/formations/${selectedFormation.id}`, {
        titre,
        description,
        prix: parseFloat(prix),
        date_debut,
        date_fin,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      alert('Formation modifiée !');

      setFormations((prev) =>
        prev.map(f => f.id === selectedFormation.id
          ? { ...f, ...formValues }
          : f
        )
      );

      const modal = bootstrap.Modal.getInstance(document.getElementById('editFormationModal'));
      modal.hide();
    } catch (error) {
      console.error("Erreur modification :", error);
      alert("Erreur lors de la modification.");
    }
  };

  const handleDelete = async (formationId) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette formation ?")) {
      try {
        await axios.delete(`http://localhost:8000/api/formations/${formationId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        alert("Formation supprimée !");
        setFormations(prev => prev.filter(f => f.id !== formationId));
      } catch (error) {
        console.error("Erreur suppression :", error);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarFormateur />
        <div className="container mt-4">
          <h2 className="mb-4 text-primary fw-bold">📚 Vos Formations</h2>

          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : formations.length === 0 ? (
            <div className="alert alert-warning">Aucune formation trouvée.</div>
          ) : (
            <div className="row">
              {formations.map((formation) => (
                <div className="col-md-6 col-lg-4 mb-4" key={formation.id}>
                  <div className="card border-info shadow-lg h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-info fw-bold">{formation.titre}</h5>
                      <p className="card-text">{formation.description}</p>
                      <div className="mb-2">
                        <span className="badge bg-success me-2">
                          Prix : {formation.prix} D
                        </span>
                        <span className="badge bg-secondary">
                          Du {formation.date_debut} au {formation.date_fin}
                        </span>
                      </div>

                      <div className="mt-auto d-flex justify-content-between">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleEditClick(formation)}
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(formation.id)}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modale d'édition */}
          <div className="modal fade" id="editFormationModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">✏️ Modifier la formation</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Titre</label>
                    <input type="text" className="form-control"
                      value={formValues.titre}
                      onChange={(e) => setFormValues({ ...formValues, titre: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control"
                      value={formValues.description}
                      onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input type="number" className="form-control"
                      value={formValues.prix}
                      onChange={(e) => setFormValues({ ...formValues, prix: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date de début</label>
                    <input type="date" className="form-control"
                      value={formValues.date_debut}
                      onChange={(e) => setFormValues({ ...formValues, date_debut: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date de fin</label>
                    <input type="date" className="form-control"
                      value={formValues.date_fin}
                      onChange={(e) => setFormValues({ ...formValues, date_fin: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                  <button type="button" className="btn btn-primary" onClick={handleEditSave}>
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MesFormationsFormateur;
