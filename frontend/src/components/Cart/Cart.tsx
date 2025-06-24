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

  useEffect(() => {
    fetch(cartURL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: CartProduct[]) => {
        setCartProducts(data);
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("Could not get cart data.");
      });
  }, [addedToCart]);

  const totalCart = cartProducts.reduce((sum, product) => {
    sum += product.quantity * product.price;
    return sum;
  }, 0);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${cartURL}/${id}/delete`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product.");
      }

      const data: CartProduct[] = await response.json();
      setCartProducts(data);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Could not delete product.");
    }
  }, []);

  const incrementQuantity = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${cartURL}/${id}/increaseQuantity`, {
        method: "PUT",
        body: JSON.stringify({ id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to increase quantity.");
      }

      const data: CartProduct[] = await response.json();
      setCartProducts(data);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Could not update quantity.");
    }
  }, []);

  const decrementQuantity = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${cartURL}/${id}/decreaseQuantity`, {
        method: "PUT",
        body: JSON.stringify({ id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to decrease quantity.");
      }

      const data: CartProduct[] = await response.json();
      setCartProducts(data);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Could not update quantity.");
    }
  }, []);

  const handleClosePortal = () => {
    window.location.reload();
    if (handleClose) handleClose();
  };

  const handlePlaceOrder = async () => {
    try {
      const clearOrderResponse = await fetch(`${orderURL}/all`, {
        method: "DELETE",
      });

      if (!clearOrderResponse.ok) {
        throw new Error("Failed");
      }

      const response = await fetch(orderURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartProducts }),
      });

      if (!response.ok) throw new Error("Failed to create order.");

      setErrorMessage("");
      navigate("/order");
      window.location.reload();
    } catch (err) {
      setErrorMessage("Could not place order.");
    }
  };

  if (!showCart) {
    return null;
  }

  return ReactDom.createPortal(
    <div className="blurBackground">
      <div className="cartContainer">
        {/* Cart Header */}
        <div className="cartHeader">
          <h3 className="cartTitle">Your Cart</h3>
          <CloseIcon className="closeCartBtn" onClick={handleClosePortal} />
        </div>

        {/* Cart Body */}
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

        {/* Cart Footer */}
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
