import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import MenuAppBar from '../components/MenuAppBar';
import ImovelCardFull from '../components/ImovelCardFull'; // Importe o componente ImovelCardFull
import { getDatabase, ref, get } from 'firebase/database';

const NavPage = () => {
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

  return (
    <>
      <MenuAppBar/>
      <>
      </>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {listaDeImoveis.map((imovel) => (
            <ImovelCardFull
              key={imovel.id}
              id={imovel.id}
              nome={imovel.address}
              descricao={imovel.neighborhood}
              imageUrls={imovel.imageUrls}
            />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default NavPage;
