import React from "react";
import { FaVideo, FaCalendarAlt, FaClock, FaGraduationCap } from "react-icons/fa";
import "./SeancesList.css";

const SeancesList = ({ seances, onDelete, onEdit }) => {
  return (
    <div className="mt-4 grid gap-4">
      {seances.length > 0 ? (
        seances.map((s) => (
          <div key={s.id} className="seance-card">
            <div className="seance-info flex flex-col gap-2">
              <h5><FaVideo className="text-indigo-600" /> {s.titreSeance}</h5>

              <div className="flex gap-2 flex-wrap">
                <span className="badge">
                  <FaCalendarAlt /> {new Date(s.date).toLocaleDateString("fr-FR")}
                </span>
                <span className="badge">
                  <FaClock /> {s.heureDebut} → {s.heureFin}
                </span>
              </div>

              {s.lienRoom && (
                <a href={s.lienRoom} target="_blank" rel="noreferrer">
                  <FaVideo /> Ouvrir la séance
                </a>
              )}

              {s.formation && (
                <div className="formation">
                  <FaGraduationCap /> <em>{s.formation.titre}</em>
                </div>
              )}
            </div>
            <div className="seance-actions">
              {onEdit && (
                <button className="btn btn-sm btn-outline-warning" onClick={() => onEdit(s)}>
                  Modifier
                </button>
              )}
              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(s.id)}>
                Supprimer
              </button>
            </div>

          </div>
        ))
      ) : (
        <div className="no-seance">
          Aucune séance en ligne trouvée.
        </div>
      )}
    </div>
  );
};

export default SeancesList;
