import React from 'react'
import FiloBkg from '../components/images/filo.jpg';
import MapComponent from '../components/MapComponent'; 
import MenuAppBar from './MenuAppBar';

const MapPage = () => {
  return (
    <>
    <div className="relative">
      <MenuAppBar /> 
      <div>
        {/* Contêiner da imagem de fundo */}
        <div className="absolute inset-x-0 top-16 bg-cover bg-center h-screen" style={{ backgroundImage: `url(${FiloBkg})` }}>
          {/* Contêiner semitransparente */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
          {/* Conteúdo */}
          <div className="absolute inset-0 flex justify-center items-center">
            {/* Formulário de contato */}
            <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg mr-4">
              <section className="bg-white dark:bg-gray-900 p-8 lg:p-16 rounded-lg shadow-lg">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Entre em contato</h2>
                <form action="#" className="space-y-8">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Seu nome</label>
                    <input type="text" id="name" name="name" className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Seu nome" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Seu email</label>
                    <input type="email" id="email" name="email" className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary-500 focus:border-primary-500" placeholder="name@flowbite.com" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Sua mensagem</label>
                    <textarea id="message" rows="6" className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Deixe um comentário..." required></textarea>
                  </div>
                  <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Enviar mensagem</button>
                </form>
              </section>
            </div>
            {/* Borda vertical */}
            <div className="h-48 w-0 border-l border-gray-300"></div>
            {/* Mapa Leaflet */}
            <div className="w-1/3 p-6 bg-indigo-300 opacity-80 rounded-lg shadow-lg ml-4">
              <h2 className="racking-tight font-extrabold text-center text-gray-900 dark:text-black">Venha fazer uma visita!!!</h2>
              <h2 className="mb-4 text-1xl tracking-tight font-extrabold text-center text-gray-900 dark:text-black">Estamos nesse endereço: R. Santa Rosa de Lima, 520 - Parque Paulistano</h2>
              <MapComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
</>
  );
};

export default MapPage