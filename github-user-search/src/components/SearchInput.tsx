import { useState } from "react";

const SearchInput = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="search-input-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search GitHub users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
