import React from "react";
import NavbarMinimal from "../components/NavbarMinimal";
import SidebarFormateur from "../components/SidebarRecruteur";
import "./RecruteurLayout.css";

function FormateurLayout({ children }) {
  return (
    <div className="layout-container">
      <NavbarMinimal />
      <div className="layout-main">
        <SidebarFormateur />
        <div className="layout-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default FormateurLayout;
