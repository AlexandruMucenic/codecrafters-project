import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
  search: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, inputValue }) => {
  return (
    <div className="searchBarContainer">
      <input
        type="search"
        className="searchInput"
        onChange={search}
        value={inputValue}
        placeholder="search..."
      />
    </div>
  );
};

export default SearchBar;
