
interface CompanyFilterProps {
companies :string[],
selectedCompany:string,
setSelectedCompany:(value:string)=>void
}


function CompanyFilter({companies , selectedCompany , setSelectedCompany}:CompanyFilterProps) {
  return (
    <div
        style={{width:'100%', height:'25px',display:"flex", justifyContent:'space-between',alignContent:'center'}}
    >Company Filter
        <select name="companyFilter" id="company" value={selectedCompany}
        onChange={(e)=>setSelectedCompany(e.target.value)}
        >
        <option value="" >All Company</option>
        {companies.map(company => 
            <option key={company}
            value={company}>{company}</option>
        )}
        </select>
        <button onClick={()=>setSelectedCompany('')}>Clear Company</button>
    </div>
  )
}

export default CompanyFilter