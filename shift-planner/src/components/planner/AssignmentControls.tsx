import type { Station } from "../../types/Station"
import type { Worker } from "../../types/Worker"
import type { Assignment,NewAssignment, Weekday } from "../../types/Assignment"
import { useState } from "react"
import { Button, Select, Stack, Textarea } from '@mantine/core'

interface AssignmentControlsProps {
    stations:Station[] | null,
    workers:Worker[] | null,
    assignments:Assignment[],
    onCreateAssignment : (value:NewAssignment)=>void
    onCreated?: () => void
}

function AssignmentControls({stations,workers,assignments,onCreateAssignment,onCreated}:AssignmentControlsProps) {

    const [selectedWorkerId,setSelectedWorkerId] = useState<string|''>('');
    const [selectedStationId,setSelectedStationId] = useState<string|''>('');
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

        const assignment: NewAssignment = {
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
        onCreated?.()
        return
    }


  return (
      <Stack gap="sm">
          <Select size="sm" label="Station" placeholder="Choose station" searchable value={selectedStationId}
            data={(stations ?? []).map((station) => ({ value: station.id, label: station.name, disabled: !station.active }))}
            onChange={(value) => setSelectedStationId(value ?? '')} />
          <Select size="sm" label="Worker" placeholder="Choose worker" searchable value={selectedWorkerId}
            data={(workers ?? []).map((worker) => ({ value: worker.id, label: worker.name, disabled: worker.status !== 'available' }))}
            onChange={(value) => setSelectedWorkerId(value ?? '')} />
          <Select size="sm" label="Day" placeholder="Choose day" value={selectedDay}
            data={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}
            onChange={(value) => setSelectedDay((value ?? '') as Weekday | '')} />
        <Textarea size="sm" label="Note" placeholder="Optional handover note" autosize minRows={2} value={note}
          onChange={(e) => handleNote(e.currentTarget.value)} />
        <Button fullWidth onClick={handleSubmit}>Create assignment</Button>
      </Stack>
  )
}

export default AssignmentControls
