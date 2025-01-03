'use client'

import React from 'react'
import { Droplet, Wind, Utensils } from 'lucide-react'

interface WineNoteInfoGraphicProps {
  wine: string
  rating: number
  sweetness: number
  acidity: number
  tannin: number
  body: number
}

export function WineNoteInfoGraphic({
  wine,
  rating,
  sweetness,
  acidity,
  tannin,
  body,
}: WineNoteInfoGraphicProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-rose-700">평점</span>
        <span className="text-sm font-bold">{rating}/5</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          style={{ width: `${(rating / 5) * 100}%` }}
          className="h-full bg-rose-600 rounded-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
        <div className="flex items-center">
          <Droplet className="mr-2 text-blue-400" />
          당도: {sweetness}/5
        </div>
        <div className="flex items-center">
          <Wind className="mr-2 text-green-400" />
          산도: {acidity}/5
        </div>
        <div className="flex items-center">
          <Utensils className="mr-2 text-purple-400" />
          탄닌: {tannin}/5
        </div>
        <div className="flex items-center">
          <Utensils className="mr-2 text-red-400" />
          바디: {body}/5
        </div>
      </div>
    </div>
  )
}
