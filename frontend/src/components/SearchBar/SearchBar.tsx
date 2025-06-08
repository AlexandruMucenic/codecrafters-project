import React from 'react'
import './SearchBar.css'

interface SearchBarProps {
  searchBooks: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputValue: string
}

const SearchBar: React.FC<SearchBarProps> = ({ searchBooks, inputValue }) => {
  return (
    <div className="searchBarContainer">
      <input type="search" className="searchInput" onChange={searchBooks} value={inputValue} placeholder="search..." />
    </div>
  )
}

export default SearchBar
