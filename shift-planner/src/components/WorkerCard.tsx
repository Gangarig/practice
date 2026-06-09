import type { Worker } from '../types/Worker'
interface WorkerCardProps {
    worker :Worker,
    selectedWorker:Worker | null,
    setSelectedWorker:(value:Worker)=>void 
}

function WorkerCard({worker,selectedWorker,setSelectedWorker}:WorkerCardProps) {
  return (
    <div
    style={{border:'1px solid white' , width:'100px'}}
    >{worker.name}</div>
  )
}

export default WorkerCard