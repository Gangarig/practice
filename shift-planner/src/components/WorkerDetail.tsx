import type { Worker } from "../types/Worker"
interface WorkerDetailProps {
    worker : Worker |null ,
    setSelectedWorker : (value : Worker | null) => void
}
function WorkerDetail({worker,setSelectedWorker}:WorkerDetailProps) {
  return (
    <div
    style={{ border:'1px solid white' , width:'150px',borderRadius:'10px', top:'100px',right:'100px', display:'flex', flexDirection:'column',
    justifyContent:'center',alignItems:'center', gap:'5px',padding:'10px',overflowWrap:'break-word',wordBreak:'break-word'
    }}
    >
        <p style={{textOverflow:'ellipsable'}}>Name: {worker?.name}</p>
        <p style={{textOverflow:'ellipsable'}}>status: {worker?.status}</p>
        <p style={{textOverflow:'ellipsable'}}>Role: {worker?.role}</p>
        <p style={{textOverflow:'ellipsable'}}>email: {worker?.email}</p>
        <p style={{textOverflow:'ellipsable'}}>vacationDays: {worker?.vacationDays}</p>
        <p style={{textOverflow:'ellipsable'}}>plusHours: {worker?.plusHours}</p>
        <button style={{width:'50px'}}
        onClick={()=>setSelectedWorker(null)}
        >X</button>
    </div>
  )
}

export default WorkerDetail