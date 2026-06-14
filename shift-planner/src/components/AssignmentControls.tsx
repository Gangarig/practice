import type { Station } from "../types/Station"
import type { Worker } from "../types/Worker"
import type { Assignment, Weekday } from "../types/Assignment"
import { useState } from "react"

interface AssignmentControlsProps {
    selectedStation : Station | null,
    selectedWorker:Worker| null,
    stations:Station[] | null,
    workers:Worker[] | null,
    assignments:Assignment[],
    newAssignment:Assignment|null,
    setNewAssignment :(value:Assignment|null)=>void
}

function AssignmentControls({selectedStation,selectedWorker,stations,workers ,assignments,newAssignment, setNewAssignment}:AssignmentControlsProps) {

    const [selectedWorkerId,setSelectedWorkerId] = useState<number|undefined>(selectedWorker?.id);
    const [selectedStationId,setSelectedStationId] = useState<number|undefined>(selectedStation?.id)
    const [selectedDay,setSelectedDay] = useState<Weekday | ''>('')   
    let targetedAssignment = assignments.find(item => 
            item.date === selectedDay && item.stationId === selectedStationId && item.workerId === selectedWorkerId
        )
    let assignmentsOnSelectedDay = assignments.filter(item=> 
            item.date === selectedDay)
    let alreadyAssigned = assignmentsOnSelectedDay.filter(item => 
        item.workerId === selectedWorkerId
    )


    function handleSubmit(){
        if(!selectedWorkerId) {
            return console.log('Worker error')
        }
        if(!selectedStationId) {
            return console.log('Station error')
        }
        if(!selectedDay){
            return console.log('Date error')
        }
        if(targetedAssignment) {
            return console.log('assignment exist')
        }
        if(!(alreadyAssigned.length ===1)) {
            return console.log('already assigned')
        }
        const newId = assignments.length + 1;
        setNewAssignment({
            id:newId,
            workerId:selectedWorkerId,
            stationId:selectedStationId,
            date:selectedDay,
            note:''
        })
        if(!newAssignment){
            return console.log('input invalid')
        }
        assignments.push(newAssignment)
        setNewAssignment(null)
        setSelectedDay('')
        setSelectedStationId(undefined)
        setSelectedWorkerId(undefined)
    }


  return (
    <div
    style={{
        width:'100%' , 
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        border:'1px solid white',
        padding:'10px' ,
        borderRadius:'10px',
        marginTop:'20px'
    }}
    >
        <select 
        onChange={(e)=>setSelectedStationId(Number(e.target.value))}
        name="selectStation" id="station" value={selectedStationId}>
            <option value={undefined}>Select a Station</option>
            {stations && stations.map(station => 
                <option
                key={station.id}
                value={station.id}
                >{station.name}</option>
            )}
        </select>


        <select 
        onChange={(e)=>setSelectedWorkerId(Number(e.target.value))}
        name="selectWorker" id="worker" value={selectedWorkerId}> 
            <option value={undefined}>Select a Worker</option>
            {workers && workers.map(worker => 
                <option
                key={worker.id}
                value={worker.id}
                >{worker.name}</option>
            )}
        </select>


        <select 
        onChange={(e)=>setSelectedDay(e.target.value as Weekday | '')}
        name="day" id="day" value={selectedDay}  >
                <option value={''}>Select a day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
        </select>


        <button onClick={()=>handleSubmit()}>Create Assignment</button>
    </div>
  )
}

export default AssignmentControls