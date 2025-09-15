import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LayoutPublic.css";

function LayoutPublic({ children }) {
    const location = useLocation(); // ✅ pour savoir quelle page est active

    return (
        <div className="layout-public d-flex flex-column min-vh-100">

            {/* ✅ Navbar style NavbarMinimal */}
            <nav className="navbar navbar-expand-lg navbar-dark custom-navbar" role="navigation">
                <div className="container-fluid px-4">
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <img
                            src="/images/logo.jpg"
                            alt="DreamLearn Logo"
                            className="logo"
                        />
                        <span className="ms-2 fw-bold">DreamLearn</span>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto gap-2 gap-lg-3">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link fw-semibold ${location.pathname === "/" ? "active-link" : ""}`}
                                    to="/"
                                >
                                    ACCUEIL
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link fw-semibold ${location.pathname === "/apropos" ? "active-link" : ""}`}
                                    to="/apropos"
                                >
                                    À PROPOS
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link fw-semibold ${location.pathname === "/login" ? "active-link" : ""}`}
                                    to="/login"
                                >
                                    CONNEXION
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-primary fw-semibold px-3" to="/register">
                                    S'INSCRIRE
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* ✅ Contenu dynamique */}
            <main className="flex-grow-1">{children}</main>

            {/* ✅ Footer avec le même style que Navbar */}
            <footer className="custom-footer text-white text-center p-3 mt-auto" role="contentinfo">
                <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <p className="mb-2 mb-md-0 small">© 2025 DreamLearn. Tous droits réservés.</p>
                    <div className="social-icons d-flex gap-3">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i className="fab fa-facebook-f fa-lg"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LayoutPublic;
