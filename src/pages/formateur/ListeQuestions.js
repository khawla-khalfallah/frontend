import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import { Link, useParams } from "react-router-dom";

function ListQuestion() {
  const { examenId } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(`/examens/${examenId}/questions`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.error("Erreur récupération questions:", err);
      });
  }, [examenId]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📋 Questions de l’examen</h1>

      <Link
        to={`/formateur/examens/${examenId}/questions/ajouter`}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        ➕ Ajouter une question
      </Link>

      <ul className="mt-6">
        {questions.map((q) => (
          <li key={q.id} className="border p-4 rounded mb-4">
            <h2 className="font-semibold">{q.contenu}</h2>
            <p className="text-sm text-gray-600">Type : {q.type}</p>

            <ul className="mt-2 ml-6 list-disc">
              {q.reponses.map((r) => (
                <li
                  key={r.id}
                  className={r.est_correcte ? "text-green-600" : "text-gray-800"}
                >
                  {r.contenu} {r.est_correcte && "✅"}
                </li>
              ))}
            </ul>

            <div className="mt-3 flex gap-3">
              <Link
                to={`/formateur/examens/${examenId}/questions/${q.id}/edit`}
                className="text-blue-500 underline"
              >
                ✏️ Modifier
              </Link>
              <button
                onClick={async () => {
                  if (window.confirm("Supprimer cette question ?")) {
                    try {
                      await axios.delete(`/questions/${q.id}`);
                      setQuestions(questions.filter((qu) => qu.id !== q.id));
                    } catch (err) {
                      console.error("Erreur suppression question:", err);
                    }
                  }
                }}
                className="text-red-500 underline"
              >
                🗑️ Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListQuestion;
