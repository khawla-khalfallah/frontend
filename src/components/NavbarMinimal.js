import React from "react";

function NavbarMinimal() {
  return (
  <nav className="navbar navbar-dark" style={{ backgroundColor: "#D3D3D3" }}>
    <div className="container">
      {/* <span className="navbar-brand mb-0 h1">DreamLearn</span> */}
      <img src="/images/logo.jpg" alt="DreamLearn Logo" style={{ height: "40px" }} />
    </div>
  </nav>
  );
}

export default NavbarMinimal;
