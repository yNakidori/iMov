import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#f8f8f8',
        padding: theme.spacing(2),
        borderRadius: 10,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        color: '#333',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
    },
    paragraph: {
        marginBottom: theme.spacing(2),
    },
}));

const LeftSection = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* Explicação sobre a IA */}
            <div className={classes.section}>
                <p className={classes.title}>Como a IA ajuda na escolha do imóvel</p>
                <p className={classes.paragraph}>Nossa Inteligência Artificial (IA) está aqui para ajudá-lo a encontrar a melhor opção de imóvel. Você pode fazer perguntas sobre suas preferências, como localização, tamanho, preço, e a IA fornecerá recomendações personalizadas com base nas suas respostas.</p>
            </div>

            {/* Atualizações e Novidades */}
            <div className={classes.section}>
                <p className={classes.title}>Atualizações e Novidades</p>
                <p className={classes.paragraph}>Nova funcionalidade: Recurso X agora disponível!</p>
            </div>

            {/* Links para Redes Sociais */}
            <div className={classes.section}>
                <p className={classes.title}>Siga-nos</p>
                <div>
                    <a href="#" className="mr-2">
                        <img className="w-6 h-6" src="url_icon_rede_social" alt="Ícone da Rede Social" />
                    </a>
                    <a href="#">
                        <img className="w-6 h-6" src="url_icon_rede_social" alt="Ícone da Rede Social" />
                    </a>
                </div>
            </div>

            {/* Links para Termos de Serviço e Política de Privacidade */}
            <div className={classes.section}>
                <p className={classes.title}>Termos de Serviço e Política de Privacidade</p>
                <div>
                    <a href="#">Termos de Serviço</a>
                    <span className="mx-2">•</span>
                    <a href="#">Política de Privacidade</a>
                </div>
            </div>
        </div>
    );
}

export default LeftSection;
