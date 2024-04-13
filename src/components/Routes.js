import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Login";
import App from "../App";
import ListaImoveisPage from "../main/imoveis_page";
import NavPage from "../main/navigation_page";
import MapPage from "../components/MapPage";
import PasswordReset from "../components/PasswordReset";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MapPage />} />
        <Route exact path="/mappage" element={<MapPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/passwordreset" element={<PasswordReset />} />
        <Route path="/app" element={<App />} />
        <Route path="/lista" element={<ListaImoveisPage />} />
        <Route path="/navpage" element={<NavPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
