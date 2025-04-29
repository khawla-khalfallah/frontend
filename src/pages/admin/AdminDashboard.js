import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin';
import AdminHome from './AdminHome';
import UsersList from './UsersList';
import ApprenantsList from './ApprenantsList';
import FormateursList from './FormateursList';
import RecruteursList from './RecruteursList';
import FormationsList from './FormationsList';
import ExamensList from './ExamensList';
import CertificatsList from './CertificatsList';
import PdfsList from './PdfsList';
import SeancesList from './SeancesList';
import VideosList from './VideosList';
import InscritsList from './InscritsList';



// tu ajouteras d'autres composants plus tard

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert("Accès refusé. Vous n'êtes pas un administrateur.");
      navigate("/login"); 
    }
  },[navigate]);
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
      case 'examens':
        return <ExamensList  />;
      case 'certificats':
        return <CertificatsList  />;
      case 'pdfs':
        return <PdfsList  />;
      case 'seances':
        return <SeancesList  />;
      case 'videos':
        return <VideosList  />;
      case 'inscrits':
        return <InscritsList />;
        
      default:
        return <AdminHome />; 
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

