import Image from 'next/image';
import { ReservationForm } from './reservation-form';

export default function ReservationsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div className="text-center lg:text-left mb-8">
             <h1 className="text-4xl md:text-5xl font-headline text-primary">Book Your Table</h1>
             <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground">
               We look forward to welcoming you. Reserve your table for an unforgettable dining experience.
            </p>
          </div>
          <ReservationForm />
        </div>
        <div className="order-1 lg:order-2 aspect-w-3 aspect-h-4">
          <Image
            src="https://placehold.co/600x800/8d7f70/FFF.webp?text=Table+Setting"
            alt="An inviting table setting at Terra Table"
            width={600}
            height={800}
            className="rounded-lg shadow-xl object-cover w-full h-full"
            data-ai-hint="table setting restaurant"
          />
        </div>
      </div>
    </div>
  );
}
