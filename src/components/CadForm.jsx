import React from 'react';
import Upload from './Lottie/VideoUpload';

const CadForm = () => {
  return (
    <div className="bg-indigo-100 max-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center mt-14"> {/* Criando um contêiner flexível para centralizar verticalmente */}
        <Upload />
      </div>
      
      <div className="bg-indigo-300 p-8 rounded shadow-md max-w-3xl w-full mx-auto mt-8"> {/* Aumentar o max-w-md para max-w-3xl e adicionar mt-8 */}
        <form action="#" method="POST">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full"> {/* Ajustar a largura dos campos de entrada para ocupar toda a largura */}
              <label htmlFor="adress" className="block text-sm font-medium text-gray-700">Endereço</label>
              <input type="text" id="adress" name="adress" className="mt-1 p-2 w-full border rounded-md" />
            </div>
            <div className="w-full"> {/* Ajustar a largura dos campos de entrada para ocupar toda a largura */}
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">Número</label>
              <input type="text" id="number" name="number" className="mt-1 p-2 w-full border rounded-md" />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Bairro</label>
            <input type="text" id="neighborhood" name="neighborhood" className="mt-1 p-2 w-full border rounded-md" />
          </div>

          <div className="mt-4">
            <label htmlFor="cep" className="block text-sm font-medium text-gray-700">CEP</label>
            <input type="text" id="cep" name="cep" className="mt-1 p-2 w-full border rounded-md" />
          </div>

          <div className="mt-6">
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadForm;
