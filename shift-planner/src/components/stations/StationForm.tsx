import React, { useState } from 'react'
import type { Station } from '../../types/Station'
interface StationFormProps {
    stations: Station[],
    onCreateStation:(value:Station)=>void
}


function StationForm({stations,onCreateStation}:StationFormProps) {
    const [stationsName,setStationName]=useState<string>('');
    const [stationStatus,setStationStatus]=useState<boolean>(true)

    function handleSubmit (e:React.FormEvent) {
        e.preventDefault()
        if(stationsName === '') return null

        const newStation :Station = {
            id:stations.length+1,
            name:stationsName,
            active:stationStatus 
        }

        onCreateStation(newStation);
        setStationName('')
        setStationStatus(true)
        return
    }

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
        <h2>Station Form</h2>
        <form onSubmit={handleSubmit}
        style={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center'
        }}
        >
            <label htmlFor="">Station Name</label>
            <input onChange={(e)=>setStationName(e.target.value)} type="text" />
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
    </div>
  )
}

export default StationForm