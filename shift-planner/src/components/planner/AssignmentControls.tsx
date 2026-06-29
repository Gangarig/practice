import type { Station } from "../../types/Station"
import type { Worker } from "../../types/Worker"
import type { Assignment, Weekday } from "../../types/Assignment"
import { useState } from "react"

interface AssignmentControlsProps {
    stations:Station[] | null,
    workers:Worker[] | null,
    assignments:Assignment[],
    onCreateAssignment : (value:Assignment)=>void
}

function AssignmentControls({stations,workers ,assignments,onCreateAssignment}:AssignmentControlsProps) {

    const [selectedWorkerId,setSelectedWorkerId] = useState<number|''>('');
    const [selectedStationId,setSelectedStationId] = useState<number|''>('');
    const [selectedDay,setSelectedDay] = useState<Weekday | ''>('') 
    const [note , setNote] = useState<string>('')
    function handleNote (note:string) {
        setNote(note)
    }
    function handleSubmit(){
        const worker = workers?.find(worker => worker.id === selectedWorkerId)
        const station = stations?.find(station => station.id === selectedStationId)
        if(!worker) {
            return console.log('Worker error')
        }
        if(!station) {
            return console.log('Station error')
        }
        if(!selectedDay){
            return console.log('Date error')
        }
        if(assignments.find(item => item.date === selectedDay && selectedStationId === item.stationId)) {
            return console.log('station/day already occupied')
        }
        if(assignments.find(item => item.date === selectedDay && selectedWorkerId === item.workerId)) {
            return console.log('worker already assigned on other station')
        }
        if(!station?.active) {
            return console.log('Station is not acitve')
        }
        if (worker.status !== 'available') {
            return console.log('worker is not available')
        }

        const newId = assignments.length + 1;
        const assignment: Assignment = {
            id: newId,
            workerId: worker.id,
            stationId: station.id,
            date: selectedDay,
            note: note
        }
        onCreateAssignment(assignment)
        setSelectedDay('')
        setSelectedStationId('')
        setSelectedWorkerId('')
        setNote('')
        return
    }


  return (
    <div
    style={{
        width:'100%' , 
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        border:'1px solid white',
        padding:'10px' ,
        borderRadius:'10px',
        marginTop:'20px',
        gap:'10px',
        
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
        <div>
            <p>Note</p>
            <textarea
            name='assignmentNote'
            rows={3}
            cols={20}
            value={note ?? ''}
            style={{borderRadius:'5px',}}
            onChange={(e)=>handleNote(e.target.value)}
            ></textarea>
        </div>
        <button onClick={()=>handleSubmit()}>Create Assignment</button>
    </div>
  )
}

export default AssignmentControls