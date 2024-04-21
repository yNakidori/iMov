import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import MenuAppBar from '../components/MenuAppBar';
import ImovelCardFull from '../components/ImovelCardFull';
import { getDatabase, ref, get } from 'firebase/database';
import { BiSearch } from 'react-icons/bi'; // Importa o ícone de pesquisa

const NavPage = () => {
  const [originalListaDeImoveis, setOriginalListaDeImoveis] = useState([]); // Estado para armazenar a lista original de imóveis
  const [listaDeImoveis, setListaDeImoveis] = useState([]); // Estado para armazenar a lista atual de imóveis
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const endOfPageRef = useRef(null);

  useEffect(() => {
    const fetchImoveis = async () => {
      setIsLoading(true);
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, 'addresses'));
        if (snapshot.exists()) {
          const imoveis = Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
          setOriginalListaDeImoveis(imoveis); // Atualiza a lista original de imóveis
          setListaDeImoveis(imoveis); // Define a lista atual de imóveis
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
    const searchTerm = event.target.value.toLowerCase(); // Convertendo o termo de pesquisa para minúsculas
    setSearchTerm(searchTerm); // Atualiza o estado searchTerm com o texto digitado

    // Filtrando a lista original de imóveis com base no termo de pesquisa
    const filteredImoveis = originalListaDeImoveis.filter((imovel) => {
      // Verifica se a descrição do imóvel contém o termo de pesquisa
      return imovel.neighborhood.toLowerCase().includes(searchTerm);
    });

    // Atualizando a lista atual de imóveis com os resultados filtrados ou com a lista original se não houver termo de pesquisa
    setListaDeImoveis(searchTerm ? filteredImoveis : originalListaDeImoveis);
  };

  return (
    <div className='bg-sky-100 min-h-screen'>
      <MenuAppBar />
      <div className="container mx-auto px-2 py-3 flex justify-center"> {/* Adicionado 'flex justify-center' para centralizar horizontalmente */}
        <div className="relative mb-4"> {/* Adiciona 'relative' para o ícone de pesquisa ficar absoluto dentro do input */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Pesquisar imóveis..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-full"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <BiSearch />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {listaDeImoveis.map((imovel, index) => (
            <ImovelCardFull
              key={imovel.id}
              id={imovel.id}
              nome={imovel.address}
              descricao={imovel.neighborhood}
              imageUrls={imovel.imageUrls}
              videoUrl={imovel.videoURL}
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
    </div>
  );
};

export default NavPage;
