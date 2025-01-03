'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { format, isSameDay, subDays } from 'date-fns'
import { ko } from 'date-fns/locale'
import TastingNoteForm from '@/components/TastingNoteForm'
import { ToggleableWineNote } from '@/components/ToggleableWineNote'
import { Wine, CalendarIcon } from 'lucide-react'

const generateTastingNotes = () => Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  wine: `와인 ${i + 1}`,
  date: subDays(new Date(), Math.floor(Math.random() * 30)),
  rating: Number((Math.random() * 2 + 3).toFixed(1)),
  sweetness: Math.floor(Math.random() * 5) + 1,
  acidity: Math.floor(Math.random() * 5) + 1,
  tannin: Math.floor(Math.random() * 5) + 1,
  body: Math.floor(Math.random() * 5) + 1,
  note: `이 와인은 ${Math.random() > 0.5 ? '풍부한 과일 향' : '복합적인 아로마'}와 ${Math.random() > 0.5 ? '부드러운 타닌' : '긴 여운'}이 특징입니다.`,
  image: '/placeholder.svg'
}));

export default function Home() {
  const [tastingNotes] = useState(generateTastingNotes());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const notesForSelectedDate = tastingNotes.filter(
    (note) => selectedDate && isSameDay(note.date, selectedDate)
  )

  return (
    <div className="space-y-6 bg-gradient-to-br from-amber-50 to-rose-50 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-primary text-center mb-8">
        <Wine className="inline-block mr-2 mb-1" />
        WineNow
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-4 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary flex items-center">
              <CalendarIcon className="mr-2" />
              내 시음 노트
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ko}
              className="rounded-md border border-rose-200"
              classNames={{
                day_selected: "bg-rose-500 text-primary-foreground hover:bg-rose-500",
                day_today: "bg-accent text-accent-foreground",
              }}
            />
          </CardContent>
        </Card>
        <Card className="p-4 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              {selectedDate ? format(selectedDate, 'yyyy년 MM월 dd일', { locale: ko }) : '날짜를 선택하세요'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {notesForSelectedDate.length > 0 ? (
              notesForSelectedDate.map((note) => (
                <ToggleableWineNote key={note.id} note={note} />
              ))
            ) : (
              <p className="text-gray-500">이 날짜에 기록된 시음 노트가 없습니다.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Button onClick={() => setIsDialogOpen(true)} className="w-full bg-rose-600 hover:bg-rose-700 text-white">
        <Wine className="mr-2" />
        시음 노트 추가
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white relative">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-rose-700">시음 노트 작성</DialogTitle>
          </DialogHeader>
          <TastingNoteForm onClose={() => setIsDialogOpen(false)} />
          <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>취소</Button>
            <Button onClick={() => console.log('저장')}>저장</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
