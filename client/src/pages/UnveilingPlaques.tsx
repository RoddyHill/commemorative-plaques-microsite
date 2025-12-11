import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Download } from "lucide-react";
import { Link } from "wouter";

export default function UnveilingPlaques() {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
           <img src="/images/hero-unveiling.png" className="w-full h-full object-cover" alt="Unveiling" />
        </div>
        <div className="absolute inset-0 bg-primary/80" />
        <div className="container relative z-10 text-center space-y-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold">Unveiling Plaques & Curtains</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-light">
            Everything you need for a flawless opening ceremony.
          </p>
        </div>
      </div>

      {/* The Complete Package */}
      <section className="py-16 container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative h-[500px] rounded-sm overflow-hidden shadow-xl border-4 border-white/10">
             <img src="/images/hero-unveiling.png" className="w-full h-full object-cover" alt="Unveiling curtains" />
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="font-heading text-3xl font-bold text-primary">The Moment of Reveal</h2>
            <p className="text-muted-foreground leading-relaxed">
              The unveiling is the climax of your event. It's the photo opportunity, the headline, 
              and the moment history is made. We ensure it goes perfectly.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Unlike general sign makers, we understand the logistics of a ceremony. That's why we 
              offer a complete solution: the plaque, the curtains, the easel, and the expertise.
            </p>
            
            <div className="bg-muted/30 p-6 rounded-sm border border-border mt-6">
              <h3 className="font-heading text-xl font-bold mb-4 text-primary">Our Unveiling Hire Package</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Freestanding solid wood easel (Mahogany finish)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Royal Blue velvet curtains with gold fringe</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Smooth-action draw cord for the perfect reveal</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Delivery, setup, and collection available</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/contact">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">Check Availability</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planning Guide Teaser */}
      <section className="py-16 bg-secondary/10">
        <div className="container text-center max-w-3xl">
          <Calendar className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h2 className="font-heading text-3xl font-bold mb-4 text-primary">Don't Leave Your Event to Chance</h2>
          <p className="text-muted-foreground mb-8">
            Planning an unveiling ceremony involves protocol, timing, and logistics. 
            We've compiled our decades of experience into a free guide to help you plan.
          </p>
          <Link href="/ceremony-guide">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white gap-2">
              <Download className="w-4 h-4" /> Download the Planning Guide
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
