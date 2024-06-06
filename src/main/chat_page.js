import React, { useState } from 'react';
import { FaInstagram } from 'react-icons/fa'; // Importando ícones do FontAwesome

const LeftSection = () => {
    return (
        <div className="bg-gray-600 p-4 text-white h-full flex flex-col space-y-4">
            {/* Mensagens predefinidas */}
            <div className="bg-gray-700 rounded-lg p-4 shadow-md">
                <p>Bem-vindo à nossa plataforma de busca de imóveis! Estamos aqui para tornar sua busca mais fácil e eficiente.</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 shadow-md">
                <p>Quer saber como encontrar o imóvel perfeito? Nossa IA está pronta para responder suas perguntas. Experimente!</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 shadow-md">
                <p>Fique por dentro das últimas novidades e atualizações. Não perca nenhuma informação sobre novos recursos!</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 shadow-md">
                <p>Tem alguma dúvida? Estamos aqui para ajudar! Entre em contato conosco e nossa equipe estará pronta para atendê-lo.</p>
            </div>
            {/* Links */}
            <div className="bg-gray-700 rounded-lg p-4 shadow-md flex items-center">
                <span>Siga-nos:</span>
                <a href="https://www.instagram.com/imobiliariafilo/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-2xl ml-2 cursor-pointer" /> {/* Ícone do Instagram */}
                </a>
            </div>
        </div>
    );
}

const RightSection = () => {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const url = "https://api.openai.com/v1/chat/completions";
        const token = `Bearer ${process.env.REACT_APP_OPENAI_KEY}`;
        const model = "gpt-3.5-turbo";

        const messagesToSend = [
            ...allMessages,
            { role: 'user', content: message }
        ];

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: messagesToSend
            })
        });

        const resjson = await res.json();
        if (resjson.choices && resjson.choices.length > 0 && resjson.choices[0].message) {
            const newAllMessages = [
                ...messagesToSend,
                { role: 'bot', content: resjson.choices[0].message.content }
            ];
            setAllMessages(newAllMessages);
        }
        setMessage('');
    };

    return (
        <div className="bg-gray-900 h-full flex flex-col p-4 space-y-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <div className="flex-1 overflow-y-auto space-y-4">
                {allMessages.map((msg, index) => (
                    <div key={index} className={`flex justify-${msg.role === 'user' ? 'end' : 'start'} p-1`}>
                        <div className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-blue-500' : 'bg-gray-700'} text-white`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <input
                    className="flex-1 mr-2 bg-gray-700 text-white p-2 rounded-md"
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="bg-blue-600 text-white rounded-md px-4 py-2"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

const ChatPage = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="w-full md:w-1/4 bg-gray-900 text-white">
                <LeftSection />
            </div>
            <div className="w-full flex-1">
                <RightSection />
            </div>
        </div>
    );
}

export default ChatPage;
