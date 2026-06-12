
import type { Station } from '../types/Station'
interface StationCardProps{
    station: Station,
}
function StationCard({station}:StationCardProps) {
  return (
    <div>
        {station.name}
    </div>
  )
}

export default StationCard