
interface SearchInputProps {
    search:string,
    setSearch:(value :string) => void
}


function SearchInput({search,setSearch}:SearchInputProps) {
  return (
    <div>
        <input type="text" name="" id="" 
        placeholder='Search by name,email,city'
        onChange={(e)=>setSearch(e.target.value)}
        value={search}
        />
    </div>
  )
}

export default SearchInput