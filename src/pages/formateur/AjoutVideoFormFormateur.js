// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AjoutVideoFormFormateur = ({ formateurId, token, onSuccess }) => {
//   const [formData, setFormData] = useState({
//     titre: "",
//     url: "",
//     description: "",
//     formation_id: "",
//   });

//   const [formations, setFormations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

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
//         console.error("Erreur chargement formations:", err);
//         setMessage("❌ Erreur lors du chargement des formations.");
//       }
//     };
//     if (formateurId) fetchFormations();
//   }, [formateurId, token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       await axios.post("http://localhost:8000/api/videos", formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setMessage("✅ Vidéo ajoutée avec succès !");
//       setFormData({ titre: "", url: "", description: "", formation_id: "" });
//       onSuccess();
//     } catch (err) {
//       console.error("Erreur ajout vidéo:", err.response || err.message);
//       if (err.response?.status === 422) {
//         setMessage("❌ Erreur validation : Vérifie les champs !");
//       } else if (err.response?.status === 403) {
//         setMessage("🚫 Vous n'êtes pas autorisé à ajouter cette vidéo.");
//       } else {
//         setMessage("⚠️ Erreur serveur lors de l'ajout de la vidéo.");
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
//         placeholder="Titre de la vidéo"
//         value={formData.titre}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="text"
//         name="url"
//         className="form-control mb-2"
//         placeholder="URL de la vidéo (YouTube, Vimeo...)"
//         value={formData.url}
//         onChange={handleChange}
//         required
//       />
//       <textarea
//         name="description"
//         className="form-control mb-2"
//         placeholder="Description"
//         value={formData.description}
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

//       <button type="submit" className="btn btn-success" disabled={loading}>
//         {loading ? "En cours..." : "Ajouter Video"}
//       </button>
//     </form>
//   );
// };

// export default AjoutVideoFormFormateur;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AjoutVideoFormFormateur.css";


const AjoutVideoFormFormateur = ({ formateurId, token, onSuccess }) => {
  const [formData, setFormData] = useState({
    titre: "",
    url: "",
    description: "",
    formation_id: "",
  });

  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
        setMessage("❌ Erreur lors du chargement des formations.");
      }
    };
    if (formateurId) fetchFormations();
  }, [formateurId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:8000/api/videos", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("✅ Vidéo ajoutée avec succès !");
      setFormData({ titre: "", url: "", description: "", formation_id: "" });
      onSuccess();
    } catch (err) {
      console.error("Erreur ajout vidéo:", err.response || err.message);
      if (err.response?.status === 422) {
        setMessage("❌ Erreur validation : Vérifie les champs !");
      } else if (err.response?.status === 403) {
        setMessage("🚫 Vous n'êtes pas autorisé à ajouter cette vidéo.");
      } else {
        setMessage("⚠️ Erreur serveur lors de l'ajout de la vidéo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-form-card">
      <h5 className="mb-3 text-orange fw-bold">🎥 Ajouter une Vidéo</h5>

      {message && (
        <div
          className={`alert ${
            message.startsWith("✅")
              ? "alert-success"
              : message.startsWith("❌") || message.startsWith("⚠️")
              ? "alert-danger"
              : "alert-warning"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Titre */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Titre</label>
          <input
            type="text"
            name="titre"
            className="form-control"
            placeholder="Titre de la vidéo"
            value={formData.titre}
            onChange={handleChange}
            required
          />
        </div>

        {/* URL */}
        <div className="mb-3">
          <label className="form-label fw-semibold">URL</label>
          <input
            type="text"
            name="url"
            className="form-control"
            placeholder="Lien YouTube ou Vimeo"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Courte description de la vidéo"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        {/* Formation */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Formation</label>
          <select
            name="formation_id"
            className="form-select"
            value={formData.formation_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir une formation --</option>
            {formations.map((f) => (
              <option key={f.id} value={f.id}>
                {f.titre}
              </option>
            ))}
          </select>
        </div>

        {/* Bouton */}
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-orange"
            disabled={loading}
          >
            {loading ? "⏳ En cours..." : "➕ Ajouter Vidéo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AjoutVideoFormFormateur;
