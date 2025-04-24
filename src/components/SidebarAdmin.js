import React, { useState } from 'react';
import './SidebarAdmin.css'; // tu peux créer un fichier CSS pour affiner

const tabs = [
  { key: 'users', label: 'Utilisateurs', icon: '👤' },
  { key: 'apprenants', label: 'Apprenants', icon: '👶' },
  { key: 'formateurs', label: 'Formateurs', icon: '👨‍🏫' },
  { key: 'recruteurs', label: 'Recruteurs', icon: '👨‍💼' },
  { key: 'formations', label: 'Formations', icon: '📚' },
  { key: 'examens', label: 'Examens', icon: '📑' },
  { key: 'certificats', label: 'Certificats', icon: '🏆' },
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
    <div style={{
      width: '250px',
      backgroundColor: '#1e1e2f',
      color: 'white',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <h3 className="text-light mb-4">🛠 Tableau Admin</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tabs.map(tab => (
            <li key={tab.key} className="mb-2">
              <button
                onClick={() => handleTabClick(tab.key)}
                className={`btn btn-sm w-100 text-start text-white ${active === tab.key ? 'bg-primary' : 'btn-dark'}`}
              >
                <span style={{ marginRight: '10px' }}>{tab.icon}</span>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="btn btn-danger w-100 mt-3"
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
