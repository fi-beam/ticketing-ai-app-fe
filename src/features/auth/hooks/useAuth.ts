import { useAuthStore } from '@/stores'
import { authApi } from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/lib/constants'

export const useAuth = () => {
  const { user, isAuthenticated, clearAuth, hasRole } = useAuthStore()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuth()
      navigate(ROUTES.LOGIN)
    }
  }

  return {
    user,
    isAuthenticated,
    hasRole,
    logout,
  }
}
