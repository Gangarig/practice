
import type { Assignment } from '../types/Assignment'
import type { Worker } from '../types/Worker'
import type { Station } from '../types/Station'
interface AssignmentDetailProps {
    assignment : Assignment | null,
    workers:Worker[],
    stations:Station[],
    onEditAssignmentNote:(value:Assignment) => void
}
function AssignmentDetail({assignment,workers,stations, onEditAssignmentNote}:AssignmentDetailProps) {
    if(!assignment){
        return null
    }
    const worker:Worker | undefined =  workers.find(worker => worker.id === assignment.workerId)
    if(!worker) {
        return null
    }
    const station :Station | undefined = stations.find(station => station.id === assignment.stationId)
    if(!station) {
        return null 
    }

    function handeEditNote(value:string){
        if (!assignment) return null;
        const updateAssignment = {
            ...assignment,
            note:value
        }
        onEditAssignmentNote(updateAssignment)
    }
  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',border:'1px solid white ' , borderRadius:'10px' ,
        padding:'10px', flexDirection:'column', marginTop:'10px'
    }}>
        <h2> Assignment Detail</h2>
        <div>Assignment Id - {assignment?.id}</div>
        <div>Date - {assignment?.date}</div>
        <div>Station - {station.name}</div>
        <div> Worker - {worker.name}</div>
        {assignment && <textarea 
        value={assignment?.note || ''}
        onChange={(e)=>handeEditNote(e.target.value)}
        />}
    </div>
  )
}

export default AssignmentDetail