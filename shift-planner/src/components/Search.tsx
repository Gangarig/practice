
interface SearchProps {
    search:string,
    onSearch:(value:string)=> void,
}

function Search({ search, onSearch }: SearchProps) {
  return (
    <div>
      <h2>Search</h2>
      <input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        type="text"
      />
    </div>
  );
}

export default Search