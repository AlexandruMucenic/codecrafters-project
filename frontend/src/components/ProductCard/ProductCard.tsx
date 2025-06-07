import React from 'react'
import './ProductCard.css'

interface ProductCardProps {
  author: string
  title: string
  imageURL: string
  price: number
  id: string
  addToCart: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ author, title, imageURL, price, addToCart }) => {
  return (
    <div className="productCardContainer">
      <div className="titleContainer">
        <h4>{title}</h4>
      </div>
      <div className="authorNameContainer">
        <p>{author}</p>
      </div>
      <div className="bookImageContainer">
        <img className="bookImage" src={imageURL} alt="image" />
      </div>
      <div className="priceContainer">
        <p>${price}</p>
      </div>
      <button onClick={addToCart} className="addToCartContainer">
        ADD TO CART
      </button>
    </div>
  )
}

export default ProductCard
