import React, { useState } from 'react';
import './SidebarAdmin.css';

const tabs = [
  { key: 'users', label: 'Utilisateurs', icon: '👤' },
  { key: 'apprenants', label: 'Apprenants', icon: '👶' },
  { key: 'formateurs', label: 'Formateurs', icon: '👨‍🏫' },
  { key: 'recruteurs', label: 'Recruteurs', icon: '👨‍💼' },
  { key: 'contacts', label: 'Contacts', icon: '📩' },
  { key: 'formations', label: 'Formations', icon: '📚' },
  { key: 'examens', label: 'Examens', icon: '📑' },
  { key: 'inscrits', label: 'Inscriptions', icon: '📌' },
  { key: 'pdfs', label: 'PDFs', icon: '📄' },
  { key: 'seances', label: 'Séances', icon: '🎥' },
  { key: 'videos', label: 'Vidéos', icon: '🎬' },
];

const SidebarAdmin = ({ setActiveTab }) => {
  const [active, setActive] = useState('users');

  const handleTabClick = (key) => {
    setActive(key);
    setActiveTab(key);
  };

  return (
    <div className="sidebar-admin">
      <div>
        <h3 className="sidebar-title">🛠 Tableau Admin</h3>
        <ul className="sidebar-tabs">
          {tabs.map(tab => (
            <li key={tab.key}>
              <button
                onClick={() => handleTabClick(tab.key)}
                className={`sidebar-btn ${active === tab.key ? 'active' : ''}`}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="sidebar-logout-btn"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        🔐 Se déconnecter
      </button>
    </div>
  );
};

export default SidebarAdmin;
