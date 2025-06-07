import React, { useEffect, useMemo, useState } from 'react'
import './Products.css'
import ProductCard from '../../components/ProductCard/ProductCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu'
import Cart from '../../components/Cart/Cart'
import { productsURL, cartURL } from '../../components/urls'

interface Product {
  id: string
  author: string
  title: string
  price: number
  imageURL: string
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedSortOption, setSelectedSortOption] = useState<string>('')
  const [showCart, setShowCart] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const sortOption = ['LOWER PRICE', 'HIGHER PRICE']

  useEffect(() => {
    fetch(productsURL, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((products: Product[]) => {
        setProducts(products)
        setLoading(false)
      })
      .catch(_ => {
        alert('Could not retrieve products.')
        setLoading(false)
      })
  }, [])

  //Add to cart function
  const handleAddToCart = async (
    id: string,
    author: string,
    title: string,
    price: number,
    imageURL: string,
    quantity: number
  ) => {
    await fetch(`${cartURL}/${id}/add`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
        author,
        title,
        price,
        imageURL,
        quantity,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    setShowCart(true)
  }

  //Search/Sort functions
  const searchBooks = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)

  const filteredProducts = useMemo(() => {
    const filteredBySearchValue = products.filter(
      product =>
        product.title.toLowerCase().includes(inputValue.toLowerCase()) ||
        product.author.toLowerCase().includes(inputValue.toLowerCase())
    )

    if (selectedSortOption === 'LOWER PRICE') {
      return filteredBySearchValue.sort((a, b) => a.price - b.price)
    } else if (selectedSortOption === 'HIGHER PRICE') {
      return filteredBySearchValue.sort((a, b) => b.price - a.price)
    } else {
      return filteredBySearchValue
    }
  }, [inputValue, products, selectedSortOption])

  return (
    <div className="productsPageContainer">
      {/*Page header*/}
      <div className="productPageHeader">
        <div className="productHeaderTitle">
          <h2>Our Book Collection </h2>
        </div>
        <div className="productHeaderQuote">
          <p>
            &ldquo;I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than
            of a book! When I have a house of my own, I shall be miserable if I have not an excellent library.&rdquo;
          </p>
          <h4>Jane Austen, Pride and Prejudice</h4>
        </div>
      </div>

      {/* Search/Sort section*/}
      <div className="searchSortContainer">
        <div className="searchContainer">
          <SearchBar searchBooks={searchBooks} inputValue={inputValue} />
        </div>
        <div className="sortContainer">
          {filteredProducts.length === 0 ? <p>0 products</p> : <p>{filteredProducts.length} products</p>}
          <DropDownMenu
            options={sortOption}
            onSelected={setSelectedSortOption}
            selected={selectedSortOption}
            placeholder={'Sort by'}
          />
        </div>
      </div>

      {/*Products section*/}
      <div className="productPageBody">
        {loading ? (
          <h2>Loading products...</h2>
        ) : filteredProducts?.length === 0 ? (
          <h2>No books found...</h2>
        ) : (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              author={product.author}
              imageURL={require(`../../images/books/${product.imageURL}`)}
              price={product.price}
              addToCart={() =>
                handleAddToCart(product.id, product.author, product.title, product.price, product.imageURL, 1)
              }
            />
          ))
        )}
      </div>

      {/*Cart*/}
      <Cart addedToCart={handleAddToCart} showCart={showCart} handleClose={() => setShowCart(false)} />
    </div>
  )
}

export default Products
