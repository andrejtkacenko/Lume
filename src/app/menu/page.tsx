import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FULL_MENU } from '@/lib/constants';
import { Leaf } from 'lucide-react';

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">Our Menu</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Crafted with the freshest seasonal ingredients from local farms.
        </p>
      </div>
      <Tabs defaultValue="Mains" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="Appetizers">Appetizers</TabsTrigger>
          <TabsTrigger value="Mains">Mains</TabsTrigger>
          <TabsTrigger value="Desserts">Desserts</TabsTrigger>
          <TabsTrigger value="Drinks">Drinks</TabsTrigger>
        </TabsList>
        
        {Object.entries(FULL_MENU).map(([category, items]) => (
            <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {items.map((item) => (
                        <Card key={item.name} className="flex flex-col border-border/60">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="font-headline text-xl">{item.name}</CardTitle>
                                    <span className="font-semibold text-primary whitespace-nowrap pl-4">{item.price}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
