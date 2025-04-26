import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavbarMinimal from "../../components/NavbarMinimal";
import { FaVideo, FaCertificate, FaCog, FaUser, FaBook, FaChartLine } from "react-icons/fa";

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
      <div className="d-flex">
        {/* Sidebar identique à Apprenant */}
        <div className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "250px" }}>
          <h2 className="text-center">Apprenant</h2>
          <ul className="nav flex-column">
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/profil">
                <FaUser /> Mon Profil
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/formations">
                <FaBook /> Mes Formations
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/examens">
                <FaCertificate /> Mes Examens
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/progres">
                <FaChartLine /> Progrès
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/visio">
                <FaVideo /> Visioconférences
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/certifications">
                <FaCertificate /> Certifications
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/settings">
                <FaCog /> Paramètres
              </Link>
            </li>
          </ul>
          <footer className="mt-auto text-center">
            <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
          </footer>
        </div>

        {/* Contenu Principal */}
        <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          <div className="bg-white shadow rounded p-4">
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
                      {video.url.includes('youtube.com') || video.url.includes('youtu.be') ? (
                        <a 
                          href={video.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-outline-primary mt-2"
                        >
                          🔗 Voir la vidéo
                        </a>
                      ) : (
                        <video width="100%" controls>
                          <source src={`http://localhost:8000/storage/${video.url}`} type="video/mp4" />
                          Votre navigateur ne supporte pas la lecture vidéo.
                        </video>
                      )}
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
      </div>
    </div>
  );
}

export default FormationDetails;
