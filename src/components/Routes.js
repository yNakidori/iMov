import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importe o componente Routes

import Login from "../Login";
import App from "../App";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
