// src/layouts/FormateurLayout.js
import React from "react";
import NavbarMinimal from "../components/NavbarMinimal";
import SidebarFormateur from "../components/SidebarFormateur";

function FormateurLayout({ children }) {
  return (
    <div className="d-flex flex-column vh-100">
      <NavbarMinimal />
      <div className="d-flex flex-grow-1">
        <SidebarFormateur />
        <main className="flex-grow-1 p-4 bg-light overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default FormateurLayout;
