import { useState } from 'react'
import mockWorkers from "../data/mockWorkers";
import mockStations from '../data/mockStations';
import mockAssignments from '../data/mockAssignments';
import WorkerList from '../components/WorkerList';
import type { Worker } from '../types/Worker';

function PlannerPage() {
    const [workers,setWorkers] = useState(mockWorkers)
    const [stations,setStations] = useState(mockStations)
    const [assignments,setAssignments] = useState(mockAssignments)
    const [selectedWorker,setSelectedWorker] = useState<Worker | null>(null)

  return (
    <div>
    <p>Workers : {workers.length}</p>
    <p>Stations : {stations.length}</p>
    <p>assignments : {assignments.length}</p>
    <WorkerList
    selectedWorker={selectedWorker}
    setSelectedWorker={setSelectedWorker}
    workers={workers}
    />
    </div>
  )
}

export default PlannerPage