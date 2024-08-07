import React, { useState, useEffect } from "react";
import MenuAppBar from "../components/MenuAppBar";
import ImovelCardFull from "../components/ImovelCardFull";
import { getDatabase, ref, get, push } from "firebase/database";
import Whats from "../components/Lottie/Whats";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import capa from "../components/images/filo_thumb.jpg";
import SidebarInfo from "../components/Lottie/Filo";
import Map from "../components/MapComponent";

const ContactForm = ({ formData, setFormData, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fontStyle = {
    fontFamily: "Pacifico, sans-serif",
  };

  return (
    <div
      className="absolute top-2 left-1/2 transform -translate-x-1/2 p-4 md:top-4 md:left-4 md:translate-x-0 lg:top-6 lg:left-6 rounded-lg shadow-xl z-10 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl w-full"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
    >
      <Typography
        variant="h5"
        className="mb-2 md:mb-4 text-center text-gray-800"
        style={fontStyle}
      >
        Encontre a residência ideal!
      </Typography>
      <div className="mt-2 mb-2">
        <Typography variant="subtitle2" className="text-center text-gray-600">
          VENHA FAZER UMA VISITA!
        </Typography>
        <Typography variant="subtitle2" className="text-center text-gray-600">
          R. Santa Rosa de Lima, 520 - Parque Paulistano, São Paulo - SP, 08080-000
        </Typography>
      </div>
      <div className="mt-4 md:mt-6">
        <Map />
      </div>
    </div>
  );
};

const NavPage = () => {
  const [originalListaDeImoveis, setOriginalListaDeImoveis] = useState([]);
  const [listaDeImoveis, setListaDeImoveis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    contato: "",
    email: "",
    mensagem: "",
    telefone: "",
  });

  useEffect(() => {
    const fetchImoveis = async () => {
      setIsLoading(true);
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, "addresses"));
        if (snapshot.exists()) {
          const imoveis = Object.entries(snapshot.val()).map(
            ([key, value]) => ({ id: key, ...value })
          );
          setOriginalListaDeImoveis(imoveis);
          setListaDeImoveis(imoveis);
          setNoResults(false);
        }
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
      setIsLoading(false);
    };

    fetchImoveis();
  }, [currentPage]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredImoveis = originalListaDeImoveis.filter((imovel) => {
      return imovel.neighborhood && imovel.neighborhood.toLowerCase().includes(searchTerm);
    });

    setListaDeImoveis(searchTerm ? filteredImoveis : originalListaDeImoveis);
    setNoResults(searchTerm && filteredImoveis.length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = getDatabase();
      const messagesRef = ref(db, "messages");
      await push(messagesRef, formData);
      alert("Formulário enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert(
        "Erro ao enviar o formulário. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <MenuAppBar />
      <div
        className="bg-cover bg-center h-screen relative"
        style={{ backgroundImage: `url(${capa})` }}
      >
        <ContactForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center mb-4">
          <div className="relative flex items-stretch w-full max-w-lg">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Pesquisar bairros..."
              className="pl-4 py-2 flex-grow rounded-l border border-gray-300 focus:outline-none"
            />
            <button className="flex-shrink-0 p-2 border border-l-0 border-gray-300 bg-gray-100 rounded-r">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          </div>
        </div>
        {noResults && (
          <p className="text-center text-red-500">Nenhum imóvel encontrado</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listaDeImoveis.map((imovel) => (
            <ImovelCardFull
              key={imovel.id}
              id={imovel.id}
              cidade={imovel.city}
              bairro={imovel.neighborhood}
              valor={imovel.price}
              imageUrls={imovel.imageUrls}
              videoUrl={imovel.videoURL}
              quartos={imovel.bedrooms}
              banheiros={imovel.bathrooms}
              pets={imovel.petsAllowed}
              mobiliado={imovel.furnished}
              garagem={imovel.garageSpaces}
              descricao={imovel.description}
              area={imovel.area}
            />
          ))}
          {isLoading && (
            <div className="col-span-full flex justify-center">
              <CircularProgress />
            </div>
          )}
        </div>
        <div className="fixed bottom-16 right-10">
          <SidebarInfo />
          <Whats />
        </div>
      </div>
    </div>
  );
};

export default NavPage;
