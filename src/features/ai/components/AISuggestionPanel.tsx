import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Check, Copy, RefreshCw, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react'
import { useGenerateAISuggestion, useAISuggestions, useApproveSuggestion } from '../hooks/useAISuggestion'
import { formatRelativeTime } from '@/lib/utils'
import { CONFIDENCE_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface AISuggestionPanelProps {
  ticketId: string
  ticketStatus: string
}

export const AISuggestionPanel = ({ ticketId, ticketStatus }: AISuggestionPanelProps) => {
  const [editedContent, setEditedContent] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const { mutate: generate, isPending: isGenerating } = useGenerateAISuggestion()
  const { data: suggestions = [] } = useAISuggestions(ticketId)
  const { mutate: approve, isPending: isApproving } = useApproveSuggestion()

  const latestSuggestion = suggestions[0]
  const isDisabled = ticketStatus === 'resolved' || ticketStatus === 'closed'

  const handleGenerate = () => {
    generate(ticketId)
  }

  const handleCopy = () => {
    if (latestSuggestion) {
      navigator.clipboard.writeText(editedContent || latestSuggestion.content)
      // Toast is handled by the copy action
    }
  }

  const handleApprove = () => {
    if (latestSuggestion) {
      approve({
        id: latestSuggestion.id,
        content: isEditing ? editedContent : undefined,
      })
      setIsEditing(false)
      setEditedContent('')
    }
  }

  return (
    <Card className="border-2 border-secondary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary" />
          <CardTitle>AI Assistant</CardTitle>
        </div>
        <CardDescription>
          Let AI analyze this ticket and suggest a response
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Generate Button */}
        {!latestSuggestion && !isGenerating && (
          <Button
            onClick={handleGenerate}
            disabled={isDisabled}
            className="w-full ai-gradient text-white"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate AI Suggestion
          </Button>
        )}

        {/* Loading State */}
        {isGenerating && (
          <div className="space-y-3 text-center py-8">
            <div className="flex justify-center">
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-secondary" />
                <Sparkles className="h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
              </div>
            </div>
            <div>
              <p className="font-medium">AI is analyzing the ticket...</p>
              <p className="text-sm text-muted-foreground">
                Usually takes 3-5 seconds
              </p>
            </div>
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-secondary shimmer" />
            </div>
          </div>
        )}

        {/* AI Response Display */}
        {latestSuggestion && !isGenerating && (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium">AI-Generated Suggestion</span>
              </div>
              <div className="flex items-center gap-2">
                {latestSuggestion.confidence && (
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-xs',
                      CONFIDENCE_COLORS[latestSuggestion.confidence]
                    )}
                  >
                    {latestSuggestion.confidence} confidence
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(latestSuggestion.createdAt)}
                </span>
              </div>
            </div>

            {/* Content */}
            {isEditing ? (
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={12}
                className="font-mono text-sm"
              />
            ) : (
              <div className="rounded-md border bg-muted/50 p-4">
                <p className="text-sm whitespace-pre-wrap">
                  {latestSuggestion.content}
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground">
              ⚠️ This is an AI-generated suggestion. Please review before sending.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              {!isEditing ? (
                <>
                  <Button
                    onClick={handleApprove}
                    disabled={isApproving}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isApproving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    Approve & Send
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(true)
                      setEditedContent(latestSuggestion.content)
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="outline" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleApprove} disabled={isApproving}>
                    {isApproving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    Save & Send
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      setEditedContent('')
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>

            {/* Feedback */}
            <div className="flex items-center gap-2 pt-2 border-t">
              <span className="text-xs text-muted-foreground">Was this helpful?</span>
              <Button variant="ghost" size="sm">
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm">
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Previous Suggestions */}
        {suggestions.length > 1 && (
          <details className="text-sm">
            <summary className="cursor-pointer font-medium">
              Previous AI Suggestions ({suggestions.length - 1})
            </summary>
            <div className="mt-2 space-y-2">
              {suggestions.slice(1).map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="rounded border p-3 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {suggestion.status}
                    </Badge>
                    <span className="text-muted-foreground">
                      {formatRelativeTime(suggestion.createdAt)}
                    </span>
                  </div>
                  <p className="line-clamp-3 text-muted-foreground">
                    {suggestion.content}
                  </p>
                </div>
              ))}
            </div>
          </details>
        )}
      </CardContent>
    </Card>
  )
}
