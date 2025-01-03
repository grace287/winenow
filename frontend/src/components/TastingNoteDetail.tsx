'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Wine, Calendar, Star, Trash } from 'lucide-react'

interface TastingNote {
  id: number
  date: Date
  wine: string
  winery: string
  vintage: string
  rating: number
  note: string
}

interface TastingNoteDetailProps {
  note: TastingNote
  onUpdate: (note: TastingNote) => void
  onDelete: (id: number) => void
  onClose: () => void
}

export default function TastingNoteDetail({ note, onUpdate, onDelete, onClose }: TastingNoteDetailProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedNote, setEditedNote] = useState<TastingNote>(note)

  const handleChange = (field: keyof TastingNote, value: any) => {
    setEditedNote({ ...editedNote, [field]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onUpdate(editedNote)
    setIsEditing(false)
  }

  return (
    <div className="space-y-4">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            <CardContent>
              <Label htmlFor="wine">와인 이름</Label>
              <Input
                id="wine"
                value={editedNote.wine}
                onChange={(e) => handleChange('wine', e.target.value)}
                required
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Label htmlFor="winery">와이너리</Label>
              <Input
                id="winery"
                value={editedNote.winery}
                onChange={(e) => handleChange('winery', e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Label htmlFor="vintage">빈티지</Label>
              <Input
                id="vintage"
                value={editedNote.vintage}
                onChange={(e) => handleChange('vintage', e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Label htmlFor="date">테이스팅 날짜</Label>
              <Input
                id="date"
                type="date"
                value={editedNote.date.toISOString().split('T')[0]}
                onChange={(e) => handleChange('date', new Date(e.target.value))}
                required
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Label htmlFor="rating">평점</Label>
              <Slider
                id="rating"
                min={1}
                max={5}
                step={0.5}
                value={[editedNote.rating]}
                onValueChange={(value) => handleChange('rating', value[0])}
              />
              <div className="text-center">{editedNote.rating}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Label htmlFor="note">시음 노트</Label>
              <Textarea
                id="note"
                value={editedNote.note}
                onChange={(e) => handleChange('note', e.target.value)}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>취소</Button>
            <Button type="submit">저장</Button>
          </div>
        </form>
      ) : (
        <>
          <Card>
            <CardContent className="flex items-center space-x-2">
              <Wine className="w-5 h-5 text-primary" />
              <span className="font-semibold">와인:</span>
              <span>{note.wine}</span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-2">
              <Wine className="w-5 h-5 text-primary" />
              <span className="font-semibold">와이너리:</span>
              <span>{note.winery}</span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-semibold">빈티지:</span>
              <span>{note.vintage}</span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-semibold">테이스팅 날짜:</span>
              <span>{note.date.toLocaleDateString()}</span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-primary" />
              <span className="font-semibold">평점:</span>
              <span>{note.rating}</span>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p className="font-semibold mb-2">시음 노트:</p>
              <p>{note.note}</p>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsEditing(true)}>수정</Button>
            <Button variant="destructive" onClick={() => onDelete(note.id)}>
              <Trash className="w-4 h-4 mr-2" />
              삭제
            </Button>
            <Button variant="outline" onClick={onClose}>닫기</Button>
          </div>
        </>
      )}
    </div>
  )
}

