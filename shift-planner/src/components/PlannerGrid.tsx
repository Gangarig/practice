import { Weekdays } from "../data/Weekdays"
import type { Station } from "../types/Station";
import type { Worker } from "../types/Worker";
import type { Assignment } from "../types/Assignment";
import GridCell from "./GridCell";




interface WeeklyDayProps {
    stations:Station[],
    workers:Worker[],
    assignments:Assignment[]
}
function PlannerGrid({stations,workers,assignments}:WeeklyDayProps) {
    const weekdays = Weekdays;
    
    function findWorkerName(id:number):Worker | undefined {
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
        {stations.map(station => <GridCell worker={null} station={station}/>)}
        </div>
        {weekdays.map(
            day => <div style={{
                display:'flex', flexDirection:'column',width:'15%'
                }}> {day}
                    {stations.map(station => {
                        const assignment = assignments.find(assignment => 
                            assignment.stationId === station.id && day === assignment.date 
                        )
                        if(!assignment) {
                            return   <GridCell key={station.id} station={null}  worker={null} />
                        }
                        const worker = findWorkerName(assignment.workerId)
                        if(!worker) {
                            return <GridCell key={station.id} station={null} worker={null} />
                        }
                        return <GridCell key={station.id} station={null} worker={worker} />
                    })}
            </div>
        )}
    </div>
  )
}

export default PlannerGrid

