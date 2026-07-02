
import { useEffect, useState } from 'react'
import { AppContext } from './AppContext'
import mockAssignments from '../data/mockAssignments'
import mockStations from '../data/mockStations'
import type { Worker , NewWorker } from '../types/Worker'
import type { Assignment } from '../types/Assignment'
import type { Station } from '../types/Station'
import { Outlet } from 'react-router-dom'
import { supabase } from '../lib/supabase'





function AppProvider() {
    const [workers,setWorkers] = useState<Worker[]>([]);
    const [loadingWorkers,setLoadingWorkers] = useState(false);
    const [workersError , setWorkersError] = useState<string|null>(null)
    const [stations, setStations] = useState<Station[]>(() => {
    const savedStations = localStorage.getItem("stations");
    return savedStations ? JSON.parse(savedStations) : mockStations;
    });

    
    async function loadWorkers() {
        setLoadingWorkers(true)

        const {data , error} = await supabase.from('workers').select('*')

        if(error) {
            setWorkersError(error.message);
            setLoadingWorkers(false)
            return
        }

        setWorkers(data as Worker[]);
        setLoadingWorkers(false);
        return
    }

    const [assignments, setAssignments] = useState<Assignment[]>(() => {
        const savedAssignments = localStorage.getItem("assignments");
        return savedAssignments ? JSON.parse(savedAssignments) : mockAssignments;
    });

    useEffect(() => {
        localStorage.setItem('workers',JSON.stringify(workers))
        localStorage.setItem('stations',JSON.stringify(stations))
        localStorage.setItem('assignments',JSON.stringify(assignments))
    },[workers,stations,assignments])

    useEffect(()=>{
        loadWorkers();
    },[])
    
    async function createWorker(newWorker:NewWorker) {
        const {data,error} = await supabase.from('workers').insert(newWorker).select().single()    
        if(error) {
            console.log(error.message);
            return
        }
        await loadWorkers();

    }
    async function removeWorker(selectedWorker:Worker) {
        // assignment validation
        const hasAssignment = assignments.some((item:Assignment) => item.workerId === selectedWorker.id)
        if(hasAssignment){
            console.log('Worker has assignment')
            return null
        }
        const {error} = await supabase.from('workers').delete().eq('id',selectedWorker.id)

        if(error) {
            console.log(error.message);
            return
        }
        await loadWorkers()
    }

    async function updateWorker(worker:Worker) {
        const {data,error} = await supabase.from('workers').update(worker).eq('id',worker.id);
        if(error) {
            console.log(error.message);
            return
        }

        await loadWorkers();
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