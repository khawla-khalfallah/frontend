import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/contact");
      setContacts(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
    }
  };

  const handleReply = async () => {
    if (!selectedContact) return;

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/contact/${selectedContact.id}/reply`,
        { reply_message: replyMessage }
      );
      setStatus({ type: "success", message: res.data.message });
      setReplyMessage("");
      setSelectedContact(null);
    } catch (err) {
      setStatus({ type: "error", message: "Erreur lors de l’envoi de la réponse" });
    }
  };

  return (
    <div>
      <h2 className="mb-4">Messages de Contact</h2>

      {status && (
        <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"}`}>
          {status.message}
        </div>
      )}

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.prenom}</td>
              <td>{c.email}</td>
              <td>{c.message}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setSelectedContact(c)}
                >
                  Répondre
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedContact && (
        <div className="mt-4">
          <h4>Répondre à {selectedContact.prenom} ({selectedContact.email})</h4>
          <textarea
            className="form-control mb-2"
            rows="4"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Écrire votre réponse..."
          />
          <button className="btn btn-success" onClick={handleReply}>
            Envoyer
          </button>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setSelectedContact(null)}
          >
            Annuler
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactsList;
