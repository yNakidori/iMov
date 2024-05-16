import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import MenuAppBar from '../components/MenuAppBar';
import ImovelCardFull from '../components/ImovelCardFull';
import { getDatabase, ref, get, push } from 'firebase/database';
import Whats from '../components/Lottie/Whats';
import { Modal, TextField, Button, Typography } from '@mui/material';

const NavPage = () => {
  const [originalListaDeImoveis, setOriginalListaDeImoveis] = useState([]);
  const [listaDeImoveis, setListaDeImoveis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    contato: '',
    email: '',
    mensagem: '',
    telefone: ''
  });
  const [formErrors, setFormErrors] = useState({
    nome: true,
    contato: true,
    email: false,
    mensagem: true,
    telefone: true
  });

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
          setNoResults(false);
        }
      } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
      }
      setIsLoading(false);
    };

    fetchImoveis();
  }, [currentPage]);

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
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

    setListaDeImoveis(searchTerm ? filteredImoveis : originalListaDeImoveis);
    setNoResults(searchTerm && filteredImoveis.length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setFormErrors({
      ...formErrors,
      [name]: value === ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(formErrors).some(error => error);
    if (!hasErrors) {
      try {
        const db = getDatabase();
        const messagesRef = ref(db, 'messages');
        await push(messagesRef, formData);
        setIsFormOpen(false);
        alert('Formulário enviado com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
        alert('Erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className='bg-sky-100 min-h-screen'>
      <MenuAppBar />
      <div className="container mx-auto px-2 py-3 flex justify-center">
        <div className="flex justify-center w-full">
          <div className="relative mb-4 flex items-stretch">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Pesquisar bairros..."
              className="pl-3 py-2 flex-grow rounded-l border border-gray-300 focus:outline-none"
              style={{ maxWidth: 'calc(120% - 80px)' }}
            />
            <button className="flex-shrink-0 p-2 border border-l-0 border-gray-300 bg-gray-100 rounded-r">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
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
        <div className="fixed bottom-16 right-10">
          <Whats />
        </div>
      </div>
      <Footer />
      <Modal open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '400px' }}>
          <Typography variant="subtitle1" style={{ marginBottom: '20px', textAlign: 'center' }}>Mande uma mensagem direta</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Seu Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              error={formErrors.nome}
              helperText={formErrors.nome ? 'Campo obrigatório' : ''}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="Seu Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              helperText={formErrors.email ? 'Campo obrigatório' : ''}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="Seu Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              error={formErrors.telefone}
              helperText={formErrors.telefone ? 'Campo obrigatório' : ''}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="Mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              error={formErrors.mensagem}
              helperText={formErrors.mensagem ? 'Campo obrigatório' : ''}
              multiline
              rows={4}
              style={{ marginBottom: '20px' }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>Enviar</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default NavPage;
