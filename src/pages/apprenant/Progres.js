import React from "react";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarApprenant from "../../components/SidebarApprenant";

function Progres() {
  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarApprenant/>
        {/* Contenu principal - Progrès */}
        <div
          className="p-5"
          style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}
        >
          <div className="bg-white shadow rounded p-4">
            <h2
              className="text-primary mb-4 text-center"
              style={{ fontWeight: "bold" }}
            >
              📈 Mon Progrès
            </h2>
            <p className="text-center text-muted mb-5">
              Suivez votre progression dans chaque cours :
            </p>

            {/* Carte 1 */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  📘 Introduction à la programmation
                </h5>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "80%" }}
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    80%
                  </div>
                </div>
              </div>
            </div>

            {/* Carte 2 */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">💻 Développement web</h5>
                <div className="progress">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: "60%" }}
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    60%
                  </div>
                </div>
              </div>
            </div>

            {/* Tu pourras ajouter d'autres cours dynamiquement ici */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progres;
