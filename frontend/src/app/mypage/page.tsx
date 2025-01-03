'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { User, Wine, Calendar, Star, Mail, Download, Upload, Github, ChromeIcon as Google, ViewIcon as NaverIcon, CoffeeIcon as KakaoIcon } from 'lucide-react'

export default function MyPage() {
  const router = useRouter()
  // 임시 사용자 데이터
  const [user, setUser] = useState({
    name: "와인 애호가",
    email: "wine@lover.com",
    totalNotes: 15,
    googleConnected: false,
    naverConnected: false,
    kakaoConnected: false
  })

  const toggleConnection = (service: 'google' | 'naver' | 'kakao') => {
    setUser(prevUser => ({
      ...prevUser,
      [`${service}Connected`]: !prevUser[`${service}Connected` as keyof typeof prevUser]
    }))
  }

  return (
    <PageLayout title="내 정보" icon={<User className="w-8 h-8" />}>
      <div className="space-y-6">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">프로필</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-semibold">이름:</span>
              <span className="ml-2">{user.name}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-semibold">이메일:</span>
              <span className="ml-2">{user.email}</span>
            </div>
            <div className="flex items-center">
              <Wine className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-semibold">총 시음 노트:</span>
              <span className="ml-2">{user.totalNotes}</span>
            </div>
            {/* <div className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-semibold">가장 좋아하는 와인:</span>
              <span className="ml-2">{user.favoriteWine}</span>
            </div> */}
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">소셜 로그인 연동</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full bg-[#4285F4] hover:bg-[#357AE8] text-white"
              onClick={() => toggleConnection('google')}
            >
              <Google className="w-5 h-5 mr-2" />
              Google 계정 연동
            </Button>
            <Button
              className="w-full bg-[#03C75A] hover:bg-[#02B14E] text-white"
              onClick={() => toggleConnection('naver')}
            >
              <NaverIcon className="w-5 h-5 mr-2" />
              Naver 계정 연동
            </Button>
            <Button
              className="w-full bg-[#FEE500] hover:bg-[#FDD700] text-[#3A1D1D]"
              onClick={() => toggleConnection('kakao')}
            >
              <KakaoIcon className="w-5 h-5 mr-2" />
              Kakao 계정 연동
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">데이터 관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full flex items-center justify-center" variant="outline">
              <Upload className="w-5 h-5 mr-2" />
              데이터 백업하기
            </Button>
            <Button className="w-full flex items-center justify-center" variant="outline">
              <Download className="w-5 h-5 mr-2" />
              데이터 받아오기
            </Button>
          </CardContent>
        </Card>

        <Button
          className="w-full bg-rose-600 hover:bg-rose-700 text-white"
          onClick={() => router.push('/mypage/edit')}
        >
          프로필 수정
        </Button>
      </div>
    </PageLayout>
  )
}

