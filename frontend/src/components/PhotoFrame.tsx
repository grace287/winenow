import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Wine, Calendar } from 'lucide-react'

interface PhotoFrameProps {
  src: string
  alt: string
  date: string
  wine: string
}

export function PhotoFrame({ src, alt, date, wine }: PhotoFrameProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0 relative">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm">{date}</span>
            </div>
            <div className="flex items-center">
              <Wine className="w-4 h-4 mr-1" />
              <span className="text-sm">{wine}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

