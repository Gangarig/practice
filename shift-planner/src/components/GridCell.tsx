import type { Station } from "../types/Station"
import type { Worker } from "../types/Worker"
interface GridCellProps{
  station:Station | null,
  worker:Worker | null
}

function GridCell({station,worker}:GridCellProps) {
  if(station) {
    return     <div
        style={{        display:'flex',
                        flexDirection:'column',
                        border:'1px solid white',
                        width:'100%',minHeight:'30px'}}
        >{station.name}
    </div>
  }
  if(worker) {
        return <div
        style={{        display:'flex',
                        flexDirection:'column',
                        border:'1px solid white',
                        width:'100%',minHeight:'30px'}}
        >{worker.name}
    </div>
  }
  return <div
        style={{        display:'flex',
                        flexDirection:'column',
                        border:'1px solid white',
                        width:'100%',minHeight:'30px'}}
        >
    </div>
}

export default GridCell