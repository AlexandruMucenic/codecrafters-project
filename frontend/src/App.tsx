import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import Products from './pages/Products/Products'
import Cart from './components/Cart/Cart'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
