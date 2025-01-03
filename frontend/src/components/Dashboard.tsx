'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreHorizontal, Edit, Archive, Trash, Star, Wine } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TagCategories } from './TagCategories'
import { DataAnalysis } from './DataAnalysis'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

// 임시 데이터 (즐겨찾기 필드 추가)
const initialTastingNotes = [
  { id: 1, date: new Date(2023, 5, 1), wine: '샤토 마고', color: '레드', intensities: ['풀바디'], place: '홈', isPublic: true, tags: ['탄닌', '과일향', '카베르네 소비뇽'], isFavorite: true },
  { id: 2, date: new Date(2023, 5, 15), wine: '오퍼스 원', color: '레드', intensities: ['풀바디'], place: '와인바', isPublic: false, tags: ['오크', '바닐라', '카베르네 소비뇽'], isFavorite: true },
  { id: 3, date: new Date(2023, 6, 1), wine: '베린저', color: '화이트', intensities: ['라이트바디'], place: '친구집', isPublic: true, tags: ['시트러스', '미네랄', '샤르도네'], isFavorite: false },
  { id: 4, date: new Date(2023, 6, 15), wine: '돔 페리뇽', color: '화이트', intensities: ['미디엄바디'], place: '레스토랑', isPublic: true, tags: ['과일향', '신선함', '샴페인'], isFavorite: true },
]

export default function Dashboard() {
  const [tastingNotes, setTastingNotes] = useState(initialTastingNotes)
  const [selectedWine, setSelectedWine] = useState<string | null>(null)

  // 총 시음 노트 수
  const totalNotes = tastingNotes.length

  // 즐겨찾기한 와인 목록 (즐겨찾기 순으로 정렬)
  const favoriteWines = tastingNotes
    .filter(note => note.isFavorite)
    .sort((a, b) => a.wine.localeCompare(b.wine))

  // 가장 많이 마신 품종 계산
  const varietalCounts = tastingNotes.reduce((acc, note) => {
    const varietal = note.tags.find(tag => ['카베르네 소비뇽', '샤르도네', '샴페인'].includes(tag))
    if (varietal) {
      acc[varietal] = (acc[varietal] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  const mostCommonVarietal = Object.entries(varietalCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]

  const handleEdit = (id: number) => {
    // 편집 로직 구현
    console.log(`Editing note ${id}`)
  }

  const handleArchive = (id: number) => {
    // 보관 로직 구현
    console.log(`Archiving note ${id}`)
  }

  const handleDelete = (id: number) => {
    setTastingNotes(tastingNotes.filter(note => note.id !== id))
  }

  const toggleFavorite = (id: number) => {
    setTastingNotes(tastingNotes.map(note => 
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    ))
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-amber-50 to-rose-50 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-primary text-center mb-8">
        <Wine className="inline-block mr-2 mb-1" />
        와인 테이스팅 대시보드
      </h1>

      <DataAnalysis 
        totalNotes={totalNotes}
        favoriteWine={favoriteWines[0]?.wine || '없음'}
        lastTastingDate={new Date(Math.max(...tastingNotes.map(note => note.date.getTime())))}
        mostCommonVarietal={mostCommonVarietal}
      />

      <Tabs defaultValue="favorite" className="mt-6">
        <TabsList className="bg-white/70 p-1 rounded-lg">
          <TabsTrigger value="favorite" className="data-[state=active]:bg-rose-200 data-[state=active]:text-rose-700">즐겨찾기 와인</TabsTrigger>
          <TabsTrigger value="tags" className="data-[state=active]:bg-rose-200 data-[state=active]:text-rose-700">태그별 분류</TabsTrigger>
        </TabsList>
        <TabsContent value="favorite" className="mt-6">
          <Card className="bg-white/90 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 flex items-center">
                <Star className="w-5 h-5 mr-2 text-amber-500" />
                즐겨찾기 와인
              </CardTitle>
            </CardHeader>
            <CardContent>
              {favoriteWines.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {favoriteWines.map((wine) => (
                    <Card key={wine.id} className="bg-rose-50">
                      <CardHeader>
                        <CardTitle>{wine.wine}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>날짜: {format(wine.date, 'yyyy년 MM월 dd일', { locale: ko })}</p>
                        <p>장소: {wine.place}</p>
                        <p>농도: {wine.intensities.join(', ')}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {wine.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-rose-200 text-rose-700">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">즐겨찾기한 와인이 없습니다.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tags" className="mt-6">
          <TagCategories tastingNotes={tastingNotes} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

