import Link from 'next/link';
import { Logo } from './logo';
import { RESTAURANT_INFO } from '@/lib/constants';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from './ui/container';

const socialLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'Twitter', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Celebrating the earth's bounty, one plate at a time.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            <div>
              <h3 className="font-semibold font-headline text-foreground">Navigate</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">About Us</Link></li>
                <li><Link href="/menu" className="text-muted-foreground hover:text-accent transition-colors">Menu</Link></li>
                <li><Link href="/gallery" className="text-muted-foreground hover:text-accent transition-colors">Gallery</Link></li>
                <li><Link href="/reservations" className="text-muted-foreground hover:text-accent transition-colors">Reservations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-headline text-foreground">Contact</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-1 shrink-0 text-accent" /> 
                  <span className="text-muted-foreground">{RESTAURANT_INFO.address}</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 shrink-0 text-accent" />
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-muted-foreground hover:text-accent transition-colors">{RESTAURANT_INFO.phone}</a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 shrink-0 text-accent" />
                  <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-muted-foreground hover:text-accent transition-colors">{RESTAURANT_INFO.email}</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-headline text-foreground">Follow Us</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {socialLinks.map((link) => (
                   <li key={link.name}>
                     <a href={link.href} className="text-muted-foreground hover:text-accent transition-colors">{link.name}</a>
                   </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {RESTAURANT_INFO.name}. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
