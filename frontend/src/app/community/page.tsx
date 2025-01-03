'use client'

import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { PostCard } from '@/components/PostCard'
import { PostDetails } from '@/components/PostDetails'
import { NewPostForm } from '@/components/NewPostForm'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Users, Search, PlusCircle, User } from 'lucide-react'

// 임시 데이터
const initialPosts = [
  {
    id: 1,
    author: '와인러버',
    title: '샤토 마고 2015 시음 후기',
    category: '시음 후기',
    likes: 15,
    comments: 3,
    views: 50,
    image: '/placeholder.svg',
    content: '샤토 마고 2015 빈티지를 시음해보았습니다. 붉은 과일의 향과 함께 오크의 풍미가 잘 어우러져 있었습니다. 탄닌은 부드럽고 여운이 길었습니다. 전체적으로 균형 잡힌 맛이 인상적이었습니다.',
    date: '2023-07-01'
  },
  {
    id: 2,
    author: '소믈리에김',
    title: '이탈리아 와인 추천',
    category: '추천',
    likes: 22,
    comments: 7,
    views: 80,
    content: '이탈리아 와인 중에서 특히 추천하고 싶은 와인들을 소개합니다. 키안티 클라시코, 바롤로, 브루넬로 디 몬탈치노 등 다양한 와인들이 있습니다. 각 와인의 특징과 어울리는 음식도 함께 설명드리겠습니다.',
    date: '2023-07-15'
  },
  {
    id: 3,
    author: '와인초보',
    title: '처음 마셔본 나파밸리 와인',
    category: '시음 후기',
    likes: 8,
    comments: 2,
    views: 30,
    image: '/placeholder.svg',
    content: '처음으로 나파밸리 와인을 마셔보았습니다. 카베르네 소비뇽 품종으로 만든 이 와인은 진한 과일 향과 함께 약간의 스파이시한 느낌이 있었습니다. 처음에는 조금 강하게 느껴졌지만, 시간이 지나면서 점점 부드러워지는 것을 경험했습니다.',
    date: '2023-08-01'
  },
  {
    id: 4,
    author: '와인이벤트',
    title: '2023 서울 와인 페스티벌',
    category: '행사 정보',
    likes: 30,
    comments: 5,
    views: 100,
    image: '/placeholder.svg',
    content: '오는 9월 15일부터 17일까지 서울 코엑스에서 2023 서울 와인 페스티벌이 개최됩니다. 전 세계의 다양한 와인을 시음할 수 있는 기회를 놓치지 마세요!',
    date: '2023-08-10'
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false)

  const filteredPosts = posts.filter(post =>
    (activeTab === 'all' || post.category === activeTab) &&
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleNewPost = (newPost: any) => {
    const post = {
      ...newPost,
      id: posts.length + 1,
      author: '현재 사용자', // 실제 앱에서는 로그인된 사용자 정보를 사용해야 합니다
      likes: 0,
      comments: 0,
      views: 0,
      date: new Date().toISOString().split('T')[0]
    }
    setPosts([post, ...posts])
    setIsNewPostDialogOpen(false)
  }

  return (
    <PageLayout title="와인 커뮤니티" icon={<Users className="w-8 h-8" />}>
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="게시물 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-rose-500 focus:ring focus:ring-rose-200 focus:ring-opacity-50"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Button onClick={() => setIsNewPostDialogOpen(true)} className="bg-rose-600 hover:bg-rose-700 text-white rounded-full">
          <PlusCircle className="w-5 h-5 mr-2" />
          새 글 작성
        </Button>
        <Button variant="outline" className="rounded-full">
          <User className="w-5 h-5 mr-2" />
          내 게시물
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start mb-6 bg-white rounded-lg p-1 shadow-sm">
          <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700">전체</TabsTrigger>
          <TabsTrigger value="시음 후기" className="rounded-md data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700">시음 후기</TabsTrigger>
          <TabsTrigger value="추천" className="rounded-md data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700">추천</TabsTrigger>
          <TabsTrigger value="행사 정보" className="rounded-md data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700">행사 정보</TabsTrigger>
        </TabsList>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              {...post}
              onViewDetails={() => setSelectedPost(post.id)}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}
      </Tabs>

      <Dialog open={selectedPost !== null} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedPost !== null && (
            <PostDetails
              {...posts.find(post => post.id === selectedPost)!}
              onClose={() => setSelectedPost(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>새 글 작성</DialogTitle>
          </DialogHeader>
          <NewPostForm
            onSubmit={handleNewPost}
            onCancel={() => setIsNewPostDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </PageLayout>
  )
}

