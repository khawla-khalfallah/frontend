import React from "react";
import { FaVideo, FaCalendarAlt, FaClock, FaGraduationCap } from "react-icons/fa";

const SeancesList = ({ seances, onDelete, onEdit }) => {
return (
  <div className="mt-4 grid gap-4">
    {seances.length > 0 ? (
      seances.map((s) => (
        <div
          key={s.id}
          className="bg-white shadow-md rounded-xl p-4 border-l-4 border-indigo-500 hover:shadow-lg transition flex justify-between items-start"
        >
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaVideo className="text-indigo-600" /> {s.titreSeance}
            </h5>
            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <span className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                <FaCalendarAlt /> {new Date(s.date).toLocaleDateString("fr-FR")}
              </span>
              <span className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                <FaClock /> {s.heureDebut} → {s.heureFin}
              </span>
            </div>
            {s.lienRoom && (
              <a
                href={s.lienRoom}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
              >
                <FaVideo /> Ouvrir la séance
              </a>
            )}
            {s.formation && (
              <div className="mt-1 text-gray-500 text-sm flex items-center gap-1">
                <FaGraduationCap /> <em>{s.formation.titre}</em>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 ml-4">
            {onEdit && (
              <button
                className="btn btn-sm btn-warning hover:brightness-110 transition"
                onClick={() => onEdit(s)}
              >
                Modifier
              </button>
            )}
            <button
              className="btn btn-sm btn-danger hover:brightness-110 transition"
              onClick={() => onDelete(s.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg p-4 text-center">
        Aucune séance en ligne trouvée.
      </div>
    )}
  </div>
);
};

export default SeancesList;
