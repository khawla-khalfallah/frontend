// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EditPdfFormFormateur = ({ pdf, token, formateurId, onSuccess, onCancel }) => {
//   // ✅ États manquants
//   const [formData, setFormData] = useState({
//     titre: pdf.titre || "",
//     fichier: null,
//     formation_id: pdf.formation_id || "",
//   });
//   const [formations, setFormations] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Charger les formations du formateur
//   useEffect(() => {
//     const fetchFormations = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8000/api/formateurs/${formateurId}/formations`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setFormations(res.data);
//       } catch (err) {
//         console.error("❌ Erreur chargement formations:", err);
//         setMessage("❌ Impossible de charger les formations.");
//       }
//     };

//     if (formateurId) fetchFormations();
//   }, [formateurId, token]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const data = new FormData();
//     data.append("titre", formData.titre);
//     if (formData.fichier) data.append("fichier", formData.fichier);
//     data.append("formation_id", formData.formation_id);

//     try {
//       await axios.post(
//         `http://localhost:8000/api/pdfs/${pdf.id}?_method=PUT`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setMessage("✅ PDF mis à jour avec succès !");
//       onSuccess(); // rafraîchir la liste
//     } catch (err) {
//       console.error("❌ Erreur mise à jour PDF:", err.response || err.message);

//       if (err.response?.status === 422) {
//         setMessage("❌ Vérifiez les champs, certains sont invalides.");
//       } else if (err.response?.status === 403) {
//         setMessage("🚫 Vous n'êtes pas autorisé à modifier ce PDF.");
//       } else {
//         setMessage("⚠️ Erreur serveur lors de la mise à jour.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-3">
//       {message && <p>{message}</p>}

//       <input
//         type="text"
//         name="titre"
//         className="form-control mb-2"
//         placeholder="Titre du PDF"
//         value={formData.titre}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="file"
//         name="fichier"
//         className="form-control mb-2"
//         onChange={handleChange}
//       />

//       <select
//         name="formation_id"
//         className="form-control mb-2"
//         value={formData.formation_id}
//         onChange={handleChange}
//         required
//       >
//         <option value="">-- Choisir une formation --</option>
//         {formations.map((f) => (
//           <option key={f.id} value={f.id}>
//             {f.titre}
//           </option>
//         ))}
//       </select>

//       <div className="d-flex gap-2">
//         <button type="submit" className="btn btn-primary" disabled={loading}>
//           {loading ? "En cours..." : "Modifier PDF"}
//         </button>
//         <button type="button" className="btn btn-secondary" onClick={onCancel}>
//           Annuler
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditPdfFormFormateur;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditPdfFormFormateur.css"; // ✅ Import style

const EditPdfFormFormateur = ({ pdf, token, formateurId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    titre: pdf.titre || "",
    fichier: null,
    formation_id: pdf.formation_id || "",
  });
  const [formations, setFormations] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Charger les formations du formateur
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/formateurs/${formateurId}/formations`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFormations(res.data);
      } catch (err) {
        console.error("❌ Erreur chargement formations:", err);
        setMessage("❌ Impossible de charger les formations.");
      }
    };

    if (formateurId) fetchFormations();
  }, [formateurId, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("titre", formData.titre);
    if (formData.fichier) data.append("fichier", formData.fichier);
    data.append("formation_id", formData.formation_id);

    try {
      await axios.post(
        `http://localhost:8000/api/pdfs/${pdf.id}?_method=PUT`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("✅ PDF mis à jour avec succès !");
      onSuccess(); // rafraîchir la liste
    } catch (err) {
      console.error("❌ Erreur mise à jour PDF:", err.response || err.message);

      if (err.response?.status === 422) {
        setMessage("❌ Vérifiez les champs, certains sont invalides.");
      } else if (err.response?.status === 403) {
        setMessage("🚫 Vous n'êtes pas autorisé à modifier ce PDF.");
      } else {
        setMessage("⚠️ Erreur serveur lors de la mise à jour.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-pdf-form shadow-sm rounded p-4">
      <h5 className="form-title">✏️ Modifier le PDF</h5>
      {message && <p className="form-message">{message}</p>}

      <form onSubmit={handleSubmit} className="mt-3">
        {/* Champ Titre */}
        <div className="mb-3">
          <label className="form-label">Titre du PDF</label>
          <input
            type="text"
            name="titre"
            className="form-control"
            placeholder="Ex : Cours de React (Mise à jour)"
            value={formData.titre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Upload fichier */}
        <div className="mb-3">
          <label className="form-label">Nouveau fichier (optionnel)</label>
          <input
            type="file"
            name="fichier"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {/* Choix formation */}
        <div className="mb-3">
          <label className="form-label">Formation associée</label>
          <select
            name="formation_id"
            className="form-select"
            value={formData.formation_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner une formation --</option>
            {formations.map((f) => (
              <option key={f.id} value={f.id}>
                {f.titre}
              </option>
            ))}
          </select>
        </div>

        {/* Boutons */}
        <div className="button-group">
          <button type="submit" className="btn-uniform btn-warning-uniform" disabled={loading}>
            {loading ? "⏳ En cours..." : "✅ Sauvegarder"}
          </button>
          <button type="button" className="btn-uniform btn-secondary-uniform" onClick={onCancel}>
            ❌ Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPdfFormFormateur;
