const SidebarAdmin = ({ setActiveTab }) => {
  return (
    <div style={{ width: '250px', backgroundColor: '#343a40', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h2>🛠 Admin</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <button onClick={() => setActiveTab('users')} className="btn btn-link text-white">👤 Utilisateurs</button>
        </li>
        <li>
          <button onClick={() => setActiveTab('apprenants')} className="btn btn-link text-white">👶 Apprenants</button>
        </li>
        <li>
          <button onClick={() => setActiveTab('formateurs')} className="btn btn-link text-white">👨‍🏫 Formateurs</button>
        </li>
        <li>
          <button onClick={() => setActiveTab('recruteurs')} className="btn btn-link text-white">👨‍💼 Recruteurs</button>
        </li>
        <li>
          <button onClick={() => setActiveTab('formations')} className="btn btn-link text-white">📚 Formations</button>
        </li>
        <li>
          <button onClick={() => setActiveTab('examens')} className="btn btn-link text-white">📑 Examens</button>
        </li>
        <li>
          <button onClick={() => setActiveTab('certificats')} className="btn btn-link text-white">🏆 Certificats</button>
        </li>
        <li>
          <button onClick={() => setActiveTab('inscrits')} className="btn btn-link text-white">📌 Inscriptions</button>
        </li>
        <li>
          <button onClick={() => setActiveTab('pdfs')} className="btn btn-link text-white">📄 PDFs</button>
        </li>
        <li>
          <button onClick={() => setActiveTab('seances')} className="btn btn-link text-white">🎥 Séances</button>
        </li>
        <li>
          <button onClick={() => setActiveTab('videos')} className="btn btn-link text-white">🎬 Vidéos</button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
