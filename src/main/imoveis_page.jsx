import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CadForm from '../components/CadForm';
import Footer from '../components/Footer';
import AnimatedIcon from '../components/Lottie/Add';

const ListaImoveisPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const listaDeImoveis = [
    { id: 1, nome: 'Imóvel 1', descricao: 'Descrição do Imóvel 1' },
    { id: 2, nome: 'Imóvel 2', descricao: 'Descrição do Imóvel 2' },
    { id: 3, nome: 'Imóvel 3', descricao: 'Descrição do Imóvel 3' },
  ];

  return (
    <div className="min-h-screen bg-indigo-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-white">Lista de Imóveis</h2>
          <div className="flex items-center">
            <button onClick={togglePopup} className="text-indigo-600 hover:text-indigo-900">
              Cadastrar Novo Imóvel
              <AnimatedIcon style={{ width: '32px', height: '32px', marginLeft: '8px' }} />
            </button>
          </div>
        </div>
        {/* Pop-up */}
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white p-8 max-w-xl mx-auto rounded-md shadow-lg">
              <CadForm />
            </div>
            <button onClick={togglePopup} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                Fechar Popup
              </button>
          </div>
        )}
        {/* Fim do Pop-up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listaDeImoveis.map((imovel) => (
            <div key={imovel.id} className="bg-white overflow-hidden shadow-lg rounded-lg">
              <Link to={`/imovel/${imovel.id}`}>
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">{imovel.nome}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{imovel.descricao}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListaImoveisPage;
