
import type { Station } from '../types/Station'
interface StationCardProps{
    station: Station,
    selectedStation:Station | null,
    onSelectedStation:(value : Station| null) => void
}
function StationCard({station,selectedStation, onSelectedStation}:StationCardProps) {
    const isSelected = station.id === selectedStation?.id;
  return (
    <div 
    style={{
        background:isSelected ? 'beige' : '#16171d',
        cursor:'pointer'
    }}
    onClick={()=>onSelectedStation(station)}>
        {station.name}
    </div>
  )
}

export default StationCard