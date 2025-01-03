'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, ThumbsUp, Eye } from 'lucide-react'
import Image from 'next/image'

interface PostCardProps {
  id: number
  author: string
  title: string
  category: string
  likes: number
  comments: number
  views: number
  image?: string
  onViewDetails: (id: number) => void
}

export function PostCard({ id, author, title, category, likes, comments, views, image, onViewDetails }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [commentText, setCommentText] = useState('')

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 댓글 제출 로직을 추가합니다.
    console.log('Comment submitted:', commentText)
    setCommentText('')
    setShowCommentForm(false)
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${author}`} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{author}</p>
          </div>
        </div>
      </CardHeader>
      {image && (
        <div className="relative h-48">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
            {category}
          </span>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleLike} className={isLiked ? 'text-rose-500' : ''}>
              <ThumbsUp className="w-4 h-4 mr-1" />
              {likesCount}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowCommentForm(!showCommentForm)}>
              <MessageSquare className="w-4 h-4 mr-1" />
              {comments}
            </Button>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {views}
            </span>
          </div>
        </div>
      </CardContent>
      {showCommentForm && (
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleCommentSubmit} className="w-full">
            <Textarea
              placeholder="댓글을 입력하세요..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-2"
            />
            <Button type="submit" className="w-full">댓글 작성</Button>
          </form>
        </CardFooter>
      )}
      <CardFooter className="p-4">
        <Button variant="outline" className="w-full" onClick={() => onViewDetails(id)}>
          자세히 보기
        </Button>
      </CardFooter>
    </Card>
  )
}

