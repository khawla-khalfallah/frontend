import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarApprenant from "../../components/SidebarApprenant";
import { FaVideo } from "react-icons/fa";


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
            <div className="mt-8">
              <h4 className="text-2xl font-semibold mb-6 text-indigo-700">Séances 📅</h4>
              {formation.seances && formation.seances.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {formation.seances.map((seance) => (
                    <div
                      key={seance.id}
                      className="bg-indigo-50 shadow-lg rounded-xl p-5 border-l-4 border-indigo-500 hover:shadow-xl transition"
                    >
                      <h5 className="text-lg font-bold text-indigo-800 mb-2">{seance.titreSeance}</h5>
                      <p className="text-sm text-gray-700 mb-1">
                        <strong>Date :</strong>{" "}
                        {new Date(seance.date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-700 mb-3">
                        <strong>Horaire :</strong> {seance.heureDebut} → {seance.heureFin}
                      </p>
                      {seance.lienRoom && (
                        <button
                          onClick={() => window.open(seance.lienRoom, "_blank", "noopener,noreferrer")}
                          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full"
                        >
                          <FaVideo /> Rejoindre la séance
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg">
                  Aucune séance programmée pour le moment.
                </div>
              )}
            </div>

            {/* Vidéos */}
            <div className="mt-10">
              <h4 className="text-2xl font-semibold mb-6 text-red-700">Vidéos 🎥</h4>
              {formation.videos && formation.videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {formation.videos.map((video) => (
                    <div
                      key={video.id}
                      className="bg-red-50 shadow-lg rounded-xl p-4 border-l-4 border-red-500 hover:shadow-xl transition flex flex-col"
                    >
                      <h5 className="text-lg font-bold text-red-800 mb-3">{video.titre}</h5>
                      {video.url.includes("youtube.com") || video.url.includes("youtu.be") ? (
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary mt-2"
                        >
                          Regarder sur YouTube
                        </a>
                      ) : (
                        <div className="mt-3">
                          <video controls className="w-full rounded-lg border shadow-sm">
                            <source src={`http://localhost:8000/storage/${video.url}`} type="video/mp4" />
                            Votre navigateur ne supporte pas la lecture vidéo.
                          </video>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-blue-50 border border-blue-300 text-blue-700 rounded-lg">
                  Aucune vidéo disponible pour le moment.
                </div>
              )}
            </div>

            {/* PDFs */}
            <div className="mt-10">
              <h4 className="text-2xl font-semibold mb-6 text-green-700">Documents PDF 📄</h4>
              {formation.pdfs && formation.pdfs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {formation.pdfs.map((pdf) => (
                    <div
                      key={pdf.id}
                      className="bg-green-50 shadow-lg rounded-xl p-4 border-l-4 border-green-500 hover:shadow-xl transition flex flex-col"
                    >
                      <h5 className="text-lg font-bold text-green-800 mb-2">{pdf.titre}</h5>
                      {pdf.description && <p className="text-sm text-gray-600 mb-3">{pdf.description}</p>}
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg">
                  Aucun document PDF disponible pour le moment.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormationDetails;