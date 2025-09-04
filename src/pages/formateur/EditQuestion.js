import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/axios";

function EditQuestion() {
  const { examenId, questionId } = useParams();
  const navigate = useNavigate();

  const [contenu, setContenu] = useState("");
  const [type, setType] = useState("qcm");
  const [reponses, setReponses] = useState([]);

  useEffect(() => {
    axios
      .get(`/questions/${questionId}`)
      .then((res) => {
        setContenu(res.data.contenu);
        setType(res.data.type);
        setReponses(res.data.reponses || []);
      })
      .catch((err) => {
        console.error("Erreur chargement question:", err);
      });
  }, [questionId]);

  const handleReponseChange = (index, field, value) => {
    const newReponses = [...reponses];
    newReponses[index][field] = value;
    setReponses(newReponses);
  };

  const addReponse = () => {
    setReponses([...reponses, { contenu: "", est_correcte: false }]);
  };

  const removeReponse = (index) => {
    setReponses(reponses.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/questions/${questionId}`, {
        contenu,
        type,
        examen_id: examenId,
        reponses,
      });

      navigate(`/formateur/examens/${examenId}/questions`);
    } catch (err) {
      console.error("Erreur mise à jour question:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">✏️ Modifier une question</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Contenu :</label>
          <input
            type="text"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block">Type :</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="qcm">QCM</option>
            <option value="texte">Texte libre</option>
          </select>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Réponses :</h2>
          {reponses.map((r, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={r.contenu}
                onChange={(e) =>
                  handleReponseChange(index, "contenu", e.target.value)
                }
                placeholder={`Réponse ${index + 1}`}
                className="border p-2 flex-1"
              />
              <label>
                <input
                  type="checkbox"
                  checked={r.est_correcte}
                  onChange={(e) =>
                    handleReponseChange(index, "est_correcte", e.target.checked)
                  }
                />
                Correcte
              </label>
              <button
                type="button"
                onClick={() => removeReponse(index)}
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

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          💾 Sauvegarder
        </button>
      </form>
    </div>
  );
}

export default EditQuestion;
