import React, { useEffect, useState, useCallback } from "react";
import { cartURL, orderURL } from "../../urls";
import "./OrderPage.css";

interface CartProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const OrderPage: React.FC = () => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(orderURL);
        if (!res.ok) throw new Error("Failed to fetch orders.");

        const data = await res.json();
        const allItems = data.flatMap((order: any) => order?.items);
        setProducts(allItems);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const updateQuantity = useCallback(
    async (id: string, action: "increaseQuantity" | "decreaseQuantity") => {
      try {
        const response = await fetch(`${orderURL}/${id}/${action}`, {
          method: "PUT",
          body: JSON.stringify({ id }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to ${
              action === "increaseQuantity" ? "increase" : "decrease"
            } quantity.`
          );
        }

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id
              ? {
                  ...product,
                  quantity:
                    action === "increaseQuantity"
                      ? product.quantity + 1
                      : product.quantity > 1
                      ? product.quantity - 1
                      : 1,
                }
              : product
          )
        );
      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  const incrementQuantity = useCallback(
    (id: string) => updateQuantity(id, "increaseQuantity"),
    [updateQuantity]
  );

  const decrementQuantity = useCallback(
    (id: string) => updateQuantity(id, "decreaseQuantity"),
    [updateQuantity]
  );

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${orderURL}/${id}/delete`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product.");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const totalProducts = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const handleFinishOrder = async () => {
    const clearOrder = await fetch(`${orderURL}/all`, {
      method: "DELETE",
    });

    const clearCart = await fetch(`${cartURL}/all`, {
      method: "DELETE",
    });

    if (!clearOrder.ok || !clearCart.ok) throw new Error();

    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <div className="thank-you-container">
        <h1>Thank you for your order!</h1>
        <p>Your order will be paid when it arrives to you.</p>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h1>Order Summary</h1>

      {products.length === 0 ? (
        <p>Your order is empty.</p>
      ) : (
        <>
          <div className="order-header order-row">
            <div className="order-cell name">Name</div>
            <div className="order-cell image">Image</div>
            <div className="order-cell price">Price</div>
            <div className="order-cell quantity">Quantity</div>
            <div className="order-cell total">Total</div>
            <div className="order-cell actions">Actions</div>
          </div>

          {products.map((product) => (
            <div key={product.id} className="order-row">
              <div className="order-cell name">{product.name}</div>
              <div className="order-cell image">
                <img
                  src={require(`../../images/products/${product.imageUrl}`)}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div className="order-cell price">
                ${product.price.toFixed(2)}
              </div>
              <div className="order-cell quantity">
                <button
                  className="quantity-btn"
                  onClick={() => decrementQuantity(product.id)}
                  disabled={product.quantity <= 1}
                >
                  −
                </button>
                <div className="quantity-display">{product.quantity}</div>
                <button
                  className="quantity-btn"
                  onClick={() => incrementQuantity(product.id)}
                >
                  +
                </button>
              </div>
              <div className="order-cell total">
                ${(product.price * product.quantity).toFixed(2)}
              </div>
              <div className="order-cell actions">
                <button
                  className="remove-btn"
                  onClick={() => deleteProduct(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="order-footer order-row">
            <div className="order-cell name bold">Totals:</div>
            <div className="order-cell image"></div>
            <div className="order-cell price"></div>
            <div className="order-cell quantity bold">{totalProducts}</div>
            <div className="order-cell total bold">
              ${totalPrice.toFixed(2)}
            </div>
            <div className="order-cell actions"></div>
          </div>
          <div className="finish-order-container">
            <button className="finish-order-btn" onClick={handleFinishOrder}>
              Finish your order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPage;
