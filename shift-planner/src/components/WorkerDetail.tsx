import type { Worker } from "../types/Worker"
import type { Assignment } from "../types/Assignment"
import { useState } from "react"
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

  function getWorkerAssignmentCount(workerId:number | undefined) {
    return assignments.filter(item => item.id === workerId).length
  }



  function handleAddVacation(vacationDays:string){
    if(!worker) return null
    const currentDays = worker.vacationDays ?? 0;
    if(vacationDays === '') return null
    const amount = Number(vacationDays)
    if(amount<=0) return console.log('amount must be positive')


      const newWorkerState = {
        ...worker,
        vacationDays:Number(vacationDays) + currentDays
      }
    updateWorkerState(newWorkerState)
    setVacationDays('')
    return
  }
  function handleRemoveVacation(vacationDays:string){
    if(!worker) return null
    const currentDays = worker.vacationDays ?? 0;
    if(vacationDays === '') return null
    const amount = Number(vacationDays)
    if(amount<=0) return null
    if((currentDays - amount) < 0) return console.log('Result must be positive') 
      
    const newWorkerState = {
        ...worker,
        vacationDays:currentDays - Number(vacationDays)
      }
    setVacationDays('')
    updateWorkerState(newWorkerState)
    return
  }

  function handleAddPlusHours (plusHours:string) {
    if(!worker) return null
    const currentAmount = worker.plusHours ?? 0;
    if(plusHours === '') return null
    const amount = Number(plusHours)
    if(amount<0) return null
    const newWorkerState = {
      ...worker,
      plusHours: currentAmount + amount
    }
    setPlusHours('')
    updateWorkerState(newWorkerState)
    return

  }

  function handleRemovePlusHours(plusHours:string) {
        if(!worker) return null
    const currentAmount = worker.plusHours ?? 0;
    if(plusHours === '') return null
    const amount = Number(plusHours)
    if(amount<0) return null
    const newWorkerState = {
      ...worker,
      plusHours: currentAmount - amount
    }
    setPlusHours('')
    updateWorkerState(newWorkerState)
    return
  }




  return (
    <div
    style={{ border:'1px solid white' , width:'150px',borderRadius:'10px', top:'100px',right:'100px', display:'flex', flexDirection:'column',
    justifyContent:'center',alignItems:'center', gap:'5px',padding:'10px',overflowWrap:'break-word',wordBreak:'break-word'
    }}
    >
        <p style={{textOverflow:'ellipsable'}}>Name: {worker?.name}</p>
        <p style={{textOverflow:'ellipsable'}}>status: {worker?.status}</p>
        <select
          value={worker?.status ?? ''}
          onChange={(e) => {
            if (!worker) return;
            const updatedWorker = {
              ...worker,
              status: e.target.value as Status
            };
            onChangeOfStatus(updatedWorker);
          }}
        >
          <option value="available">Available</option>
          <option value="sick">Sick</option>
          <option value="vacation">Vacation</option>
          <option value="inactive">Inactive</option>
        </select>
        <p style={{textOverflow:'ellipsable'}}>Role: {worker?.role}</p>
        <p style={{textOverflow:'ellipsable'}}>email: {worker?.email}</p>
        <p style={{textOverflow:'ellipsable'}}>vacationDays: {worker?.vacationDays}</p>
        <p style={{textOverflow:'ellipsable'}}>plusHours: {worker?.plusHours}</p>
        <p style={{textOverflow:'ellipsable'}}>has assignments:{getWorkerAssignmentCount(worker?.id)}</p>
        <div>
          <p style={{textOverflow:'ellipsable'}}>vacationDays : {worker?.vacationDays}</p>
          <input value={vacationDays} onChange={(e)=>setVacationDays(e.target.value)} type="number"  />
          <button onClick={()=>handleAddVacation(vacationDays)} >Add</button>
          <button onClick={()=>handleRemoveVacation(vacationDays)} >Remove</button>
        </div>
        <div>
          <p style={{textOverflow:'ellipsis'}}>Overtime : {worker?.plusHours}</p>
          <input type="number" value={plusHours} onChange={(e)=>setPlusHours(e.target.value)} />
          <button onClick={()=>handleAddPlusHours(plusHours)}>Add</button>
          <button onClick={()=>handleRemovePlusHours(plusHours)}>Remove</button>
        </div>
        <button onClick={()=>handleRemoveWorker(worker)} >Delete Worker</button>
        <button style={{width:'50px'}}
        onClick={()=>setSelectedWorker(null)}
        >X</button>

    </div>
  )
}

export default WorkerDetail