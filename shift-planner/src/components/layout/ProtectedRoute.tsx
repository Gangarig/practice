import { Navigate,Outlet } from "react-router-dom"
import currentUser from "../../data/mockCurrentUser"

interface ProtectedRouteProps {
    allowedRoles:string[]
}
function ProtectedRoute({allowedRoles}:ProtectedRouteProps) {
  if (!currentUser.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  const isAllowed = allowedRoles.includes(currentUser.role)
  if(!isAllowed){
    return <Navigate to='unauthorized'/>
  }
  return <Outlet />;
}

export default ProtectedRoute