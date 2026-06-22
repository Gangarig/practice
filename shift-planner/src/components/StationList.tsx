import type { Station } from '../types/Station'
import StationCard from './StationCard'
interface StationListProps {
  stations : Station[],
  selectedStation:Station | null ,
  onSelectedStation:(value:Station | null) => void
}

function StationList({stations , selectedStation , onSelectedStation}:StationListProps) {
  return (
    <div style={{
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
      flexDirection:'column',
      border:'1px solid white' ,
      borderRadius:'15px',
      gap:'5px',
      padding:'10px' ,
      
    }}>
      {stations.map(station => 
      <StationCard 
      key={station.id} 
      station={station} 
      selectedStation={selectedStation}
      onSelectedStation={onSelectedStation}
      />
      )}
      {stations.length === 0 && <p>No Stations Found</p>}
    </div>
  )
}

export default StationList