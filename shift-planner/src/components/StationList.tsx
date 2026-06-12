import type { Station } from '../types/Station'
import StationCard from './StationCard'
interface StationListProps {
  stations : Station[]
}

function StationList({stations}:StationListProps) {
  return (
    <div>
      {stations.map(station => <StationCard station={station} key={station.name} />)}
    </div>
  )
}

export default StationList