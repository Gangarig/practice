
interface CityFilterProps {
    cities:string[],
    selectedCity:string,
    setSelectedCity:(value:string) => void
}

function CityFilter({cities,selectedCity,setSelectedCity}:CityFilterProps) {
  return (
    <div
    style={{width:'100%', height:'25px',display:"flex", justifyContent:'space-between',alignContent:'center'}}>
        <label>Select a city</label>
        <select name="cities" id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        <option value='' onChange={()=>setSelectedCity('')}> All City</option>
        {cities.map(city => <option key={city} value={city}>{city}</option>)}

        </select>
 
        <button  onClick={()=>setSelectedCity('')}>Clear City</button>
    </div>
  )
}

export default CityFilter