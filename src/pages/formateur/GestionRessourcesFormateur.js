// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import NavbarMinimal from "../../components/NavbarMinimal";
// import SidebarFormateur from "../../components/SidebarFormateur";
// import AjoutPdfFormFormateur from "./AjoutPdfFormFormateur";
// import AjoutVideoFormFormateur from "./AjoutVideoFormFormateur";

// const GestionRessourcesFormateur = () => {
//   const [pdfs, setPdfs] = useState([]);
//   const [videos, setVideos] = useState([]);

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));
//   const formateurId = user?.id; // ⚠️ Vérifie si c’est bien l’id formateur et pas l’id user

//   const fetchData = async () => {
//     try {
//       const resPdf = await axios.get("http://localhost:8000/api/pdfs", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const resVideo = await axios.get("http://localhost:8000/api/videos", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // 👉 enlève le filtre pour tester
//       setPdfs(resPdf.data);
//       setVideos(resVideo.data);

//       console.log("📑 PDFs récupérés :", resPdf.data);
//       console.log("🎥 Vidéos récupérées :", resVideo.data);
//     } catch (err) {
//       console.error("❌ Erreur chargement ressources :", err);
//     }
//   };

//   useEffect(() => {
//     if (formateurId) {
//       fetchData();
//     }
//   }, [formateurId]);

//   return (
//     <div>
//       <NavbarMinimal />
//       <div className="d-flex">
//         <SidebarFormateur />
//         <div className="container mt-4">
//           <h2 className="text-primary fw-bold">📂 Gestion des Ressources</h2>

//           {/* Gestion des PDFs */}
//           <div className="mt-4 p-3 bg-light rounded shadow-sm">
//             <h4>📑 PDFs</h4>
//             <AjoutPdfFormFormateur
//               formateurId={formateurId}
//               token={token}
//               onSuccess={fetchData}
//             />

//             <ul className="list-group mt-3">
//               {pdfs.length > 0 ? (
//                 pdfs.map((pdf) => (
//                   <li
//                     key={pdf.id}
//                     className="list-group-item d-flex justify-content-between align-items-center"
//                   >
//                     {pdf.titre}
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={async () => {
//                         if (window.confirm("Supprimer ce PDF ?")) {
//                           try {
//                             await axios.delete(
//                               `http://localhost:8000/api/pdfs/${pdf.id}`,
//                               { headers: { Authorization: `Bearer ${token}` } }
//                             );
//                             fetchData();
//                           } catch (err) {
//                             console.error("❌ Erreur suppression PDF :", err);
//                             alert("Erreur lors de la suppression du PDF.");
//                           }
//                         }
//                       }}
//                     >
//                       🗑️ Supprimer
//                     </button>
//                   </li>
//                 ))
//               ) : (
//                 <li className="list-group-item">Aucun PDF trouvé.</li>
//               )}
//             </ul>
//           </div>

//           {/* Gestion des vidéos */}
//           <div className="mt-4 p-3 bg-light rounded shadow-sm">
//             <h4>🎥 Vidéos</h4>
//             <AjoutVideoFormFormateur
//               formateurId={formateurId}
//               token={token}
//               onSuccess={fetchData}
//             />

//             <ul className="list-group mt-3">
//               {videos.length > 0 ? (
//                 videos.map((video) => (
//                   <li
//                     key={video.id}
//                     className="list-group-item d-flex justify-content-between align-items-center"
//                   >
//                     {video.titre}
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={async () => {
//                         if (window.confirm("Supprimer cette vidéo ?")) {
//                           try {
//                             await axios.delete(
//                               `http://localhost:8000/api/videos/${video.id}`,
//                               { headers: { Authorization: `Bearer ${token}` } }
//                             );
//                             fetchData();
//                           } catch (err) {
//                             console.error("❌ Erreur suppression vidéo :", err);
//                             alert("Erreur lors de la suppression de la vidéo.");
//                           }
//                         }
//                       }}
//                     >
//                       🗑️ Supprimer
//                     </button>
//                   </li>
//                 ))
//               ) : (
//                 <li className="list-group-item">Aucune vidéo trouvée.</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GestionRessourcesFormateur;
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarFormateur from "../../components/SidebarFormateur";
import AjoutPdfFormFormateur from "./AjoutPdfFormFormateur";
import EditPdfFormFormateur from "./EditPdfFormFormateur";
import AjoutVideoFormFormateur from "./AjoutVideoFormFormateur";
import EditVideoFormFormateur from "./EditVideoFormFormateur";

const GestionRessourcesFormateur = () => {
  const [pdfs, setPdfs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [editPdf, setEditPdf] = useState(null);
  const [editVideo, setEditVideo] = useState(null);

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

      console.log("📑 PDFs récupérés :", resPdf.data);
      console.log("🎥 Vidéos récupérées :", resVideo.data);
    } catch (err) {
      console.error("❌ Erreur chargement ressources :", err);
    }
  };

  useEffect(() => {
    if (formateurId) {
      fetchData();
    }
  }, [formateurId]);

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarFormateur />
        <div className="container mt-4">
          <h2 className="text-primary fw-bold">📂 Gestion des Ressources</h2>

          {/* PDFs */}
          <div className="mt-4 p-3 bg-light rounded shadow-sm">
            <h4>📑 PDFs</h4>
            {editPdf ? (
              <EditPdfFormFormateur
                pdf={editPdf}
                onSuccess={() => {
                  setEditPdf(null);
                  fetchData();
                }}
                onClose={() => setEditPdf(null)}
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
                    {pdf.titre}
                    <div>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setEditPdf(pdf)}
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={async () => {
                          if (window.confirm("Supprimer ce PDF ?")) {
                            try {
                              await axios.delete(
                                `http://localhost:8000/api/pdfs/${pdf.id}`,
                                { headers: { Authorization: `Bearer ${token}` } }
                              );
                              fetchData();
                            } catch (err) {
                              console.error("❌ Erreur suppression PDF :", err);
                              alert("Erreur lors de la suppression du PDF.");
                            }
                          }
                        }}
                      >
                        🗑️ Supprimer
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
            <h4>🎥 Vidéos</h4>
            {editVideo ? (
              <EditVideoFormFormateur
                video={editVideo}
                onSuccess={() => {
                  setEditVideo(null);
                  fetchData();
                }}
                onClose={() => setEditVideo(null)}
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
                    {video.titre}
                    <div>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setEditVideo(video)}
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={async () => {
                          if (window.confirm("Supprimer cette vidéo ?")) {
                            try {
                              await axios.delete(
                                `http://localhost:8000/api/videos/${video.id}`,
                                { headers: { Authorization: `Bearer ${token}` } }
                              );
                              fetchData();
                            } catch (err) {
                              console.error("❌ Erreur suppression vidéo :", err);
                              alert("Erreur lors de la suppression de la vidéo.");
                            }
                          }
                        }}
                      >
                        🗑️ Supprimer
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

export default GestionRessourcesFormateur;
