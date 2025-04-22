import React, { useState } from 'react';
import axios from 'axios';

function Test() {
  const [tables, setTables] = useState([]);
  const [primaryKeys, setPrimaryKeys] = useState({});
  const [apprenants, setApprenants] = useState([]);
  const [formations, setFormations] = useState([]);
  const [apprenantsParFormation, setApprenantsParFormation] = useState({});
  const [searchNom, setSearchNom] = useState('');
  const [apprenantRecherche, setApprenantRecherche] = useState(null);
  const [searchTitre, setSearchTitre] = useState('');
  const [formationRecherchee, setFormationRecherchee] = useState(null);
  const [formationsListe, setFormationsListe] = useState([]);
  const [apprenantsFormationSelectionnee, setApprenantsFormationSelectionnee] = useState([]);
  const [currentSection, setCurrentSection] = useState(null); // pour gérer l'affichage unique

  const sectionStyle = {
    padding: '20px',
    marginBottom: '30px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  };

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tables');
      setTables(response.data);
      setCurrentSection('tables');
    } catch (error) {
      console.error('Erreur lors du chargement des tables :', error);
    }
  };

  const fetchPrimaryKeys = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/primary-keys');
      setPrimaryKeys(response.data);
      setCurrentSection('primaryKeys');
    } catch (error) {
      console.error('Erreur lors du chargement des clés primaires :', error);
    }
  };

  const fetchApprenants = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/apprenants');
      setApprenants(response.data);
      setCurrentSection('apprenants');
    } catch (error) {
      console.error("Erreur lors de la récupération des apprenants :", error);
    }
  };

  const fetchFormations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/formations');
      setFormations(response.data);
      setCurrentSection('formations');
    } catch (error) {
      console.error('Erreur lors du chargement des formations :', error);
    }
  };

  const fetchApprenantsByFormation = async (formationId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/formations/${formationId}/apprenants`);
      console.log("Apprenants reçus pour formation ID", formationId, response.data);
      setApprenantsParFormation(prev => ({
        ...prev,
        [formationId]: response.data
      }));
    } catch (error) {
      console.error(`Erreur lors de la récupération des apprenants de la formation ${formationId} :`, error);
    }
  };

  const chercherApprenantParNom = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/chercher-apprenant?nom=${searchNom}`);
      setApprenantRecherche(response.data);
      setCurrentSection('rechercheApprenant');
    } catch (error) {
      console.error("Erreur lors de la recherche de l'apprenant :", error);
      setApprenantRecherche(null);
    }
  };

  const chercherFormationParTitre = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/chercher-formation?titre=${searchTitre}`);
      setFormationRecherchee(response.data);
      setCurrentSection('rechercheFormation');
    } catch (error) {
      console.error("Erreur lors de la recherche de la formation :", error);
      setFormationRecherchee(null);
    }
  };

  const afficherFormations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/formations');
      setFormationsListe(response.data);
      setApprenantsFormationSelectionnee([]);
      setCurrentSection('apprenantsParFormation');
    } catch (error) {
      console.error('Erreur lors du chargement des formations :', error);
    }
  };

  const afficherApprenantsDeFormation = async (formationId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/formations/${formationId}/apprenants`);
      setApprenantsFormationSelectionnee(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des apprenants :', error);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>📊 Test Base de Données</h2>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={fetchTables}>Afficher les Tables</button>{' '}
        <button onClick={fetchPrimaryKeys}>Afficher les Clés Primaires</button>{' '}
        <button onClick={fetchApprenants}>Afficher Apprenants</button>{' '}
        <button onClick={fetchFormations}>Afficher les Formations</button>{' '}
        <button onClick={afficherFormations}>Apprenants par Formation</button>
        <button onClick={() => setCurrentSection('rechercheApprenant')}>🔍 Chercher Apprenant</button>{' '}
        <button onClick={() => setCurrentSection('rechercheFormation')}>🔍 Chercher Formation</button>

      </div>

      {/* Affichage conditionnel des sections */}

      {currentSection === 'tables' && (
        <div style={sectionStyle}>
          <h3>📁 Tables :</h3>
          <ul>{tables.map((table, index) => <li key={index}>{Object.values(table)[0]}</li>)}</ul>
        </div>
      )}

      {currentSection === 'primaryKeys' && (
        <div style={sectionStyle}>
          <h3>🔑 Clés Primaires :</h3>
          {Object.entries(primaryKeys).map(([table, keys]) => (
            <div key={table}>
              <strong>{table}</strong> :
              <ul>
                {keys.map((key, i) => (
                  <li key={i}>{key.Column_name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {currentSection === 'apprenants' && (
        <div style={sectionStyle}>
          <h3>👨‍🎓 Liste des Apprenants :</h3>
          <ul>
            {apprenants.map((apprenant, index) => (
              <li key={index}>
                ID: {apprenant.id} | User_id: {apprenant.user_id} | Niveau: {apprenant.niveau_etude}
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentSection === 'formations' && (
        <div style={sectionStyle}>
          <h3>📚 Liste des Formations :</h3>
          <ul>
            {formations.map((formation) => (
              <li key={formation.id} style={{ marginBottom: '15px' }}>
                <strong>{formation.titre}</strong> — {formation.description}
                <br />
                Prix : {formation.prix} DT | Du {formation.date_debut} au {formation.date_fin}
                <br />
                <button onClick={() => fetchApprenantsByFormation(formation.id)}>👨‍🎓 Voir les apprenants</button>

                {apprenantsParFormation[formation.id] && (
                  <ul>
                    {apprenantsParFormation[formation.id].length === 0 ? (
                      <li>Aucun apprenant inscrit</li>
                    ) : (
                      apprenantsParFormation[formation.id].map((apprenant) => (
                        <li key={apprenant.id}>
                          {apprenant.user?.nom} {apprenant.user?.prenom} — Niveau : {apprenant.niveau_etude}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    {currentSection === 'rechercheApprenant' && (
  <div style={sectionStyle}>
    <h3>🔍 Chercher un Apprenant</h3>
    <input
      type="text"
      placeholder="Nom ou Prénom"
      value={searchNom}
      onChange={(e) => setSearchNom(e.target.value)}
      style={{ marginRight: '10px' }}
    />
    <button onClick={chercherApprenantParNom}>Chercher</button>

    {apprenantRecherche && (
      <div style={{ marginTop: '15px' }}>
        <h4>Résultat :</h4>
        <p><strong>Nom :</strong> {apprenantRecherche.user.nom}</p>
        <p><strong>Prénom :</strong> {apprenantRecherche.user.prenom}</p>
        <p><strong>Email :</strong> {apprenantRecherche.user.email}</p>
        <p><strong>Niveau :</strong> {apprenantRecherche.niveau_etude}</p>
      </div>
    )}
  </div>
)}

  {currentSection === 'rechercheFormation' && (
    <div style={sectionStyle}>
      <h3>🔍 Chercher une Formation</h3>
      <input
        type="text"
        placeholder="Titre de la formation"
        value={searchTitre}
        onChange={(e) => setSearchTitre(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={chercherFormationParTitre}>Chercher</button>

      {formationRecherchee && (
        <div style={{ marginTop: '15px' }}>
          <h4>Résultat :</h4>
          <p><strong>Titre :</strong> {formationRecherchee.titre}</p>
          <p><strong>Description :</strong> {formationRecherchee.description}</p>
          <p><strong>Prix :</strong> {formationRecherchee.prix} DT</p>
          <p><strong>Dates :</strong> Du {formationRecherchee.date_debut} au {formationRecherchee.date_fin}</p>
          <p><strong>Formateur_id :</strong> {formationRecherchee.formateur_id}</p>
        </div>
      )}
    </div>
  )}


      {/* Apprenants par formation */}
      {currentSection === 'apprenantsParFormation' && (
        <div style={sectionStyle}>
          <h3>👥 Liste des Apprenants par Formation</h3>

          {formationsListe.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              {formationsListe.map((formation) => (
                <button
                  key={formation.id}
                  onClick={() => afficherApprenantsDeFormation(formation.id)}
                  style={{ display: 'block', margin: '10px auto', padding: '10px', width: '100%' }}
                >
                  {formation.titre}
                </button>
              ))}
            </div>
          )}

          {apprenantsFormationSelectionnee.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4>👨‍🎓 Apprenants inscrits :</h4>
              <ul>
                {apprenantsFormationSelectionnee.map((apprenant) => (
                  <li key={apprenant.id}>
                    {apprenant.user?.nom} {apprenant.user?.prenom} — Niveau : {apprenant.niveau_etude}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Test;
