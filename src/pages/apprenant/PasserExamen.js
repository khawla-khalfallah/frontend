import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarMinimal from "../../components/NavbarMinimal";

function PasserExamen() {
  const { id } = useParams(); // id de l'examen
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [reponses, setReponses] = useState({});
  const [tempsRestant, setTempsRestant] = useState(900); // 900 secondes = 15 min
  const [examen, setExamen] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`http://localhost:8000/api/examens/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setExamen(res.data);
      setQuestions(res.data.questions); // s'assurer que les relations sont chargées côté backend
    });
    

    // Démarrer le timer
    const interval = setInterval(() => {
      setTempsRestant(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit(); // Soumettre automatiquement quand le temps finit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [id]);

  const handleChange = (questionId, option) => {
    setReponses({ ...reponses, [questionId]: option });
  };

  const handleSubmit = () => {
    console.log("Réponses envoyées :", reponses);

    // Ici tu peux envoyer les réponses au backend si tu veux
    alert("Examen terminé !");
    navigate("/apprenant/examens"); // Retourner à la liste après l'examen
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };
  
  const handleSoumettre = async () => {
    const token = localStorage.getItem("token");
    console.log(reponses);
    try {
      const res = await axios.post(
        `http://localhost:8000/api/examens/${id}/soumettre`,
        { reponses:reponses },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const note = res.data.note; // supposons que le backend retourne la note
      alert(`Examen terminé ! Votre note est ${note}/20`);
  
      navigate("/apprenant/examens"); // redirection après soumission
    } catch (error) {
      console.error("Erreur en soumettant l'examen :", error);
      alert("Erreur lors de la soumission !");
    }
  };
  
  return (
    <div>
      <NavbarMinimal />
      <div className="container mt-5">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-primary fw-bold mb-4 text-center">📝 Passer l'Examen</h2>

          {examen && (
            <div className="text-center mb-4">
              <h4>{examen.formation?.titre}</h4>
              <p className="text-muted">Date : {examen.date_examen}</p>
            </div>
          )}

          {/* Timer */}
          <div className="alert alert-info text-center fw-bold">
            ⏳ Temps restant : {formatTime(tempsRestant)}
          </div>


          {/* Questions */}
          {questions.map((q, index) => (
          <div key={q.id} className="mb-4">
            <h5>Q{index + 1}. {q.question}</h5>
            {q.options.map((opt, i) => (
              <div key={i} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name={`question_${q.id}`}
                  value={opt}
                  checked={reponses[q.id] === opt}
                  onChange={() => handleChange(q.id, opt)}
                />
                <label className="form-check-label">{opt}</label>
              </div>
            ))}
          </div>
        ))}


          {/* Bouton Soumettre */}
          <div className="text-center">
          <button className="btn btn-success" onClick={handleSoumettre}>
            ✅ Soumettre l'Examen
          </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PasserExamen;
