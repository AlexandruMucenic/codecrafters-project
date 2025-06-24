import React, { useCallback, useEffect, useState } from "react";
import ReactDom from "react-dom";
import { FaTimes } from "react-icons/fa";
import BagProductCard from "../BagProductCard/BagProductCard";
import { cartURL, orderURL } from "../../urls";
import { useNavigate } from "react-router";
import "./Cart.css";

interface CartProps {
  addedToCart?: (
    id: string,
    name: string,
    price: number,
    imageUrl: string,
    quantity: number
  ) => void;
  showCart?: boolean;
  handleClose?: () => void;
}

interface CartProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const CloseIcon = FaTimes as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const Cart: React.FC<CartProps> = ({ addedToCart, showCart, handleClose }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const fetchCartProducts = useCallback(async () => {
    try {
      const response = await fetch(cartURL);

      if (!response.ok) throw new Error();
      const data: CartProduct[] = await response.json();

      setCartProducts(data);
      setErrorMessage("");
    } catch {
      setErrorMessage("Could not get cart data.");
    }
  }, []);

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts, addedToCart]);

  const totalCart = cartProducts.reduce((sum, product) => {
    sum += product.quantity * product.price;
    return sum;
  }, 0);

  const updateQuantity = useCallback(
    async (id: string, action: "increaseQuantity" | "decreaseQuantity") => {
      try {
        const response = await fetch(`${cartURL}/${id}/${action}`, {
          method: "PUT",
          body: JSON.stringify({ id }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error();

        const data: CartProduct[] = await response.json();
        setCartProducts(data);
        setErrorMessage("");
      } catch {
        setErrorMessage("Could not update quantity.");
      }
    },
    []
  );

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${cartURL}/${id}/delete`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error();

      const data: CartProduct[] = await response.json();

      setCartProducts(data);
      setErrorMessage("");
    } catch {
      setErrorMessage("Could not delete product.");
    }
  }, []);

  const incrementQuantity = useCallback(
    (id: string) => updateQuantity(id, "increaseQuantity"),
    [updateQuantity]
  );

  const decrementQuantity = useCallback(
    (id: string) => updateQuantity(id, "decreaseQuantity"),
    [updateQuantity]
  );

  const handlePlaceOrder = async () => {
    try {
      const clearResponse = await fetch(`${orderURL}/all`, {
        method: "DELETE",
      });
      if (!clearResponse.ok) throw new Error();

      const response = await fetch(orderURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartProducts }),
      });
      if (!response.ok) throw new Error();

      setErrorMessage("");
      navigate("/order");
      window.location.reload();
    } catch {
      setErrorMessage("Could not place order.");
    }
  };

  const handleClosePortal = () => {
    if (handleClose) handleClose();
  };

  if (!showCart) {
    return null;
  }

  return ReactDom.createPortal(
    <div className="blurBackground">
      <div className="cartContainer">
        <div className="cartHeader">
          <h3 className="cartTitle">Your Cart</h3>
          <CloseIcon className="closeCartBtn" onClick={handleClosePortal} />
        </div>
        <div className="cartBody">
          {errorMessage && <p className="cartMessage">{errorMessage}</p>}
          {cartProducts.length === 0 && !errorMessage && (
            <p className="cartMessage">The cart is empty.</p>
          )}
          {cartProducts.map((product) => (
            <BagProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={require(`../../images/products/${product.imageUrl}`)}
              price={product.price}
              quantity={product.quantity}
              deleteProduct={() => deleteProduct(product.id)}
              incrementQuantity={() => incrementQuantity(product.id)}
              decrementQuantity={() => decrementQuantity(product.id)}
            />
          ))}
        </div>
        {cartProducts.length > 0 && (
          <div className="cartFooter">
            <div className="cartTotal">
              <h4>Total:</h4>
              <p>${totalCart}</p>
            </div>
            <button className="placeOrderBtn" onClick={handlePlaceOrder}>
              Place your order
            </button>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default Cart;
