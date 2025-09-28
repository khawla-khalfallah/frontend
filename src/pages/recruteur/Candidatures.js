import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarRecruteur from "../../components/SidebarRecruteur";
import "./Candidatures.css";

const Candidatures = () => {
  const [users, setUsers] = useState([]);
  const [formations, setFormations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [query, setQuery] = useState("");

  // NEW: pour gérer les checkboxes et la modale email
  const [selectedIds, setSelectedIds] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  
// ✅ Charger tous les apprenants avec moyennes au départ
 useEffect(() => {
    fetchAll();
  }, []);
 const fetchAll = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/apprenants/search?q=");
      setUsers(res.data); // backend retourne déjà les moyennes si pas de recherche
    } catch (err) {
      console.error("Erreur chargement apprenants", err);
    }
  };
const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/apprenants/search?q=${query}`
      );
      setUsers(res.data);
      setSelectedIds([]);
    } catch (err) {
      console.error("Erreur lors de la recherche", err);
    }
  };


  const handleListFormations = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/inscrits/apprenant/${user.user_id}`
      );
      setFormations(res.data);
      setSelectedUser(user);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la récupération des formations.");
    }
  };

  // Gestion des checkboxes
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSendEmail = () => {
    if (selectedIds.length === 0) return;
    setShowEmailModal(true);
  };

  const handleConfirmSend = async () => {
    // Ici tu appelles ton API pour envoyer l'email
    try {
      await axios.post('http://localhost:8000/api/send-email', {
        user_ids: selectedIds,
        message: emailMessage,
      });
      alert("Email envoyé !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi");
    }
    setShowEmailModal(false);
    setEmailMessage("");
    setSelectedIds([]);
  };
const noteColumns = query.trim()
  ? Array.from(
      new Set(
        users.flatMap(u => Object.keys(u.notes || {}))
      )
    )
  : [];
  return (
  <div>
    <NavbarMinimal />
    <div className="d-flex">
      <SidebarRecruteur />
      <div className="recruteur-candidatures-container">
        <h2>👥 Liste des Candidatures</h2>

        {/* Barre de recherche */}
        <div className="recruteur-search-bar">
          <input
            type="text"
            placeholder="Rechercher par formation (ex: Angular)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Rechercher
          </button>
        </div>

        {/* Table responsive */}
        <div className="recruteur-table-wrapper">
          <table className="recruteur-table">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Niveau</th>
                {query.trim()
                  ? noteColumns.map((col) => <th key={col}>{col}</th>)
                  : <th>Moyenne des notes</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.user_id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(u.user_id)}
                      onChange={() => toggleSelect(u.user_id)}
                    />
                  </td>
                  <td>{u.user_id}</td>
                  <td>{u.nom}</td>
                  <td>{u.prenom}</td>
                  <td>{u.email}</td>
                  <td>{u.niveau_etude}</td>
                  {query.trim()
                    ? noteColumns.map((col) => (
                        <td key={col}>
                          {u.notes?.[col] ?? "Examen non passé"}
                        </td>
                      ))
                    : (
                        <td>
                          {(() => {
                            const values = Object.values(u.notes || {});
                            return values.length > 0
                              ? (
                                  values.reduce((a, b) => a + (b || 0), 0) / values.length
                                ).toFixed(2)
                              : "Aucune note";
                          })()}
                        </td>
                      )}
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleListFormations(u)}
                    >
                      📚 Lister les formations
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bouton envoyer email */}
        <button
          className="btn btn-success mt-3"
          disabled={selectedIds.length === 0}
          onClick={handleSendEmail}
        >
          ✉ Envoyer un email
        </button>

        {/* Modal formations */}
        {selectedUser && (
          <div className="modal fade show d-block recruteur-modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Formations de {selectedUser?.nom} {selectedUser?.prenom}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedUser(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  {formations.length === 0 ? (
                    <p>Aucune formation trouvée.</p>
                  ) : (
                    <ul>
                      {formations.map((f, idx) => (
                        <li key={idx}>{f.formation?.titre}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal email */}
        {showEmailModal && (
          <div className="modal fade show d-block recruteur-modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Envoyer un email</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEmailModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Tapez votre message ici..."
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowEmailModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleConfirmSend}
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default Candidatures;
