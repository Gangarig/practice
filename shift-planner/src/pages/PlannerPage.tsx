import { useEffect, useState } from 'react'
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
import WorkerForm from '../components/WorkerForm';
import WorkerEdit from '../components/WorkerEdit';
import StationForm from '../components/StationForm';
import StationEdit from '../components/StationEdit';
import Dashboard from '../components/Dashboard';
import Search from '../components/Search';
import WorkerSort from '../components/WorkerSort';
import StationSort from '../components/StationSort';





function PlannerPage() {
    const [workers,setWorkers] = useState<Worker[]>(() => {
        const savedWorkers = localStorage.getItem('workers');
        if(savedWorkers) {
            return JSON.parse(savedWorkers);
        }
        return mockWorkers
    });
    const [stations,setStations] = useState<Station[]>(()=> {
        const savedStations = localStorage.getItem('stations');
        if(savedStations) {
            return JSON.parse(savedStations)
        }
        return mockStations
    })
    const [assignments,setAssignments] = useState<Assignment[]>(()=> {
        const savedAssignmants = localStorage.getItem('assignments');
        if(savedAssignmants) {
            return JSON.parse(savedAssignmants)
        }
        return mockAssignments
    })
    const [selectedWorker,setSelectedWorker] = useState<Worker | null>(null)
    const [selectedStation , setSelectedStation] = useState<Station | null>(null)
    const [ selectedAssignment , setSelectedAssignment] = useState<Assignment | null> (null)
    const [search,setSearch]=useState<string>('')
    const [sortOrder,setSortOrder] = useState<'Default' | 'Name A-Z' | 'Name Z-A' | 'Status'>('Default')
    const [sortOrderStation,setSortOrderStation] = useState<'Default' | 'Name A-Z' | 'Name Z-A'  | 'Active first' | 'Inactive first'>('Default')
    


    

    useEffect(()=> {
    localStorage.setItem('workers',JSON.stringify(workers))
    localStorage.setItem('stations',JSON.stringify(stations))
    localStorage.setItem('assignments',JSON.stringify(assignments))
    },[workers,stations,assignments]);



    function handleResetData () {
        localStorage.removeItem('workers');
        localStorage.removeItem('stations');
        localStorage.removeItem('assignments');
        window.location.reload();
    }

    function handleCreateAssignment(assignment: Assignment) {
    setAssignments((prevAssignments:Assignment[]) => [
        ...prevAssignments,
        assignment
    ]);
    }

    function handleUpdateAssignment(assignment:Assignment) {
    setAssignments((prev:Assignment[]) =>
    prev.map(item =>
        item.id === assignment.id
        ? assignment
        : item
    )
    )
    }

    function handleRemoveAssignment (assignment:Assignment) {
        setAssignments((prev:Assignment[]) => prev.filter(item => item.id !== assignment.id))
        setSelectedAssignment(prev => prev?.id === assignment.id ? null : prev)
        return
    }

    function handleRemoveWorker(selectedWorker:Worker) {
        // assignment validation
        const hasAssignment = assignments.some((item:Assignment) => item.workerId === selectedWorker.id)
        if(hasAssignment){
            console.log('Worker has assignment')
            return null
        }
        setWorkers(prev => prev.filter(item => item.id !== selectedWorker.id))
        setSelectedWorker(null)
        return
    }

    function handleCreateWorker(newWorker:Worker) {
        setWorkers(prev => [
            ...prev ,
            newWorker
        ])
        return
    }
    function handleUpdateWorker(worker:Worker) {
        setWorkers(prev => 
            prev.map((item) => item.id === worker.id ? worker : item)
        )
        setSelectedWorker(worker)
        return
    }
    function handleCreateStation(newStation:Station) {
        setStations(prev=>[
            ...prev,
            newStation
        ])
        return
    }
    function handleUpdateStation(station:Station) {
        setStations(prev=>
        prev.map((item:Station) => item.id === station.id ? 
        station : item,
    ))
        setSelectedStation(station)
    return
    }

    function handleRemoveStation (station:Station) {
        const hasAssignmentsOnStation = assignments.some(item=> item.stationId === station.id)
        if(hasAssignmentsOnStation) {
            console.log('station has assignments')
            return null
        }
        setStations(prev=> prev.filter(
            item => item.id !== station.id)
        )
        setSelectedStation(null)
        return
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
    }}
    >
    <div style={{
        position:'absolute',top:'10px' , right:'50px'
    }}>
        <button onClick={handleResetData}>RESET DATA</button>
    </div>
    <Dashboard
        workers={workers}
        stations={stations}
        assignments={assignments}
    />
    <Search search={search} onSearch={setSearch}
    />

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
        onRemoveWorker={handleRemoveWorker}
        onChangeOfStatus={handleUpdateWorker}
        assignments={assignments}
        updateWorkerState={handleUpdateWorker}
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
    onCreateAssignment = {handleCreateAssignment}
    workers={workers}
    stations={stations}
    />
    {selectedAssignment && 
    <AssignmentDetail assignment={selectedAssignment}
    onEditAssignmentNote={handleUpdateAssignment}
    workers={workers}
    stations={stations}
    />
    }
    <PlannerGrid 
    stations={stations}
    workers={workers}
    assignments={assignments}
    onRemoveAssignment={handleRemoveAssignment}
    onSelectAssignment={setSelectedAssignment}
    />


    <WorkerForm
    workers={workers}
    onCreateWorker={handleCreateWorker}
    />
    <WorkerEdit
    selectedWorker={selectedWorker ?? null}
    onUpdateWorker={handleUpdateWorker}
    
    />

        <StationForm
    stations={stations}
    onCreateStation={handleCreateStation}
    />
    <StationEdit 
    selectedStation={selectedStation}
    onUpdateStation={handleUpdateStation}
    onRemoveStation={handleRemoveStation}
    />

    </div>

  )
}

export default PlannerPage
