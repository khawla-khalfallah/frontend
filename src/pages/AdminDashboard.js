import React, { useState } from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import UsersList from './admin/UsersList';
import ApprenantsList from './admin/ApprenantsList';
import FormateursList from './admin/FormateursList';
import RecruteursList from './admin/RecruteursList';
import FormationsList from './admin/FormationsList';



// tu ajouteras d'autres composants plus tard

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  // fonction pour afficher le bon composant
  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersList />;
      case 'apprenants':
        return <ApprenantsList />;
      case 'formateurs':
        return <FormateursList />;
      case 'recruteurs':
        return <RecruteursList />;
      case 'formations':
        return <FormationsList  />;
        
      default:
        return <p>Choisissez une section depuis le menu.</p>;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdmin setActiveTab={setActiveTab} />
      <div style={{ flex: 1, padding: '20px' }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;

