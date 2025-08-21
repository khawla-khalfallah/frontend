import React from "react";
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarFormateur from "../../components/SidebarFormateur";

function Formateur() {
  return (
    <div>
        <NavbarMinimal />
    <div className="d-flex">
     <SidebarFormateur/>
      {/* Contenu principal */}
      {/* <div className="container-fluid p-4">
        <h1 className="mb-4">Tableau de bord</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm p-3 mb-4 bg-primary text-white">
              <h4><i className="fas fa-book"></i> Cours</h4>
              <p>5 Cours actifs</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 mb-4 bg-success text-white">
              <h4><i className="fas fa-user-graduate"></i> Étudiants</h4>
              <p>120 Étudiants inscrits</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 mb-4 bg-warning text-dark">
              <h4><i className="fas fa-star"></i> Avis</h4>
              <p>Note moyenne : 4.7/5</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
    </div>
  );
}

export default Formateur;

