import { summarizeAmbiance } from '@/ai/flows/summarize-ambiance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RESTAURANT_INFO } from '@/lib/constants';
import { Quote, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default async function AboutPage() {
  let ambianceSummary = 'A warm, rustic-chic environment where earthy tones and natural elements create a serene and inviting dining experience.';

  try {
    const result = await summarizeAmbiance({
      decorDescription: RESTAURANT_INFO.decorDescription,
    });
    ambianceSummary = result.ambianceSummary;
  } catch (error) {
    console.error('Failed to generate ambiance summary:', error);
    // Fallback summary is already set
  }

  return (
    <div className="bg-background">
      <section className="relative h-[40vh] min-h-[300px] w-full flex items-center justify-center">
        <Image
          src="https://picsum.photos/1800/600"
          alt="The welcoming interior of Terra Table"
          fill
          className="object-cover"
          data-ai-hint="restaurant interior"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-bold font-headline">Our Story</h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg -mt-32 md:-mt-48 z-20 relative">
              <CardHeader>
                <CardTitle className="text-3xl font-headline text-center text-primary">From Seed to Plate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-lg text-muted-foreground">
                <p className="text-center italic">
                  {RESTAURANT_INFO.history}
                </p>
                <div className="border-t border-border pt-6">
                  <h3 className="flex items-center justify-center text-2xl font-headline mb-4 text-center text-primary">
                    <Sparkles className="h-6 w-6 mr-2 text-accent" />
                    The Ambiance
                  </h3>
                   <blockquote className="text-center relative">
                    <Quote className="h-8 w-8 text-accent/50 absolute -top-2 -left-4 transform -translate-x-full" />
                    <p className="text-foreground text-xl font-medium">
                      {ambianceSummary}
                    </p>
                     <Quote className="h-8 w-8 text-accent/50 absolute -bottom-2 -right-4 transform translate-x-full scale-x-[-1]" />
                  </blockquote>
                </div>
              </CardContent>
            </Card>

            <div className="mt-16 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-headline text-primary mb-4">Our Philosophy</h3>
                <p className="text-muted-foreground mb-4">
                  We are driven by a simple yet profound philosophy: to honor the earth and its seasons. This principle guides everything we do, from our sourcing practices to the final presentation on your plate. We believe that the best meals begin with the best ingredients, and we are proud to showcase the incredible work of our local food producers.
                </p>
                 <p className="text-muted-foreground">
                  Our kitchen is a place of creativity and respect, where traditional techniques meet modern innovation. We aim to create a dining experience that is not only delicious but also memorable and meaningful.
                </p>
              </div>
               <div className="aspect-w-4 aspect-h-3">
                 <Image 
                    src="https://picsum.photos/500/375"
                    alt="A chef carefully plating a dish"
                    width={500}
                    height={375}
                    className="rounded-lg shadow-xl object-cover"
                    data-ai-hint="chef plating"
                />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
