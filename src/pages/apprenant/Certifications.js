import React, { useEffect, useState } from "react";
import axios from "axios";
import LayoutApprenant from "../../layouts/LayoutApprenant";
import { FaCertificate, FaDownload, FaCalendar } from "react-icons/fa";

function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Récupérer les certifications de l'apprenant
    axios
      .get("http://localhost:8000/api/apprenant/certifications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCertifications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des certifications :", err);
        setLoading(false);
      });
  }, [token]);

  const handleDownload = (certificationId, titre) => {
    // Fonction pour télécharger le certificat
    axios
      .get(`http://localhost:8000/api/apprenant/certifications/${certificationId}/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Certificat_${titre}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => {
        console.error("Erreur lors du téléchargement :", err);
        alert("Erreur lors du téléchargement du certificat");
      });
  };

  return (
    <LayoutApprenant>
      <div className="main-content">
        <div className="certifications-container" style={{ padding: "20px" }}>
          <h2 className="title" style={{ 
            color: "#007bff", 
            fontWeight: "bold", 
            marginBottom: "30px",
            textAlign: "center" 
          }}>
            <FaCertificate style={{ marginRight: "10px" }} />
            Mes Certifications
          </h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Chargement...</span>
              </div>
            </div>
          ) : certifications.length > 0 ? (
            <div className="certifications-grid" style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
              gap: "20px" 
            }}>
              {certifications.map((certification) => (
                <div 
                  key={certification.id} 
                  className="certification-card" 
                  style={{ 
                    backgroundColor: "white", 
                    border: "1px solid #e0e0e0", 
                    borderRadius: "10px", 
                    padding: "20px", 
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                >
                  <div className="certification-header" style={{ marginBottom: "15px" }}>
                    <h5 style={{ 
                      color: "#333", 
                      marginBottom: "10px",
                      fontSize: "18px",
                      fontWeight: "600"
                    }}>
                      <FaCertificate style={{ color: "#ffd700", marginRight: "8px" }} />
                      {certification.titre_certification || "Certificat de réussite"}
                    </h5>
                    <h6 style={{ 
                      color: "#007bff", 
                      marginBottom: "10px",
                      fontSize: "16px",
                      fontWeight: "500"
                    }}>
                      {certification.formation?.titre || "Formation"}
                    </h6>
                    <p style={{ 
                      color: "#666", 
                      margin: "5px 0",
                      fontSize: "14px"
                    }}>
                      <FaCalendar style={{ marginRight: "5px" }} />
                      Obtenu le : {new Date(certification.date_obtention).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  
                  <div className="certification-details" style={{ marginBottom: "20px" }}>
                    {certification.note_examen && (
                      <p style={{ 
                        backgroundColor: "#e8f5e8", 
                        padding: "8px 12px", 
                        borderRadius: "5px",
                        margin: "10px 0",
                        fontSize: "14px"
                      }}>
                        <strong>Note obtenue :</strong> {parseFloat(certification.note_examen).toFixed(1)}/20
                      </p>
                    )}
                    {certification.formateur && (
                      <p style={{ fontSize: "14px", color: "#555" }}>
                        <strong>Formateur :</strong> {certification.formateur.user?.prenom} {certification.formateur.user?.nom}
                      </p>
                    )}
                  </div>

                  <div className="btn-container" style={{ textAlign: "center" }}>
                    <button
                      onClick={() => handleDownload(certification.id, certification.formation?.titre)}
                      className="btn btn-primary"
                      style={{ 
                        padding: "10px 20px",
                        borderRadius: "25px",
                        fontWeight: "500"
                      }}
                    >
                      <FaDownload style={{ marginRight: "8px" }} />
                      Télécharger
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-certifications" style={{ 
              textAlign: "center", 
              padding: "50px 20px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}>
              <FaCertificate size={60} style={{ color: "#ccc", marginBottom: "20px" }} />
              <h4 style={{ color: "#666", marginBottom: "10px" }}>
                Aucune certification obtenue
              </h4>
              <p style={{ color: "#999" }}>
                Complétez vos formations et réussissez vos examens pour obtenir vos premiers certificats !
              </p>
            </div>
          )}
        </div>
      </div>
    </LayoutApprenant>
  );
}

export default Certifications;