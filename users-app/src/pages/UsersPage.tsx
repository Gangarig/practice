import { useEffect, useState } from 'react'
import type { User } from '../types/User';
import { fetchUsers } from '../services/userService';
import UserList from '../components/UserList';
import SearchInput from '../components/SearchInput';
import SearchStatus from '../components/SearchStatus';
import CityFilter from '../components/CityFilter';
import SortSelect from '../components/SortSelect';
import CompanyFilter from '../components/CompanyFilter';
function UsersPage() {
    const [users,setUsers] = useState<User[]>([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string | null >(null)
    const [search,setSearch] = useState('');
    const [selectedCity,setSelectedCity] = useState('');
    const [selectedCompany,setSelectedCompany] = useState('');
    const [sortOrder,setSortOrder] = useState('Default');
    const [selectedUser,setSelectedUser] = useState<User | null>(null);
    
    const filteredUsers = users.filter(user=> {
        const searchTerm = search.toLowerCase();

        const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
        user.email.toLowerCase().includes(searchTerm) ||
        user.address.city.toLowerCase().includes(searchTerm);

        const matchesCity = selectedCity === '' || user.address.city === selectedCity;

        const matchesCompany = selectedCompany === '' ||
        user.company.name === selectedCompany;
        return matchesCity && matchesSearch && matchesCompany
    })
    const sortedData = [...filteredUsers];
    const displayedUsers = sortedData;
    const uniqueCities = [
    ...new Set(users.map(user => user.address.city))
    ];
    const uniqueCompanies = [...new Set(users.map(user=>
        user.company.name
    ))];

    async function loadUsers() {
        setLoading(true);
        try {
            const users = await fetchUsers();
            setUsers(users)
            setError(null)
        } catch (error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError('Unknown Error')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
    loadUsers();
    }, []);

    if(sortOrder === 'Name A-Z') {
        sortedData.sort((a,b) => a.name.localeCompare(b.name))
    }
    if(sortOrder === 'Name Z-A') {
        sortedData.sort((a,b) => b.name.localeCompare(a.name))
    }

    if (loading) {
    return <p>Loading...</p>;
    }

    if (error) {
    return <p>{error}</p>;
    }
    function clearFilters() {
        setSearch('');
        setSelectedCity('');
        setSelectedCompany('');
        setSortOrder('Default');
        setSelectedUser(null);
        }

    return (
    <div style={{display:'flex', flexDirection:'column' ,width:'90%' ,margin:'20px', justifyContent:'space-between' , gap:'15px'}}>
        <h1>Users Page</h1>
        <SearchInput search={search} setSearch={setSearch} />
        {displayedUsers.length === 0 && users.length > 0 ? '  No users found' : null}
        <SortSelect 
        
        sortOrder={sortOrder} 
        setSortOrder={setSortOrder}/>
        <CompanyFilter
                    companies={uniqueCompanies}
                    selectedCompany={selectedCompany}
                    setSelectedCompany={setSelectedCompany}
        />
        <CityFilter cities={uniqueCities}
                    selectedCity={selectedCity} 
                    setSelectedCity={setSelectedCity} />
        <SearchStatus filteredUsers={displayedUsers.length} users={users.length}/>
        {selectedUser && 
            <>
            <h4>User Detail</h4>
            <p>Phone Number --- {selectedUser.phone}</p>
            <p>Website --- {selectedUser.website}</p>
            <button onClick={()=>setSelectedUser(null)}>Close</button>
            </>
        }
        <UserList users={displayedUsers} selectedUser={selectedUser} onSelectUser={setSelectedUser}
        />
        <div style={{display:'flex' , width:'100%',justifyContent:'center',alignItems:'center'}}>
        <button onClick={()=>clearFilters()}
        style={{width:'100px'}}
        >Clear all Filters </button>
        </div>
    </div>
    );
}

export default UsersPage