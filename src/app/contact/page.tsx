import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl font-headline text-primary">
          Contact Us
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          We'd love to hear from you. Here's how you can reach us.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>
            For any inquiries, partnership opportunities, or support, please feel free to contact us.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
            <Mail className="h-8 w-8 text-accent" />
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <a href="mailto:poerindia@gmail.com" className="text-foreground/80 hover:text-primary transition-colors">
                poerindia@gmail.com
              </a>
              <p className="text-sm text-muted-foreground">For general inquiries and support.</p>
            </div>
          </div>
           <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
            <Phone className="h-8 w-8 text-accent" />
            <div>
              <h3 className="font-semibold text-lg">Phone</h3>
              <p className="text-foreground/80">
                (+91) 7447-000-198
              </p>
              <p className="text-sm text-muted-foreground">Mon-Fri, 9am - 5pm IST</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
