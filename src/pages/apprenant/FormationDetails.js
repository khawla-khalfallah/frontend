import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarMinimal from "../../components/NavbarMinimal";

function FormationDetails() {
  const { id } = useParams();
  const [formation, setFormation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`http://localhost:8000/api/formations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setFormation(res.data))
    .catch((err) => console.error("Erreur lors du chargement de la formation", err));
  }, [id]);

  if (!formation) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div>
      <NavbarMinimal />
      <div className="container mt-5">
        <h2 className="text-primary fw-bold mb-3">{formation.titre}</h2>
        <p><strong>Description :</strong> {formation.description || "Aucune description."}</p>
        <p><strong>Formateur :</strong> {formation.formateur?.user?.nom} {formation.formateur?.user?.prenom}</p>
        <p><strong>Début :</strong> {formation.date_debut}</p>
        <p><strong>Fin :</strong> {formation.date_fin}</p>

        <hr />

        {/* Séances */}
        <div className="mt-4">
          <h4>📅 Séances</h4>
          {formation.seances && formation.seances.length > 0 ? (
            <ul className="list-group">
              {formation.seances.map((seance) => (
                <li key={seance.id} className="list-group-item">
                  {seance.titre} - {seance.date}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Aucune séance disponible.</p>
          )}
        </div>

        {/* Vidéos */}
        <div className="mt-4">
          <h4>🎥 Vidéos</h4>
          {formation.videos && formation.videos.length > 0 ? (
            <ul className="list-group">
              {formation.videos.map((video) => (
                <li key={video.id} className="list-group-item">
                  🎬 {video.titre}
                  <br />
                  <video width="100%" controls>
                    <source src={`http://localhost:8000/storage/${video.url}`} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Aucune vidéo disponible.</p>
          )}
        </div>

        {/* PDFs */}
        <div className="mt-4">
          <h4>📄 Documents PDF</h4>
          {formation.pdfs && formation.pdfs.length > 0 ? (
            <ul className="list-group">
              {formation.pdfs.map((pdf) => (
                <li key={pdf.id} className="list-group-item">
                  <a href={`http://localhost:8000/storage/${pdf.fichier}`} target="_blank" rel="noopener noreferrer">
                    📂 {pdf.titre}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Aucun document PDF disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormationDetails;
