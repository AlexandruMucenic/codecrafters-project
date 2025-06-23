import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import Products from "./pages/Products/Products";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="products" element={<Products />} />
          <Route path="/authentication" element={<AuthenticationPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
