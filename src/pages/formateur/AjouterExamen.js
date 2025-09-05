import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavbarMinimal from '../../components/NavbarMinimal';
import SidebarFormateur from '../../components/SidebarFormateur';

const AjouterExamen = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditing = !!editId;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    formation_id: '',
    duration: 60, // minutes
    total_marks: 0,
    questions: []
  });
  
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Always fetch formations
        const formationsResponse = await axiosInstance.get('/api/formations');
        setFormations(formationsResponse.data);

        // If editing, fetch the exam data
        if (isEditing) {
          const examResponse = await axiosInstance.get(`/api/examens/${editId}`);
          const examData = examResponse.data;
          
          // Transform backend data to frontend format
          const transformedQuestions = (examData.questions || []).map(question => {
            // Map database enum types to frontend types
            const typeMapping = {
              'qcm': 'multiple_choice',
              'vrai-faux': 'true_false',
              'texte': 'text'
            };

            const questionType = typeMapping[question.type] || 'multiple_choice';
            let transformedReponses = [];

            if (question.reponses && question.reponses.length > 0) {
              transformedReponses = question.reponses.map(reponse => ({
                text: reponse.texte || '',
                is_correct: reponse.est_correcte || false
              }));
            } else {
              // Add default answers based on question type
              if (questionType === 'multiple_choice') {
                transformedReponses = [
                  { text: '', is_correct: true },
                  { text: '', is_correct: false }
                ];
              } else if (questionType === 'true_false') {
                transformedReponses = [
                  { text: 'Vrai', is_correct: true },
                  { text: 'Faux', is_correct: false }
                ];
              }
            }

            return {
              question_text: question.enonce || '',
              type: questionType,
              points: question.points || 1,
              reponses: transformedReponses
            };
          });
          
          setFormData({
            title: examData.title || examData.titre || '',
            description: examData.description || '',
            formation_id: examData.formation_id || '',
            duration: examData.duration || 60,
            total_marks: examData.total_marks || 0,
            questions: transformedQuestions
          });
        }

      } catch (error) {
        setMessage({ text: 'Erreur lors du chargement des données', type: 'error' });
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isEditing, editId]);

  const handleExamChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addQuestion = () => {
    const newQuestion = {
      question_text: '',
      type: 'multiple_choice',
      points: 1,
      reponses: [
        { text: '', is_correct: true },
        { text: '', is_correct: false }
      ]
    };
    
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const removeQuestion = (index) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleQuestionChange = (questionIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, index) => 
        index === questionIndex ? { ...question, [field]: value } : question
      )
    }));
  };

  const addReponse = (questionIndex) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, index) => 
        index === questionIndex 
          ? { 
              ...question, 
              reponses: [...question.reponses, { text: '', is_correct: false }]
            }
          : question
      )
    }));
  };

  const removeReponse = (questionIndex, reponseIndex) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, index) => 
        index === questionIndex 
          ? { 
              ...question, 
              reponses: question.reponses.filter((_, i) => i !== reponseIndex)
            }
          : question
      )
    }));
  };

  const handleReponseChange = (questionIndex, reponseIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, qIndex) => 
        qIndex === questionIndex 
          ? {
              ...question,
              reponses: question.reponses.map((reponse, rIndex) => 
                rIndex === reponseIndex ? { ...reponse, [field]: value } : reponse
              )
            }
          : question
      )
    }));
  };

  const calculateTotalMarks = () => {
    return formData.questions.reduce((total, question) => total + parseInt(question.points || 0), 0);
  };

  // Update total marks when questions change
  useEffect(() => {
    const total = calculateTotalMarks();
    if (total !== formData.total_marks) {
      setFormData(prev => ({ ...prev, total_marks: total }));
    }
  }, [formData.questions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.questions.length === 0) {
      setMessage({ text: '❌ Veuillez ajouter au moins une question', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      console.log('Token:', token);
      console.log('Form Data:', formData);
      
      let response;
      if (isEditing) {
        // Update existing exam
        response = await axiosInstance.put(`/api/examens/${editId}`, formData);
        setMessage({ text: '✅ Examen modifié avec succès!', type: 'success' });
      } else {
        // Create new exam
        response = await axiosInstance.post('/api/examens', formData);
        setMessage({ text: '✅ Examen créé avec succès!', type: 'success' });
      }

      setTimeout(() => {
        navigate('/formateur/GestionExamens');
      }, 1500);

    } catch (error) {
      console.error('Erreur lors de la création:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      setMessage({ 
        text: error.response?.data?.message || error.response?.data?.error || '❌ Erreur lors de la création de l\'examen', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarFormateur />
        <div className="container-fluid mt-4">
          <h2 className="text-primary fw-bold mb-4">
            {isEditing ? '✏️ Modifier l\'Examen' : '➕ Créer un Nouvel Examen'}
          </h2>

          {message.text && (
            <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Exam Basic Information */}
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">📋 Informations de l'Examen</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Titre de l'examen *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleExamChange}
                      required
                      placeholder="Ex: Examen Final JavaScript"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Formation *</label>
                    <select
                      className="form-select"
                      name="formation_id"
                      value={formData.formation_id}
                      onChange={handleExamChange}
                      required
                      disabled={loading || formations.length === 0}
                    >
                      <option value="">{loading ? 'Chargement...' : 'Sélectionnez une formation'}</option>
                      {formations.map(formation => (
                        <option key={formation.id} value={formation.id}>
                          {formation.titre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Durée (en minutes) *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="duration"
                      value={formData.duration}
                      onChange={handleExamChange}
                      min="1"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Note totale</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.total_marks}
                      disabled
                      placeholder="Calculée automatiquement"
                    />
                    <small className="text-muted">Calculée automatiquement selon les points des questions</small>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Description (optionnel)</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleExamChange}
                    rows="3"
                    placeholder="Description de l'examen..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div className="card mb-4">
              <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">❓ Questions ({formData.questions.length})</h5>
                <button 
                  type="button" 
                  className="btn btn-light btn-sm"
                  onClick={addQuestion}
                >
                  ➕ Ajouter une Question
                </button>
              </div>
              <div className="card-body">
                {formData.questions.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted">Aucune question ajoutée. Cliquez sur "Ajouter une Question" pour commencer.</p>
                  </div>
                ) : (
                  formData.questions.map((question, qIndex) => (
                    <div key={qIndex} className="border rounded p-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-primary">Question {qIndex + 1}</h6>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeQuestion(qIndex)}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                      
                      <div className="row mb-3">
                        <div className="col-md-8">
                          <label className="form-label">Texte de la question *</label>
                          <textarea
                            className="form-control"
                            value={question.question_text}
                            onChange={(e) => handleQuestionChange(qIndex, 'question_text', e.target.value)}
                            rows="2"
                            required
                            placeholder="Tapez votre question ici..."
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">Type *</label>
                          <select
                            className="form-select"
                            value={question.type}
                            onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
                          >
                            <option value="multiple_choice">QCM</option>
                            <option value="true_false">Vrai/Faux</option>
                            <option value="text">Texte libre</option>
                          </select>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">Points *</label>
                          <input
                            type="number"
                            className="form-control"
                            value={question.points}
                            onChange={(e) => handleQuestionChange(qIndex, 'points', parseInt(e.target.value) || 1)}
                            min="1"
                            required
                          />
                        </div>
                      </div>

                      {/* Answers Section */}
                      {question.type === 'multiple_choice' && (
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <label className="form-label">Réponses *</label>
                            <button
                              type="button"
                              className="btn btn-outline-success btn-sm"
                              onClick={() => addReponse(qIndex)}
                            >
                              ➕ Ajouter Réponse
                            </button>
                          </div>
                          {question.reponses.map((reponse, rIndex) => (
                            <div key={rIndex} className="input-group mb-2">
                              <div className="input-group-text">
                                <input
                                  type="radio"
                                  name={`question_${qIndex}_correct`}
                                  checked={reponse.is_correct}
                                  onChange={(e) => {
                                    // Set this answer as correct and others as incorrect
                                    const updatedReponses = question.reponses.map((r, i) => ({
                                      ...r,
                                      is_correct: i === rIndex
                                    }));
                                    handleQuestionChange(qIndex, 'reponses', updatedReponses);
                                  }}
                                />
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                value={reponse.text}
                                onChange={(e) => handleReponseChange(qIndex, rIndex, 'text', e.target.value)}
                                placeholder="Texte de la réponse..."
                                required
                              />
                              {question.reponses.length > 2 && (
                                <button
                                  type="button"
                                  className="btn btn-outline-danger"
                                  onClick={() => removeReponse(qIndex, rIndex)}
                                >
                                  🗑️
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === 'true_false' && (
                        <div>
                          <label className="form-label">Réponse correcte *</label>
                          <div>
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                className="form-check-input"
                                name={`question_${qIndex}_tf`}
                                checked={question.reponses && question.reponses[0]?.text === 'Vrai'}
                                onChange={() => handleQuestionChange(qIndex, 'reponses', [
                                  { text: 'Vrai', is_correct: true },
                                  { text: 'Faux', is_correct: false }
                                ])}
                              />
                              <label className="form-check-label">Vrai</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                className="form-check-input"
                                name={`question_${qIndex}_tf`}
                                checked={question.reponses && question.reponses[0]?.text === 'Faux'}
                                onChange={() => handleQuestionChange(qIndex, 'reponses', [
                                  { text: 'Faux', is_correct: true },
                                  { text: 'Vrai', is_correct: false }
                                ])}
                              />
                              <label className="form-check-label">Faux</label>
                            </div>
                          </div>
                        </div>
                      )}

                      {question.type === 'text' && (
                        <div className="alert alert-info">
                          <small>💡 Question à réponse libre - les apprenants pourront saisir du texte librement.</small>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-between">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/formateur/GestionExamens')}
              >
                ← Annuler
              </button>
              <button 
                type="submit" 
                className="btn btn-success"
                disabled={loading || formData.questions.length === 0}
              >
                {loading ? '🔄 En cours...' : (isEditing ? '✅ Modifier l\'Examen' : '✅ Créer l\'Examen')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjouterExamen;