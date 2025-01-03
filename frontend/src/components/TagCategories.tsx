import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wine, Grape, Droplet, Wind, Utensils, Star } from 'lucide-react'

interface TagCategoriesProps {
  tastingNotes: Array<{
    id: number;
    wine: string;
    tags: string[];
  }>;
}

const categoryIcons = {
  "와인 종류": <Wine className="w-4 h-4 mr-2" />,
  "포도 품종": <Grape className="w-4 h-4 mr-2" />,
  "맛": <Droplet className="w-4 h-4 mr-2" />,
  "향": <Wind className="w-4 h-4 mr-2" />,
  "바디": <Utensils className="w-4 h-4 mr-2" />,
  "기타": <Star className="w-4 h-4 mr-2" />,
};

const categorizeTag = (tag: string) => {
  const lowerTag = tag.toLowerCase();
  if (["레드", "화이트", "로제", "스파클링"].includes(lowerTag)) return "와인 종류";
  if (["카베르네", "메를로", "샤르도네", "소비뇽"].some(grape => lowerTag.includes(grape))) return "포도 품종";
  if (["달콤한", "신", "쓴", "짠"].some(taste => lowerTag.includes(taste))) return "맛";
  if (["과일", "꽃", "허브", "오크"].some(aroma => lowerTag.includes(aroma))) return "향";
  if (["라이트", "미디엄", "풀"].some(body => lowerTag.includes(body))) return "바디";
  return "기타";
};

export function TagCategories({ tastingNotes }: TagCategoriesProps) {
  const allTags = Array.from(new Set(tastingNotes.flatMap(note => note.tags)));
  const categorizedTags = allTags.reduce((acc, tag) => {
    const category = categorizeTag(tag);
    if (!acc[category]) acc[category] = [];
    acc[category].push(tag);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(categorizedTags).map(([category, tags]) => (
        <Card key={category} className="bg-white/90 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              {categoryIcons[category as keyof typeof categoryIcons]}
              {category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-rose-100 text-rose-700 hover:bg-rose-200">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

