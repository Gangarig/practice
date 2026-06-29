import { Weekdays } from "../../data/Weekdays"
import type { Station } from "../../types/Station";
import type { Worker } from "../../types/Worker";
import type { Assignment } from "../../types/Assignment";
import GridCell from "./GridCell";


interface PlannerGridProps {
    stations:Station[],
    workers:Worker[],
    assignments:Assignment[],
    onRemoveAssignment:(assignment:Assignment )=>void
    onSelectAssignment:(value:Assignment | null) =>void
}
function PlannerGrid({stations,workers,assignments,onRemoveAssignment,onSelectAssignment}:PlannerGridProps) {
    const weekdays = Weekdays;
    
    function findWorkerById(id:number):Worker | undefined {
        return workers.find(worker => worker.id === id)
    }

  return (
    <div style={{
        border:'1px solid white',borderRadius:'10px',padding:'10px', width:'100%', marginTop:'100px',display:'flex',flexDirection:'row',justifyContent:'space-evenly'
    }}> 
        <div style={{
            display:'flex' , flexDirection:'column',width:'15%'
        }}>
        <div style={{
        }}>Days</div>
        {stations.map(station => <GridCell
        key={station.id} onRemoveAssignment={onRemoveAssignment} worker={null} station={station} assignment={null}
        onSelectAssignment={onSelectAssignment} />)}
        </div>
        {weekdays.map(
            day => <div key={day} style={{
                display:'flex', flexDirection:'column',width:'15%'
                }}> {day}
                    {stations.map(station => {
                        const assignment = assignments.find(assignment => 
                            assignment.stationId === station.id && day === assignment.date 
                        )
                        if(!assignment) {
                            return   <GridCell key={station.id} station={null}  worker={null} onRemoveAssignment={onRemoveAssignment} assignment={null}
                            onSelectAssignment={onSelectAssignment}  />
                        }
                        const worker = findWorkerById(assignment.workerId)
                        if(!worker) {
                            return <GridCell key={station.id} station={null} worker={null}  onRemoveAssignment={onRemoveAssignment} assignment={null} 
                            onSelectAssignment={onSelectAssignment} />
                        }
                        return <GridCell key={station.id} station={null} worker={worker} assignment={assignment}  onRemoveAssignment={onRemoveAssignment}
                        onSelectAssignment={onSelectAssignment} />
                    })}
            </div>
        )}
    </div>
  )
}

export default PlannerGrid

