import type { Worker } from "../../types/Worker"
import type { Assignment } from "../../types/Assignment"
import { useState } from "react"
import { Badge, Button, Divider, Group, NumberInput, Paper, Select, SimpleGrid, Stack, Text, Title } from '@mantine/core'

interface WorkerDetailProps {
    worker : Worker |null ,
    onRemoveWorker:(value:Worker)=>void,
    setSelectedWorker : (value : Worker | null) => void
    onChangeOfStatus:(value:Worker) => void
    assignments : Assignment[]
    updateWorkerState : (value:Worker) => void
}
function WorkerDetail({worker,onRemoveWorker,setSelectedWorker,assignments,onChangeOfStatus ,updateWorkerState}:WorkerDetailProps) {
  const [vacationDays,setVacationDays] = useState<string>('')
  const [plusHours , setPlusHours] = useState<string>('')
  type Status = 'available' | 'sick' | 'vacation' | 'inactive'
  function handleRemoveWorker(worker:Worker | null) {
    if(!worker) return null;
    onRemoveWorker(worker);
    return
  }

  function getWorkerAssignmentCount(workerId:string | undefined) {
    return assignments.filter(item => item.workerId === workerId).length
  }

  function handleAddVacation(vacationDays:string){
    updateWorkerNumberField('vacationDays',vacationDays,'add')
    setVacationDays('')
    return
  }
  function handleRemoveVacation(vacationDays:string){
    updateWorkerNumberField('vacationDays',vacationDays,'remove')
    setVacationDays('')
    return
  }

 
  function handleAddPlusHours (plusHours:string) {
    updateWorkerNumberField('plusHours',plusHours,'add')
    setPlusHours('')
    return
  }

  function handleRemovePlusHours(plusHours:string) {
    updateWorkerNumberField('plusHours',plusHours,'remove')
    setPlusHours('')
    return
  }

  function updateWorkerNumberField(field: 'vacationDays' | 'plusHours', amountText:string, operation:'add' | 'remove') {
    if(!worker) return null
    const amount = Number(amountText);
    if(amountText === '') return null;
    if(amount <= 0 ) return null;
    const currentValue = worker[field] ?? 0;
  const newValue = 
    operation ==='add' ?
      currentValue + amount :
      currentValue - amount

  if(field === 'vacationDays' && newValue < 0) return
  updateWorkerState({
    ...worker,
    [field]:newValue
  })



  }




  if (!worker) return null
  return (
    <Paper withBorder p="lg">
      <Stack>
        <Group justify="space-between">
          <div><Title order={3}>{worker.name}</Title><Text size="sm" c="dimmed">{worker.email}</Text></div>
          <Badge variant="light">{worker.role}</Badge>
        </Group>
        <Select label="Availability" value={worker.status}
          data={['available', 'sick', 'vacation', 'inactive']}
          onChange={(value) => {
            if (!worker) return;
            const updatedWorker = {
              ...worker,
              status: value as Status
            };
            onChangeOfStatus(updatedWorker);
          }}
        />
        <SimpleGrid cols={3}>
          <div><Text size="xs" c="dimmed">Assignments</Text><Text fw={700}>{getWorkerAssignmentCount(worker.id)}</Text></div>
          <div><Text size="xs" c="dimmed">Vacation days</Text><Text fw={700}>{worker.vacationDays ?? 0}</Text></div>
          <div><Text size="xs" c="dimmed">Overtime</Text><Text fw={700}>{worker.plusHours ?? 0}h</Text></div>
        </SimpleGrid>
        <Divider />
        <NumberInput label="Adjust vacation days" min={1} value={vacationDays} onChange={(value) => setVacationDays(String(value))} />
        <Group grow><Button variant="light" onClick={() => handleAddVacation(vacationDays)}>Add</Button><Button variant="light" color="gray" onClick={() => handleRemoveVacation(vacationDays)}>Remove</Button></Group>
        <NumberInput label="Adjust overtime hours" min={1} value={plusHours} onChange={(value) => setPlusHours(String(value))} />
        <Group grow><Button variant="light" onClick={() => handleAddPlusHours(plusHours)}>Add</Button><Button variant="light" color="gray" onClick={() => handleRemovePlusHours(plusHours)}>Remove</Button></Group>
        <Divider />
        <Group justify="space-between">
          <Button color="red" variant="subtle" onClick={() => handleRemoveWorker(worker)}>Delete worker</Button>
          <Button variant="default" onClick={() => setSelectedWorker(null)}>Close</Button>
        </Group>
      </Stack>
    </Paper>
  )
}

export default WorkerDetail
