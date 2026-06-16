
import type { Assignment } from '../types/Assignment'

interface AssignmentDetailProps {
    assignment : Assignment | null,
    onEditAssignmentNote:(value:Assignment) => void
}
function AssignmentDetail({assignment, onEditAssignmentNote}:AssignmentDetailProps) {
    
    function handeEditNote(value:string){
        if (!assignment) return;
        assignment.note = value;
        onEditAssignmentNote(assignment)
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
        <div>Station ID - {assignment?.stationId}</div>
        <div> Worker ID - {assignment?.workerId}</div>
        {assignment && <textarea 
        value={assignment.note || ''}
        onChange={(e)=>handeEditNote(e.target.value)}
        />}
    </div>
  )
}

export default AssignmentDetail