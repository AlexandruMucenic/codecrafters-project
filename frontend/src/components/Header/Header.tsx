import React, { useEffect, useRef, useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    updateLoginStatus();
    window.addEventListener("storage", updateLoginStatus);

    return () => window.removeEventListener("storage", updateLoginStatus);
  }, []);

  const toggleNavbar = () => {
    navRef.current?.classList.toggle("responsive_nav");
  };

  const handleOpenCart = (event: any) => {
    event.stopPropagation();
    setShowCart(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("storage"));
    setIsLoggedIn(false);
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
          {/* Show login or logout */}
          {!isLoggedIn ? (
            <Link className="link" to="/authentication">
              <img alt="login icon" src={LoginIcon} />
            </Link>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}

          {/* Open cart button */}
          <button className="icon">
            <img alt="cart icon" src={ShoppingBag} onClick={handleOpenCart} />
          </button>
        </div>

        <button className="nav-btn nav-close-btn" onClick={toggleNavbar}>
          <CloseIcon />
        </button>
      </nav>

      <button className="nav-btn" onClick={toggleNavbar}>
        <BarsIcon />
      </button>

      <Cart showCart={showCart} handleClose={() => setShowCart(false)} />
    </header>
  );
};

export default Header;
