'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { PARTY_SIZES, RESERVATION_TIMES } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const reservationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  partySize: z.string().min(1, { message: 'Please select a party size.' }),
  date: z.date({ required_error: 'A date is required.' }),
  time: z.string().min(1, { message: 'Please select a time.' }),
});

type ReservationDetails = z.infer<typeof reservationSchema> & {
    reservationId: string;
};

// A key for storing reservation data in localStorage
const STORAGE_KEY = 'lume-reservation';

export function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails | null>(null);

  // Check localStorage for an existing reservation when the component loads
  useEffect(() => {
    const storedReservation = localStorage.getItem(STORAGE_KEY);
    if (storedReservation) {
      try {
        setReservationDetails(JSON.parse(storedReservation));
      } catch (error) {
        console.error("Failed to parse stored reservation:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);


  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof reservationSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const reservationId = `LUME-${Date.now().toString().slice(-6)}`;
    const details = { ...values, reservationId };
    
    // Store the successful reservation in state and localStorage
    setReservationDetails(details);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(details));

    setIsSubmitting(false);
  }

  const handleMakeAnotherReservation = () => {
    // Clear state and localStorage to allow a new booking
    setReservationDetails(null);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
  }

  if (reservationDetails) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-headline text-primary mb-2">Reservation Confirmed!</h3>
            <p className="text-muted-foreground mb-6">
                Thank you, {reservationDetails.name}! Your table is booked. Please show this confirmation upon arrival.
            </p>

            <div className="border bg-card rounded-lg p-4 space-y-3 text-left mb-6">
                <p><strong>Reservation ID:</strong> {reservationDetails.reservationId}</p>
                <p><strong>Date:</strong> {format(new Date(reservationDetails.date), 'PPP')}</p>
                <p><strong>Time:</strong> {reservationDetails.time}</p>
                <p><strong>Party Size:</strong> {reservationDetails.partySize} {parseInt(reservationDetails.partySize) > 1 ? 'people' : 'person'}</p>
            </div>

            <Button variant="outline" className="mt-8" onClick={handleMakeAnotherReservation}>
                Make Another Reservation
            </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="partySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Party Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PARTY_SIZES.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RESERVATION_TIMES.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Request Reservation'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
