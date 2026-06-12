import { useState } from 'react'
import mockWorkers from "../data/mockWorkers";
import mockStations from '../data/mockStations';
import mockAssignments from '../data/mockAssignments';
import WorkerList from '../components/WorkerList';
import type { Worker } from '../types/Worker';
import WorkerDetail from '../components/WorkerDetail';
import StationList from '../components/StationList';
import WeeklyGrid from '../components/PlannerGrid';

function PlannerPage() {
    const [workers,setWorkers] = useState(mockWorkers)
    const [stations,setStations] = useState(mockStations)
    const [assignments,setAssignments] = useState(mockAssignments)
    const [selectedWorker,setSelectedWorker] = useState<Worker | null>(null)

  return (
    <div
    style={{display:'flex',justifyContent:'center',alignItems:'center',
    flexDirection:'column',position:'relative',padding:'15px'
    }}
    >
    
    <p>Workers : {workers.length}</p>
    <p>Stations : {stations.length}</p>
    <p>assignments : {assignments.length}</p>
    <div style={{
        display:'flex',
        justifyContent:'space-evenly',
        width:'100%',marginTop:'100px'
    }}>
        <div>
        <WorkerList
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        workers={workers}
        />
        </div>
        <div
        style={{}}
        >
        { selectedWorker ? 
        <WorkerDetail 
        worker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        />
        : null}
        </div>
    </div>
    <WeeklyGrid 
    stations={stations}
    workers={workers}
    assignments={assignments}
    />
    </div>
  )
}

export default PlannerPage