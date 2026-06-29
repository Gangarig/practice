interface StationSortProps {
sortOrderStation:'Default' | 'Name A-Z' | 'Name Z-A' | 'Active first' | 'Inactive first',
onSortStation:(value:'Default' | 'Name A-Z' | 'Name Z-A' | 'Active first' | 'Inactive first') => void
}
function StationSort({sortOrderStation,onSortStation}:StationSortProps) {
  return (
    <div>
        <select value={sortOrderStation} name="sortStation" id="sortStation"
        onChange={(e)=>onSortStation(e.target.value as 'Default' | 'Name A-Z' | 'Name Z-A' | 'Active first' | 'Inactive first')}
        >
            <option value="Default">Default</option>
            <option value="Name A-Z">Name A-Z</option>
            <option value="Name Z-A">Name Z-A</option>
            <option value="Active first">Active first</option>
            <option value="Inactive first">Inactive first</option>
        </select>
    </div>
  )
}

export default StationSort