import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarMinimal from "../../components/NavbarMinimal";
import axios from "axios";
import "./MesExamens.css";
import SidebarApprenant from "../../components/SidebarApprenant";


function MesExamens() {
  const [examens, setExamens] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    let apprenantID = null;
  
    // 1. Charger profile pour obtenir apprenant_id
    axios.get("http://localhost:8000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      apprenantID = res.data.apprenant?.id;
  
      // 2. Charger tous les examens
      return axios.get("http://localhost:8000/api/examens", {
        headers: { Authorization: `Bearer ${token}` },
      });
    })
    .then(res => {
      const tousExamens = res.data;
  
      // 3. Maintenant filtrer en utilisant la bonne apprenant_id
      const examensFiltrés = tousExamens.filter(e => e.apprenant_id === apprenantID);
      setExamens(examensFiltrés);
    })
    .catch(err => {
      console.error("Erreur :", err);
    });
  }, []);
  

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarApprenant/>
        {/* Contenu Principal */}
        <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-primary mb-4 text-center" style={{ fontWeight: "bold" }}>📝 Mes Examens</h2>
            <p className="mb-4 text-center text-muted">Voici la liste des examens auxquels vous êtes inscrits :</p>

            <ul className="list-group mb-4">
              {examens.length > 0 ? (
                examens.map((examen) => (
                  <li key={examen.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>📚 {examen.formation?.titre}</strong>
                      <br />
                      📅 {examen.date_examen}
                    </div>
                    {examen.note === null ? (
                      <Link to={`/apprenant/examens/${examen.id}/passer`} className="btn btn-success">
                        🚀 Passer
                      </Link>
                    ) : (
                      <button className="btn btn-primary">({examen.note}/20)</button>
                    )}
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center text-muted">
                  Aucun examen trouvé.
                </li>
              )}
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MesExamens;
