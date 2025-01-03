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
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Wine, Calendar, MapPin, Eye, Droplet, Wind, Utensils, Camera, Plus } from 'lucide-react'
import {createNote} from "@/app/api/api";

export default function TastingNoteForm({ onClose }: { onClose: () => void }) {
  const [isPublic, setIsPublic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState<string | null>(null)
  const [showTextArea, setShowTextArea] = useState(false);
  const [formData, setFormData] = useState({
    wine_name: '',
    wine_type: '',
    wine_varietal: '',
    country: "other",
    winery: '',
    vintage: '', // 선택된 연도
    tasting_date: '',
    tasting_place: '',
    appearance_clarity: '맑음', // 기본값: 맑음
    appearance_intensity: 3, // 기본값: 3
    aroma_intensity: 3, // 기본값: 3
    aroma_notes: '',
    sweetness: 3, // 기본값: 3
    acidity: 3, // 기본값: 3
    tannin: 3, // 기본값: 3
    body: 3, // 기본값: 3
    overall: '',
    is_public: false,
    image:'',
    create_at:'',
    update_at:'',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
};


  const handleSliderChange = (key: keyof typeof formData, value: number[]) => {
  setFormData((prev) => ({ ...prev, [key]: value[0] }));
};


  const handleSwitchChange = (value: boolean) => {
    setFormData({ ...formData, isPublic: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsSaving(true);

  try {
    const response = await createNote(formData); // API 호출
    console.log('Note saved:', response);

    alert('노트가 성공적으로 저장되었습니다!');
    setFormData({
      wine_name: '',
      wine_type: '',
      wine_varietal: '',
      country: 'other',
      winery: '',
      vintage: '',
      tasting_date: '',
      tasting_place: '',
      appearance_clarity: '맑음',
      appearance_intensity: 3,
      aroma_intensity: 3,
      aroma_notes: '',
      sweetness: 3,
      acidity: 3,
      tannin: 3,
      body: 3,
      overall: '',
      is_public: false,
      image: '',
      create_at: '',
      update_at: '',
    });
    setImage(null); // 이미지 초기화
    onClose(); // 폼 닫기
  } catch (error) {
    console.error('Failed to create note:', error);
    alert('노트 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
  } finally {
    setIsSaving(false);
  }
};


  const wineCountries = [
    'France',
    'Italy',
    'USA',
    'Spain',
    'Argentina',
    'Australia',
    'Chile',
    'South Africa',
    'Germany',
    'Portugal',
    'New Zealand',
    'Austria',
    'Hungary',
    'Greece',
    'Canada',
    'Japan',
    'South Korea',
    'Brazil',
    'China',
    'Switzerland',
    'Other',
  ];


  // image
  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      const videoElement = document.createElement('video')
      videoElement.srcObject = stream
      videoElement.play()

      const canvas = document.createElement('canvas')
      canvas.width = 640
      canvas.height = 480
      const ctx = canvas.getContext('2d')

      setTimeout(() => {
        ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
        setImage(canvas.toDataURL('image/png'))
        stream.getTracks().forEach((track) => track.stop())
      }, 3000) // 3초 후 캡처
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }
};


    return (
      <form onSubmit={handleSubmit} className="space-y-8 p-4">
        <Card className="bg-secondary/50">
          <CardContent>
          <Label htmlFor="wine-name" className="flex items-center space-x-2 mb-2">
            <Wine className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold">와인 이름</span>
          </Label>
          <Input
            id="wine_name"
            value={formData.wine_name} // formData의 key는 snake_case인 것으로 보입니다.
            onChange={handleInputChange} // handleInputChange 함수 사용
            required
            className="bg-white"
          />
        </CardContent>
        </Card>

        <Card>
        <CardContent>
          <Label htmlFor="wine_type" className="flex items-center space-x-2 mb-2">
            <Wine className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold">와인 종류</span>
          </Label>
          <Select
            onValueChange={(value) => setFormData({ ...formData, wine_type: value })}
            value={formData.wine_type}
          >
            <SelectTrigger>
            <SelectValue placeholder="와인 종류 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="red">레드</SelectItem>
              <SelectItem value="white">화이트</SelectItem>
              <SelectItem value="sparkling">샴페인</SelectItem>
              <SelectItem value="rose">로제</SelectItem>
              <SelectItem value="fortified">주정강화</SelectItem>
              <SelectItem value="other">기타</SelectItem>
            </SelectContent>
          </Select>
          </CardContent>
          </Card>

        <Card>
        <CardContent>
          <Label htmlFor="wine_varietal" className="flex items-center space-x-2 mb-2">
            <Droplet className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold">와인 품종</span>
          </Label>
          <Input
            id="wine_varietal"
            placeholder="예: 카베르네 소비뇽, 샤르도네"
            value={formData.wine_varietal}
            onChange={(e) => setFormData({ ...formData, wine_varietal: e.target.value })}
          />
        </CardContent>
      </Card>

        <Card>
        <CardContent>
          <Label htmlFor="country" className="flex items-center space-x-2 mb-2">
            국가
          </Label>
          <Select
            onValueChange={(value) => setFormData({ ...formData, country: value })}
            value={formData.country}
          >
            <SelectTrigger>
              <SelectValue placeholder="국가 선택" />
            </SelectTrigger>
            <SelectContent>
              {wineCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

        <Card className="bg-secondary/50">
        <CardContent>
          <Label htmlFor="winery" className="flex items-center space-x-2 mb-2">
            <Wine className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold">와이너리</span>
          </Label>
          <Input
            id="winery"
            value={formData.winery}
            onChange={(e) => setFormData({ ...formData, winery: e.target.value })}
            className="bg-white"
          />
        </CardContent>
      </Card>

        <Card className="bg-secondary/50">
        <CardContent>
          <Label htmlFor="vintage" className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold">빈티지</span>
          </Label>
          <Select
            onValueChange={(value) => setFormData({ ...formData, vintage: value })}
            className="bg-white"
          >
            <SelectTrigger>
              <SelectValue placeholder="빈티지 선택" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

        <Card className="bg-secondary/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-primary"/>
              <Label htmlFor="tasting-date" className="text-lg font-semibold">테이스팅 날짜</Label>
            </div>
            <Input id="tasting-date" type="date" required className="bg-white"/>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-5 h-5 text-primary"/>
              <Label htmlFor="tasting-place" className="text-lg font-semibold">테이스팅 장소</Label>
            </div>
            <Input id="tasting-place" required className="bg-white"/>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-5 h-5 text-primary"/>
              <Label className="text-lg font-semibold">외관 평가</Label>
            </div>
            <div className="space-y-2">
              <div>
                <Label htmlFor="clarity" className="text-sm">투명도</Label>
                <Select>
                  <SelectTrigger id="clarity" className="bg-white">
                    <SelectValue placeholder="투명도 선택"/>
                  </SelectTrigger>
                  <SelectContent>
                    {['맑음', '약간 탁함', '탁함', '불투명'].map(clarity => (
                        <SelectItem key={clarity} value={clarity}>{clarity}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="intensity" className="text-sm">색의 강도</Label>
                <Slider
                id="appearance_intensity"
                min={1}
                max={5}
                step={1}
                defaultValue={[formData.appearance_intensity]}
                onValueChange={(value) => handleSliderChange('appearance_intensity', value)}
                className="my-2"
              />

                {/*<Slider id="intensity" min={1} max={5} step={1} className="my-2" defaultValue={[3]}/>*/}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Wind className="w-5 h-5 text-primary"/>
              <Label className="text-lg font-semibold">아로마</Label>
            </div>
            <div className="space-y-2">
              <div>
                <Label htmlFor="aroma-intensity" className="text-sm">향의 강도</Label>
                <Slider id="aroma-intensity" min={1} max={5} step={1} className="my-2" defaultValue={[3]}/>
              </div>
              <Textarea id="aroma-notes" placeholder="아로마 노트 (예: 과일향, 꽃향, 오크향 등)" className="bg-white"/>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Utensils className="w-5 h-5 text-primary"/>
              <Label className="text-lg font-semibold">맛 평가</Label>
            </div>
            <div className="space-y-2">
              <div>
                <Label htmlFor="sweetness" className="text-sm">당도</Label>
                <Slider id="sweetness" min={1} max={5} step={1} className="my-2" defaultValue={[3]}/>
              </div>
              <div>
                <Label htmlFor="acidity" className="text-sm">산도</Label>
                <Slider id="acidity" min={1} max={5} step={1} className="my-2" defaultValue={[3]}/>
              </div>
              <div>
                <Label htmlFor="tannin" className="text-sm">탄닌</Label>
                <Slider id="tannin" min={1} max={5} step={1} className="my-2" defaultValue={[3]}/>
              </div>
              <div>
                <Label htmlFor="body" className="text-sm">바디</Label>
                <Slider id="body" min={1} max={5} step={1} className="my-2" defaultValue={[3]}/>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Droplet className="w-5 h-5 text-primary"/>
              <Label htmlFor="overall" className="text-lg font-semibold">종합 평가</Label>
            </div>
            <Textarea id="overall" placeholder="밸런스, 여운, 품질 등" className="bg-white"/>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
        <CardContent>
          <Label htmlFor="image-upload" className="flex items-center space-x-2 mb-2">
            <Camera className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold">사진 업로드</span>
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="bg-white"
          />
          {image && (
            <img src={image} alt="Uploaded" className="mt-4 max-w-full rounded-lg" />
          )}
        </CardContent>
      </Card>

        <div className="flex items-center space-x-2">
          <Switch
              id="isPublic"
              checked={formData.isPublic}
              onCheckedChange={(value) => handleSwitchChange(value)}
          />
          <Label htmlFor="isPublic">공개</Label>
        </div>

        <div className="space-y-4">
          <Button
              type="button"
              variant="outline"
              onClick={() => setShowTextArea(!showTextArea)}
              className="flex items-center">
            <Plus className="w-4 h-4 mr-2"/>
            새 노트 추가
          </Button>
          {showTextArea && (
        <Textarea
          placeholder="노트를 입력하세요"
          className="bg-white"
          value={formData.overall}
          onChange={(e) => setFormData({ ...formData, overall: e.target.value })}
        />
      )}
        </div>

        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>취소</Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? '저장 중...' : '저장'}
          </Button>

        </div>
      </form>
  )


