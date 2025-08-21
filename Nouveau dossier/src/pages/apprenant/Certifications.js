import React from "react";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarApprenant from "../../components/SidebarApprenant";

function Certifications() {
  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
       <SidebarApprenant/>

        {/* Contenu principal - Certifications */}
        <div
          className="p-5"
          style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}
        >
          <div className="bg-white shadow rounded p-4">
            <h2
              className="text-success mb-4 text-center"
              style={{ fontWeight: "bold" }}
            >
              🏅 Mes Certifications
            </h2>
            <p className="text-center text-muted mb-5">
              Voici les certifications que vous avez obtenues :
            </p>

            {/* Certification 1 */}
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">📜 Développement Web</h5>
                <p className="card-text">Date d'obtention : 20/12/2024</p>
              </div>
            </div>

            {/* Certification 2 */}
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">📜 Algorithmie</h5>
                <p className="card-text">Date d'obtention : 15/01/2025</p>
              </div>
            </div>

            {/* Tu pourras générer dynamiquement depuis l'API ici */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certifications;
