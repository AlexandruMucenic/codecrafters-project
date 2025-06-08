import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../images/nav/Logo.svg";
import ShoppingBag from "../../images/nav/ShoppingBag.svg";
import LoginIcon from "../../images/nav/LoginIcon.svg";
import Cart from "../Cart/Cart";
import "./Header.css";

const Header: React.FC = () => {
  const CloseIcon = FaTimes as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const BarsIcon = FaBars as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const [showCart, setShowCart] = useState<boolean>(false);

  const navRef = useRef<HTMLDivElement | null>(null);

  const toggleNavbar = () => {
    navRef.current?.classList.toggle("responsive_nav");
  };

  const handleOpenCart = (event: any) => {
    event.stopPropagation();
    setShowCart(true);
  };

  return (
    <header className="headerContainer">
      {/* Logo */}
      <div className="logoContainer">
        <Link to="/">
          <img className="logo" alt="verve.org" src={Logo} />
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
          <button className="icon" onClick={() => console.log("redirect")}>
            <img alt="cart icon" src={LoginIcon} />
          </button>
          <button className="icon">
            <img alt="cart icon" src={ShoppingBag} onClick={handleOpenCart} />
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
  );
};

export default Header;
