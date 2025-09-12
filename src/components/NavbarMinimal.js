// import React from "react";

// function NavbarMinimal() {
//   return (
//     <nav className="navbar navbar-dark d-flex justify-content-between align-items-center px-3" style={{ backgroundColor: "#343a40"  }}>
//       <div>
//         <img src="/images/logo.jpg" alt="DreamLearn Logo" style={{ height: "40px" }} />
//       </div>
//       <button
//         className="btn btn-sm btn-danger"
//         onClick={() => {
//           localStorage.clear();
//           window.location.href = "/login";
//         }}
//       >
//         🔐 Se déconnecter
//       </button>
//     </nav>
//   );
// }

// export default NavbarMinimal;
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
