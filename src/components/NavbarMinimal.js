import React from "react";
import "./NavbarMinimal.css"; // On va créer ce fichier

function NavbarMinimal() {
  return (
    <nav className="navbar-minimal">
      <div className="navbar-logo">
        <img src="/images/logo.jpg" alt="DreamLearn Logo" />
      </div>
      <button
        className="navbar-logout-btn"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        🔐 Se déconnecter
      </button>
    </nav>
  );
}

export default NavbarMinimal;
