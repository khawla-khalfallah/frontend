import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarMinimal from "../../components/NavbarMinimal";
import axiosInstance from "../../config/axios";
import "./MesExamens.css";
import SidebarApprenant from "../../components/SidebarApprenant";

function MesExamens() {
  const [examens, setExamens] = useState([]);
  const [examStatus, setExamStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExamensAndStatus = async () => {
      try {
        setLoading(true);
        
        // Load all examens
        const examensResponse = await axiosInstance.get("/api/examens");
        const examensData = examensResponse.data;
        setExamens(examensData);

        // Load status for each exam
        const statusPromises = examensData.map(async (examen) => {
          try {
            const statusResponse = await axiosInstance.get(`/api/examens/${examen.id}/status`);
            return { id: examen.id, ...statusResponse.data };
          } catch (error) {
            console.error(`Error loading status for exam ${examen.id}:`, error);
            return { id: examen.id, has_taken: false, result: null };
          }
        });

        const statusResults = await Promise.all(statusPromises);
        const statusMap = {};
        statusResults.forEach(status => {
          statusMap[status.id] = status;
        });
        
        setExamStatus(statusMap);
      } catch (err) {
        console.error("Erreur :", err);
      } finally {
        setLoading(false);
      }
    };

    loadExamensAndStatus();
  }, []);

  const renderExamButton = (examen) => {
    const status = examStatus[examen.id];
    
    if (!status) {
      return (
        <button className="btn btn-secondary" disabled>
          ⏳ Chargement...
        </button>
      );
    }

    if (status.has_taken) {
      return (
        <div className="text-end">
          <div className="badge bg-success mb-2 d-block">
            ✅ Examen terminé
          </div>
          <div className="small text-muted">
            Note: {status.result?.note || 0}/20
          </div>
          <div className="small text-muted">
            ({status.result?.percentage || 0}%)
          </div>
        </div>
      );
    }

    return (
      <Link to={`/apprenant/examens/${examen.id}/passer`} className="btn btn-success">
        🚀 Passer l'Examen
      </Link>
    );
  };
  

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

            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Chargement...</span>
                </div>
                <p className="mt-2">Chargement des examens...</p>
              </div>
            ) : (
              <ul className="list-group mb-4">
                {examens.length > 0 ? (
                  examens.map((examen) => (
                    <li key={examen.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="flex-grow-1">
                        <strong>📚 {examen.title || examen.titre}</strong>
                        <br />
                        <small className="text-muted">Formation: {examen.formation?.titre}</small>
                        <br />
                        <small className="text-muted">Durée: {examen.duration} minutes</small>
                        <br />
                        <small className="text-muted">Note totale: {examen.total_marks} points</small>
                        {examen.description && (
                          <>
                            <br />
                            <small className="text-muted">📝 {examen.description}</small>
                          </>
                        )}
                      </div>
                      <div className="ms-3">
                        {renderExamButton(examen)}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-center text-muted">
                    Aucun examen trouvé.
                  </li>
                )}
              </ul>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default MesExamens;
