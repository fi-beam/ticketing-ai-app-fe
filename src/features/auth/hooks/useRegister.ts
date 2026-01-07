import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi'
import { useAuthStore } from '@/stores'
import { ROUTES } from '@/lib/constants'
import type { RegisterData } from '@/types'
import { toast } from 'sonner'

export const useRegister = () => {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (data: any) => {
      setAuth(data.user, data.accessToken)
      toast.success('Account created successfully!')
      navigate(ROUTES.DASHBOARD)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Registration failed')
    },
  })
}
