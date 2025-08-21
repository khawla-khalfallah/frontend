import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import AjoutVideoForm from './AjoutVideoForm';
import EditVideoForm from './EditVideoForm';

const VideosList = () => {
  const [videos, setVideos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const fetchVideos = () => {
    axios.get('/api/videos')
      .then(res => setVideos(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm("Supprimer cette vidéo ?")) return;
    try {
      await axios.delete(`/api/videos/${id}`);
      alert("Vidéo supprimée !");
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div>
      <h2>🎬 Liste des Vidéos</h2>

      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        ➕ Ajouter une vidéo
      </button>

      {showForm && (
        <AjoutVideoForm onSuccess={() => {
          setShowForm(false);
          fetchVideos();
        }} />
      )}

      {editingVideo && (
        <EditVideoForm
          video={editingVideo}
          onSuccess={() => {
            setEditingVideo(null);
            fetchVideos();
          }}
        />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>URL</th>
            <th>Description</th>
            <th>Formation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.titre}</td>
              <td><a href={v.url} target="_blank" rel="noreferrer">Voir</a></td>
              <td>{v.description}</td> 
              <td>{v.formation?.titre}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingVideo(v)}>✏️ Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(v.id)}>🗑 Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideosList;
