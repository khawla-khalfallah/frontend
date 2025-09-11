import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarApprenant from "../../components/SidebarApprenant";

function ToutesLesFormations() {
  const [formations, setFormations] = useState([]);
  const [inscriptions, setInscriptions] = useState([]); // stocker les formations inscrites
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/formations");
        setFormations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchInscriptions = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/inscrits/moi", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // extraire les IDs des formations
        const inscritsIds = res.data.map((i) => i.formation.id);
        setInscriptions(inscritsIds);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFormations();
    fetchInscriptions();
  }, [token]);

  const handleInscription = async (formationId) => {
    try {
      await axios.post(
        "http://localhost:8000/api/inscrits/moi",
        { formation_id: formationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Inscription réussie !");
      setInscriptions([...inscriptions, formationId]); // ajouter formation à la liste
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur d'inscription");
    }
  };

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarApprenant />
        <div
          className="p-5"
          style={{
            flex: 1,
            backgroundColor: "#f1f3f6",
            minHeight: "100vh",
          }}
        >
          <h2 className="mb-4 text-primary fw-bold">Toutes les Formations</h2>

          <div className="row g-4">
            {formations.length > 0 ? (
              formations.map((formation) => (
                <div key={formation.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm border-0 hover-shadow transition">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-dark fw-bold">
                        {formation.titre}
                      </h5>
                      <p className="card-text text-secondary flex-grow-1">
                        {formation.description.length > 120
                          ? formation.description.slice(0, 120) + "..."
                          : formation.description}
                      </p>
                      <button
                        onClick={() => handleInscription(formation.id)}
                        className="btn btn-primary mt-3"
                        disabled={inscriptions.includes(formation.id)} // désactiver si déjà inscrit
                      >
                        {inscriptions.includes(formation.id)
                          ? "Déjà inscrit"
                          : "S'inscrire"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucune formation disponible pour le moment.</p>
            )}
          </div>
        </div>
      </div>

      {/* Styles pour hover sur les cartes */}
      <style>
        {`
          .hover-shadow:hover {
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
            transform: translateY(-3px);
            transition: all 0.3s ease;
          }
          .transition {
            transition: all 0.3s ease;
          }
        `}
      </style>
    </div>
  );
}

export default ToutesLesFormations;
