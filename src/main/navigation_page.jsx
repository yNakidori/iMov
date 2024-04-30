import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import MenuAppBar from '../components/MenuAppBar';
import ImovelCardFull from '../components/ImovelCardFull';
import { getDatabase, ref, get } from 'firebase/database';
import { BiSearch } from 'react-icons/bi';
import Whats from '../components/Lottie/Whats';

const NavPage = () => {
  const [originalListaDeImoveis, setOriginalListaDeImoveis] = useState([]);
  const [listaDeImoveis, setListaDeImoveis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false); // State para controlar se nenhum imóvel foi encontrado
  const endOfPageRef = useRef(null);

  useEffect(() => {
    const fetchImoveis = async () => {
      setIsLoading(true);
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, 'addresses'));
        if (snapshot.exists()) {
          const imoveis = Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
          setOriginalListaDeImoveis(imoveis);
          setListaDeImoveis(imoveis);
          setNoResults(false); // Resetar o estado quando os imóveis são carregados
        }
      } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
      }
      setIsLoading(false);
    };

    fetchImoveis();
  }, [currentPage]);

  const handleScroll = () => {
    if (endOfPageRef.current && window.innerHeight + window.scrollY >= endOfPageRef.current.offsetTop) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredImoveis = originalListaDeImoveis.filter((imovel) => {
      return imovel.neighborhood.toLowerCase().includes(searchTerm);
    });

    // Atualiza a lista de imóveis e o estado de nenhum resultado encontrado
    setListaDeImoveis(searchTerm ? filteredImoveis : originalListaDeImoveis);
    setNoResults(searchTerm && filteredImoveis.length === 0);
  };

  return (
    <div className='bg-sky-100 min-h-screen'>
      <MenuAppBar />
      <div className="container mx-auto px-2 py-3 flex justify-center">
        <div className="relative mb-4">
          <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-400">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Pesquisar imóveis..."
              className="pl-4 py-2 flex-grow rounded-md focus:outline-none"
            />
            <div className="flex-shrink-0 p-2">
              <BiSearch className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {noResults && (
          <p className="text-center text-red-500">Nenhum imóvel encontrado</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {listaDeImoveis.map((imovel, index) => (
            <ImovelCardFull
              key={imovel.id}
              cidade={imovel.city}
              bairro={imovel.neighborhood}
              valor={imovel.price}
              imageUrls={imovel.imageUrls}
              videoUrl={imovel.videoURL}
              quartos={imovel.bedrooms}
              banheiros={imovel.bathrooms}
            />
          ))}
          {isLoading && <p>Carregando...</p>}
        </div>
        <div ref={endOfPageRef}></div>
        <div className="fixed bottom-16 right-10">
          <Whats />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NavPage;
