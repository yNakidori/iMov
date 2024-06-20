import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, push, remove } from 'firebase/database';
import AnimatedIcon from '../components/Lottie/Add';
import House from '../components/Lottie/House';
import Button from '@mui/material/Button';
import CadForm from '../components/CadForm';
import ImovelCard from '../components/ImovelCard';
import MenuAppAdm from '../components/MenuAppAdm';
import DashboardCard from '../components/DashboardCard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';

const MensagensComponent = ({ mensagens, onDeleteMessage }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const openMessagePopup = (message) => {
    setSelectedMessage(message);
  };

  const closeMessagePopup = () => {
    setSelectedMessage(null);
  };

  return (
    <div style={{}}>
      <List sx={{ width: '100%', maxWidth: 650, bgcolor: 'background.paper' }}>
        {mensagens.slice(-10).map((mensagem) => (
          <ListItem key={mensagem.id} disablePadding>
            <ListItemButton dense onClick={() => openMessagePopup(mensagem)}>
              <ListItemText
                primary={mensagem.nome}
                secondary={`Telefone: ${mensagem.telefone}`}
                style={{ minHeight: '80px' }}
              />
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <MessagePopup message={selectedMessage} onClose={closeMessagePopup} onDeleteMessage={onDeleteMessage} />
    </div>
  );
};

const MessagePopup = ({ message, onClose, onDeleteMessage }) => {
  const handleDelete = () => {
    onDeleteMessage(message.id);
    onClose();
  };

  return (
    <Dialog open={!!message} onClose={onClose}>
      <DialogTitle>{message?.nome}</DialogTitle>
      <DialogContent>
        <p>Email: {message?.email}</p>
        <p>Telefone: {message?.telefone}</p>
        <p>Mensagem: {message?.mensagem}</p>
        <p>ID do Imóvel: {message?.id}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
        <Button onClick={handleDelete} color="error" startIcon={<DeleteIcon />}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ListaImoveisPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listaDeImoveis, setListaDeImoveis] = useState([]);
  const [listaDeVendidos, setListaDeVendidos] = useState([]);
  const [totalImoveis, setTotalImoveis] = useState(0);
  const [precoMedio, setPrecoMedio] = useState(0);
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, 'addresses'));
        if (snapshot.exists()) {
          const imoveis = Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
          setListaDeImoveis(imoveis);

          // Calcula o total de imóveis
          setTotalImoveis(imoveis.length);

          // Calcula o preço médio
          const totalPreco = imoveis.reduce((acc, imovel) => acc + imovel.price, 0);
          const mediaPreco = totalPreco / imoveis.length;
          setPrecoMedio(mediaPreco);
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

  // Função para marcar o imóvel como vendido e movê-lo para uma lista de vendidos
  const handleMarkAsSold = async (id) => {
    try {
      const db = getDatabase();
      const imovelRef = ref(db, `addresses/${id}`);
      const vendidosRef = ref(db, 'vendidos');

      // Obter os dados do imóvel que será marcado como vendido
      const snapshot = await get(imovelRef);
      if (snapshot.exists()) {
        const imovelData = snapshot.val();
        // Adicionar o imóvel à lista de vendidos com a data de venda atual
        const dataVenda = new Date().toISOString(); // ISO string da data e hora atual
        await push(vendidosRef, { ...imovelData, dataVenda });
        // Remover o imóvel da lista de imóveis principal
        await remove(imovelRef);
        // Atualizar a lista de imóveis
        setListaDeImoveis(listaDeImoveis.filter(imovel => imovel.id !== id));
      }
    } catch (error) {
      console.error('Erro ao marcar o imóvel como vendido:', error);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const db = getDatabase();
      const messageRef = ref(db, `messages/${id}`);
      await remove(messageRef);
      setMensagens(mensagens.filter(message => message.id !== id));
    } catch (error) {
      console.error('Erro ao excluir mensagem:', error);
    }
  };

  useEffect(() => {
    const fetchVendidos = async () => {
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, 'vendidos'));
        if (snapshot.exists()) {
          const vendidos = Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
          setListaDeVendidos(vendidos);
        }
      } catch (error) {
        console.error('Erro ao buscar imóveis vendidos:', error);
      }
    };

    fetchVendidos();
  }, []);

  useEffect(() => {
    const fetchMensagens = async () => {
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, 'messages'));
        if (snapshot.exists()) {
          const mensagens = Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
          setMensagens(mensagens);
        }
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    };

    fetchMensagens();
  }, []);

  return (
    <>
      <MenuAppAdm />
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative ">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <House />
            <div className="flex items-center">
              <button onClick={togglePopup} className="text-indigo-600 hover:text-indigo-900">
                <AnimatedIcon style={{ width: '32px', height: '32px', marginLeft: '8px' }} />
              </button>
            </div>
          </div>
          {isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
              <div className="p-8 max-w-xl mx-auto rounded-md shadow-lg flex flex-col items-center relative">
                <CadForm />
                <div className='mt-6 flex items-center justify-center'>
                  <Button onClick={togglePopup} variant="contained" color="error">
                    Fechar Popup
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <DashboardCard title="Quantidade de Imóveis Cadastrados" value={totalImoveis} />
            <div className="rounded-lg border border-gray-400 overflow-hidden" style={{ maxHeight: 'calc(100vh - 230px)', overflowY: 'auto' }}>
              <MensagensComponent mensagens={mensagens} onDeleteMessage={handleDeleteMessage} />
            </div>
          </div>
          <div className="rounded-lg border border-gray-400 overflow-hidden" style={{ overflowY: 'auto' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 scrollbar-thin scrollbar-thumb-lilac scrollbar-track-gray-200">
              {listaDeImoveis.map((imovel) => (
                <ImovelCard key={imovel.id}
                  valor={imovel.price}
                  quartos={imovel.bedrooms}
                  banheiros={imovel.bathrooms}
                  {...imovel} origin="available" onImovelVendido={handleMarkAsSold} />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-gray-400 overflow-hidden mt-6" style={{ overflowY: 'auto' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 scrollbar-thin scrollbar-thumb-lilac scrollbar-track-gray-200">
              {listaDeVendidos.map((imovel) => (
                <ImovelCard key={imovel.id} {...imovel} origin="sold" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListaImoveisPage;
