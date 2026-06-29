
import { useEffect, useState } from 'react'
import { AppContext } from './AppContext'
import mockAssignments from '../data/mockAssignments'
import mockWorkers from '../data/mockWorkers'
import mockStations from '../data/mockStations'
import type { Worker } from '../types/Worker'
import type { Assignment } from '../types/Assignment'
import type { Station } from '../types/Station'
import { Outlet } from 'react-router-dom'





function AppProvider() {
    const [workers,setWorkers] = useState<Worker[]>(()=> {  
        const savedWorkers = localStorage.getItem('workers');
        return savedWorkers ? JSON.parse(savedWorkers) : mockWorkers
    });
    const [stations, setStations] = useState<Station[]>(() => {
    const savedStations = localStorage.getItem("stations");
    return savedStations ? JSON.parse(savedStations) : mockStations;
    });

    const [assignments, setAssignments] = useState<Assignment[]>(() => {
        const savedAssignments = localStorage.getItem("assignments");
        return savedAssignments ? JSON.parse(savedAssignments) : mockAssignments;
    });

    useEffect(() => {
        localStorage.setItem('workers',JSON.stringify(workers))
        localStorage.setItem('stations',JSON.stringify(stations))
        localStorage.setItem('assignments',JSON.stringify(assignments))
    },[workers,stations,assignments])

    function removeWorker(selectedWorker:Worker) {
        // assignment validation
        const hasAssignment = assignments.some((item:Assignment) => item.workerId === selectedWorker.id)
        if(hasAssignment){
            console.log('Worker has assignment')
            return null
        }
        setWorkers(prev => prev.filter(item => item.id !== selectedWorker.id))
        return
    }
    function createWorker(newWorker:Worker) {
        setWorkers(prev => [
            ...prev ,
            newWorker
        ])
        return
    }
    function updateWorker(worker:Worker) {
        setWorkers(prev => 
            prev.map((item) => item.id === worker.id ? worker : item)
        )
        return
    }
    function createStation(newStation:Station) {
        setStations(prev=>[
            ...prev,
            newStation
        ])
        return
    }
    function updateStation(station:Station) {
        setStations(prev=>
        prev.map((item:Station) => item.id === station.id ? 
        station : item,
    ))
    return
    }
    function removeStation (station:Station) {
        const hasAssignmentsOnStation = assignments.some(item=> item.stationId === station.id)
        if(hasAssignmentsOnStation) {
            console.log('station has assignments')
            return null
        }
        setStations(prev=> prev.filter(
            item => item.id !== station.id)
        )
        return
    }
    function createAssignment(assignment: Assignment) {
        setAssignments((prevAssignments:Assignment[]) => [
            ...prevAssignments,
            assignment
        ]);
    }
    function updateAssignment(assignment:Assignment) {
    setAssignments(prevAssignments =>
    prevAssignments.map(item =>
        item.id === assignment.id
        ? assignment
        : item
    )
    )
    }
    function removeAssignment(assignment:Assignment) {
        setAssignments(prevAssignments => prevAssignments.filter(item => item.id !== assignment.id))
        return
    }

    function resetLocalData () {
        localStorage.removeItem('workers');
        localStorage.removeItem('stations');
        localStorage.removeItem('assignments');
        window.location.reload();
    }


  return (
    <AppContext.Provider 
    value={{
        workers,
        assignments,
        stations,
        createWorker,
        updateWorker,
        removeWorker,
        createStation,
        updateStation,
        removeStation,
        createAssignment,
        updateAssignment,
        removeAssignment,
        resetLocalData
    }}
    
    ><Outlet/></AppContext.Provider>
  )
}

export default AppProvider