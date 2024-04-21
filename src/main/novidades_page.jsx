import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, push, remove } from 'firebase/database';
import Footer from '../components/Footer';
import House from '../components/Lottie/House';
import MenuAppAdm from '../components/MenuAppAdm';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const NovidadesPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [titulo, setTitulo] = useState('');
    const [novidades, setNovidades] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNovidades = async () => {
            try {
                const db = getDatabase();
                const snapshot = await get(ref(db, 'novidades'));
                if (snapshot.exists()) {
                    const novidadesData = Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
                    setNovidades(novidadesData);
                }
            } catch (error) {
                console.error('Erro ao buscar novidades:', error);
            }
        };

        fetchNovidades();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar se a mensagem e o título não estão vazios
        if (!mensagem.trim() || !titulo.trim()) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        // Salvar a mensagem no banco de dados
        const db = getDatabase();
        const novidadesRef = ref(db, 'novidades');
        await push(novidadesRef, { mensagem, titulo });
        // Limpar os campos de mensagem e título
        setMensagem('');
        setTitulo('');
        // Fechar o formulário
        setIsFormOpen(false);
        // Atualizar a lista de novidades
        setNovidades([...novidades, { mensagem, titulo }]);
        // Limpar o erro, se houver
        setError('');
    };

    const handleDelete = async (id) => {
        try {
            const db = getDatabase();
            await remove(ref(db, `novidades/${id}`));
            // Atualizar a lista de novidades
            setNovidades(novidades.filter(novidade => novidade.id !== id));
        } catch (error) {
            console.error('Erro ao excluir novidade:', error);
        }
    };

    return (
        <>
            <MenuAppAdm />
            <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <House />
                        <button onClick={() => setIsFormOpen(true)} className="text-indigo-600 hover:text-indigo-900">
                            Criar Notificação
                        </button>
                    </div>
                    <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
                        <DialogTitle>Criar Notificação</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Preencha o título e a mensagem da notificação.</DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="titulo"
                                label="Título"
                                fullWidth
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="mensagem"
                                label="Mensagem"
                                fullWidth
                                multiline
                                rows={4}
                                value={mensagem}
                                onChange={(e) => setMensagem(e.target.value)}
                                error={error}
                                helperText={error}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setIsFormOpen(false)} color="error">
                                Cancelar
                            </Button>
                            <Button onClick={handleSubmit} color="primary">
                                Enviar
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                        {novidades.map((novidade) => (
                            <Card key={novidade.id} sx={{ position: 'relative' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>{novidade.titulo}</Typography>
                                    <Typography variant="body2" color="text.secondary">{novidade.mensagem}</Typography>
                                </CardContent>
                                <IconButton onClick={() => handleDelete(novidade.id)} style={{ position: 'absolute', top: 0, right: 0 }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Card>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default NovidadesPage;
