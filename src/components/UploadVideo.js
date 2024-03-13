import React, { useState } from 'react';
import { storage } from '../firebase/firebase'; // Importe a instância de armazenamento do Firebase do arquivo firebase.js

function UploadVideo() {
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`videos/${video.name}`).put(video); // Use a instância de armazenamento do Firebase para referenciar o local de armazenamento

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completo
        storage
          .ref('videos')
          .child(video.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url); // URL do vídeo carregado
          });
      }
    );
  };

  return (
    <div>
      <progress value={progress} max="100" />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadVideo;
