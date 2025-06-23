import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu";
import Cart from "../../components/Cart/Cart";
import { productsURL, cartURL } from "../../urls";
import "./Products.css";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [showCart, setShowCart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const sortOption = ["LOWER PRICE", "HIGHER PRICE"];

  useEffect(() => {
    fetch(productsURL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((products: Product[]) => {
        setProducts(products);
        setLoading(false);
      })
      .catch((_) => {
        alert("Could not retrieve products.");
        setLoading(false);
      });
  }, []);

  //Add to cart function
  const handleAddToCart = async (
    id: string,
    name: string,
    price: number,
    imageUrl: string,
    quantity: number
  ) => {
    await fetch(`${cartURL}/${id}/add`, {
      method: "PUT",
      body: JSON.stringify({
        id,
        name,
        price,
        imageUrl,
        quantity,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setShowCart(true);
  };

  //Search/Sort functions
  const searchProducts = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const filteredProducts = useMemo(() => {
    const filteredBySearchValue = products?.filter((product) =>
      product.name?.toLowerCase()?.includes(inputValue?.toLowerCase())
    );

    if (selectedSortOption === "LOWER PRICE") {
      return filteredBySearchValue.sort((a, b) => a.price - b.price);
    } else if (selectedSortOption === "HIGHER PRICE") {
      return filteredBySearchValue.sort((a, b) => b.price - a.price);
    } else {
      return filteredBySearchValue;
    }
  }, [inputValue, products, selectedSortOption]);

  return (
    <div className="productsPageContainer">
      {/*Page header*/}
      <div className="productPageHeader">
        <div className="productHeaderTitle">
          <h2>Our Products </h2>
        </div>
        <div className="productHeaderQuote">
          <p>
            When you buy something handmade, you’re not just buying a thing –
            you’re buying a piece of heart, a moment of someone’s life, a small
            part of their soul.
          </p>
        </div>
      </div>

      {/* Search/Sort section */}
      <div className="searchSortContainer">
        <div className="searchContainer">
          <SearchBar search={searchProducts} inputValue={inputValue} />
        </div>
        <div className="sortContainer">
          {filteredProducts.length === 0 ? (
            <p>0 products</p>
          ) : (
            <p>{filteredProducts.length} products</p>
          )}
          <DropDownMenu
            options={sortOption}
            onSelected={setSelectedSortOption}
            selected={selectedSortOption}
            placeholder={"Sort by"}
          />
        </div>
      </div>

      {/*Products section*/}
      <div className="productPageBody">
        {loading ? (
          <h2>Loading products...</h2>
        ) : filteredProducts?.length === 0 ? (
          <h2>No products found...</h2>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product?.id}
              id={product?.id}
              name={product?.name}
              imageUrl={require(`../../images/products/${product?.imageUrl}`)}
              price={product?.price}
              addToCart={() =>
                handleAddToCart(
                  product?.id,
                  product?.name,
                  product?.price,
                  product?.imageUrl,
                  1
                )
              }
            />
          ))
        )}
      </div>

      {/*Cart*/}
      <Cart
        addedToCart={handleAddToCart}
        showCart={showCart}
        handleClose={() => setShowCart(false)}
      />
    </div>
  );
};

export default Products;
