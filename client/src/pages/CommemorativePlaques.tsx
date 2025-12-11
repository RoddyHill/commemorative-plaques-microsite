import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function CommemorativePlaques() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/slate-texture-bg.png" className="w-full h-full object-cover" alt="texture" />
        </div>
        <div className="container relative z-10 text-center space-y-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold">Commemorative Plaques</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-light">
            Honoring the past with materials built for the future.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-primary">The Standard for Remembrance</h2>
            <p className="text-muted-foreground leading-relaxed">
              A commemorative plaque is more than just a sign; it is a permanent record of history. 
              Whether marking the opening of a new building, honoring a historical figure, or 
              recognizing a significant donation, our plaques are crafted to convey dignity and 
              permanence.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We specialize in traditional materials that age gracefully, ensuring your message 
              remains clear and dignified for generations to come.
            </p>
          </div>
          <div className="relative h-[400px] rounded-sm overflow-hidden shadow-xl">
            <img 
              src="/images/craftsmanship-workshop.png" 
              alt="Crafting a commemorative plaque" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="font-heading text-3xl font-bold text-center mb-12 text-primary">Premium Materials</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Material 1: Welsh Slate */}
            <div className="bg-background border border-border p-6 rounded-sm hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-800 mb-6 rounded-sm overflow-hidden relative">
                 <img src="/images/slate-texture-bg.png" className="w-full h-full object-cover" alt="Welsh Slate" />
                 <div className="absolute bottom-0 left-0 bg-secondary text-secondary-foreground px-3 py-1 text-xs font-bold uppercase">Most Popular</div>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3 text-primary">Welsh Slate</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The gold standard for heritage plaques. Dark blue-grey in color, incredibly durable, 
                and deeply engraved.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> 500 million years old</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Deep V-cut engraving</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Zero maintenance required</li>
              </ul>
            </div>

            {/* Material 2: Cast Bronze */}
            <div className="bg-background border border-border p-6 rounded-sm hover:shadow-lg transition-shadow">
              <div className="h-48 bg-amber-700 mb-6 rounded-sm overflow-hidden">
                <img src="/images/bronze-plaque-detail.png" className="w-full h-full object-cover" alt="Cast Bronze" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3 text-primary">Cast Bronze</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Traditional, prestigious, and timeless. Raised lettering with a dark patina background 
                for high contrast.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Classic 3D raised letters</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Extremely durable</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Ideal for outdoor use</li>
              </ul>
            </div>

            {/* Material 3: Brass & Steel */}
            <div className="bg-background border border-border p-6 rounded-sm hover:shadow-lg transition-shadow">
              <div className="h-48 bg-yellow-100 mb-6 rounded-sm overflow-hidden flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300">
                 <span className="text-yellow-800 font-heading font-bold text-lg">Polished Brass</span>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3 text-primary">Brass & Steel</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Bright, modern, and reflective. Chemically etched for precision and filled with 
                black enamel.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> High-polish finish</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Modern aesthetic</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Precision detailing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl font-bold mb-6">Start Your Commemorative Project</h2>
          <p className="text-lg opacity-90 mb-8">
            Contact our team for expert advice on materials, wording, and design. 
            We provide free digital proofs with every quote.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Request a Quote
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
