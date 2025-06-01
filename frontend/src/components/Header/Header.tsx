import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Header.css'
import Cart from '../Cart/Cart'
import Logo from '../../images/logo/logo.svg'
import ShoppingBag from '../../images/nav/ShoppingBag.svg'

const Header: React.FC = () => {
  const CloseIcon = FaTimes as unknown as React.FC<React.SVGProps<SVGSVGElement>>
  const BarsIcon = FaBars as unknown as React.FC<React.SVGProps<SVGSVGElement>>

  const [showCart, setShowCart] = useState<boolean>(false)

  const navRef = useRef<HTMLDivElement | null>(null)

  const toggleNavbar = () => {
    navRef.current?.classList.toggle('responsive_nav')
  }

  return (
    <header className="headerContainer">
      {/* Logo */}
      <div className="logoContainer">
        <Link to="/">
          <img className="logo" alt="bookshop.org" src={Logo} />
        </Link>
      </div>

      {/* Navbar */}
      <nav ref={navRef} className="navContainer">
        <div className="navbarItemsContainer">
          <Link className="link" onClick={toggleNavbar} to="/">
            Home
          </Link>
          <Link className="link" onClick={toggleNavbar} to="/products">
            Products
          </Link>
        </div>
        <div className="navbarBtnContainer">
          {/* Open cart button */}
          <button className="shoppingBag" onClick={() => setShowCart(true)}>
            <img alt="cart icon" src={ShoppingBag} />
          </button>
        </div>

        {/* Cart Buttons */}
        <button className="nav-btn nav-close-btn" onClick={toggleNavbar}>
          <CloseIcon />
        </button>
      </nav>
      <button className="nav-btn" onClick={toggleNavbar}>
        <BarsIcon />
      </button>

      {/* Cart */}
      <Cart showCart={showCart} handleClose={() => setShowCart(false)} />
    </header>
  )
}

export default Header
