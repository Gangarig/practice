import { useState } from 'react'
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
import WorkerForm from '../components/WorkerForm';
import WorkerEdit from '../components/WorkerEdit';
import StationForm from '../components/StationForm';
import StationEdit from '../components/StationEdit';
import WorkerSort from '../components/WorkerSort';
import StationSort from '../components/StationSort';
import useApp from '../hooks/useApp';




function PlannerPage() {
    const {workers,
        stations,
        assignments,
        createWorker,
        updateWorker,
        removeWorker,
        createStation,
        updateStation,
        removeStation,
        createAssignment,
        updateAssignment,
        removeAssignment
    } = useApp()

    const [selectedWorker,setSelectedWorker] = useState<Worker | null>(null)
    const [selectedStation , setSelectedStation] = useState<Station | null>(null)
    const [ selectedAssignment , setSelectedAssignment] = useState<Assignment | null> (null)
    const [search,setSearch]=useState<string>('')
    const [sortOrder,setSortOrder] = useState<'Default' | 'Name A-Z' | 'Name Z-A' | 'Status'>('Default')
    const [sortOrderStation,setSortOrderStation] = useState<'Default' | 'Name A-Z' | 'Name Z-A'  | 'Active first' | 'Inactive first'>('Default')
    function handleResetData () {
        localStorage.removeItem('workers');
        localStorage.removeItem('stations');
        localStorage.removeItem('assignments');
        window.location.reload();
    }
    const filteredWorkers = workers.filter((worker: Worker) => {
    const searchValue = search.toLowerCase();
    return (
        worker.name.toLowerCase().includes(searchValue) ||
        worker.email.toLowerCase().includes(searchValue) ||
        worker.role.toLowerCase().includes(searchValue) ||
        (worker.phoneNumber?.toString()?? '').includes(searchValue)
    );
    });
    let sortedWorkers = [...filteredWorkers]
    if(sortOrder === 'Name A-Z') {
        sortedWorkers = [...filteredWorkers].sort((a,b)=> a.name.localeCompare(b.name))
    }
    else if(sortOrder === 'Name Z-A') {
        sortedWorkers = [...filteredWorkers].sort((a,b)=> b.name.localeCompare(a.name))
    }
    else if(sortOrder === 'Status') {
        sortedWorkers = [...filteredWorkers].sort((a,b)=> a.status.localeCompare(b.status))
    }
    const filteredStations = stations.filter((station:Station)=>{
        const searchValue = search.toLowerCase();
        return (
            station.name.toLowerCase().includes(searchValue)
        )
    })
    let sortedStations = [...filteredStations]
        if(sortOrderStation === 'Name A-Z') {
        sortedStations = [...filteredStations].sort((a,b)=> a.name.localeCompare(b.name))
    }
       else if(sortOrderStation === 'Name Z-A') {
        sortedStations = [...filteredStations].sort((a,b)=> b.name.localeCompare(a.name))
    }
       else if(sortOrderStation === 'Active first') {
        sortedStations = [...filteredStations].sort((a,b)=> Number(b.active) - Number(a.active))
    }
       else if(sortOrderStation === 'Inactive first') {
        sortedStations = [...filteredStations].sort((a,b)=> Number(a.active) - Number(b.active))
    }
  return (
    <div
    style={{display:'flex',justifyContent:'center',alignItems:'center',
    flexDirection:'column',position:'relative',padding:'15px'
    }}>
    <div style={{
        position:'absolute',top:'10px' , right:'50px'
    }}>
        <button onClick={handleResetData}>RESET DATA</button>
    </div>
    <div style={{
        display:'flex',
        justifyContent:'space-evenly',
        width:'100%',marginTop:'100px'
    }}>
        <div>
        <WorkerSort sortOrder={sortOrder} onSort={setSortOrder} />
        <WorkerList
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        workers={sortedWorkers}
        />
        </div>
        <div
        style={{}}
        >
        { selectedWorker ? 
        <WorkerDetail 
        worker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        onRemoveWorker={removeWorker}
        onChangeOfStatus={updateWorker}
        assignments={assignments}
        updateWorkerState={updateWorker}
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
    <div>
    <StationSort
    sortOrderStation={sortOrderStation} 
    onSortStation={setSortOrderStation}
    />
    <StationList 
    stations={sortedStations}
    selectedStation={selectedStation}
    onSelectedStation={setSelectedStation}
    />
    </div>
    <StationDetail 
    assignments={assignments}
    selectedStation={selectedStation}
    onSelectedStation={setSelectedStation}
    /></div>
    <AssignmentControls
    assignments={assignments}
    onCreateAssignment = {createAssignment}
    workers={workers}
    stations={stations}
    />
    {selectedAssignment && 
    <AssignmentDetail assignment={selectedAssignment}
    onEditAssignmentNote={updateAssignment}
    workers={workers}
    stations={stations}
    />
    }
    <PlannerGrid 
    stations={stations}
    workers={workers}
    assignments={assignments}
    onRemoveAssignment={removeAssignment}
    onSelectAssignment={setSelectedAssignment}
    />
    <WorkerForm
    workers={workers}
    onCreateWorker={createWorker}
    />
    <WorkerEdit
    selectedWorker={selectedWorker ?? null}
    onUpdateWorker={updateWorker}
    />
    <StationForm
    stations={stations}
    onCreateStation={createStation}
    />
    <StationEdit 
    selectedStation={selectedStation}
    onUpdateStation={updateStation}
    onRemoveStation={removeStation}
    />
    </div>
  )
}
export default PlannerPage