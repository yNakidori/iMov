import React, { useState } from 'react';
import { getDatabase, ref as databaseRef, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const CadForm = () => {
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [cep, setCep] = useState('');
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleNeighborhoodChange = (event) => {
    setNeighborhood(event.target.value);
  };

  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  const handleVideoChange = (event) => {
    if (event.target.files[0]) {
      setVideo(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica se o vídeo foi selecionado
    if (!video) {
      alert('Selecione um vídeo antes de enviar o formulário.');
      return;
    }

    try {
      // Conecta-se ao Realtime Database
      const db = getDatabase();

      // Conecta-se ao Firebase Storage
      const storage = getStorage();

      // Upload do vídeo
      const storageReference = storageRef(storage, `videos/${video.name}`);
      const uploadTask = uploadBytesResumable(storageReference, video);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      });

      uploadTask.then(async (snapshot) => {
        // Upload do vídeo concluído
        const videoURL = await getDownloadURL(snapshot.ref);

        // Adiciona os dados do formulário e o URL do vídeo à coleção 'addresses'
        await push(databaseRef(db, 'addresses'), {
          address,
          number,
          neighborhood,
          cep,
          videoURL: videoURL
        });

        // Limpa os campos do formulário após o envio bem-sucedido
        setAddress('');
        setNumber('');
        setNeighborhood('');
        setCep('');
        setVideo(null);
        setProgress(0);

        // Feedback para o usuário de que o envio foi concluído
        alert('Formulário enviado com sucesso!');
      });
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      // Feedback para o usuário em caso de erro
      alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    }
  };

  return (
    <div className="bg-indigo-100 max-h-screen flex flex-col items-center justify-center">
      <div className="bg-indigo-300 p-8 rounded shadow-md max-w-3xl w-full mx-auto mt-8 ">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={handleAddressChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="w-full">
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Número
              </label>
              <input
                type="text"
                id="number"
                name="number"
                value={number}
                onChange={handleNumberChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
              Bairro
            </label>
            <input
              type="text"
              id="neighborhood"
              name="neighborhood"
              value={neighborhood}
              onChange={handleNeighborhoodChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
              CEP
            </label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={cep}
              onChange={handleCepChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="video" className="block text-sm font-medium text-gray-700">
              Vídeo (MP4)
            </label>
            <input
              type="file"
              id="video"
              name="video"
              accept="video/mp4"
              onChange={handleVideoChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
      {progress > 0 && (
        <div className="mt-4 w-full max-w-3xl">
          <div className="bg-gray-200 h-4 rounded-md overflow-hidden">
            <div
              className="bg-green-500 h-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-gray-700 text-sm">{`${progress}% concluído`}</p>
        </div>
      )}
    </div>
  );
};

export default CadForm;
