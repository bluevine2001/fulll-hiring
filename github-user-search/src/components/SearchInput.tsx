type SearchInputProps = {
  query: string;
  onChangeQuery: (q: string) => void;
};

const SearchInput = ({ query, onChangeQuery }: SearchInputProps) => {
  return (
    <div className="search-input-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search GitHub users..."
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
