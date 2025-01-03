import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wine, Star, Calendar, Grape } from 'lucide-react'

interface DataAnalysisProps {
  totalNotes: number;
  favoriteWine: string;
  lastTastingDate: Date;
  mostCommonVarietal: string;
}

export function DataAnalysis({ totalNotes, favoriteWine, lastTastingDate, mostCommonVarietal }: DataAnalysisProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white/90 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">총 시음 노트</CardTitle>
          <Wine className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-600">{totalNotes}</div>
        </CardContent>
      </Card>
      <Card className="bg-white/90 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">가장 좋아하는 와인</CardTitle>
          <Star className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{favoriteWine}</div>
        </CardContent>
      </Card>
      <Card className="bg-white/90 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">최근 시음 날짜</CardTitle>
          <Calendar className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {lastTastingDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/90 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">가장 많이 마신 품종</CardTitle>
          <Grape className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{mostCommonVarietal}</div>
        </CardContent>
      </Card>
    </div>
  )
}

