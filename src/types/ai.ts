export type AISuggestionStatus = 'draft' | 'approved' | 'rejected'

export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface AISuggestion {
  id: string
  ticketId: string
  content: string
  confidence?: ConfidenceLevel
  status: AISuggestionStatus
  createdAt: string
  updatedAt: string
  agentId?: string
  agentName?: string
  feedback?: 'helpful' | 'not_helpful'
}

export interface GenerateAISuggestionRequest {
  ticketId: string
}

export interface UpdateAISuggestionRequest {
  status: AISuggestionStatus
  editedContent?: string
  feedback?: 'helpful' | 'not_helpful'
}

export interface AIStats {
  totalSuggestions: number
  approvedSuggestions: number
  rejectedSuggestions: number
  averageConfidence: number
  suggestionsToday: number
}
