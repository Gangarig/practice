interface SortSelectProps {
    sortOrder:string,
    setSortOrder:(value:string) => void
}
function SortSelect({sortOrder,setSortOrder}:SortSelectProps) {
  return (
    <select value={sortOrder} onChange={(e)=>setSortOrder(e.target.value)}>
        <option value='Default'>Default</option>
        <option value='Name A-Z'>Name A-Z</option>
        <option value='Name Z-A'>Name Z-A</option>
    </select>
  )
}

export default SortSelect