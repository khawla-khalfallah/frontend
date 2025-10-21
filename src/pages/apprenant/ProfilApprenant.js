import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import LayoutApprenant from "../../layouts/LayoutApprenant"; // ✅ attention au chemin
import "./ProfilApprenant.css";

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
      } catch (error) {
        console.error("Erreur lors du chargement du profil :", error);
      }
    };
    fetchProfile();
  }, []);

  // Fonction pour générer les initiales
  const getInitials = (prenom, nom) => {
    if (!prenom && !nom) return "U";
    return `${prenom?.charAt(0) || ""}${nom?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <LayoutApprenant>
      <div className="profile-content">
        <div className="profile-card">
          <h2 className="profile-title"> 👤 Mon Profil</h2>

          {user ? (
            <div className="profile-details">
              {/* ✅ Avatar avec initiales */}
              <div className="avatar-container">
                <div className="avatar">
                  {getInitials(user.prenom, user.nom)}
                </div>
              </div>

              <div className="detail-row">
                <span className="label">Nom :</span>
                <span className="value">{user.nom}</span>
              </div>

              <div className="detail-row">
                <span className="label">Prénom :</span>
                <span className="value">{user.prenom}</span>
              </div>

              {user.apprenant && (
                <div className="detail-row">
                  <span className="label">Niveau d'étude :</span>
                  <span className="value">{user.apprenant.niveau_etude}</span>
                </div>
              )}

              <div className="detail-row">
                <span className="label">📧 Email :</span>
                <span className="value">{user.email}</span>
              </div>

              <div className="detail-row">
                <span className="label">Statut :</span>
                <span className="badge">{user.role}</span>
              </div>

              <div className="btn-container">
                <Link to="/apprenant/SettingsApprenant" className="btn-edit">
                  ✏️ Modifier le Profil
                </Link>
              </div>
            </div>
          ) : (
            <p className="loading">Chargement du profil...</p>
          )}
        </div>
      </div>
    </LayoutApprenant>
  );

}

export default ProfilApprenant;
