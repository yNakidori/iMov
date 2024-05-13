import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'; // Importando ícones do FontAwesome

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#333', // Alterando para uma cor escura
        padding: theme.spacing(2),
        borderRadius: 0,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        width: '300px',
        height: '100%',
    },
    message: {
        backgroundColor: '#555',
        borderRadius: '15px 15px 0 15px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    messageText: {
        color: '#fff',
        margin: 0,
    },
    socialIcon: {
        fontSize: '1.5rem',
        marginRight: theme.spacing(1),
        cursor: 'pointer',
    },
}));

const LeftSection = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* Mensagens predefinidas */}
            <div className={classes.message}>
                <p className={classes.messageText}>
                    Bem-vindo à nossa plataforma de busca de imóveis! Estamos aqui para tornar sua busca mais fácil e eficiente.
                </p>
            </div>
            <div className={classes.message}>
                <p className={classes.messageText}>
                    Quer saber como encontrar o imóvel perfeito? Nossa IA está pronta para responder suas perguntas. Experimente!
                </p>
            </div>
            <div className={classes.message}>
                <p className={classes.messageText}>
                    Fique por dentro das últimas novidades e atualizações. Não perca nenhuma informação sobre novos recursos!
                </p>
            </div>
            <div className={classes.message}>
                <p className={classes.messageText}>
                    Tem alguma dúvida? Estamos aqui para ajudar! Entre em contato conosco e nossa equipe estará pronta para atendê-lo.
                </p>
            </div>
            {/* Links */}
            <div className={classes.message}>
                <p className={classes.messageText}>
                    <span>Siga-nos: </span>

                    <a href="https://www.instagram.com/imobiliariafilo/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className={classes.socialIcon} /> {/* Ícone do Instagram */}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LeftSection;
