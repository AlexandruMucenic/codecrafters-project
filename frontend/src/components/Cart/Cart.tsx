import React, { useCallback, useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import './Cart.css'
import BagProductCard from '../BagProductCard/BagProductCard'
import { cartURL } from '../urls'

interface CartProps {
  addedToCart?: (id: string, author: string, title: string, price: number, imageURL: string, quantity: number) => void
  showCart?: boolean
  handleClose?: () => void
}

interface CartProduct {
  id: string
  title: string
  author: string
  imageURL: string
  price: number
  quantity: number
}

const Cart: React.FC<CartProps> = ({ addedToCart, showCart, handleClose }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([])
  const CloseIcon = FaTimes as unknown as React.FC<React.SVGProps<SVGSVGElement>>

  useEffect(() => {
    fetch(cartURL, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((data: CartProduct[]) => setCartProducts(data))
      .catch(error => alert('Could not get cart data.'))
  }, [addedToCart])

  const totalCart = cartProducts.reduce((sum, product) => {
    sum += product.quantity * product.price
    return sum
  }, 0)

  const deleteProduct = useCallback(async (id: string) => {
    await fetch(`${cartURL}/${id}/delete`, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then((data: CartProduct[]) => setCartProducts(data))
  }, [])

  const incrementQuantity = useCallback(async (id: string) => {
    await fetch(`${cartURL}/${id}/increaseQuantity`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then((data: CartProduct[]) => setCartProducts(data))
  }, [])

  const decrementQuantity = useCallback(async (id: string) => {
    await fetch(`${cartURL}/${id}/decreaseQuantity`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then((data: CartProduct[]) => setCartProducts(data))
  }, [])

  if (!showCart) {
    return null
  }

  return ReactDom.createPortal(
    <div className="blurBackground">
      <div className="cartContainer">
        {/* Cart Header */}
        <div className="cartHeader">
          <h3 className="cartTitle">Your Cart</h3>
          <CloseIcon className="closeCartBtn" onClick={handleClose} />
        </div>

        {/* Cart Body */}
        <div className="cartBody">
          {cartProducts.map(product => (
            <BagProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              author={product.author}
              imageURL={require(`../../images/books/${product.imageURL}`)}
              price={product.price}
              quantity={product.quantity}
              deleteProduct={() => deleteProduct(product.id)}
              incrementQuantity={() => incrementQuantity(product.id)}
              decrementQuantity={() => decrementQuantity(product.id)}
            />
          ))}
        </div>

        {/* Cart Footer */}
        <div className="cartFooter">
          <h4>Total:</h4>
          <p>${totalCart}</p>
        </div>
      </div>
    </div>,
    document.getElementById('portal')!
  )
}

export default Cart
