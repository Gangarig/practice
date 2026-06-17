import { useState } from 'react'
import mockWorkers from "../data/mockWorkers";
import mockStations from '../data/mockStations';
import mockAssignments from '../data/mockAssignments';
import AssignmentDetail from '../components/AssignmentDetail';
import WorkerList from '../components/WorkerList';
import type { Worker } from '../types/Worker';
import WorkerDetail from '../components/WorkerDetail';
import StationList from '../components/StationList';
import PlannerGrid from '../components/PlannerGrid';
import type { Station } from '../types/Station';
import StationDetail from '../components/StationDetail';
import AssignmentControls from '../components/AssignmentControls';
import type  { Assignment } from '../types/Assignment';


function PlannerPage() {
    const [workers] = useState(mockWorkers)
    const [stations] = useState(mockStations)
    const [assignments,setAssignments] = useState(mockAssignments)
    const [selectedWorker,setSelectedWorker] = useState<Worker | null>(null)
    const [selectedStation , setSelectedStation] = useState<Station | null>(null)
    const [ selectedAssignment , setSelectedAssignment] = useState<Assignment | null> (null)

    function handleCreateAssignment(assignment: Assignment) {
    setAssignments(prevAssignments => [
        ...prevAssignments,
        assignment
    ]);
    }

    function handleUpdateAssignment(assignment:Assignment) {
    setAssignments(prev =>
    prev.map(item =>
        item.id === assignment.id
        ? assignment
        : item
    )
    )
    }

    function handleRemoveAssignment (assignment:Assignment) {
        setAssignments(prev => prev.filter(item => item.id !== assignment.id))
        setSelectedAssignment(prev => prev?.id === assignment.id ? null : prev)
        return
    }
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
    <div
    style={{width:'100%',
        display:'flex',
        flexDirection:'row',
        border:'1px solid white' ,
        borderRadius:'5px',
        justifyContent:'space-evenly',
        alignItems:'center',
        padding:'20px',
        position:'relative',
        marginTop:'50px'
    }}
    >
    <StationList 
    stations={stations}
    selectedStation={selectedStation}
    onSelectedStation={setSelectedStation}
    />
    
    <StationDetail 
    assignments={assignments}
    selectedStation={selectedStation}
    onSelectedStation={setSelectedStation}
    /></div>
    <AssignmentControls
    assignments={assignments}
    selectedWorker={selectedWorker}
    selectedStation={selectedStation}
    onCreateAssignment = {handleCreateAssignment}
    workers={workers}
    stations={stations}
    />
    {selectedAssignment && 
    <AssignmentDetail assignment={selectedAssignment}
    onEditAssignmentNote={handleUpdateAssignment}
    workers={mockWorkers}
    stations={mockStations}
    />
    }
    <PlannerGrid 
    stations={stations}
    workers={workers}
    assignments={assignments}
    onRemoveAssignment={handleRemoveAssignment}
    onSelectAssignment={setSelectedAssignment}
    />
    </div>

  )
}

export default PlannerPage
