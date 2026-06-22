import React , {useEffect, useState} from 'react'
import type { Station } from '../types/Station'

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
        onUpdateStation(updatedStation)
        return
    }

    function handleRemove(selectedStation:Station | null) {
        if(!selectedStation) return null
        onRemoveStation(selectedStation)
        return
    }

    useEffect(()=>{
        if(!selectedStation) return 
        setStationName(selectedStation.name)
        setStationStatus(selectedStation.active)
    },[selectedStation])



  return (
        <div style={{
                display:'flex',
                flexDirection:'column',
                border:'1px solid white',
                borderRadius:'10px',
                justifyContent:'center',
                alignItems:'center',
                padding:'20px'
            }}>
                <h2>Station Edit</h2>
                <form onSubmit={handleUpdate}
                style={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center',
                    
                }}
                >
                    <label htmlFor="">Station Name</label>
                    <input
                    value={stationsName}
                    placeholder={stationsName}
                    onChange={(e)=>setStationName(e.target.value)} type="text" />
                    <label>
                    <input
                        type="radio"
                        name="stationStatus"
                        checked={stationStatus === true}
                        onChange={() => setStationStatus(true)}
                    />
                    Active
                    </label>

                    <label>
                    <input
                        type="radio"
                        name="stationStatus"
                        checked={stationStatus === false}
                        onChange={() => setStationStatus(false)}
                    />
                    Inactive
                    </label>
                    <button type='submit'>Create Station</button>
                </form>
                <button onClick={()=>handleRemove(selectedStation)}>Delete</button>
        </div>
  )
}

export default StationEdit
