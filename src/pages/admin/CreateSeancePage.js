import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = '93277e1ac7fc4111b592b60a76520c44'; // Remplacez par votre AppID
const TOKEN = null; // Utilisez un token si nécessaire (recommandé en production)
const CHANNEL = 'test'; // Nom du canal

const VideoRoom = () => {
  const [joined, setJoined] = useState(false);
  const [uid, setUid] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState({});
  const localVideoRef = useRef(null);
  const remoteVideoContainerRef = useRef(null);

  const client = useRef(null);
  const localVideoTrack = useRef(null);
  const localAudioTrack = useRef(null);

  useEffect(() => {
    // Initialisation du client Agora
    client.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    // Gestion des utilisateurs distants
    const handleUserPublished = async (user, mediaType) => {
      await client.current.subscribe(user, mediaType);
      
      if (mediaType === 'video') {
        setRemoteUsers(prevUsers => ({
          ...prevUsers,
          [user.uid]: user
        }));
      }

      if (mediaType === 'audio') {
        user.audioTrack.play();
      }
    };

    const handleUserUnpublished = (user) => {
      setRemoteUsers(prevUsers => {
        const newUsers = {...prevUsers};
        delete newUsers[user.uid];
        return newUsers;
      });
    };

    client.current.on('user-published', handleUserPublished);
    client.current.on('user-unpublished', handleUserUnpublished);

    return () => {
      leaveChannel();
    };
  }, []);

  const joinChannel = async () => {
    try {
      // Rejoindre le canal
      const uid = await client.current.join(APP_ID, CHANNEL, TOKEN || null, null);
      setUid(uid);

      // Créer et publier les tracks locaux
      const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      
      localVideoTrack.current = cameraTrack;
      localAudioTrack.current = microphoneTrack;

      // Afficher la vidéo locale
      localVideoTrack.current.play(localVideoRef.current);

      // Publier les tracks
      await client.current.publish([microphoneTrack, cameraTrack]);
      setJoined(true);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  const leaveChannel = async () => {
    try {
      // Arrêter et libérer les tracks locaux
      if (localVideoTrack.current) {
        localVideoTrack.current.stop();
        localVideoTrack.current.close();
      }
      
      if (localAudioTrack.current) {
        localAudioTrack.current.stop();
        localAudioTrack.current.close();
      }

      // Quitter le canal
      await client.current.leave();
      
      // Réinitialiser l'état
      setJoined(false);
      setUid(null);
      setRemoteUsers({});
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="video-room">
      <h2>Video Conference</h2>
      <p>Status: {joined ? `Connected as UID ${uid}` : 'Disconnected'}</p>
      
      {!joined ? (
        <button onClick={joinChannel}>Join Channel</button>
      ) : (
        <button onClick={leaveChannel}>Leave Channel</button>
      )}

      <div className="video-container">
        <div className="local-video">
          <h3>You (UID: {uid})</h3>
          <div ref={localVideoRef} className="video-box"></div>
        </div>
        
        <div className="remote-videos">
          <h3>Remote Users</h3>
          <div ref={remoteVideoContainerRef} className="remote-container">
            {Object.values(remoteUsers).map(user => (
              <div key={user.uid} className="remote-video-wrapper">
                <div 
                  className="video-box remote-video"
                  ref={el => {
                    if (el && user.videoTrack) {
                      user.videoTrack.play(el);
                    }
                  }}
                ></div>
                <p>UID: {user.uid}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .video-room {
          text-align: center;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        button {
          padding: 10px 20px;
          font-size: 16px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin: 10px;
        }
        
        button:hover {
          background: #0056b3;
        }
        
        .video-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }
        
        .local-video, .remote-videos {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 8px;
          background: #f9f9f9;
        }
        
        .video-box {
          width: 320px;
          height: 240px;
          background-color: #000;
          display: block;
          margin: 0 auto;
        }
        
        .remote-container {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }
        
        .remote-video-wrapper {
          text-align: center;
        }
        
        h3 {
          margin-top: 0;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default VideoRoom;