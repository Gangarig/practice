interface SearchStatusProps {
    filteredUsers:number,
    users:number
}
function SearchStatus({filteredUsers,users}:SearchStatusProps) {
  return (
    <div>Showing {filteredUsers} of {users} users</div>
  )
}

export default SearchStatus