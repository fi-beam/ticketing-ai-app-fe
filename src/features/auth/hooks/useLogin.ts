import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi'
import { useAuthStore } from '@/stores'
import { ROUTES } from '@/lib/constants'
import type { LoginCredentials } from '@/types'
import { toast } from 'sonner'

export const useLogin = () => {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data: any) => {
      setAuth(data.user, data.accessToken)
      toast.success('Welcome back!')
      navigate(ROUTES.DASHBOARD)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Login failed')
    },
  })
}
