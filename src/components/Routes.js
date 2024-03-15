import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

import Login from "../Login";
import App from "../App";
import ListaImoveisPage from "../main/imoveis_page";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/app" element={<App />} />
        <Route path="/lista" element={<ListaImoveisPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
