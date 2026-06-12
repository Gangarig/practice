import type { Worker } from '../types/Worker'
interface WorkerCardProps {
    worker :Worker,
    selectedWorker:Worker | null,
    setSelectedWorker:(value:Worker)=>void 
}

function WorkerCard({worker,selectedWorker,setSelectedWorker}:WorkerCardProps) {
    const isSelected = worker.name === selectedWorker?.name;
  return (
    <div
    onClick={() => setSelectedWorker(worker)}
    style={{border:'1px solid white' , width:'150px',borderRadius:'10px',
    cursor:'pointer',
    margin:'5px',
    background:isSelected ? 'white' : '#16171d'
    }}
    >{worker.name}</div>
  )
}

export default WorkerCard