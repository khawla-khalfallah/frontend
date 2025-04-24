import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaChartLine, FaVideo, FaCertificate, FaCog, FaUser } from "react-icons/fa";
import axios from "axios";
import NavbarMinimal from "../../components/NavbarMinimal";


function MesFormations() {
  const [formations, setFormations] = useState([]);
  const [apprenantId, setApprenantId] = useState(null);

  const token = localStorage.getItem("token");

  // Étape 1 : Récupérer l'ID de l'apprenant connecté
  useEffect(() => {
    axios.get("http://localhost:8000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const apprenantID = res.data.apprenant?.id;
      setApprenantId(apprenantID);
    })
    .catch((err) => console.error("Erreur lors du chargement du profil :", err));
  }, [token]);

  // Étape 2 : Charger les formations après avoir reçu l'ID
  useEffect(() => {
    if (!apprenantId) return;

    axios.get("http://localhost:8000/api/inscrits", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const filtered = res.data
        .filter((inscrit) => inscrit.apprenant_id === apprenantId)
        .map((inscrit) => ({
          ...inscrit.formation,
          date_inscription: inscrit.date_inscription,
        }));
      setFormations(filtered);
    })
    .catch((err) => {
      console.error("Erreur lors du chargement des formations :", err);
    });
  }, [apprenantId, token]); // 👉 ajoute apprenantId comme dépendance ici

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        {/* Sidebar identique au Dashboard */}
        <div className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "250px" }}>
          <h2 className="text-center">Apprenant</h2>
          <ul className="nav flex-column">
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/profil">
                <FaUser /> Mon Profil
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/formations">
                <FaBook /> Mes Formations
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/examens">
                <FaCertificate /> Mes Examens
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/progres">
                <FaChartLine /> Progrès
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/visio">
                <FaVideo /> Visioconférences
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/certifications">
                <FaCertificate /> Certifications
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/settings">
                <FaCog /> Paramètres
              </Link>
            </li>
          </ul>
          <footer className="mt-auto text-center">
            <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
          </footer>
        </div>

        {/* Contenu Principal - Mes Formations */}
        <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          <div className="bg-white shadow rounded p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2 className="text-primary mb-4 text-center" style={{ fontWeight: "bold" }}>
              📚 Mes Formations
            </h2>
            <div className="border rounded p-4">
            <ul className="list-group">
                {formations.length > 0 ? (
                  formations.map((formation) => (
                    <li
                      key={formation.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <h6 className="mb-1">{formation.titre}</h6>
                        <small className="text-muted">📅 Inscrit le {formation.date_inscription}</small>
                      </div>
                      <Link to={`/apprenant/formations/${formation.id}`} className="btn btn-primary btn-sm">
                        Accéder
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-center">
                    Aucune formation trouvée.
                  </li>
                )}
            </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MesFormations;

