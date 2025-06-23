import React, { useEffect, useState } from "react";
import { orderURL } from "../../urls";
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

  useEffect(() => {
    fetch(orderURL)
      .then((res) => res.json())
      .then((data) => {
        const allItems = data.flatMap((order: any) => order?.items);
        setProducts(allItems);
      });
  }, []);

  const totalProducts = products.reduce(
    (sum, product) => sum + product?.quantity,
    0
  );

  const totalPrice = products.reduce(
    (sum, product) => sum + product?.price * product?.quantity,
    0
  );

  return (
    <div className="order-container">
      <h1>Order Summary</h1>

      {products?.length === 0 ? (
        <p>Your order is empty.</p>
      ) : (
        <>
          <div className="order-header order-row">
            <div className="order-cell name">Name</div>
            <div className="order-cell image">Image</div>
            <div className="order-cell price">Price</div>
            <div className="order-cell quantity">Quantity</div>
            <div className="order-cell total">Total</div>
          </div>

          {products.map((product) => (
            <div key={product?.id} className="order-row">
              <div className="order-cell name">{product?.name}</div>
              <div className="order-cell image">
                <img
                  src={require(`../../images/products/${product?.imageUrl}`)}
                  alt={product?.name}
                  className="product-image"
                />
              </div>
              <div className="order-cell price">
                ${product?.price?.toFixed(2)}
              </div>
              <div className="order-cell quantity">{product?.quantity}</div>
              <div className="order-cell total">
                ${(product?.price * product?.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="order-footer order-row">
            <div className="order-cell name bold">Totals:</div>
            <div className="order-cell image"></div>
            <div className="order-cell price"></div>
            <div className="order-cell quantity bold">{totalProducts}</div>
            <div className="order-cell total bold">
              ${totalPrice?.toFixed(2)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPage;
