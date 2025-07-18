import React from "react";
import "./search.css";

const Search = ({ setKeyword, keyword, filterEmpleados }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    filterEmpleados();
  };
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          id="search-box"
          className="searchInput"
          placeholder="search by name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">Search</button>
        <button
          className="clear-search"
          onClick={() => {
            setKeyword("");
          }}
          type="submit"
        >
          Clear
        </button>
      </form>
    </div>
  );
};
export default Search;
