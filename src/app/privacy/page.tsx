import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold tracking-tight lg:text-5xl font-headline text-primary">
            Privacy Policy
          </CardTitle>
          <p className="text-muted-foreground pt-2">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-foreground/80 space-y-6">
          <p>
            Poer.in is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Poer.in.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Information We Collect</h2>
            <p>
              We collect information that you provide to us directly, such as when you create an account or contact us. We may also collect information automatically as you navigate the site, such as your IP address, browser type, and information collected through cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">How We Use Your Information</h2>
            <p>
              We use the information we collect to operate, maintain, and provide you with the features and functionality of our service, as well as to communicate directly with you. We may also use this information to personalize your experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Sharing Your Information</h2>
            <p>
              We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Third-Party Links</h2>
            <p>
              Our website contains links to affiliate and other third-party websites. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Your Choices</h2>
            <p>
              You may, of course, decline to submit personally identifiable information through the service, in which case Poer.in may not be able to provide certain services to you. You can update or correct your account information at any time by logging into your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Changes to Our Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:poerindia@gmail.com" className="text-primary hover:underline">poerindia@gmail.com</a>.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
