
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import NavbarMinimal from "../../components/NavbarMinimal";
// import SidebarFormateur from "../../components/SidebarFormateur";
// import AjoutPdfFormFormateur from "./AjoutPdfFormFormateur";
// import EditPdfFormFormateur from "./EditPdfFormFormateur";
// import AjoutVideoFormFormateur from "./AjoutVideoFormFormateur";
// import EditVideoFormFormateur from "./EditVideoFormFormateur";
// import CreateSeance from "./CreateSeance";
// import SeancesList from "./SeancesList";
// import EditSeanceForm from "./EditSeanceForm";

// const GestionFormations = () => {
//   const [pdfs, setPdfs] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [seances, setSeances] = useState([]);
//   const [formations, setFormations] = useState([]);

//   const [editingPdf, setEditingPdf] = useState(null);
//   const [editingVideo, setEditingVideo] = useState(null);
//   const [editingSeance, setEditingSeance] = useState(null); // Séance en cours de modification

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));
//   const formateurId = user?.id;

//   // Récupération des données
//   const fetchData = async () => {
//     try {
//       const [resPdf, resVideo, resSeance, resFormations] = await Promise.all([
//         axios.get("http://localhost:8000/api/pdfs", { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get("http://localhost:8000/api/videos", { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get("http://localhost:8000/api/seances", { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get("http://localhost:8000/api/formations", { headers: { Authorization: `Bearer ${token}` } }),
//       ]);

//       setPdfs(resPdf.data || []);
//       setVideos(resVideo.data || []);
//       setSeances(resSeance.data || []);
//       setFormations(resFormations.data || []);
//     } catch (err) {
//       console.error("❌ Erreur chargement ressources :", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     if (formateurId) fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [formateurId]);

//   // ... handlers delete pdf/video/seance (inchangés)
//   const handleDeletePdf = async (pdfId) => {
//     if (!window.confirm("⚠️ Voulez-vous vraiment supprimer ce PDF ?")) return;
//     try {
//       await axios.delete(`http://localhost:8000/api/pdfs/${pdfId}`, { headers: { Authorization: `Bearer ${token}` } });
//       fetchData();
//     } catch (err) {
//       console.error("❌ Erreur suppression PDF :", err.response || err.message);
//       alert("❌ Impossible de supprimer ce PDF.");
//     }
//   };

//   const handleDeleteVideo = async (videoId) => {
//     if (!window.confirm("⚠️ Voulez-vous vraiment supprimer cette vidéo ?")) return;
//     try {
//       await axios.delete(`http://localhost:8000/api/videos/${videoId}`, { headers: { Authorization: `Bearer ${token}` } });
//       fetchData();
//     } catch (err) {
//       console.error("❌ Erreur suppression vidéo :", err.response || err.message);
//       alert("❌ Impossible de supprimer cette vidéo.");
//     }
//   };

//   const handleDeleteSeance = async (seanceId) => {
//     if (!window.confirm("⚠️ Voulez-vous vraiment supprimer cette séance ?")) return;
//     try {
//       await axios.delete(`http://localhost:8000/api/seances/${seanceId}`, { headers: { Authorization: `Bearer ${token}` } });
//       fetchData();
//     } catch (err) {
//       console.error("❌ Erreur suppression séance :", err.response || err.message);
//       alert("❌ Impossible de supprimer cette séance.");
//     }
//   };

//   return (
//     <div>
//       <NavbarMinimal />
//       <div className="d-flex">
//         <SidebarFormateur />
//         <div className="container mt-4">
//           <h2 className="text-primary fw-bold">📂 Gestion des Ressources</h2>

//           {/* PDFs (inchangé) */}
//           <div className="mt-4 p-3 bg-light rounded shadow-sm">
//             <h4>📑 Ajouter un PDF</h4>
//             {editingPdf ? (
//               <EditPdfFormFormateur
//                 pdf={editingPdf}
//                 token={token}
//                 formateurId={formateurId}
//                 onSuccess={() => { fetchData(); setEditingPdf(null); }}
//                 onCancel={() => setEditingPdf(null)}
//               />
//             ) : (
//               <AjoutPdfFormFormateur formateurId={formateurId} token={token} onSuccess={fetchData} />
//             )}

//             <ul className="list-group mt-3">
//               {pdfs.length > 0 ? pdfs.map((pdf) => (
//                 <li key={pdf.id} className="list-group-item d-flex justify-content-between align-items-center">
//                   <span>{pdf.titre}</span>
//                   <div className="d-flex gap-2">
//                     <button className="btn btn-sm btn-warning" onClick={() => setEditingPdf(pdf)}>Modifier</button>
//                     <button className="btn btn-sm btn-danger" onClick={() => handleDeletePdf(pdf.id)}>Supprimer</button>
//                   </div>
//                 </li>
//               )) : <li className="list-group-item">Aucun PDF trouvé.</li>}
//             </ul>
//           </div>

//           {/* Vidéos (inchangé) */}
//           <div className="mt-4 p-3 bg-light rounded shadow-sm">
//             <h4>🎥 Ajouter une Vidéo</h4>
//             {editingVideo ? (
//               <EditVideoFormFormateur
//                 video={editingVideo}
//                 token={token}
//                 formateurId={formateurId}
//                 onSuccess={() => { fetchData(); setEditingVideo(null); }}
//                 onCancel={() => setEditingVideo(null)}
//               />
//             ) : (
//               <AjoutVideoFormFormateur formateurId={formateurId} token={token} onSuccess={fetchData} />
//             )}

//             <ul className="list-group mt-3">
//               {videos.length > 0 ? videos.map((video) => (
//                 <li key={video.id} className="list-group-item d-flex justify-content-between align-items-center">
//                   <span>{video.titre}</span>
//                   <div className="d-flex gap-2">
//                     <button className="btn btn-sm btn-warning" onClick={() => setEditingVideo(video)}>Modifier</button>
//                     <button className="btn btn-sm btn-danger" onClick={() => handleDeleteVideo(video.id)}>Supprimer</button>
//                   </div>
//                 </li>
//               )) : <li className="list-group-item">Aucune vidéo trouvée.</li>}
//             </ul>
//           </div>

//           {/* Séances */}
//           <div className="mt-4 p-3 bg-light rounded shadow-sm">
//             <h4>💻 Ajouter une Séance en ligne</h4>

//             {editingSeance ? (
//               <EditSeanceForm
//                 seance={editingSeance}
//                 token={token}
//                 formations={formations}
//                 onSuccess={() => { fetchData(); setEditingSeance(null); }} // si tu veux rester dans l'édition, supprime setEditingSeance(null)
//                 onCancel={() => setEditingSeance(null)}
//               />
//             ) : (
//               <>
//                 <CreateSeance
//                   formateurId={formateurId}
//                   token={token}
//                   formations={formations}
//                   onSuccess={fetchData}
//                 />
//                 <SeancesList
//                   seances={seances}
//                   onDelete={handleDeleteSeance}
//                   onEdit={(s) => setEditingSeance(s)}
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GestionFormations;
import React, { useEffect, useState } from "react";
import axios from "axios";
import LayoutFormateur from "../../layouts/FormateurLayout"; // ✅ layout commun
import AjoutPdfFormFormateur from "./AjoutPdfFormFormateur";
import EditPdfFormFormateur from "./EditPdfFormFormateur";
import AjoutVideoFormFormateur from "./AjoutVideoFormFormateur";
import EditVideoFormFormateur from "./EditVideoFormFormateur";
import CreateSeance from "./CreateSeance";
import SeancesList from "./SeancesList";
import EditSeanceForm from "./EditSeanceForm";
import "./GestionFormations.css"; // ✅ CSS pour style onglets et cards

const GestionFormations = () => {
  const [pdfs, setPdfs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [seances, setSeances] = useState([]);
  const [formations, setFormations] = useState([]);

  const [editingPdf, setEditingPdf] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [editingSeance, setEditingSeance] = useState(null);

  const [activeTab, setActiveTab] = useState("pdfs"); // ✅ onglet actif

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const formateurId = user?.id;

  // Récupération des données
  const fetchData = async () => {
    try {
      const [resPdf, resVideo, resSeance, resFormations] = await Promise.all([
        axios.get("http://localhost:8000/api/pdfs", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:8000/api/videos", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:8000/api/seances", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:8000/api/formations", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setPdfs(resPdf.data || []);
      setVideos(resVideo.data || []);
      setSeances(resSeance.data || []);
      setFormations(resFormations.data || []);
    } catch (err) {
      console.error("❌ Erreur chargement :", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (formateurId) fetchData();
  }, [formateurId]);

  const handleDeletePdf = async (pdfId) => {
    if (!window.confirm("⚠️ Voulez-vous vraiment supprimer ce PDF ?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/pdfs/${pdfId}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch {
      alert("❌ Impossible de supprimer ce PDF.");
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("⚠️ Voulez-vous vraiment supprimer cette vidéo ?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/videos/${videoId}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch {
      alert("❌ Impossible de supprimer cette vidéo.");
    }
  };

  const handleDeleteSeance = async (seanceId) => {
    if (!window.confirm("⚠️ Voulez-vous vraiment supprimer cette séance ?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/seances/${seanceId}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch {
      alert("❌ Impossible de supprimer cette séance.");
    }
  };

  return (
    <LayoutFormateur>
      <div className="container-fluid p-4">
        <h2 className="dashboard-title">📂 Gestion des Ressources</h2>

        {/* ✅ Onglets */}
        <ul className="nav nav-tabs custom-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "pdfs" ? "active" : ""}`}
              onClick={() => setActiveTab("pdfs")}
            >
              📑 PDFs
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "videos" ? "active" : ""}`}
              onClick={() => setActiveTab("videos")}
            >
              🎥 Vidéos
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "seances" ? "active" : ""}`}
              onClick={() => setActiveTab("seances")}
            >
              💻 Séances
            </button>
          </li>
        </ul>

        {/* ✅ Contenu des onglets */}
        <div className="tab-content">
          {/* PDFs */}
          {activeTab === "pdfs" && (
            <div className="resource-card">
              <h4 className="resource-title text-primary">📑 PDFs</h4>
              {editingPdf ? (
                <EditPdfFormFormateur
                  pdf={editingPdf}
                  token={token}
                  formateurId={formateurId}
                  onSuccess={() => { fetchData(); setEditingPdf(null); }}
                  onCancel={() => setEditingPdf(null)}
                />
              ) : (
                <AjoutPdfFormFormateur formateurId={formateurId} token={token} onSuccess={fetchData} />
              )}

              <ul className="list-group mt-3">
                {pdfs.length > 0 ? pdfs.map((pdf) => (
                  <li key={pdf.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{pdf.titre}</span>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-warning" onClick={() => setEditingPdf(pdf)}>Modifier</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeletePdf(pdf.id)}>Supprimer</button>
                    </div>
                  </li>
                )) : <li className="list-group-item text-muted">Aucun PDF trouvé.</li>}
              </ul>
            </div>
          )}

          {/* Vidéos */}
          {activeTab === "videos" && (
            <div className="resource-card">
              <h4 className="resource-title text-primary">🎥 Vidéos</h4>
              {editingVideo ? (
                <EditVideoFormFormateur
                  video={editingVideo}
                  token={token}
                  formateurId={formateurId}
                  onSuccess={() => { fetchData(); setEditingVideo(null); }}
                  onCancel={() => setEditingVideo(null)}
                />
              ) : (
                <AjoutVideoFormFormateur formateurId={formateurId} token={token} onSuccess={fetchData} />
              )}

              <ul className="list-group mt-3">
                {videos.length > 0 ? videos.map((video) => (
                  <li key={video.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{video.titre}</span>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-warning" onClick={() => setEditingVideo(video)}>Modifier</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteVideo(video.id)}>Supprimer</button>
                    </div>
                  </li>
                )) : <li className="list-group-item text-muted">Aucune vidéo trouvée.</li>}
              </ul>
            </div>
          )}

          {/* Séances */}
          {activeTab === "seances" && (
            <div className="resource-card">
              <h4 className="resource-title text-primary">💻 Séances en ligne</h4>
              {editingSeance ? (
                <EditSeanceForm
                  seance={editingSeance}
                  formateurId={formateurId}
                  token={token}
                  formations={formations}
                  onSuccess={() => { fetchData(); setEditingSeance(null); }}
                  onCancel={() => setEditingSeance(null)}
                />
              ) : (
                <>
                  <CreateSeance
                    formateurId={formateurId}
                    token={token}
                    formations={formations}
                    onSuccess={fetchData}
                  />
                  <SeancesList
                    seances={seances}
                    onDelete={handleDeleteSeance}
                    onEdit={(s) => setEditingSeance(s)}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </LayoutFormateur>
  );
};

export default GestionFormations;
