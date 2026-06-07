import type { User } from '../types/User'

interface UserCardProps {
    user : User,
    selectedUser :User | null,
    onSelectUser : (value :User) => void
}

function UserCard({user,selectedUser,onSelectUser}:UserCardProps) {

  return (
    <div
    onClick={()=>onSelectUser(user)}
    style={{margin:'20px',border:'2px gray solid' , display:'flex' ,flexDirection:'column' , alignItems:'flex-start' , paddingLeft:'30px' , borderRadius:'10px', padding:'10px',
    cursor:'pointer', backgroundColor:(selectedUser?.id === user.id ? 'beige' : ''),
    }}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Address: {user.address.city}</p>
        <p>Company: {user.company.name}</p>
        
    </div>
  )
}

export default UserCard