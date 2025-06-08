import React from "react";
import "./ProductCard.css";

interface ProductCardProps {
  name: string;
  imageUrl: string;
  price: number;
  id: string;
  addToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  imageUrl,
  price,
  addToCart,
}) => {
  return (
    <div className="productCardContainer">
      <div className="titleContainer">
        <h4>{name}</h4>
      </div>
      <div className="productImageContainer">
        <img className="productImage" src={imageUrl} alt={name} />
      </div>
      <div className="priceContainer">
        <div>Price ${price}</div>
      </div>
      <button onClick={addToCart} className="addToCartContainer">
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
