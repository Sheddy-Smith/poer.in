import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Target, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl font-headline text-primary">
          About Poer.in
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Platform of Entrepreneur Representation
        </p>
      </div>

      <Card className="mb-12 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Building className="h-8 w-8 text-accent" />
            Our Story
          </CardTitle>
        </CardHeader>
        <CardContent className="text-lg text-foreground/80 space-y-4">
          <p>
            Welcome to Poer.in, the premier Platform of Entrepreneur Representation. We began with a simple yet powerful vision: to create a dedicated space where the innovation and hard work of entrepreneurs could be showcased and celebrated. In today's crowded digital marketplace, we saw a need for a curated platform that not only highlights exceptional products but also tells the story behind them.
          </p>
          <p>
            Poer.in was founded to bridge the gap between discerning consumers and ambitious creators, providing a stage for entrepreneurs to reach a wider audience and for customers to discover unique, high-quality products they can trust.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Target className="h-8 w-8 text-accent" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-foreground/80 space-y-4">
            <p>
              Our mission is to empower entrepreneurs by providing a robust platform to feature their products through curated affiliate deals. We aim to drive growth for emerging businesses while delivering exceptional value and verified deals to our users. We are committed to fostering a community built on trust, quality, and mutual success.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Users className="h-8 w-8 text-accent" />
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-foreground/80 space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Integrity:</strong> We believe in transparency and honesty in all our dealings.</li>
              <li><strong>Quality:</strong> We are committed to featuring only the best products and deals.</li>
              <li><strong>Innovation:</strong> We celebrate the creative spirit of entrepreneurship.</li>
              <li><strong>Community:</strong> We strive to build a supportive ecosystem for sellers and buyers.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
