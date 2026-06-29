import { useEffect, useState } from 'react'
import type { Assignment } from '../../types/Assignment'
import type { Worker } from '../../types/Worker'
import type { Station } from '../../types/Station'
interface AssignmentDetailProps {
    assignment : Assignment | null,
    workers:Worker[],
    stations:Station[],
    onEditAssignmentNote:(value:Assignment) => void
}
function AssignmentDetail({assignment,workers,stations, onEditAssignmentNote}:AssignmentDetailProps) {
    const [note, setNote] = useState('')

    useEffect(() => {
        setNote(assignment?.note ?? '')
    }, [assignment])

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

    function handleEditNote(value:string){
        if(!assignment) return null
        setNote(value)
        const updatedAssignment = {
            ...assignment,
            note: value
        }
        onEditAssignmentNote(updatedAssignment)
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
        <textarea 
        value={note}
        onChange={(e)=>handleEditNote(e.target.value)}
        />
    </div>
  )
}

export default AssignmentDetail