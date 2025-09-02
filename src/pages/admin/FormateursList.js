// import React, { useEffect, useState } from "react";
// import axios from "../../config/axios";
// import AjoutFormateurForm from "./AjoutFormateurForm";
// import EditFormateurForm from "./EditFormateurForm";

// const FormateursList = () => {
//   const [formateurs, setFormateurs] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingFormateur, setEditingFormateur] = useState(null);

//   const fetchFormateurs = () => {
//     axios
//       .get("http://localhost:8000/api/formateurs")
//       .then((res) => setFormateurs(res.data))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fetchFormateurs();
//   }, []);

//   const handleEdit = (formateur) => {
//     setEditingFormateur(formateur);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Voulez-vous vraiment supprimer ce formateur ?")) return;
//     try {
//       await axios.delete(`http://localhost:8000/api/formateurs/${id}`);
//       alert("Formateur supprimé !");
//       fetchFormateurs();
//     } catch (err) {
//       console.error(err);
//       alert("Erreur lors de la suppression.");
//     }
//   };

//   const handleUpdateStatus = (id, status) => {
//     axios
//       .put(`http://localhost:8000/api/formateurs/${id}/status`, { status })
//       .then(() => {
//         alert(`Formateur ${status} !`);
//         fetchFormateurs();
//       })
//       .catch((err) => console.error(err));
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "accepte":
//         return <span className="badge bg-success">✅ Accepté</span>;
//       case "refuse":
//         return <span className="badge bg-danger">❌ Refusé</span>;
//       default:
//         return <span className="badge bg-warning text-dark">⏳ En attente</span>;
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="fw-bold text-primary">👨‍🏫 Gestion des Formateurs</h2>
//         <button
//           className="btn btn-primary"
//           onClick={() => setShowForm(!showForm)}
//         >
//           ➕ Ajouter un formateur
//         </button>
//       </div>

//       {editingFormateur && (
//         <EditFormateurForm
//           formateur={editingFormateur}
//           onSuccess={() => {
//             setEditingFormateur(null);
//             fetchFormateurs();
//           }}
//         />
//       )}

//       <div className="card shadow-sm rounded-3">
//         <div className="card-body">
//           <table className="table table-hover align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>ID</th>
//                 <th>Nom complet</th>
//                 <th>Email</th>
//                 <th>Spécialité</th>
//                 <th>Bio</th>
//                 <th>CV</th>
//                 <th>Status</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {formateurs.map((f) => (
//                 <tr key={f.user_id}>
//                   <td>{f.user_id}</td>
//                   <td>
//                     <strong>
//                       {f.user?.nom} {f.user?.prenom}
//                     </strong>
//                   </td>
//                   <td>{f.user?.email}</td>
//                   <td>{f.specialite}</td>
//                   <td className="text-muted">{f.bio}</td>
//                   <td>
//                     {f.cv_url ? (
//                       <a
//                         href={`http://127.0.0.1:8000${f.cv_url}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="btn btn-sm btn-outline-primary"
//                       >
//                         📄 Voir CV
//                       </a>
//                     ) : (
//                       <span className="text-secondary fst-italic">
//                         Pas de CV
//                       </span>
//                     )}
//                   </td>
//                   <td>{getStatusBadge(f.status)}</td>
//                   <td className="text-center">
//                     <div className="btn-group">
//                       <button
//                         className="btn btn-sm btn-success"
//                         onClick={() =>
//                           handleUpdateStatus(f.user_id, "accepte")
//                         }
//                       >
//                         ✅
//                       </button>
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => handleUpdateStatus(f.user_id, "refuse")}
//                       >
//                         ❌
//                       </button>
//                       <button
//                         className="btn btn-sm btn-warning"
//                         onClick={() => handleEdit(f)}
//                       >
//                         ✏️
//                       </button>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => handleDelete(f.user_id)}
//                       >
//                         🗑
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {formateurs.length === 0 && (
//                 <tr>
//                   <td colSpan="8" className="text-center text-muted py-3">
//                     Aucun formateur trouvé.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showForm && (
//         <div className="mt-4">
//           <AjoutFormateurForm
//             onSuccess={() => {
//               setShowForm(false);
//               fetchFormateurs();
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormateursList;
import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import AjoutFormateurForm from "./AjoutFormateurForm";
import EditFormateurForm from "./EditFormateurForm";

const FormateursList = () => {
  const [formateurs, setFormateurs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFormateur, setEditingFormateur] = useState(null);

  // 🔹 Pour le modal de refus
  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const [selectedFormateur, setSelectedFormateur] = useState(null);
  const [remarque, setRemarque] = useState("");

  const fetchFormateurs = () => {
    axios
      .get("http://localhost:8000/api/formateurs")
      .then((res) => setFormateurs(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchFormateurs();
  }, []);

  const handleEdit = (formateur) => {
    setEditingFormateur(formateur);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce formateur ?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/formateurs/${id}`);
      alert("Formateur supprimé !");
      fetchFormateurs();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  const handleUpdateStatus = (id, status, remarque = null) => {
    axios
      .put(`http://localhost:8000/api/formateurs/${id}/status`, { status, remarque })
      .then(() => {
        alert(`Formateur ${status} !`);
        fetchFormateurs();
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de la mise à jour du statut.");
      });
  };

    const getStatusBadge = (status, remarque) => {
      switch (status) {
        case "accepte":
          return <span className="badge bg-success">✅ Accepté</span>;
        case "refuse":
          return (
            <div>
              <span className="badge bg-danger">❌ Refusé</span>
              {remarque && (
                <div className="mt-1 text-muted small fst-italic">
                  <i className="bi bi-info-circle"></i> {remarque}
                </div>
              )}
            </div>
          );
        default:
          return <span className="badge bg-warning text-dark">⏳ En attente</span>;
      }
    };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-primary">👨‍🏫 Gestion des Formateurs</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          ➕ Ajouter un formateur
        </button>
      </div>

      {editingFormateur && (
        <EditFormateurForm
          formateur={editingFormateur}
          onSuccess={() => {
            setEditingFormateur(null);
            fetchFormateurs();
          }}
        />
      )}

      <div className="card shadow-sm rounded-3">
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nom complet</th>
                <th>Email</th>
                <th>Spécialité</th>
                <th>Bio</th>
                <th>CV</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formateurs.map((f) => (
                <tr key={f.user_id}>
                  <td>{f.user_id}</td>
                  <td>
                    <strong>
                      {f.user?.nom} {f.user?.prenom}
                    </strong>
                  </td>
                  <td>{f.user?.email}</td>
                  <td>{f.specialite}</td>
                  <td className="text-muted">{f.bio}</td>
                  <td>
                    {f.cv_url ? (
                      <a
                        href={`http://127.0.0.1:8000${f.cv_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        📄 Voir CV
                      </a>
                    ) : (
                      <span className="text-secondary fst-italic">
                        Pas de CV
                      </span>
                    )}
                  </td>
                  <td>{getStatusBadge(f.status, f.remarque)}</td>
                  <td className="text-center">
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleUpdateStatus(f.user_id, "accepte")
                        }
                      >
                        ✅
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setSelectedFormateur(f);
                          setShowRefuseModal(true);
                        }}
                      >
                        ❌
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEdit(f)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(f.user_id)}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {formateurs.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-3">
                    Aucun formateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="mt-4">
          <AjoutFormateurForm
            onSuccess={() => {
              setShowForm(false);
              fetchFormateurs();
            }}
          />
        </div>
      )}

      {/* 🔹 Modal pour refus avec remarque */}
      {showRefuseModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Refuser le formateur</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRefuseModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Vous allez refuser{" "}
                  <strong>
                    {selectedFormateur?.user?.nom} {selectedFormateur?.user?.prenom}
                  </strong>
                  .  
                  Veuillez entrer une remarque :
                </p>
                <textarea
                  className="form-control"
                  rows="3"
                  value={remarque}
                  onChange={(e) => setRemarque(e.target.value)}
                  placeholder="Ex: CV non valide, manque d'expérience..."
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowRefuseModal(false)}
                >
                  Annuler
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (!remarque.trim()) {
                      alert("Veuillez entrer une remarque !");
                      return;
                    }
                    handleUpdateStatus(selectedFormateur.user_id, "refuse", remarque);
                    setRemarque("");
                    setShowRefuseModal(false);
                  }}
                >
                  Confirmer le refus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormateursList;
