import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarRecruteur from "../../components/SidebarRecruteur"; // crée un Sidebar pour recruteur
import { Link } from "react-router-dom";

function Profil() {
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
        <SidebarRecruteur />
        <div
          className="p-5"
          style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}
        >
          <div
            className="bg-white shadow rounded p-4"
            style={{ maxWidth: "700px", margin: "0 auto" }}
          >
            <h2
              className="text-primary mb-4 text-center"
              style={{ fontWeight: "bold" }}
            >
              🏢 Mon Profil Recruteur
            </h2>

            {user ? (
              <div className="border rounded p-4">
                <h5 className="text-dark mb-3">
                  Nom : <span className="text-secondary">{user.nom}</span>
                </h5>
                <h5 className="text-dark mb-3">
                  Prénom : <span className="text-secondary">{user.prenom}</span>
                </h5>
                <p className="mb-2">📧 <strong>Email :</strong> {user.email}</p>

                {/* Info spécifique recruteur */}
                {user.recruteur && (
                  <h5 className="text-dark mb-3">
                    Entreprise :{" "}
                    <span className="text-secondary">
                      {user.recruteur.entreprise}
                    </span>
                  </h5>
                )}

                <p className="badge bg-warning text-dark ms-2">
                  🧑‍💼 <strong>Statut :</strong> {user.role}
                </p>

                <div className="mt-4 text-center">
                  <Link
                    to="/recruteur/Paramètres"
                    className="btn btn-primary"
                  >
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

export default Profil;
