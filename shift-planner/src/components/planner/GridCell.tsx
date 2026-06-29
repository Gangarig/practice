import type { Station } from '../../types/Station'
import type { Worker } from "../../types/Worker"
import type { Assignment } from "../../types/Assignment"
import { type MouseEvent } from "react"
interface GridCellProps{
  station:Station | null,
  worker:Worker | null,
  assignment:Assignment | null,
  onRemoveAssignment:(value:Assignment)=>void,
  onSelectAssignment:(value:Assignment|null)=>void
}

function GridCell({station,worker,assignment,onRemoveAssignment,onSelectAssignment}:GridCellProps) {

function handleRemove(event: MouseEvent<HTMLButtonElement>, assignment: Assignment | null) {
  event.stopPropagation()
  if (!assignment) return
  onRemoveAssignment(assignment)
  return
}

  if(station) {
    return     <div
        style={{        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        border:'1px solid white',
                        width:'100%',minHeight:'100px'}}
        >{station.name}
    </div>
  }
  if(worker) {
        return <div
        onClick={()=>onSelectAssignment(assignment)}
        style={{        display:'flex',
                        position:'relative',
                        justifyContent:'space-evenly',
                        alignItems:'center',
                        flexDirection:'column',
                        border:'1px solid white',
                        cursor:'pointer',
                        width:'100%',minHeight:'100px', height:'fit'}}
        >{worker.name}
        {assignment?.note && <p
        style={{border:'1px solid white' , padding:'5px',
          borderRadius:'10px',width:'70%', textWrap:'wrap', objectFit:'contain',overflowWrap:'break-word'
        }}
        >{assignment.note}</p>}
        <button
        onClick={(event)=>handleRemove(event, assignment)}
        style={{
          width:'10px',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          position:'absolute',
          top:'5px',
          right:'5px'
        }}>X</button>
    </div>
  }
  return <div
        style={{        display:'flex',
                        flexDirection:'column',
                        border:'1px solid white',
                        width:'100%',minHeight:'100px'}}
        >
    </div>
}

export default GridCell
