import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarApprenant from "../../components/SidebarApprenant";

function FormationDetails() {
  const { id } = useParams();
  const [formation, setFormation] = useState(null);
  const [note, setNote] = useState(0);
  const [commentaire, setCommentaire] = useState("");
  const [monEvaluation, setMonEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const fetchData = async () => {
      try {
        // Charger les données de la formation
        const formationResponse = await axios.get(
          `http://localhost:8000/api/formations/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFormation(formationResponse.data);

        // Charger l'évaluation de l'apprenant si connecté
        try {
          const evaluationResponse = await axios.get(
            `http://localhost:8000/api/formations/${id}/evaluations/mon-evaluation`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (evaluationResponse.data) {
            setMonEvaluation(evaluationResponse.data);
            setNote(evaluationResponse.data.note);
            setCommentaire(evaluationResponse.data.commentaire || "");
          }
        } catch (e) {
          console.log("Aucune évaluation trouvée pour cet apprenant");
        }
      } catch (err) {
        console.error("Erreur lors du chargement", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

const handleSubmitEvaluation = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `http://localhost:8000/api/formations/${id}/evaluations`,
      { note, commentaire },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setMonEvaluation(response.data.evaluation);

    // Recharger les données
    const formationResponse = await axios.get(
      `http://localhost:8000/api/formations/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setFormation(formationResponse.data);
  } catch (err) {
    console.error("Erreur lors de l'évaluation", err);
    if (err.response?.data?.message) {
      alert(err.response.data.message);
    }
  }
};

  const renderStars = (note) => {
    const normalizedNote = note || 0;
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        type="button"
        className="btn btn-link p-0 me-1"
        onClick={() => setNote(i + 1)}
        style={{ cursor: 'pointer' }}
      >
        <span style={{ 
          fontSize: '24px', 
          color: i < normalizedNote ? '#ffc107' : '#e4e5e9',
          transition: 'color 0.2s'
        }}>
          ★
        </span>
      </button>
    ));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!formation) {
    return <p className="text-center mt-5">Formation non trouvée</p>;
  }

  const moyenne = formation.moyenne || 0;
  const evaluationsCount = formation.evaluations?.length || 0;

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarApprenant />
        <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-primary fw-bold mb-3">{formation.titre}</h2>
            <p><strong>Description :</strong> {formation.description || "Aucune description."}</p>
            <p><strong>Formateur :</strong> {formation.formateur?.user?.nom} {formation.formateur?.user?.prenom}</p>
            <p><strong>Début :</strong> {new Date(formation.date_debut).toLocaleDateString()}</p>
            <p><strong>Fin :</strong> {new Date(formation.date_fin).toLocaleDateString()}</p>
            
            {/* Section Évaluations */}
            <div className="mt-4 border-top pt-3">
              <h4>Évaluations</h4>
              
              {/* Moyenne des évaluations */}
              <div className="mb-4 p-3 bg-light rounded">
                <h5>Note moyenne</h5>
                <div className="d-flex align-items-center">
                  <div style={{ fontSize: '24px' }}>
                    {renderStars(Math.round(moyenne))}
                  </div>
                  <span className="ms-3 fs-4 fw-bold">{moyenne.toFixed(1)}/5</span>
                </div>
                <small className="text-muted">
                  {evaluationsCount} {evaluationsCount === 1 ? 'évaluation' : 'évaluations'}
                </small>
              </div>

              {/* Formulaire d'évaluation */}
              <div className="mt-3 p-3 border rounded">
                <h5>{monEvaluation ? 'Modifier votre évaluation' : 'Donner votre avis'}</h5>
                <form onSubmit={handleSubmitEvaluation}>
                  <div className="mb-3">
                    <label className="form-label">Note</label>
                    <div className="d-flex align-items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="btn btn-link p-0 me-2"
                          onClick={() => setNote(star)}
                          style={{ cursor: 'pointer' }}
                        >
                          <span style={{ 
                            fontSize: '28px', 
                            color: star <= note ? '#ffc107' : '#e4e5e9',
                            transition: 'color 0.2s'
                          }}>
                            ★
                          </span>
                        </button>
                      ))}
                      <span className="ms-2 fw-bold">{note}/5</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Commentaire (optionnel)</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={commentaire}
                      onChange={(e) => setCommentaire(e.target.value)}
                      placeholder="Décrivez votre expérience avec cette formation..."
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {monEvaluation ? 'Mettre à jour' : 'Soumettre'}
                  </button>
                </form>
              </div>
            </div>

            <hr />

            {/* Séances */}
            <div className="mt-4">
              <h4>📅 Séances</h4>
              {formation.seances && formation.seances.length > 0 ? (
                <div className="list-group">
                  {formation.seances.map((seance) => (
                    <div key={seance.id} className="list-group-item">
                      <h5>{seance.titre}</h5>
                      <p className="mb-1">
                        <strong>Date :</strong> {new Date(seance.date).toLocaleString()}
                      </p>
                      {seance.description && (
                        <p className="mb-0"><strong>Description :</strong> {seance.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">Aucune séance programmée pour le moment.</div>
              )}
            </div>

            {/* Vidéos */}
            <div className="mt-4">
              <h4>🎥 Vidéos</h4>
              {formation.videos && formation.videos.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                  {formation.videos.map((video) => (
                    <div key={video.id} className="col">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">🎬 {video.titre}</h5>
                          {video.url.includes('youtube.com') || video.url.includes('youtu.be') ? (
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary mt-2"
                            >
                              Regarder sur YouTube
                            </a>
                          ) : (
                            <div className="ratio ratio-16x9 mt-2">
                              <video controls className="w-100">
                                <source src={`http://localhost:8000/storage/${video.url}`} type="video/mp4" />
                                Votre navigateur ne supporte pas la lecture vidéo.
                              </video>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">Aucune vidéo disponible pour le moment.</div>
              )}
            </div>

            {/* PDFs */}
            <div className="mt-4">
              <h4>📄 Documents PDF</h4>
              {formation.pdfs && formation.pdfs.length > 0 ? (
                <div className="list-group">
                  {formation.pdfs.map((pdf) => (
                    <a
                      key={pdf.id}
                      href={`http://localhost:8000/storage/${pdf.fichier}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="list-group-item list-group-item-action d-flex align-items-center"
                    >
                      <span className="me-3">📄</span>
                      <div>
                        <h5 className="mb-1">{pdf.titre}</h5>
                        {pdf.description && <small className="text-muted">{pdf.description}</small>}
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">Aucun document PDF disponible pour le moment.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormationDetails;