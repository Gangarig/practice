import React from 'react'
import type { Worker } from '../types/Worker'
import WorkerCard from './WorkerCard'
interface StatusPanelProps {
    title:'available' | 'not available'
    workers:Worker [],
    selectedWorker:Worker |null,
    onSelectWorker : (value:Worker) => void
}
function StatusPanel({title,workers,selectedWorker,onSelectWorker}:StatusPanelProps) {
  return (
    <div> 
        <h2>{title}</h2>
        {workers.map(worker => <WorkerCard 
        key={worker.id}
        worker={worker} 
        selectedWorker={selectedWorker} 
        onSelectWorker={onSelectWorker} />)}
    </div>
  )
}

export default StatusPanel