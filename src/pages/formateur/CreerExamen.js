import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";

function CreerExamen() {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    duree: "",
    formation_id: "",
  });
  const [formations, setFormations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/formations").then((res) => setFormations(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/examens", formData).then(() => {
      navigate("/formateur/examens");
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Créer un Examen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="titre"
          placeholder="Titre"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="duree"
          placeholder="Durée (minutes)"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <select
          name="formation_id"
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option>-- Choisir une formation --</option>
          {formations.map((f) => (
            <option key={f.id} value={f.id}>
              {f.titre}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          ✅ Enregistrer
        </button>
      </form>
    </div>
  );
}

export default CreerExamen;
