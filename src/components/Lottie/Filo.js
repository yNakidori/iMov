import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import logo from '../images/logo.png';

export default function SidebarInfo() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50">
            <button
                className="bg-red-600 text-white rounded-full p-3 shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer', padding: '10px', fontSize: '16px', border: 'none', borderRadius: '5px' }}
            >
                <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {isOpen && (
                <div className="mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                    <div className="flex items-center mb-4">
                        <img src={logo} alt="Logo" className="h-12 w-12 mr-3" />
                        <h3 className="text-lg font-bold">Matriz</h3>
                    </div>
                    <p className="text-gray-700">Rua Santa Rosa de Lima, 520</p>
                    <p className="text-gray-700">Parque Paulistano</p>
                    <p className="text-gray-700">São Paulo/SP</p>
                    <p className="text-gray-700">(11) 97257-0368</p>
                    <button
                        className="mt-4 w-full bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                        onClick={() => setIsOpen(false)}
                    >
                        Fechar
                    </button>
                </div>
            )}
        </div>
    );
}
