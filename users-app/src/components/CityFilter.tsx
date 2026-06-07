
interface CityFilterProps {
    cities:string[],
    selectedCity:string,
    setSelectedCity:(value:string) => void
}

function CityFilter({cities,selectedCity,setSelectedCity}:CityFilterProps) {
  return (
    <div>
        <label>Select a city</label>
        <select name="cities" id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        {cities.map(city => <option value={city}>{city}</option>)}
        </select>
        <button onClick={()=>setSelectedCity('')}>Clear City</button>
    </div>
  )
}

export default CityFilter