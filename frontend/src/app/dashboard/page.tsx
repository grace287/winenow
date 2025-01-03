'use client'

import { useState } from 'react'
import { Wine, Star, Grape, Calendar, TrendingUp, Users } from 'lucide-react'
import { PageLayout } from '@/components/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// 임시 데이터
const wineData = [
  { name: "카베르네 소비뇽", percentage: 30 },
  { name: "메를로", percentage: 25 },
  { name: "샤르도네", percentage: 20 },
  { name: "피노 누아", percentage: 15 },
  { name: "소비뇽 블랑", percentage: 10 },
]

const recentTastings = [
  { id: 1, wine: "샤토 마고 2015", date: "2023-07-01", rating: 4.5 },
  { id: 2, wine: "오퍼스 원 2016", date: "2023-07-15", rating: 4.8 },
  { id: 3, wine: "돔 페리뇽 2008", date: "2023-08-01", rating: 4.7 },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('month')

  return (
    <PageLayout title="와인 테이스팅 대시보드" icon={<Wine className="w-8 h-8" />}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 시음 횟수</CardTitle>
            <Wine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 평점</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">+0.3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">가장 많이 마신 품종</CardTitle>
            <Grape className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">카베르네 소비뇽</div>
            <p className="text-xs text-muted-foreground">30% of all tastings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이번 달 시음 목표</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 / 20</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>와인 품종 분포</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wineData.map((wine) => (
                <div key={wine.name} className="flex items-center">
                  <div className="w-[100px] flex-shrink-0">{wine.name}</div>
                  <div className="w-full">
                    <Progress value={wine.percentage} className="h-2" />
                  </div>
                  <div className="w-[50px] text-right">{wine.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>최근 시음 기록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTastings.map((tasting) => (
                <div key={tasting.id} className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <div className="flex-grow">
                    <div className="font-medium">{tasting.wine}</div>
                    <div className="text-sm text-muted-foreground">{tasting.date}</div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{tasting.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>친구 활동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-muted-foreground mr-2" />
                <div className="flex-grow">
                  <div className="font-medium">김와인</div>
                  <div className="text-sm text-muted-foreground">샤토 마고 2015 시음</div>
                </div>
                <div className="text-sm text-muted-foreground">2시간 전</div>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-muted-foreground mr-2" />
                <div className="flex-grow">
                  <div className="font-medium">이소믈</div>
                  <div className="text-sm text-muted-foreground">오퍼스 원 2016 리뷰 작성</div>
                </div>
                <div className="text-sm text-muted-foreground">어제</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>시음 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>총 시음 횟수</span>
                <span className="font-bold">32</span>
              </div>
              <div className="flex justify-between">
                <span>평균 평점</span>
                <span className="font-bold">4.2</span>
              </div>
              <div className="flex justify-between">
                <span>가장 높은 평점</span>
                <span className="font-bold">4.8</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>추천 와인</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium">샤토 마고 2015</div>
                <div className="text-sm text-muted-foreground">당신의 취향과 98% 일치</div>
              </div>
              <div>
                <div className="font-medium">오퍼스 원 2016</div>
                <div className="text-sm text-muted-foreground">당신의 취향과 95% 일치</div>
              </div>
              <Button className="w-full mt-4">더 많은 추천 보기</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}

