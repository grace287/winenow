import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface TastingNote {
  id: number
  wine: string
  date: string
  hasImage: boolean
}

interface TastingNoteSelectorProps {
  notes: TastingNote[]
  onSelect: (selectedIds: number[]) => void
}

export function TastingNoteSelector({ notes, onSelect }: TastingNoteSelectorProps) {
  const [selectedNotes, setSelectedNotes] = useState<number[]>([])

  const handleToggle = (id: number) => {
    setSelectedNotes(prev =>
      prev.includes(id) ? prev.filter(noteId => noteId !== id) : [...prev, id]
    )
  }

  const handleSubmit = () => {
    onSelect(selectedNotes)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>시음 노트에서 사진 선택</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="flex items-center space-x-2">
              <Checkbox
                id={`note-${note.id}`}
                checked={selectedNotes.includes(note.id)}
                onCheckedChange={() => handleToggle(note.id)}
                disabled={!note.hasImage}
              />
              <label
                htmlFor={`note-${note.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {note.wine} ({note.date})
              </label>
            </div>
          ))}
        </div>
        <Button onClick={handleSubmit} className="mt-4 w-full">선택한 사진 추가</Button>
      </CardContent>
    </Card>
  )
}

