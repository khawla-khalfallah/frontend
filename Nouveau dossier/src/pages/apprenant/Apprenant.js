import React from "react";
import { Link } from "react-router-dom";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarApprenant from "../../components/SidebarApprenant";

function Apprenant() {
  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarApprenant />
        <div className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          <div className="bg-white shadow rounded p-4 text-center">
            <h1 className="text-primary mb-3" style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
              🎓 Bienvenue sur votre espace Apprenant
            </h1>
            <p className="text-secondary fs-5">
              Commencez votre apprentissage en explorant les différentes sections disponibles dans le menu à gauche.
            </p>
            <div className="d-flex justify-content-center mt-4 gap-3 flex-wrap">
              <Link to="/apprenant/formations" className="btn btn-outline-primary btn-lg">
                📚 Mes Formations
              </Link>
              <Link to="/apprenant/examens" className="btn btn-outline-success btn-lg">
                📝 Mes Examens
              </Link>
              <Link to="/apprenant/progres" className="btn btn-outline-info btn-lg">
                📈 Suivre mon Progrès
              </Link>
              <Link to="/formations/ranking" className="btn btn-outline-warning btn-lg">
                🏆 Classement des Formations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apprenant;