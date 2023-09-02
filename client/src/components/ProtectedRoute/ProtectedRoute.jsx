import { Navigate, Outlet } from 'react-router-dom'
import useSession from '../../hooks/useSession'

export default function ProtectedRoute ({ children, redirectTo = '/' }) {
  const { session } = useSession()

  // Compruebo si hay sesion
  return !session?.id
    ? <Navigate to={redirectTo} />
    : (children || <Outlet />)
}
