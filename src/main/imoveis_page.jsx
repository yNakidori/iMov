import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import Footer from '../components/Footer';
import AnimatedIcon from '../components/Lottie/Add';
import House from '../components/Lottie/House';
import Button from '@mui/material/Button';
import CadForm from '../components/CadForm';
import ImovelCard from '../components/ImovelCard';

const ListaImoveisPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listaDeImoveis, setListaDeImoveis] = useState([]);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, 'addresses'));
        if (snapshot.exists()) {
          const imoveis = Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
          setListaDeImoveis(imoveis);
        }
      } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
      }
    };

    fetchImoveis();
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-white">Lista de Imóveis</h2>
          <House />
          <div className="flex items-center">
            <button onClick={togglePopup} className="text-indigo-600 hover:text-indigo-900">
              Cadastrar Novo Imóvel
              <AnimatedIcon style={{ width: '32px', height: '32px', marginLeft: '8px' }} />
            </button>
          </div>
        </div>
        {isPopupOpen && (
          <div className=" fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className=" p-8 max-w-xl mx-auto rounded-md shadow-lg flex flex-col items-center">
              <CadForm />
              <div className='mt-6 flex items-center justify-center'>
                <Button onClick={togglePopup} variant="contained" color="error">
                  Fechar Popup
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listaDeImoveis.map((imovel) => (
            <ImovelCard key={imovel.id} id={imovel.id} nome={imovel.address} descricao={imovel.neighborhood} imageUrls={[imovel.firstImageUrl]} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListaImoveisPage;
