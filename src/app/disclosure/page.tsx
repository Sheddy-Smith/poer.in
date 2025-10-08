import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AffiliateDisclosurePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold tracking-tight lg:text-5xl font-headline text-primary">
            Affiliate Disclosure
          </CardTitle>
          <p className="text-muted-foreground pt-2">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-foreground/80 space-y-6">
          <p>
            At Poer.in, our goal is to provide our users with the best deals and products from a variety of entrepreneurs and online marketplaces. To support our platform and continue offering this service, we participate in affiliate marketing programs.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">What is an Affiliate Link?</h2>
            <p>
              When you click on a "Buy Now" or any other link on our site that leads to a product or service on a third-party website (like Amazon, Flipkart, etc.), it may be an affiliate link. This means that if you make a purchase through our link, we may earn a small commission from the retailer at no additional cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Why Do We Use Affiliate Links?</h2>
            <p>
              The commissions we earn help us cover the costs of running Poer.in, including website hosting, content creation, and platform maintenance. This allows us to keep our service free for our users and continue to find and share the best deals available.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Our Commitment to Honesty</h2>
            <p>
              Our participation in affiliate programs does not influence the products we feature or the deals we highlight. We are committed to providing honest and unbiased information. Our primary goal is to help you find great products and save money. The trust of our users is paramount, and we would never compromise that for a commission.
            </p>
            <p>
              Whether you use our links or not, we are grateful for your support and for being a part of the Poer.in community.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Questions</h2>
            <p>
              If you have any questions regarding our affiliate disclosure or any of the products we feature, please do not hesitate to contact us at <a href="mailto:poerindia@gmail.com" className="text-primary hover:underline">poerindia@gmail.com</a>.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
