import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import logo from '../images/logo.png';

export default function SidebarInfo() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50">
            <button
                className="bg-red-600 text-white rounded-full p-3 shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                onClick={toggleOpen}
                style={{ cursor: 'pointer' }}
            >
                <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div
                className={`transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'} 
                    fixed top-1/2 right-4 transform -translate-y-1/2 z-50`}
            >
                {isOpen && (
                    <div className="transition-opacity duration-300 mt-4 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                        <div className="flex items-center mb-4">
                            <img src={logo} alt="Logo" className="h-12 w-12 mr-3" />
                            <div>
                                <h3 className="text-lg font-bold">Matriz</h3>
                                <p className="text-gray-700">CRECI: 038747_j</p>
                            </div>
                        </div>
                        <div className="mb-2">
                            <p className="text-gray-700">Rua Santa Rosa de Lima, 520</p>
                            <p className="text-gray-700">Parque Paulistano</p>
                            <p className="text-gray-700">São Paulo/SP</p>
                            <p className="text-gray-700">(11) 97257-0368</p>
                        </div>
                        <button
                            className="w-full bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                            onClick={toggleOpen}
                        >
                            Fechar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
