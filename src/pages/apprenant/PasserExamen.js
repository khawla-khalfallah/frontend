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

    // Charger les questions de l'examen
    axios.get(`http://localhost:8000/api/examens/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setExamen(res.data))
    .catch(err => console.error("Erreur lors du chargement de l'examen", err));

    // Exemple temporaire : charger des fausses questions
    setQuestions([
      { id: 1, texte: "Quelle est la capitale de la France ?", options: ["Paris", "Londres", "Berlin", "Madrid"] },
      { id: 2, texte: "Combien font 5 + 7 ?", options: ["10", "11", "12", "13"] },
      { id: 3, texte: "Quel est l'élément chimique H2O ?", options: ["Hydrogène", "Oxygène", "Eau", "Acide"] },
    ]);

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

  const formatTemps = (secondes) => {
    const min = Math.floor(secondes / 60);
    const sec = secondes % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };
  const handleSoumettre = async () => {
    // Exemple de calcul : pour l'instant, fixons une note aléatoire pour tester
    const note = Math.floor(Math.random() * 21); // entre 0 et 20
    
    try {
      const token = localStorage.getItem("token");
  
      await axios.put(`http://localhost:8000/api/examens/${id}`, 
        { note }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      alert(`Examen terminé ! Votre note est ${note}/20`);
  
      // Rediriger vers Mes Examens
      window.location.href = "/apprenant/examens";
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
          <div className="text-center mb-4">
            <span className="badge bg-danger fs-5">⏱️ Temps restant : {formatTemps(tempsRestant)}</span>
          </div>

          {/* Questions */}
          {questions.map((q) => (
            <div key={q.id} className="mb-4">
              <h5>{q.texte}</h5>
              <div className="form-group">
                {q.options.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      checked={reponses[q.id] === option}
                      onChange={() => handleChange(q.id, option)}
                    />
                    <label className="form-check-label">{option}</label>
                  </div>
                ))}
              </div>
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
