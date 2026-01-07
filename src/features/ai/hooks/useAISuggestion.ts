import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/api'
import { toast } from 'sonner'
import type { AISuggestion } from '@/types'

// Mock AI suggestion generation
const mockGenerateSuggestion = async (ticketId: string): Promise<AISuggestion> => {
  // Simulate API call with delay
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return {
    id: Math.random().toString(36).substring(7),
    ticketId,
    content: `Thank you for reporting this issue. Based on the information provided, here's what we recommend:\n\n1. **Clear your browser cache and cookies**\n   - Go to your browser settings\n   - Clear browsing data from the last 7 days\n   - Make sure to include cached images and cookies\n\n2. **Try using incognito/private mode**\n   - This will help us determine if it's a caching issue\n   - Open a new incognito window and try logging in again\n\n3. **Check your browser console for errors**\n   - Press F12 to open developer tools\n   - Look for any red error messages in the Console tab\n   - Share any error messages you see\n\nIf these steps don't resolve the issue, please let us know and we'll investigate further. We may need to check server logs or coordinate with our development team.\n\nBest regards,\nSupport Team`,
    confidence: 'high',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export const useGenerateAISuggestion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: mockGenerateSuggestion,
    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKeys.ai.suggestions(data.ticketId),
        (old: AISuggestion[] = []) => [data, ...old]
      )
      toast.success('AI suggestion generated successfully!')
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to generate AI suggestion')
    },
  })
}

export const useAISuggestions = (ticketId: string) => {
  return useQuery({
    queryKey: queryKeys.ai.suggestions(ticketId),
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))
      return [] as AISuggestion[]
    },
  })
}

export const useApproveSuggestion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, content }: { id: string; content?: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { id, content }
    },
    onSuccess: () => {
      toast.success('Response sent successfully!')
      queryClient.invalidateQueries({ queryKey: ['ai', 'suggestions'] })
    },
    onError: () => {
      toast.error('Failed to send response')
    },
  })
}
