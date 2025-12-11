import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CeremonyGuide() {
  return (
    <Layout>
      <div className="bg-muted/30 py-16">
        <div className="container max-w-4xl">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Expert Advice</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            The Complete Guide to Planning an Unveiling Ceremony
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From protocol and etiquette to the practical logistics of the reveal, here is everything 
            you need to know to host a dignified and memorable event.
          </p>
        </div>
      </div>

      <article className="container max-w-3xl py-16 space-y-12">
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-primary">1. Choosing the Date & VIPs</h2>
          <p className="text-muted-foreground leading-relaxed">
            Start by securing your VIP (the person unveiling the plaque) before setting a firm date. 
            High-profile individuals often have schedules booked months in advance. Consider anniversaries 
            or significant dates related to the building or person being honored.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-primary">2. The Plaque Wording</h2>
          <p className="text-muted-foreground leading-relaxed">
            Less is often more. A commemorative plaque should be legible from a distance. 
            Standard format includes:
          </p>
          <div className="bg-muted p-6 rounded-sm border-l-4 border-secondary font-heading text-primary italic">
            <p className="text-center text-lg">
              THIS BUILDING WAS OPENED BY<br />
              [NAME OF VIP]<br />
              ON [DATE]<br />
              TO COMMEMORATE [EVENT/REASON]
            </p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Always triple-check spelling, titles, and dates. Once engraved in stone or bronze, 
            errors are permanent.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-primary">3. The Logistics of the Reveal</h2>
          <p className="text-muted-foreground leading-relaxed">
            Will the plaque be mounted on the wall before the ceremony, or displayed on an easel? 
            Wall mounting is permanent but requires the VIP to stand with their back to the audience 
            initially. An easel allows for a better photo opportunity and audience engagement.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Pro Tip:</strong> Always test the curtains beforehand. Ensure the cord pulls smoothly 
            and the curtains part fully to reveal the entire plaque.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-primary">4. The Order of Proceedings</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Welcome address (Host/CEO)</li>
            <li>Speech about the project/history</li>
            <li>Introduction of the VIP</li>
            <li>Short speech by the VIP</li>
            <li><strong>The Unveiling (The Climax)</strong></li>
            <li>Photo opportunity</li>
            <li>Closing remarks & refreshments</li>
          </ul>
        </section>

        <div className="bg-primary text-primary-foreground p-8 rounded-sm text-center space-y-6 mt-12">
          <h3 className="font-heading text-2xl font-bold">Need Help with the Hardware?</h3>
          <p className="opacity-90">
            We hire out professional unveiling curtains and easels to ensure your big moment goes smoothly.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="font-bold">Enquire About Hire</Button>
          </Link>
        </div>
      </article>
    </Layout>
  );
}
