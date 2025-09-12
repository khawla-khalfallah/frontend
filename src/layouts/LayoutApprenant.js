// LayoutApprenant.js
import React from "react";
import NavbarMinimal from "../components/NavbarMinimal";
import SidebarApprenant from "../components/SidebarApprenant";
import "./LayoutApprenant.css"; 

function LayoutApprenant({ children }) {
  return (
    <div className="layout-container">
      <NavbarMinimal />
      <div className="layout-main">
        <SidebarApprenant />
        <div className="layout-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default LayoutApprenant;
