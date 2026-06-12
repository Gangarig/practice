import type { Worker } from '../types/Worker'
import WorkerCard from './WorkerCard'
interface WorkerListProps {
    workers : Worker[],
    selectedWorker:Worker |null,
    setSelectedWorker:(value:Worker)=>void | undefined
}

function WorkerList({workers,selectedWorker,setSelectedWorker}:WorkerListProps) {
    const availableWorkers = workers.filter(worker => worker.status === 'available')
    const sickWorkers = workers.filter(worker => worker.status === 'sick')
    const workersInVacation = workers.filter(worker => worker.status === 'vacation')
    const inActiveWorkers = workers.filter(worker => worker.status === 'inactive')
  return (
    <div 
    style={{border:'1px solid white',borderRadius:'10px' , padding:'10px',}}
    >
        <h3>Available</h3>
        {availableWorkers.map(worker => (
            <WorkerCard
                selectedWorker={selectedWorker}
                setSelectedWorker={setSelectedWorker}
                worker={worker}
                key={worker.id}
            />
        ))}
        <h3>Sick</h3>
        {sickWorkers.map(worker => (
            <WorkerCard
                selectedWorker={selectedWorker}
                setSelectedWorker={setSelectedWorker}
                worker={worker}
                key={worker.id}
            />
        ))}
        <h3>Vacation</h3>
        {workersInVacation.map(worker => 
        <WorkerCard 
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        worker={worker} 
        key={worker.id} 
        /> 
        )}   
        <h3>Inactive</h3>
        {inActiveWorkers.map(worker => 
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