'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { WineNoteInfoGraphic } from './WineNoteInfoGraphic'

interface TastingNote {
  id: number
  date: Date
  wine: string
  winery: string
  vintage: string
  rating: number
  note: string
}

interface ToggleableWineNoteProps {
  note: TastingNote;
  onView: () => void
}

export function ToggleableWineNote({ note, onView }: ToggleableWineNoteProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="mb-4 bg-rose-50 wine-card">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-lg font-semibold text-rose-700">{note.wine}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)} // 상태 토글
          className="p-1"
        >
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0 px-4 pb-4">
          <WineNoteInfoGraphic
            wine={note.wine}
            rating={note.rating}
            sweetness={note.sweetness}
            acidity={note.acidity}
            tannin={note.tannin}
            body={note.body}
          />
          <p className="mt-4 text-gray-700">{note.note ? `${note.note.substring(0, 100)}...` : 'No note available'}</p>
          <Button onClick={() => handleView(note.id)} className="mt-4 w-full bg-rose-600 text-white">
          상세 보기
         </Button>

        </CardContent>
      )}
    </Card>
  )
}
