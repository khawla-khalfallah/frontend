import React, { useEffect, useState } from 'react';
import axios from "axios";
import NavbarMinimal from '../../components/NavbarMinimal';
import { Link } from 'react-router-dom';
import { FaUser, FaBook, FaCertificate, FaChartLine, FaVideo, FaCog } from 'react-icons/fa';

function ProfilApprenant() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8000/api/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUser(response.data);
            console.log(response.data); 
          } catch (error) {
            console.error("Erreur lors du chargement du profil :", error);
          }
        };
      
        fetchProfile();
      }, []);
      
  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        {/* Sidebar identique au Dashboard */}
        <div className="bg-dark text-white p-3 vh-100 d-flex flex-column" style={{ width: "250px" }}>
          <h2 className="text-center">Apprenant</h2>
          <ul className="nav flex-column">
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/profil"><FaUser /> Mon Profil</Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/formations"><FaBook /> Mes Formations</Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/examens"><FaCertificate /> Mes Examens</Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/progres"><FaChartLine /> Progrès</Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/visio"><FaVideo /> Visioconférences</Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/certifications"><FaCertificate /> Certifications</Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link text-white" to="/apprenant/settings"><FaCog /> Paramètres</Link>
            </li>
          </ul>
          <footer className="mt-auto text-center">
            <p className="mb-0">© 2025 DreamLearn. Tous droits réservés.</p>
          </footer>
        </div>

        {/* Contenu principal */}
        <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          <div className="bg-white shadow rounded p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2 className="text-primary mb-4 text-center" style={{ fontWeight: "bold" }}>
              👤 Mon Profil
            </h2>

            {user ? (
              <div className="border rounded p-4">
                <h5 className="text-dark mb-3">Nom : <span className="text-secondary">{user.nom}</span></h5>
                <h5 className="text-dark mb-3">Prénom : <span className="text-secondary">{user.prenom}</span></h5>
                {user.apprenant && (
                <h5 className="text-dark mb-3">
                  Niveau d'étude : <span className="text-secondary">{user.apprenant.niveau_etude}</span>
                </h5>)}
                <p className="mb-2">📧 <strong>Email :</strong> {user.email}</p>
                <p className="badge bg-info text-dark ms-2">🎓 <strong>Statut :</strong> {user.role}</p>
                {/* Bouton Modifier */}
                  <div className="mt-4 text-center">
                    <Link to="/apprenant/SettingsApprenant" className="btn btn-primary">
                      ✏️ Modifier le Profil
                    </Link>
                  </div>
              </div>
            ) : (
              <p>Chargement du profil...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default ProfilApprenant;
