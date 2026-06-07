import { useEffect, useState } from 'react'
import type { User } from '../types/User';
import { fetchUsers } from '../services/userService';
import UserList from '../components/UserList';
import SearchInput from '../components/SearchInput';
import SearchStatus from '../components/SearchStatus';
import CityFilter from '../components/CityFilter';
import SortSelect from '../components/SortSelect';

function UsersPage() {
    const [users,setUsers] = useState<User[]>([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string | null >(null)
    const [search,setSearch] = useState('');
    const [selectedCity,setSelectedCity] = useState('');
    const [sortOrder,setSortOrder] = useState('Default');
    const [selectedUser,setSelectedUser] = useState<User | null>(null);
    
    const filteredUsers = users.filter(user=> {
        const searchTerm = search.toLowerCase();

        const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
        user.email.toLowerCase().includes(searchTerm) ||
        user.address.city.toLowerCase().includes(searchTerm);

        const matchesCity = selectedCity === '' || user.address.city === selectedCity;

        return matchesCity && matchesSearch

    })
    const sortedData = [...filteredUsers];
    const displayedUsers = sortedData;
    const cities:string[] = users.map(user => user.address.city);
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


    return (
    <div>
        <h1>Users Page</h1>
        <SearchInput search={search} setSearch={setSearch} />
        {filteredUsers.length === 0 && users.length > 0 ? '  No users found' : null}
        <SortSelect sortOrder={sortOrder} setSortOrder={setSortOrder}/>
        <CityFilter cities={cities}
                    selectedCity={selectedCity} 
                    setSelectedCity={setSelectedCity} />
        <SearchStatus filteredUsers={filteredUsers.length} users={users.length}/>
        {selectedUser && 
            <>
            <h4>User Detail</h4>
            <p>Phone Number --- {selectedUser.phone}</p>
            <p>Webist --- {selectedUser.website}</p>
            </>
        }
        <UserList users={displayedUsers} selectedUser={selectedUser} onSelectUser={setSelectedUser}
        />
    </div>
    );
}

export default UsersPage