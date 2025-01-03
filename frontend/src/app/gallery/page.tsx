'use client'

import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { PhotoFrame } from '@/components/PhotoFrame'
import { TastingNoteSelector } from '@/components/TastingNoteSelector'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Plus } from 'lucide-react'

// 임시 데이터 (실제로는 API에서 가져와야 함)
const initialImages = [
  { id: 1, src: '/placeholder.svg', alt: '와인 1', wine: '샤토 마고', date: '2023-07-01' },
  { id: 2, src: '/placeholder.svg', alt: '와인 2', wine: '오퍼스 원', date: '2023-07-15' },
  { id: 3, src: '/placeholder.svg', alt: '와인 3', wine: '베린저', date: '2023-08-01' },
  { id: 4, src: '/placeholder.svg', alt: '와인 4', wine: '돔 페리뇽', date: '2023-08-15' },
]

const tastingNotes = [
  { id: 1, wine: '샤토 마고', date: '2023-07-01', hasImage: true },
  { id: 2, wine: '오퍼스 원', date: '2023-07-15', hasImage: true },
  { id: 3, wine: '베린저', date: '2023-08-01', hasImage: true },
  { id: 4, wine: '돔 페리뇽', date: '2023-08-15', hasImage: true },
]

export default function GalleryPage() {
  const [images, setImages] = useState(initialImages)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddImages = (selectedIds: number[]) => {
    // 실제로는 여기서 선택된 시음 노트의 이미지를 가져와야 합니다.
    // 이 예제에서는 간단히 더미 데이터를 추가합니다.
    const newImages = selectedIds.map(id => {
      const note = tastingNotes.find(note => note.id === id)
      return {
        id: images.length + id,
        src: '/placeholder.svg',
        alt: `새 와인 ${id}`,
        wine: note?.wine || '',
        date: note?.date || '',
      }
    })
    setImages([...images, ...newImages])
    setIsDialogOpen(false)
  }

  return (
    <PageLayout title="와인 갤러리" icon={<ImageIcon className="w-8 h-8" />}>
      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="gallery">갤러리</TabsTrigger>
          <TabsTrigger value="albums">앨범</TabsTrigger>
        </TabsList>
        <TabsContent value="gallery">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <PhotoFrame
                key={image.id}
                src={image.src}
                alt={image.alt}
                date={image.date}
                wine={image.wine}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="albums">
          <div className="space-y-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  사진 추가
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>시음 노트에서 사진 추가</DialogTitle>
                </DialogHeader>
                <TastingNoteSelector notes={tastingNotes} onSelect={handleAddImages} />
              </DialogContent>
            </Dialog>
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">아직 생성된 앨범이 없습니다.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}

