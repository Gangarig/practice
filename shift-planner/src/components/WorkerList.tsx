import type { Worker } from '../types/Worker'
import StatusPanel from './StatusPanel'
interface WorkerListProps {
    workers : Worker[],
    selectedWorker:Worker |null,
    setSelectedWorker:(value:Worker)=>void | undefined
}

function WorkerList({workers,selectedWorker,setSelectedWorker}:WorkerListProps) {
    const availableWorkers = workers.filter(worker => worker.status === 'available')
    const notAvailableWorkers = workers.filter(worker => worker.status !== 'available')
    
  return (
    <div 
    style={{border:'1px solid white',borderRadius:'10px' , padding:'10px',}}
    >
        <StatusPanel title={'available'} workers={availableWorkers} selectedWorker={selectedWorker} onSelectWorker={setSelectedWorker} />
        <StatusPanel title={'not available'} workers={notAvailableWorkers} selectedWorker={selectedWorker} onSelectWorker={setSelectedWorker} />
    </div>
  )
}

export default WorkerList
