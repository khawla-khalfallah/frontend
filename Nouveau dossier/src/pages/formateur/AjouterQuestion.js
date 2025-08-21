import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarMinimal from '../../components/NavbarMinimal';
import SidebarFormateur from '../../components/SidebarFormateur';

const AjouterQuestion = () => {
  const { examenId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [reponseCorrecte, setReponseCorrecte] = useState('');

  const handleChangeOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/questions', {
        question,
        options,
        reponse_correcte: reponseCorrecte,
        examen_id: examenId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert("Question ajoutée !");
      navigate(-1); // retourne à la page précédente
    } catch (error) {
      console.error("Erreur lors de l'ajout de la question", error);
    }
  };

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarFormateur />
    <div className="container mt-4">
      <h3>➕ Ajouter une question</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Question</label>
          <input className="form-control" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </div>
        {options.map((opt, index) => (
          <div className="mb-2" key={index}>
            <label>Option {index + 1}</label>
            <input className="form-control" value={opt} onChange={(e) => handleChangeOption(index, e.target.value)} required />
          </div>
        ))}
        <div className="mb-3">
          <label>Bonne réponse</label>
          <input className="form-control" value={reponseCorrecte} onChange={(e) => setReponseCorrecte(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AjouterQuestion;
