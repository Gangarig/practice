
import { useEffect, useState } from 'react'
import { AppContext } from './AppContext'
import type { Worker , NewWorker } from '../types/Worker'
import type { Assignment , NewAssignment } from '../types/Assignment'
import type { Station , NewStation } from '../types/Station'
import { Outlet } from 'react-router-dom'
import { createWorker , updateWorker , removeWorker , loadWorkers} from './workerService'
import { loadStations,createStation,updateStation,removeStation } from './stationService'
import { loadAssignments , createAssignment , updateAssignment,removeAssignment } from './assignmentService'
import { notifications } from '@mantine/notifications';

function AppProvider() {
    const [workers,setWorkers] = useState<Worker[]>([]);
    const [loadingWorkers,setLoadingWorkers] = useState(false);
    const [workersError , setWorkersError] = useState<string|null>(null)
    const [stations, setStations] = useState<Station[]>([]);
    const [loadingStations,setLoadingStations] = useState(false);
    const [stationsError ,setStationsError] = useState<string|null>(null)
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loadingAssignments,setLoadingAssignments] = useState(false);
    const [assignmentsError , setAssignmentsError] = useState<string|null>(null)

    useEffect(()=>{
        refreshWorkers();
        refreshStations();
        refreshAssignments();
    },[])


    // assignments
    async function refreshAssignments(){
        try {
        setLoadingAssignments(true)
        setAssignmentsError(null)
        const data = await loadAssignments();

            setAssignments(data)
        }
        catch (error) {
            setAssignmentsError('Could not load assignments')
            return
        } finally {
            setLoadingAssignments(false)
            }
    }
    async function handleCreateAssignment(newAssignment: NewAssignment) {
        try {
            setAssignmentsError(null)
            await createAssignment(newAssignment);
        }catch (error){
            setAssignmentsError('Could not create new assignment')
            return
        }
            await refreshAssignments();
    }
    async function handleUpdateAssignment(assignment:Assignment) {
        try {
            setAssignmentsError(null)
            await updateAssignment(assignment);
        }catch (error){
            setAssignmentsError('Could not update assignment')
            return
        }
            await refreshAssignments();
    }
    async function handleRemoveAssignment(assignment:Assignment) {
        try {
            setAssignmentsError(null)
            await removeAssignment(assignment);
        }catch (error){
            setAssignmentsError('Could not remove assignment')
            return
        }  
            await refreshAssignments();
    }

    // stations
    async function refreshStations() {
        try {
        setLoadingStations(true)
        setStationsError(null)
        const data = await loadStations()
            setStations(data)
        } catch {
        setStationsError("Could not load stations")
        } finally {
        setLoadingStations(false)
        }
    }
    async function handleUpdateStation(station:Station) {
        try {
            setStationsError(null)
            await updateStation(station);
        }catch (error){
            setStationsError('Could not update station')
            return
        }
            await refreshStations();
    }
    async function handleCreateStation(newStation:NewStation) {
        try {
            setStationsError(null)
            await createStation(newStation);
        }catch (error){
            setStationsError('Could not create station')
            return
        } 
            await refreshStations();
    }
    async function handleRemoveStation(station:Station) {
        try {
            setStationsError(null)
            const hasAssignmentsOnStation = assignments.some(item=> item.stationId === station.id)
            if(hasAssignmentsOnStation) {
                setStationsError('station has assignments')
                return null
            }
            await removeStation(station);
        } catch (error) {
            setStationsError('Could not remove station')
            return
        } 
            await refreshStations();
    }

    // workers     
    async function refreshWorkers() {
        try {
            setLoadingWorkers(true)
            setWorkersError(null)
            const data = await loadWorkers()
            setWorkers(data)

        } catch {
        setWorkersError("Could not load workers")
        } finally {
        setLoadingWorkers(false)
        }
    }
    async function handleRemoveWorker(selectedWorker:Worker) {
            setWorkersError(null)
            const hasAssignment = assignments.some((item:Assignment) => item.workerId === selectedWorker.id)
            if(hasAssignment){
                setWorkersError('Worker has assignment')
                return null
            }
        try {
            await removeWorker(selectedWorker);
        } catch (error) {
            setWorkersError('Could not delete worker')
            return
        }   
            await refreshWorkers();
    }
    async function handleUpdateWorker(worker:Worker) {
        try {
            setWorkersError(null)
            await updateWorker(worker);
        }catch (error){
            setWorkersError('Could not update worker')
            return
        } 
            await refreshWorkers();
    }
    async function handleCreateWorker(newWorker:NewWorker) {
        try {
            setWorkersError(null)
            await createWorker(newWorker);
            notifications.show({
            title: 'Worker created',
            message: 'The worker was added successfully',
            });
        }catch (error){
            setWorkersError('Could not create worker')
            return
        }  
            await refreshWorkers();
    }

  return (
    <AppContext.Provider 
    value={{
        workers,
        assignments,
        stations,
        createWorker:handleCreateWorker,
        updateWorker:handleUpdateWorker,
        removeWorker:handleRemoveWorker,
        createStation:handleCreateStation,
        updateStation:handleUpdateStation,
        removeStation:handleRemoveStation,
        createAssignment:handleCreateAssignment,
        updateAssignment:handleUpdateAssignment,
        removeAssignment:handleRemoveAssignment,
        loadingWorkers,
        workersError,
        loadingStations,
        stationsError,
        loadingAssignments,
        assignmentsError
    }}
    >
    <Outlet/>
    </AppContext.Provider>
  )
}

export default AppProvider