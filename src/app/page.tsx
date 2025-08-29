import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MENU_HIGHLIGHTS } from '@/lib/constants';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src="https://picsum.photos/1800/800"
          alt="A beautiful dining setup at Terra Table"
          fill
          className="object-cover"
          priority
          data-ai-hint="cozy restaurant interior"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
          <h1 className="text-5xl md:text-7xl font-bold font-headline drop-shadow-md">
            Welcome to Terra Table
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Where every dish tells a story of the earth.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/reservations">Book a Table</Link>
          </Button>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-headline text-primary">
                Rooted in Nature, Crafted with Passion
              </h2>
              <p className="text-lg text-muted-foreground">
                At Terra Table, we believe in the beauty of simplicity and the richness of the earth. Our philosophy is built on a commitment to seasonal, locally-sourced ingredients, ensuring that every meal is a true reflection of the region's bounty.
              </p>
              <p className="text-muted-foreground">
                We partner with local farmers, fishers, and artisans who share our dedication to quality and sustainability. This not only allows us to serve the freshest food possible but also strengthens our community and honors the environment.
              </p>
              <Button asChild variant="link" className="text-accent text-lg p-0">
                <Link href="/about">
                  Discover Our Story <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div>
              <Image
                src="https://picsum.photos/600/500"
                alt="Freshly harvested vegetables"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
                data-ai-hint="fresh vegetables"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <UtensilsCrossed className="mx-auto h-12 w-12 text-accent" />
          <h2 className="mt-4 text-3xl md:text-4xl font-headline text-primary">
            A Taste of the Season
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
            Our menu is a living canvas, changing with the seasons to bring you the freshest and most vibrant flavors. Here's a glimpse of what our chefs are crafting now.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {MENU_HIGHLIGHTS.map((item) => (
              <Card key={item.name} className="flex flex-col transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300">
                <CardHeader>
                  <CardTitle className="font-headline">{item.name}</CardTitle>
                  <CardDescription className="text-accent font-semibold">{item.price}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <span className="text-sm font-medium text-muted-foreground">{item.category}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Button asChild size="lg" variant="outline" className="mt-12">
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
