import React, { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';

const LeftSection = () => {
    return (
        <div className="bg-gray-900 p-4 text-white h-full flex flex-col space-y-4 border-r border-gray-800">
            {/* Mensagens predefinidas */}
            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <p>Bem-vindo à nossa plataforma de busca de imóveis! Estamos aqui para tornar sua busca mais fácil e eficiente.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <p>Quer saber como encontrar o imóvel perfeito? Nossa IA está pronta para responder suas perguntas. Experimente!</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <p>Fique por dentro das últimas novidades e atualizações. Não perca nenhuma informação sobre novos recursos!</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <p>Tem alguma dúvida? Estamos aqui para ajudar! Entre em contato conosco e nossa equipe estará pronta para atendê-lo.</p>
            </div>
            {/* Links */}
            <div className="bg-gray-800 rounded-lg p-4 shadow-md flex items-center">
                <span>Siga-nos:</span>
                <a href="https://www.instagram.com/imobiliariafilo/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-2xl ml-2 cursor-pointer" />
                </a>
            </div>
        </div>
    );
};

const RightSection = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(true);

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
                { role: 'assistant', content: resjson.choices[0].message.content }
            ];
            setAllMessages(newAllMessages);
        }
        setMessage('');
        setShowSuggestions(false); // Hide suggestions when a message is sent
        onSendMessage(); // Call the function to notify parent component
    };

    return (
        <div className="bg-gray-900 h-full flex flex-col p-4 space-y-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {showSuggestions && (
                <div className="flex justify-center mb-4">
                    <div className="flex flex-col space-y-4">
                        <div className="bg-gray-700 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-600">
                            <p>"Quais são as melhores áreas para comprar um imóvel residencial em [cidade], considerando segurança, acessibilidade a transporte público e proximidade a escolas e mercados?"</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-600">
                            <p>"Quais são os preços médios de imóveis de três quartos em bairros centrais de [cidade], e como esses preços se comparam aos bairros periféricos?"</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-600">
                            <p>"Quais fatores devo considerar ao escolher entre comprar um apartamento ou uma casa em [cidade], e quais são os prós e contras de cada opção?"</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-600">
                            <p>"Quais são as principais tendências no mercado imobiliário de [cidade] nos últimos cinco anos, e como essas tendências podem impactar minha decisão de compra?"</p>
                        </div>
                        <div className="text-center text-white mt-4">
                            <p>Você pode copiar um dos textos acima e utilizá-lo substituindo [cidade] pelo bairro ou cidade desejada.</p>
                            <p>Essa inteligência artificial funciona fornecendo respostas baseadas em grandes volumes de dados e aprendizado de máquina para ajudar a encontrar informações relevantes e precisas.</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex-1 overflow-y-auto space-y-4">
                {allMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} p-1`}>
                        <div className={`p-3 rounded-lg max-w-md ${msg.role === 'user' ? 'bg-blue-500' : 'bg-gray-700'} text-white`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center bg-gray-800 p-4 rounded-lg shadow-inner">
                <input
                    className="flex-1 mr-2 bg-gray-700 text-white p-2 rounded-md"
                    type="text"
                    placeholder="Digite uma mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-500"
                    onClick={sendMessage}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

const ChatPage = () => {
    const handleSendMessage = () => {
        console.log("Message sent");
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
            <div className="w-full md:w-1/4">
                <LeftSection />
            </div>
            <div className="w-full flex-1">
                <RightSection onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatPage;
