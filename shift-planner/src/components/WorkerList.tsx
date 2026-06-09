import type { Worker } from '../types/Worker'
import WorkerCard from './WorkerCard'
interface WorkerListProps {
    workers : Worker[],
    selectedWorker:Worker |null,
    setSelectedWorker:(value:Worker)=>void | undefined
}

function WorkerList({workers,selectedWorker,setSelectedWorker}:WorkerListProps) {
  return (
    <div>
        {workers.map(worker => 
        <WorkerCard 
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        worker={worker} 
        key={worker.id} 
        /> 
        )}
    </div>
  )
}

export default WorkerList