import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';

const galleryImages = [
  { src: "https://picsum.photos/600/450?grayscale", alt: "A beautiful plate of Forest Mushroom Risotto", hint: "risotto dish" },
  { src: "https://picsum.photos/600/450", alt: "Deliciously seared scallops appetizer", hint: "seafood appetizer" },
  { src: "https://picsum.photos/600/450?grayscale", alt: "A cozy dining area in the restaurant", hint: "restaurant interior" },
  { src: "https://picsum.photos/600/450", alt: "An artisanal cocktail on the bar", hint: "cocktail drink" },
  { src: "https://picsum.photos/600/450?grayscale", alt: "A dish featuring fresh heirloom tomatoes", hint: "fresh salad" },
  { src: "https://picsum.photos/600/450", alt: "The exterior of Lume at dusk", hint: "restaurant exterior" },
  { src: "https://picsum.photos/600/450?grayscale", alt: "A chef working in the kitchen", hint: "chef kitchen" },
  { src: "https://picsum.photos/600/450", alt: "An assortment of delicious desserts", hint: "dessert platter" },
  { src: "https://picsum.photos/600/450?grayscale", alt: "A rustic table setting for dinner", hint: "table setting" },
]

export default function GalleryPage() {
  
  return (
    <Container className="py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">A Glimpse of Lume</h1>
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
    </Container>
  );
}
