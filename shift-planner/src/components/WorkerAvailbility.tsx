import type { Worker } from '../types/Worker'
import type { Assignment } from '../types/Assignment'
import type { Weekday } from '../types/Assignment'
import { Weekdays } from '../data/Weekdays'
import useApp from '../hooks/useApp'


function WorkerAvailability(){
    const {
        workers,
        assignments,
        stations
    } = useApp()
    const week:Weekday[] = Weekdays;
    function getAvailabilityText(worker:Worker, assignment:Assignment | undefined) {
        if (worker.status !== 'available') return worker.status
        if (assignment) {
            const station = stations.find(station => station.id === assignment.id)
            if(!station) return 'station not found'
            return station.name
        }

        return 'available'
        }
    
  return (
    <div style={{
        border:'1px solid white',
        borderRadius:'10px',
        padding:'10px',
        margin:'10px',
        width:'100%'
    }}>
        <h2>Worker Availability</h2>
        <div 
        style={{

        }}> 
            <div 
            style={{
                display:'flex',
                justifyContent:'space-between'
            }}>
                <div
                style={{width:'16.6%'}}
                >Worker</div>
                {week.map(day => <div
                key={day}
                style={{width:'16.6%'}}
                >{day}</div>)}
            </div>
            <div>
                {
                workers.map(worker =>(
                    <div
                    style={{display:'flex',
                        width:'100%',
                        flexDirection:'row',
                        justifyContent:'space-between'
                    }}
                    key={worker.id}>
                        <div style={{width:'16.6%'}}>{worker.name}</div>
                        {week.map(day => 
                        {
                            const assignment = assignments.find(assignment => 
                                assignment.date === day && worker.id === assignment.workerId
                            )
                            
                            return (
                                <div style={{width:'16.6%'}} key={`${worker.id}-${day}`}>
                                {
                                    getAvailabilityText(worker,assignment)
                                }
                                </div> 
                                )
                            }
                        )}
                    </div> 
                )
                )
                }
            </div>
        </div>
    </div>
  )
}

export default WorkerAvailability