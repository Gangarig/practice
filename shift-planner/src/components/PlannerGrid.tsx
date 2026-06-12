import type { Weekday } from "../types/Assignment"
import { Weekdays } from "../data/Weekdays"
import StationList from "./StationList";
import type { Station } from "../types/Station";
import type { Worker } from "../types/Worker";
import type { Assignment } from "../types/Assignment";





interface WeeklyDayProps {
    stations:Station[],
    workers:Worker[],
    assignments:Assignment[]
}
function WeeklyGrid({stations,workers,assignments}:WeeklyDayProps) {
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
        {stations.map(station => <div
        style={{        display:'flex',
                        flexDirection:'column',
                        border:'1px solid white',
                        width:'100%',minHeight:'30px'}}
        >{station.name}</div>)}
        </div>
        {weekdays.map(
            day => <div style={{
                display:'flex', flexDirection:'column',width:'15%'
            }}> {day.day}
                {stations.map(station => {
                    const assigned = assignments.find(
                    assignment => (assignment.stationId === station.id && day.day === assignment.date.day))
                    if(!assigned){
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        border:'1px solid white',
                        borderRadius:'15px',width:'100%'
                    }}></div>} 
                    const assignment = assignments.find(assignment => 
                         assignment.stationId === station.id && day.day === assignment.date.day ? assignment : undefined
                    )
                    if(!assignment) {
                        return   <div style={{
                        display:'flex',
                        flexDirection:'column',
                        border:'1px solid white',
                        width:'100%',minHeight:'30px'
                    }}></div>
                    }
                    const worker = findWorkerName(assignment.workerId)
                    if(!worker) {
                        return <div style={{
                        display:'flex',
                        flexDirection:'column',
                        border:'1px solid white',
                        width:'100%',minHeight:'30px'
                    }}></div>
                    }
                    return <div
                    style={{
                        display:'flex',
                        flexDirection:'column',
                        border:'1px solid white',
                        width:'100%',minHeight:'30px'
                    }}
                    >{worker.name}</div>
                }
            )}
            </div>
        )}
    </div>
  )
}

export default WeeklyGrid

