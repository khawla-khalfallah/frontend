import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarFormateur from "../../components/SidebarFormateur";
import AjoutPdfFormFormateur from "./AjoutPdfFormFormateur";
import EditPdfFormFormateur from "./EditPdfFormFormateur";
import AjoutVideoFormFormateur from "./AjoutVideoFormFormateur";
import EditVideoFormFormateur from "./EditVideoFormFormateur";


const GestionFormations = () => {
  const [pdfs, setPdfs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [editingPdf, setEditingPdf] = useState(null); // PDF en cours de modification
  const [editingVideo, setEditingVideo] = useState(null);


  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const formateurId = user?.id;

  const fetchData = async () => {
    try {
      const resPdf = await axios.get("http://localhost:8000/api/pdfs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resVideo = await axios.get("http://localhost:8000/api/videos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPdfs(resPdf.data);
      setVideos(resVideo.data);
    } catch (err) {
      console.error("❌ Erreur chargement ressources :", err);
    }
  };

  useEffect(() => {
    if (formateurId) fetchData();
  }, [formateurId]);
  const handleDeletePdf = async (pdfId) => {
  if (!window.confirm("⚠️ Voulez-vous vraiment supprimer ce PDF ?")) return;

  try {
    await axios.delete(`http://localhost:8000/api/pdfs/${pdfId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Rafraîchir la liste après suppression
    fetchData();
  } catch (err) {
    console.error("❌ Erreur suppression PDF :", err.response || err.message);
    alert("❌ Impossible de supprimer ce PDF.");
  }
};
const handleDeleteVideo = async (videoId) => {
  if (!window.confirm("⚠️ Voulez-vous vraiment supprimer cette vidéo ?")) return;

  try {
    await axios.delete(`http://localhost:8000/api/videos/${videoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Rafraîchir la liste après suppression
    fetchData();
  } catch (err) {
    console.error("❌ Erreur suppression vidéo :", err.response || err.message);
    alert("❌ Impossible de supprimer cette vidéo.");
  }
};


  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarFormateur />
        <div className="container mt-4">
          <h2 className="text-primary fw-bold">📂 Gestion des Ressources</h2>

          {/* PDFs */}
          <div className="mt-4 p-3 bg-light rounded shadow-sm">
            <h4>📑 Ajouter un PDF</h4>

            {/* Si un PDF est en cours d'édition, afficher le formulaire Edit */}
            {editingPdf ? (
              <EditPdfFormFormateur
  pdf={editingPdf}
  token={token}
  formateurId={formateurId} // ← ajoute ceci
  onSuccess={() => { fetchData(); setEditingPdf(null); }}
  onCancel={() => setEditingPdf(null)}
/>

            ) : (
              <AjoutPdfFormFormateur
                formateurId={formateurId}
                token={token}
                onSuccess={fetchData}
              />
            )}

            <ul className="list-group mt-3">
              {pdfs.length > 0 ? (
                pdfs.map((pdf) => (
                  <li
                    key={pdf.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{pdf.titre}</span>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => setEditingPdf(pdf)}
                      >
                        Modifier
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeletePdf(pdf.id)}>
            Supprimer
          </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item">Aucun PDF trouvé.</li>
              )}
            </ul>


          </div>

          {/* Vidéos */}
          <div className="mt-4 p-3 bg-light rounded shadow-sm">
            <h4>🎥 Ajouter une Vidéo</h4>
            {editingVideo ? (
  <EditVideoFormFormateur
    video={editingVideo}
    token={token}
    formateurId={formateurId}
    onSuccess={() => { fetchData(); setEditingVideo(null); }}
    onCancel={() => setEditingVideo(null)}
  />
) : (
  <AjoutVideoFormFormateur
    formateurId={formateurId}
    token={token}
    onSuccess={fetchData}
  />
)}

           

            <ul className="list-group mt-3">
  {videos.length > 0 ? (
    videos.map((video) => (
      <li
        key={video.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>{video.titre}</span>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => setEditingVideo(video)}
          >
            Modifier
          </button>
           <button className="btn btn-sm btn-danger" onClick={() => handleDeleteVideo(video.id)}>
            Supprimer
          </button>
        </div>
      </li>
    ))
  ) : (
    <li className="list-group-item">Aucune vidéo trouvée.</li>
  )}
</ul>



          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionFormations;
