import type { User } from '../types/User';
import UserCard from './UserCard';

interface UserListProp {
    users : User[],
    selectedUser :User | null,
    onSelectUser :(value:User) => void
}


function UserList({users,selectedUser,onSelectUser}:UserListProp) {
  return (
        <div>
            {users.map( user => <UserCard key={user.id} user={user} selectedUser={selectedUser} onSelectUser={onSelectUser} />)}
        </div>
  )
}

export default UserList