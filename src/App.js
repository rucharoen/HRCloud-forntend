import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Home from "./pages/Home";
import UpdateProduct from './pages/UpdateProduct';
import CreateProduct from './pages/CreateProduct';

 function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:id" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;

