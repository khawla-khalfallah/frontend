import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarRecruteur from "../../components/SidebarRecruteur";

const Candidatures = () => {
  const [users, setUsers] = useState([]);
  const [formations, setFormations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [query, setQuery] = useState("");

  // NEW: pour gérer les checkboxes et la modale email
  const [selectedIds, setSelectedIds] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/apprenants/search?q=${query}`
      );
      setUsers(res.data);
      setSelectedIds([]); // reset
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

  return (
    <div>
      <NavbarMinimal />
      <div className="d-flex">
        <SidebarRecruteur />
        <div className="container-fluid p-4">
          <h2>👥 Liste des Candidatures</h2>

          {/* Barre de recherche */}
          <div className="mb-3 d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Rechercher par formation (ex: Angular)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Rechercher
            </button>
          </div>

          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>
                  {/* Colonne checkbox */}
                </th>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Niveau</th>
                <th>Note</th>
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
                  <td>{u.user?.nom}</td>
                  <td>{u.user?.prenom}</td>
                  <td>{u.user?.email}</td>
                  <td>{u.niveau_etude}</td>
                  <td>{u.note_examen !== null ? u.note_examen : "Examen non passé"}</td>

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

          {/* Bouton envoyer email */}
          <button
            className="btn btn-success"
            disabled={selectedIds.length === 0}
            onClick={handleSendEmail}
          >
            ✉ Envoyer un email
          </button>

          {/* Modal formations */}
          {selectedUser && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      Formations de {selectedUser.user?.nom} {selectedUser.user?.prenom}
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
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
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
