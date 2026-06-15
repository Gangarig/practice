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
    onCreateAssignment : (value:Assignment)=>void
}

function AssignmentControls({selectedStation,selectedWorker,stations,workers ,assignments,onCreateAssignment}:AssignmentControlsProps) {

    const [selectedWorkerId,setSelectedWorkerId] = useState<number|''>(selectedWorker?.id ?? '');
    const [selectedStationId,setSelectedStationId] = useState<number|''>(selectedStation?.id ?? '');
    const [selectedDay,setSelectedDay] = useState<Weekday | ''>('') 

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
        if(assignments.find(item => item.date === selectedDay && selectedStationId === item.stationId)) {
            return console.log('worker already assigned on station')
        }
        if(assignments.find(item => item.date === selectedDay && selectedWorkerId === item.workerId)) {
            return console.log('worker already assigned on other station')
        }
        const newId = assignments.length + 1;
        const assignment: Assignment = {
            id: newId,
            workerId: selectedWorkerId,
            stationId: selectedStationId,
            date: selectedDay,
            note: ''
        }
        onCreateAssignment(assignment)
        setSelectedDay('')
        setSelectedStationId('')
        setSelectedWorkerId('')
        return
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
        onChange={(e)=>setSelectedStationId(
            e.target.value === '' ? '' : Number(e.target.value)
        )}
        name="selectStation" id="station" value={selectedStationId}>
            <option value={''}>Select a Station</option>
            {stations && stations.map(station => 
                <option
                key={station.id}
                value={station.id}
                >{station.name}</option>
            )}
        </select>


        <select 
        onChange={(e)=>setSelectedWorkerId(
            e.target.value === '' ? '' : Number(e.target.value)
        )}
        name="selectWorker" id="worker" value={selectedWorkerId}> 
            <option value={''}>Select a Worker</option>
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