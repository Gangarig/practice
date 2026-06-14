import type { Station } from "../types/Station"
import type { Assignment } from "../types/Assignment"


interface StationDetailProps{
selectedStation:Station | null,
assignments:Assignment[] ,
onSelectedStation: (value:Station| null) => void
}



function StationDetail({ assignments,selectedStation , onSelectedStation}:StationDetailProps) {
        const stationAssignment = assignments.filter(assignment => 
        assignment.stationId === selectedStation?.id
        )
  return (
    <div style={{
        display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
      border:'1px solid white' ,
      borderRadius:'15px',
      gap:'5px',
      padding:'10px' ,
    }}  >
        <h2>Station Detail</h2>
        <h2>{selectedStation?.name}</h2>
        {selectedStation && <p>Station Status - {selectedStation?.active ? 'Active' :' Inactive'}</p> }
        <button
        style={{width:'100px'}}
           onClick={()=>onSelectedStation(null)}
        >Clear</button>
        {stationAssignment && stationAssignment?.map(assignment => 
            <div>
                <h2>Assignment ID : {assignment.id}</h2>
                <p>Date - {assignment.date}</p>
                <p>Station ID - {assignment.stationId}</p>
                <p>Worker ID - {assignment.workerId}</p>
                {assignment.note && <p>Note - {assignment.note}</p>}
            </div>
        )}
    </div>
  )
}

export default StationDetail