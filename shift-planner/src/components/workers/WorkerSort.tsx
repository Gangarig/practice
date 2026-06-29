interface SortProps {
  sortOrder:'Default' | 'Name A-Z' | 'Name Z-A' | 'Status',
  onSort:(value:'Default' | 'Name A-Z' | 'Name Z-A' | 'Status')=>void
}
function WorkerSort({sortOrder,onSort}:SortProps) {
  return (
    <div>
      <h2>WorkerSort</h2>
      <select value={sortOrder} onChange={(e)=>onSort(e.target.value as 'Default' | 'Name A-Z' | 'Name Z-A' | 'Status')} name="workerSort" id="sort">
        <option value="Default">Default</option>
        <option value="Name A-Z">Name A-Z</option>
        <option value="Name Z-A">Name Z-A</option>
        <option value="Status">Status</option>
      </select>
    </div>
  )
}

export default WorkerSort