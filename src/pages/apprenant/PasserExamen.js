import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarMinimal from "../../components/NavbarMinimal";

function PasserExamen() {
  const { id } = useParams(); // id de l'examen
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [reponses, setReponses] = useState({});
  const [tempsRestant, setTempsRestant] = useState(null); // Will be set from exam duration
  const [examen, setExamen] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`http://localhost:8000/api/examens/${id}/passer`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setExamen(res.data.examen);
      setQuestions(res.data.examen.questions); // s'assurer que les relations sont chargées côté backend
      
      // Set timer from exam duration (convert minutes to seconds)
      const durationInSeconds = (res.data.examen.duration || 60) * 60;
      setTempsRestant(durationInSeconds);
      setTimerStarted(true);
    }).catch(err => {
      console.error("Erreur lors du chargement de l'examen:", err);
      console.error("Response data:", err.response?.data);
      alert("Erreur: " + (err.response?.data?.error || err.response?.data?.message || "Impossible de charger l'examen"));
    });
  }, [id]);

  // Separate useEffect for timer to avoid dependency issues
  useEffect(() => {
    let interval;
    if (timerStarted && tempsRestant !== null && tempsRestant > 0) {
      interval = setInterval(() => {
        setTempsRestant(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSoumettre(); // Soumettre automatiquement quand le temps finit
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerStarted]);

  const handleChange = (questionId, option) => {
    setReponses({ ...reponses, [questionId]: option });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevQuestion();
      } else if (e.key === 'ArrowRight') {
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestionIndex, questions.length]);

  const handleSubmit = () => {
    handleSoumettre(); // Call the actual submit function
  };

  const handleSoumettre = async () => {
    const unansweredQuestions = questions.length - Object.keys(reponses).length;
    
    let confirmMessage = "Êtes-vous sûr de vouloir soumettre votre examen ?";
    if (unansweredQuestions > 0) {
      confirmMessage += `\n\nAttention: ${unansweredQuestions} question(s) non répondue(s).`;
    }
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

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
  
      const note = res.data.note || 0; 
      const percentage = res.data.percentage || 0;
      const totalScore = res.data.total_score || 0;
      const totalPossible = res.data.total_possible || 0;
      
      alert(`Examen terminé !\nVotre note: ${note}/20 (${percentage}%)\nScore: ${totalScore}/${totalPossible} points`);
  
      navigate("/apprenant/examens"); // redirection après soumission
    } catch (error) {
      console.error("Erreur en soumettant l'examen :", error);
      alert("Erreur lors de la soumission !");
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };
  
  return (
    <div>
      <NavbarMinimal />
      <div className="container mt-5">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-primary fw-bold mb-4 text-center">📝 Passer l'Examen</h2>

          {examen && (
            <div className="text-center mb-4">
              <h3 className="text-primary">{examen.title || examen.titre}</h3>
              <h5>{examen.formation?.titre}</h5>
              <p className="text-muted">
                Durée: {examen.duration} minutes | Note totale: {examen.total_marks} points
              </p>
              {examen.description && (
                <p className="text-muted fst-italic">{examen.description}</p>
              )}
            </div>
          )}

          {/* Timer */}
          {tempsRestant !== null && (
            <div className={`alert ${tempsRestant > 300 ? 'alert-info' : tempsRestant > 60 ? 'alert-warning' : 'alert-danger'} text-center fw-bold`}>
              ⏳ Temps restant : {formatTime(tempsRestant)}
              {tempsRestant <= 60 && (
                <div className="mt-1">
                  <small>⚠️ Attention: Il vous reste moins d'une minute!</small>
                </div>
              )}
            </div>
          )}

          {/* Progress bar */}
          {questions.length > 0 && (
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-muted">Progression</small>
                <small className="text-muted">{Object.keys(reponses).length}/{questions.length} réponses</small>
              </div>
              <div className="progress">
                <div 
                  className="progress-bar bg-success" 
                  role="progressbar" 
                  style={{ width: `${(Object.keys(reponses).length / questions.length) * 100}%` }}
                  aria-valuenow={Object.keys(reponses).length} 
                  aria-valuemin="0" 
                  aria-valuemax={questions.length}
                >
                </div>
              </div>
            </div>
          )}

          {/* Navigation des questions */}
          {questions.length > 0 && (
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  Question {currentQuestionIndex + 1} sur {questions.length}
                </h5>
                <div className="btn-group" role="group">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`btn btn-sm ${
                        index === currentQuestionIndex
                          ? 'btn-primary'
                          : reponses[questions[index]?.id]
                          ? 'btn-success'
                          : 'btn-outline-secondary'
                      }`}
                      onClick={() => goToQuestion(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Question actuelle */}
          {questions.length > 0 && questions[currentQuestionIndex] && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  Q{currentQuestionIndex + 1}. {questions[currentQuestionIndex].enonce}
                </h5>
                {questions[currentQuestionIndex].reponses && questions[currentQuestionIndex].reponses.map((reponse) => (
                  <div key={reponse.id} className="form-check mb-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={`question_${questions[currentQuestionIndex].id}`}
                      value={reponse.id}
                      checked={reponses[questions[currentQuestionIndex].id] == reponse.id}
                      onChange={() => handleChange(questions[currentQuestionIndex].id, reponse.id)}
                    />
                    <label className="form-check-label">{reponse.texte}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation entre les questions */}
          {questions.length > 0 && (
            <div className="d-flex justify-content-between mb-4">
              <button
                className="btn btn-secondary"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                ⬅️ Précédent
              </button>
              <div>
                <span className="text-muted me-3">
                  {Object.keys(reponses).length} / {questions.length} réponses
                </span>
              </div>
              {currentQuestionIndex === questions.length - 1 ? (
                // Show submit button only on the final question
                <button
                  className="btn btn-success"
                  onClick={handleSoumettre}
                  disabled={Object.keys(reponses).length === 0}
                >
                  ✅ Soumettre l'Examen
                </button>
              ) : (
                // Show next button on all other questions
                <button
                  className="btn btn-secondary"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Suivant ➡️
                </button>
              )}
            </div>
          )}


          {/* Bouton Soumettre - Only show if on final question or for emergency submit */}
          {currentQuestionIndex === questions.length - 1 && questions.length > 0 && (
            <div className="text-center">
              <div className="alert alert-warning mb-3">
                <strong>⚠️ Attention :</strong> Une fois soumis, vous ne pourrez plus modifier vos réponses.
              </div>
              <button 
                className="btn btn-success btn-lg"
                onClick={handleSoumettre}
                disabled={Object.keys(reponses).length === 0}
              >
                ✅ Soumettre l'Examen ({Object.keys(reponses).length}/{questions.length} réponses)
              </button>
            </div>
          )}

          {/* Emergency submit button for users who want to submit early */}
          {currentQuestionIndex < questions.length - 1 && questions.length > 0 && Object.keys(reponses).length > 0 && (
            <div className="text-center mt-4">
              <div className="alert alert-info">
                <strong>💡 Conseil :</strong> Naviguez jusqu'à la dernière question pour soumettre votre examen.
              </div>
              <button 
                className="btn btn-outline-success"
                onClick={handleSoumettre}
              >
                🚨 Soumettre maintenant ({Object.keys(reponses).length}/{questions.length} réponses)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PasserExamen;
