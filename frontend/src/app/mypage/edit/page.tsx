'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail } from 'lucide-react'

export default function EditProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: "와인 애호가",
    email: "wine@lover.com"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 프로필 업데이트 로직을 추가합니다.
    console.log('Updated user:', user)
    // 프로필 업데이트 후 마이페이지로 돌아갑니다.
    router.push('/mypage')
  }

  return (
    <PageLayout title="프로필 수정" icon={<User className="w-8 h-8" />}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">프로필 정보 수정</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-500" />
                이름
              </Label>
              <Input
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-gray-500" />
                이메일
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex space-x-4">
              <Button type="submit" className="flex-1 bg-rose-600 hover:bg-rose-700 text-white">
                저장
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={() => router.push('/mypage')}>
                취소
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

