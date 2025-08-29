import { generateSeasonalGallery } from '@/ai/flows/generate-seasonal-gallery';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { RESTAURANT_INFO } from '@/lib/constants';

function getSeason(date: Date): string {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Autumn';
  return 'Winter';
}

const seasonHints: { [key: string]: string } = {
  Spring: 'fresh ingredients spring blossom',
  Summer: 'outdoor dining patio',
  Autumn: 'harvest festival pumpkins',
  Winter: 'cozy fireplace warm',
};

export default async function GalleryPage() {
  const season = getSeason(new Date());
  let imageCount = 9; // Default number of images

  try {
    const result = await generateSeasonalGallery({
      season: season,
      restaurantName: RESTAURANT_INFO.name,
      cuisine: RESTAURANT_INFO.cuisine,
      decorStyle: RESTAURANT_INFO.decorStyle,
    });
    if (result.imageUrls && result.imageUrls.length > 0) {
      imageCount = result.imageUrls.length;
    }
  } catch (error) {
    console.error('Failed to generate seasonal gallery:', error);
    // Keep default imageCount on failure
  }
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">A Glimpse of {season}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Experience the beauty of the season reflected in our ambiance and on your plate.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: imageCount }).map((_, index) => (
          <Card key={index} className="overflow-hidden group rounded-lg shadow-md hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-0 aspect-w-4 aspect-h-3">
              <Image
                src={`https://picsum.photos/600/450?random=${index}&season=${season.toLowerCase()}`}
                alt={`A taste of ${season} at Terra Table - Image ${index + 1}`}
                width={600}
                height={450}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                data-ai-hint={seasonHints[season] || 'restaurant food'}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
