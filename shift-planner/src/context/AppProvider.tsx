
import { useEffect, useState } from 'react'
import { AppContext } from './AppContext'
import type { Worker , NewWorker } from '../types/Worker'
import type { Assignment , NewAssignment } from '../types/Assignment'
import type { Station , NewStation } from '../types/Station'
import { Outlet } from 'react-router-dom'
import { createWorker , updateWorker , removeWorker , loadWorkers} from '../services/workerService'
import { loadStations,createStation,updateStation,removeStation } from '../services/stationService'
import { loadAssignments , createAssignment , updateAssignment,removeAssignment } from '../services/assignmentService'
import { notifications } from '@mantine/notifications';
import { getMondayOfWeek , getWeekDays} from '../lib/dateUtils'

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

    const [selectedWeekDate , setSelectedWeekDate] = useState<Date>(new Date());
    const monday = getMondayOfWeek(selectedWeekDate);
    const weekDays = getWeekDays(monday);
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
            notifications.show({
                position:'top-right',
                color:'red',
                title: 'Assignment loading failed',
                message: 'The assignments could not be loaded',
            });
            return
        } finally {
            setLoadingAssignments(false)
            }
    }
    async function handleCreateAssignment(newAssignment: NewAssignment) {
        try {
            setAssignmentsError(null)
            await createAssignment(newAssignment);
            notifications.show({
                position:'top-right',
                color:'green',
                title: 'Assignment created',
                message: 'The assignment was created successfully',
            });
        }catch (error){
            setAssignmentsError('Could not create new assignment')
            notifications.show({
                position:'top-right',
                color:'red',
                title: 'Assignment creation failed',
                message: 'The assignment could not be created',
            });
            return
        }
            await refreshAssignments();
    }
    async function handleUpdateAssignment(assignment:Assignment) {
        try {
            setAssignmentsError(null)
            await updateAssignment(assignment);
            notifications.show({
                position:'top-right',
                color:'green',
                title: 'Assignment updated',
                message: 'The assignment was updated successfully',
            });
        }catch (error){
            setAssignmentsError('Could not update assignment')
            notifications.show({
                position:'top-right',
                color:'red',
                title: 'Assignment update failed',
                message: 'The assignment could not be updated',
            });
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
            notifications.show({
                position:'top-right',
                color:'red',
                title: 'Assignment deletion failed',
                message: 'The assignment could not be deleted',
            });
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
        notifications.show({
            position:'top-right',
            color:'red',
            title: 'Station loading failed',
            message: 'The stations could not be loaded',
        });
        } finally {
        setLoadingStations(false)
        }
    }
    async function handleUpdateStation(station:Station) {
        try {
            setStationsError(null)
            await updateStation(station);
            notifications.show({
                position:'top-right',
                color:'green',
                title: 'Station updated',
                message: 'The station was updated successfully',
            });
        }catch (error){
            setStationsError('Could not update station')
            notifications.show({
                position:'top-right',
                color:'red',
                title: 'Station update failed',
                message: 'The station could not be updated',
            });
            return
        }
            await refreshStations();
    }
    async function handleCreateStation(newStation:NewStation) {
        try {
            setStationsError(null)
            await createStation(newStation);
            notifications.show({
                position:'top-right',
                color:'green',
                title: 'Station created',
                message: 'The station was created successfully',
            });
        }catch (error){
            setStationsError('Could not create station')
            notifications.show({
                position:'top-right',
                color:'red',
                title: 'Station creation failed',
                message: 'The station could not be created',
            });
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
                notifications.show({
                    position:'top-right',
                    color:'red',
                    title: 'Station deletion failed',
                    message: 'The station could not be deleted because it has assignments',
                });
                return
            }
            await removeStation(station);
            notifications.show({
                position:'top-right',
                color:'green',
                title: 'Station deleted',
                message: 'The station was deleted successfully',
            });
        } catch (error) {
            setStationsError('Could not remove station')
            notifications.show({
                position:'top-right',
                color:'red',
                title: 'Station deletion failed',
                message: 'The station could not be deleted',
            });
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
        notifications.show({
            position:'top-right',
            color:'red',
            title: 'Worker loading failed',
            message: 'The workers could not be loaded',
        });
        } finally {
        setLoadingWorkers(false)
        }
    }
    async function handleRemoveWorker(selectedWorker:Worker) {
            setWorkersError(null)
            const hasAssignment = assignments.some((item:Assignment) => item.workerId === selectedWorker.id)
            if(hasAssignment){
                setWorkersError('Worker has assignment')
                notifications.show({
                    position:'top-right',
                    color:'red',
                    title: 'Worker deletion failed',
                    message: 'The worker could not be deleted because they have assignments',
                });
                return
            }
        try {
            await removeWorker(selectedWorker);
            notifications.show({
                position:'top-right',
                color:'green',
                title: 'Worker deleted',
                message: 'The worker was deleted successfully',
            });
        } catch (error) {
            setWorkersError('Could not delete worker')
            notifications.show({
                position:'top-right',
                color:'red',
                title: 'Worker deletion failed',
                message: 'The worker could not be deleted',
            });
            return
        }   
            await refreshWorkers();
    }
    async function handleUpdateWorker(worker:Worker) {
        try {
            setWorkersError(null)
            await updateWorker(worker);
            notifications.show({
                position:'top-right',
                color:'green',
                title: 'Worker updated',
                message: 'The worker was updated successfully',
            });
        } catch (error) {
            setWorkersError('Could not update worker')
            notifications.show({
                position:'top-right',
                color:'red',
                title: 'Worker update failed',
                message: 'The worker could not be updated',
            });
            return
        }                         
            await refreshWorkers();
    }
    async function handleCreateWorker(newWorker:NewWorker) {
        try {
            setWorkersError(null)
            await createWorker(newWorker);
            notifications.show({
            position:'top-right',
            color:'green',
            title: 'Worker created',
            message: 'The worker was added successfully',
            });
        }catch (error){
            setWorkersError('Could not create worker')
            notifications.show({
            position:'top-right',
            color:'red',
            title: 'Worker creation failed',
            message: 'The worker could not be added',
            });
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
        monday,
        weekDays,
        selectedWeekDate,
        setSelectedWeekDate,
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