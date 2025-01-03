'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createNote } from '@/app/api/api'; // API 함수 가져오기

export default function CreateNote() {
  const [isPublic, setIsPublic] = useState(false)
  const [formData, setFormData] = useState({
    wineName: '',
    winery: '',
    vintage: '',
    tastingDate: '',
    tastingPlace: '',
    appearance: '',
    aroma: '',
    taste: '',
    overall: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const noteData = { ...formData, isPublic };
      const response = await createNote(noteData);
      console.log('Note created successfully:', response);
      alert('노트가 성공적으로 저장되었습니다!');
      // 성공 시 필요한 후속 작업 (예: 폼 초기화 또는 페이지 이동)
      setFormData({
        wineName: '',
        winery: '',
        vintage: '',
        tastingDate: '',
        tastingPlace: '',
        appearance: '',
        aroma: '',
        taste: '',
        overall: '',
      });
      setIsPublic(false);
    } catch (error) {
      console.error('Failed to create note:', error);
      alert('노트 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">시음 노트 작성</h1>

          <div>
              <Label htmlFor="wine-name">와인 이름</Label>
              <Input
                  id="wine-name"
                  required
                  value={formData.wineName}
                  onChange={(e) => setFormData({...formData, wineName: e.target.value})}
              />
          </div>

          <div>
              <Label htmlFor="winery">와이너리</Label>
              <Input
                  id="winery"
                  value={formData.winery}
                  onChange={(e) => setFormData({...formData, winery: e.target.value})}
              />
          </div>

          <div>
              <Label htmlFor="vintage">빈티지</Label>
              <Select
                  onValueChange={(value) => setFormData({...formData, vintage: value})}
              >
                  <SelectTrigger id="vintage">
                      <SelectValue placeholder="빈티지 선택"/>
                  </SelectTrigger>
                  <SelectContent>
                      {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>

          <div>
              <Label htmlFor="tasting-date">테이스팅 날짜</Label>
              <Input
                  id="tasting-date"
                  type="date"
                  required
                  value={formData.tastingDate}
                  onChange={(e) => setFormData({...formData, tastingDate: e.target.value})}
              />
          </div>

          <div>
              <Label htmlFor="tasting-place">테이스팅 장소</Label>
              <Input
                  id="tasting-place"
                  required
                  value={formData.tastingPlace}
                  onChange={(e) => setFormData({...formData, tastingPlace: e.target.value})}
              />
          </div>

          <div>
              <Label htmlFor="appearance">외관 평가</Label>
              <Textarea
                  id="appearance"
                  placeholder="색상, 투명도, 점도 등"
                  value={formData.appearance}
                  onChange={(e) => setFormData({...formData, appearance: e.target.value})}
              />
          </div>

          <div>
              <Label htmlFor="aroma">아로마</Label>
              <Textarea
                  id="aroma"
                  placeholder="1차, 2차, 3차 아로마"
                  value={formData.aroma}
                  onChange={(e) => setFormData({...formData, aroma: e.target.value})}
              />
          </div>

          <div>
              <Label htmlFor="taste">맛 평가</Label>
              <Textarea
                  id="taste"
                  placeholder="당도, 산도, 탄닌 등"
                  value={formData.taste}
                  onChange={(e) => setFormData({...formData, taste: e.target.value})}
              />
          </div>

          <div>
              <Label htmlFor="overall">종합 평가</Label>
              <Textarea
                  id="overall"
                  placeholder="밸런스, 여운, 품질 등"
                  value={formData.overall}
                  onChange={(e) => setFormData({...formData, overall: e.target.value})}
              />
          </div>

          <div className="flex items-center space-x-2">
              <Switch
                  id="public"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
              />
              <Label htmlFor="public">공개</Label>
          </div>

          <Button type="submit" className="w-full">저장</Button>
      </form>
  )
}
