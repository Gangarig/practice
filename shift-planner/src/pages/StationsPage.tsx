import { useState } from 'react'
import type { Station } from '../types/Station';
import useApp from '../hooks/useApp';
import useStation from '../hooks/useStation';
import Search from '../components/Search';
import StationForm from '../components/stations/StationForm';
import StationSort from '../components/stations/StationSort';
import StationList from '../components/stations/StationList';
import StationDetail from '../components/stations/StationDetail';
import StationEdit from '../components/stations/StationEdit';
import { LoadingOverlay, Box } from '@mantine/core';

function StationsPage() {
    const [selectedStation , setSelectedStation] = useState<Station | null>(null)
    const [search,setSearch]=useState<string>('')
    const {
        sortedStations,
        sortOrderStation,
        setSortOrderStation
    } = useStation(search)
    const {
        stations,
        assignments,
        createStation,
        updateStation,
        removeStation,
        loadingStations,
    } = useApp()
  return (
    <>
        <Box pos="relative">
            <LoadingOverlay visible={loadingStations} loaderProps={{ children: 'Loading...' }} />
            <Search search={search} onSearch={setSearch}/>
            <StationSort
            sortOrderStation={sortOrderStation} 
            onSortStation={setSortOrderStation}
            />
            <StationList 
            stations={sortedStations}
            selectedStation={selectedStation}
            onSelectedStation={setSelectedStation}
            />
            <StationDetail 
            assignments={assignments}
            selectedStation={selectedStation}
            onSelectedStation={setSelectedStation}
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
        </Box>
    </>
  )
}
export default StationsPage