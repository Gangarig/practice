import type { Station } from "../../types/Station"
import type { Worker } from "../../types/Worker"
import type { Assignment,NewAssignment,WorkWeek } from "../../types/Assignment"
import { useState } from "react"
import { Button, Select, Stack, Textarea } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { formatDate } from "../../lib/dateUtils"
interface AssignmentControlsProps {
    stations:Station[] | null,
    workers:Worker[] | null,
    assignments:Assignment[],
    onCreateAssignment : (value:NewAssignment)=>void
    onCreated?: () => void,
    monday:Date,
    weekDays:WorkWeek
}

function AssignmentControls({stations,workers,assignments,onCreateAssignment,onCreated
,monday,weekDays
}:AssignmentControlsProps) {

    const [selectedWorkerId,setSelectedWorkerId] = useState<string|''>('');
    const [selectedStationId,setSelectedStationId] = useState<string|''>('');
    const [selectedDay,setSelectedDay] = useState<Date>(monday); 
    const [note , setNote] = useState<string>('')
    function handleNote (note:string) {
        setNote(note)
    }
    function showValidationWarning(message:string) {
        notifications.show({
            color: 'yellow',
            title: 'Check assignment',
            message,
        })
    }
    function handleSubmit(){
        const worker = workers?.find(worker => worker.id === selectedWorkerId)
        const station = stations?.find(station => station.id === selectedStationId)
        if(!worker) {
            showValidationWarning('Please choose a worker')
            return
        }
        if(!station) {
            showValidationWarning('Please choose a station')
            return
        }
        if(!selectedDay){
            showValidationWarning('Please choose a day')
            return
        }
        if(assignments.find(item => item.date === formatDate(selectedDay) && selectedStationId === item.stationId)) {
            showValidationWarning('This station already has an assignment for that day')
            return
        }
        if(assignments.find(item => item.date === formatDate(selectedDay) && selectedWorkerId === item.workerId)) {
            showValidationWarning('This worker is already assigned to another station that day')
            return
        }
        if(!station?.active) {
            showValidationWarning('This station is not active')
            return
        }
        if (worker.status !== 'available') {
            showValidationWarning('This worker is not available')
            return
        }

        const assignment: NewAssignment = {
            workerId: worker.id,
            stationId: station.id,
            date: formatDate(selectedDay),
            note: note
        }
        onCreateAssignment(assignment)
        setSelectedDay(monday)
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
          <Select size="sm" label="Day" placeholder="Choose day" searchable value={selectedDay.toISOString()}
            data={weekDays.map((day) => ({ value: day.date.toISOString(), label: day.label }))}
            onChange={(value) => {
                const selectedDate = weekDays.find((day) => day.date.toISOString() === value)?.date
                if (selectedDate) {
                    setSelectedDay(selectedDate)
                }
            }} />
        <Textarea size="sm" label="Note" placeholder="Optional handover note" autosize minRows={2} value={note}
          onChange={(e) => handleNote(e.currentTarget.value)} />
        <Button fullWidth onClick={handleSubmit}>Create assignment</Button>
      </Stack>
  )
}

export default AssignmentControls
