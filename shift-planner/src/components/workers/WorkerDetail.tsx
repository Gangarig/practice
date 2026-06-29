import type { Worker } from "../../types/Worker"
import type { Assignment } from "../../types/Assignment"
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