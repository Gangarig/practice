import React , {useState} from 'react'
import type { Station } from '../../types/Station'
import { Button, Group, Paper, SegmentedControl, Stack, Text, TextInput } from '@mantine/core'

interface StationEditProps {
    selectedStation:Station | null,
    onUpdateStation:(value:Station) => void
    onRemoveStation:(value:Station) => void
}

function StationEdit({selectedStation,onRemoveStation,onUpdateStation}:StationEditProps) {
    const [stationsName,setStationName]=useState<string>(selectedStation?.name ?? '');
    const [stationStatus,setStationStatus]=useState<boolean | null>(selectedStation?.active ?? null)
    



    function handleUpdate(e:React.FormEvent) {
        e.preventDefault()
        if(!selectedStation) return null
        if(stationsName === '') return null
        if(stationStatus === null) return null
        const updatedStation = {
            ...selectedStation,
            name: stationsName,
            active: stationStatus
        }
        setStationName('')
        onUpdateStation(updatedStation)
        return
    }

    function handleRemove(selectedStation:Station | null) {
        if(!selectedStation) return null
        setStationName('')
        onRemoveStation(selectedStation)
        return
    }

  if (!selectedStation) return null
  return (
    <Paper withBorder p="lg">
      <form onSubmit={handleUpdate}>
        <Stack>
          <Text fw={600}>Edit station</Text>
          <TextInput required label="Station name" value={stationsName}
            onChange={(e) => setStationName(e.currentTarget.value)} />
          <SegmentedControl fullWidth value={stationStatus ? 'active' : 'inactive'}
            onChange={(value) => setStationStatus(value === 'active')}
            data={[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }]} />
          <Group justify="space-between">
            <Button color="red" variant="subtle" type="button" onClick={() => handleRemove(selectedStation)}>Delete station</Button>
            <Button type="submit" variant="light">Save changes</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}

export default StationEdit
