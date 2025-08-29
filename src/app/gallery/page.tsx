import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const galleryImages = [
  { src: "https://placehold.co/600x450/60554a/FFF.webp?text=Mushroom+Risotto", alt: "A beautiful plate of Forest Mushroom Risotto", hint: "risotto dish" },
  { src: "https://placehold.co/600x450/8d7f70/FFF.webp?text=Seared+Scallops", alt: "Deliciously seared scallops appetizer", hint: "seafood appetizer" },
  { src: "https://placehold.co/600x450/a1887f/FFF.webp?text=Cozy+Dining+Area", alt: "A cozy dining area in the restaurant", hint: "restaurant interior" },
  { src: "https://placehold.co/600x450/795548/FFF.webp?text=Artisanal+Cocktail", alt: "An artisanal cocktail on the bar", hint: "cocktail drink" },
  { src: "https://placehold.co/600x450/c2b2a8/FFF.webp?text=Heirloom+Tomato+Dish", alt: "A dish featuring fresh heirloom tomatoes", hint: "fresh salad" },
  { src: "https://placehold.co/600x450/6d4c41/FFF.webp?text=Restaurant+Exterior", alt: "The exterior of Terra Table at dusk", hint: "restaurant exterior" },
  { src: "https://placehold.co/600x450/9e9d9d/FFF.webp?text=Chef+in+Kitchen", alt: "A chef working in the kitchen", hint: "chef kitchen" },
  { src: "https://placehold.co/600x450/bcaaa4/FFF.webp?text=Dessert+Platter", alt: "An assortment of delicious desserts", hint: "dessert platter" },
  { src: "https://placehold.co/600x450/5d4037/FFF.webp?text=Rustic+Table+Setting", alt: "A rustic table setting for dinner", hint: "table setting" },
]

export default function GalleryPage() {
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">A Glimpse of Terra Table</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Experience the beauty of our ambiance and the artistry on your plate.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <Card key={index} className="overflow-hidden group rounded-lg shadow-md hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-0 aspect-w-4 aspect-h-3">
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={450}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                data-ai-hint={image.hint}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
