import React, { useState } from 'react';

const openAiAPI = process.env.REACT_APP_OPENAI_KEY;

const RightSection = () => {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    const sendMessage = async () => {

        if (!message.trim()) return;

        let url = "https://api.openai.com/v1/chat/completions";
        let token = `Bearer ${openAiAPI}`;
        let model = "gpt-3.5-turbo";

        let messagesToSend = [
            ...allMessages,
            { role: 'user', content: message }
        ];

        let res = await fetch(url, {
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

        let resjson = await res.json();
        if (resjson.choices && resjson.choices.length > 0 && resjson.choices[0].message) {
            let newAllMessages = [
                ...messagesToSend,
                { role: 'bot', content: resjson.choices[0].message.content }
            ];
            setAllMessages(newAllMessages);
        }
        setMessage('');
    };

    return (
        <div className="bg-gray-600 h-full flex flex-col p-4">
            <div className="flex-1 overflow-y-auto mb-2">
                {allMessages.map((msg, index) => (
                    <div key={index} className={`flex justify-${msg.role === 'user' ? 'end' : 'start'} p-1 mb-1`}>
                        <div className={`bg-${msg.role === 'user' ? 'blue' : 'green'}-600 text-white p-2 rounded-lg`}>
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

export default RightSection;
