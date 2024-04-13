import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import MenuAppBar from '../components/MenuAppBar';
import ImovelCardFull from '../components/ImovelCardFull';
import { getDatabase, ref, get } from 'firebase/database';

const NavPage = () => {
  const [listaDeImoveis, setListaDeImoveis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const endOfPageRef = useRef(null);

  useEffect(() => {
    const fetchImoveis = async () => {
      setIsLoading(true);
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, 'addresses'));
        if (snapshot.exists()) {
          const imoveis = Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
          setListaDeImoveis(prevImoveis => [...prevImoveis, ...imoveis]);
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

  return (
    <>
      <MenuAppBar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {listaDeImoveis.map((imovel, index) => (
            <ImovelCardFull
              key={imovel.id}
              id={imovel.id}
              nome={imovel.address}
              descricao={imovel.neighborhood}
              imageUrls={imovel.imageUrls}
              numero={imovel.number}
              cep={imovel.cep}
              quartos={imovel.bedrooms}
              banheiros={imovel.bathrooms}
              pets={imovel.petsAllowed}
            />
          ))}
          {isLoading && <p>Carregando...</p>}
        </div>
        <div ref={endOfPageRef}></div>
      </div>
      <Footer />
    </>
  );
};

export default NavPage;
