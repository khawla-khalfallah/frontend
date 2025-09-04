// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import NavbarMinimal from '../../components/NavbarMinimal';
// import SidebarFormateur from '../../components/SidebarFormateur';

// const AjouterQuestion = () => {
//   const { examenId } = useParams();
//   const navigate = useNavigate();
//   const [question, setQuestion] = useState('');
//   const [options, setOptions] = useState(['', '', '', '']);
//   const [reponseCorrecte, setReponseCorrecte] = useState('');

//   const handleChangeOption = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8000/api/questions', {
//         question,
//         options,
//         reponse_correcte: reponseCorrecte,
//         examen_id: examenId,
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       alert("Question ajoutée !");
//       navigate(-1); // retourne à la page précédente
//     } catch (error) {
//       console.error("Erreur lors de l'ajout de la question", error);
//     }
//   };

//   return (
//     <div>
//       <NavbarMinimal />
//       <div className="d-flex">
//         <SidebarFormateur />
//     <div className="container mt-4">
//       <h3>➕ Ajouter une question</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Question</label>
//           <input className="form-control" value={question} onChange={(e) => setQuestion(e.target.value)} required />
//         </div>
//         {options.map((opt, index) => (
//           <div className="mb-2" key={index}>
//             <label>Option {index + 1}</label>
//             <input className="form-control" value={opt} onChange={(e) => handleChangeOption(index, e.target.value)} required />
//           </div>
//         ))}
//         <div className="mb-3">
//           <label>Bonne réponse</label>
//           <input className="form-control" value={reponseCorrecte} onChange={(e) => setReponseCorrecte(e.target.value)} required />
//         </div>
//         <button type="submit" className="btn btn-primary">Ajouter</button>
//       </form>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default AjouterQuestion;
// src/pages/formateur/AjouterQuestion.js
// import React, { useState } from "react";
// import axios from "../../config/axios";
// import { useParams, useNavigate } from "react-router-dom";
// import FormateurLayout from "../../layouts/FormateurLayout";

// function AjouterQuestion() {
//   const { id } = useParams(); // examen_id
//   const navigate = useNavigate();
//   const [enonce, setEnonce] = useState("");
//   const [type, setType] = useState("qcm");
//   const [points, setPoints] = useState(1);
//   const [choix, setChoix] = useState(["", ""]);
//   const [bonneReponse, setBonneReponse] = useState(null);

//   const handleChoixChange = (i, value) => {
//     const updated = [...choix];
//     updated[i] = value;
//     setChoix(updated);
//   };

//   const addChoix = () => setChoix([...choix, ""]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post(`/examens/${id}/questions`, {
//       enonce,
//       type,
//       points,
//       choix: type === "qcm" ? choix : undefined,
//       bonne_reponse: type === "qcm" ? bonneReponse : undefined,
//       bonne_valeur: type === "vrai-faux" ? bonneReponse : undefined,
//       reponse_attendue: type === "texte" ? bonneReponse : undefined,
//     }).then(() => {
//       alert("✅ Question ajoutée !");
//       navigate(-1);
//     });
//   };

//   return (
//     <FormateurLayout>
//       <h1 className="text-xl font-bold mb-4">➕ Ajouter une Question</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
        
//         <input
//           type="text"
//           placeholder="Intitulé de la question"
//           value={enonce}
//           onChange={(e) => setEnonce(e.target.value)}
//           className="form-control"
//         />

//         <select value={type} onChange={(e) => setType(e.target.value)} className="form-control">
//           <option value="qcm">QCM</option>
//           <option value="vrai-faux">Vrai/Faux</option>
//           <option value="texte">Réponse libre</option>
//         </select>

//         <input
//           type="number"
//           value={points}
//           onChange={(e) => setPoints(e.target.value)}
//           className="form-control"
//           placeholder="Nombre de points"
//         />

//         {type === "qcm" && (
//           <>
//             {choix.map((c, i) => (
//               <div key={i} className="d-flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   value={c}
//                   onChange={(e) => handleChoixChange(i, e.target.value)}
//                   className="form-control"
//                 />
//                 <input
//                   type="radio"
//                   name="bonne"
//                   value={i}
//                   onChange={() => setBonneReponse(i)}
//                 />
//               </div>
//             ))}
//             <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addChoix}>
//               ➕ Ajouter un choix
//             </button>
//           </>
//         )}

//         {type === "vrai-faux" && (
//           <select onChange={(e) => setBonneReponse(e.target.value)} className="form-control">
//             <option value="vrai">Vrai</option>
//             <option value="faux">Faux</option>
//           </select>
//         )}

//         {type === "texte" && (
//           <input
//             type="text"
//             placeholder="Réponse attendue"
//             value={bonneReponse || ""}
//             onChange={(e) => setBonneReponse(e.target.value)}
//             className="form-control"
//           />
//         )}

//         <button type="submit" className="btn btn-success">✅ Enregistrer</button>
//       </form>
//     </FormateurLayout>
//   );
// }

// export default AjouterQuestion;
import React, { useState } from "react";
import axios from "../../config/axios";
import { useParams, useNavigate } from "react-router-dom";
import FormateurLayout from "../../layouts/FormateurLayout";

function AjouterQuestion() {
  const { id } = useParams(); // examen_id
  const navigate = useNavigate();

  const [contenu, setContenu] = useState("");
  const [type, setType] = useState("qcm");
  const [reponses, setReponses] = useState([
    { contenu: "", est_correcte: false },
    { contenu: "", est_correcte: false },
  ]);

  const handleReponseChange = (i, field, value) => {
    const updated = [...reponses];
    updated[i][field] = value;
    setReponses(updated);
  };

  const addReponse = () =>
    setReponses([...reponses, { contenu: "", est_correcte: false }]);

  const removeReponse = (i) => {
    setReponses(reponses.filter((_, index) => index !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/examens/${id}/questions`, {
        contenu,
        type,
        examen_id: id,
        reponses: type === "qcm" ? reponses : [],
      });

      alert("✅ Question ajoutée !");
      navigate(`/formateur/examens/${id}/questions`);
    } catch (err) {
      console.error("Erreur ajout question:", err);
      alert("❌ Erreur lors de l’ajout");
    }
  };

  return (
    <FormateurLayout>
      <h1 className="text-xl font-bold mb-4">➕ Ajouter une Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Intitulé de la question"
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="qcm">QCM</option>
          <option value="texte">Réponse libre</option>
        </select>

        {type === "qcm" && (
          <div className="mt-3">
            <h2 className="font-semibold mb-2">Réponses :</h2>
            {reponses.map((r, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={r.contenu}
                  onChange={(e) =>
                    handleReponseChange(i, "contenu", e.target.value)
                  }
                  placeholder={`Réponse ${i + 1}`}
                  className="border p-2 flex-1"
                  required
                />
                <label>
                  <input
                    type="checkbox"
                    checked={r.est_correcte}
                    onChange={(e) =>
                      handleReponseChange(i, "est_correcte", e.target.checked)
                    }
                  />
                  Correcte
                </label>
                <button
                  type="button"
                  onClick={() => removeReponse(i)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addReponse}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              ➕ Ajouter une réponse
            </button>
          </div>
        )}

        {type === "texte" && (
          <p className="text-sm text-gray-500">
            ✅ La correction se fera manuellement (réponse libre).
          </p>
        )}

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Enregistrer
        </button>
      </form>
    </FormateurLayout>
  );
}

export default AjouterQuestion;
