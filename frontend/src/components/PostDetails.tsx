import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare, ThumbsUp, Eye, Calendar } from 'lucide-react'
import Image from 'next/image'

interface PostDetailsProps {
  id: number
  author: string
  title: string
  category: string
  likes: number
  comments: number
  views: number
  image?: string
  content: string
  date: string
  onClose: () => void
}

export function PostDetails({ 
  author, title, category, likes, comments, views, image, content, date, onClose 
}: PostDetailsProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${author}`} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{author}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
            {category}
          </span>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {date}
            </span>
            <span className="flex items-center">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {likes}
            </span>
            <span className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              {comments}
            </span>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {views}
            </span>
          </div>
        </div>
      </CardHeader>
      {image && (
        <div className="relative h-64 md:h-96">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
      )}
      <CardContent className="p-6">
        <p className="text-foreground whitespace-pre-wrap">{content}</p>
      </CardContent>
      <CardFooter className="p-6">
        <Button variant="outline" className="w-full" onClick={onClose}>
          닫기
        </Button>
      </CardFooter>
    </Card>
  )
}

