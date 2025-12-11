import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star, Calendar, PenTool, Shield } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-unveiling.png" 
            alt="Unveiling ceremony of a commemorative plaque" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>

        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center pt-20">
          <div className="space-y-8 animate-in slide-in-from-left-10 duration-1000 fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium backdrop-blur-sm">
              <Star className="w-3 h-3 fill-current" />
              <span>6 Generations of Craftsmanship</span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
              Mark the Moment <br />
              <span className="text-secondary italic font-accent">Forever.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl leading-relaxed font-light">
              Premium commemorative and unveiling plaques, handcrafted in Wales. 
              We help you honor history, celebrate achievements, and create a lasting legacy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-heading text-lg px-8 h-14">
                  Request a Quote
                </Button>
              </Link>
              <Link href="/unveiling-plaques">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-heading text-lg px-8 h-14">
                  View Unveiling Plaques
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Hero Visual/Floating Element */}
          <div className="hidden md:block relative animate-in zoom-in-95 duration-1000 delay-300 fade-in">
            <div className="relative z-10 rounded-sm shadow-2xl border-4 border-white/10 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
               <img 
                src="/images/bronze-plaque-detail.png" 
                alt="Detail of a bronze commemorative plaque" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative backing */}
            <div className="absolute -inset-4 border border-secondary/30 z-0 rounded-sm transform -rotate-2" />
          </div>
        </div>
      </section>

      {/* Introduction / Authority Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">
              A Legacy Set in Stone
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              For over a century, Stone Sign Company has been the trusted choice for organizations, 
              governments, and families across the UK. We don't just make plaques; we craft 
              historical markers that stand the test of time.
            </p>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Unrivaled Durability",
                desc: "Crafted from the finest Welsh Slate, Bronze, and Brass to withstand generations of weather and wear."
              },
              {
                icon: PenTool,
                title: "Master Craftsmanship",
                desc: "Hand-finished by artisans who combine traditional techniques with modern precision engraving."
              },
              {
                icon: Calendar,
                title: "Ceremony Ready",
                desc: "We deliver on time, every time. Plus, we offer easel hire and unveiling curtains for your big day."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 bg-card border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg rounded-sm">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 text-primary">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase Split Section */}
      <section className="py-0 bg-muted/30">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          <div className="relative h-[400px] md:h-auto group overflow-hidden">
            <img 
              src="/images/craftsmanship-workshop.png" 
              alt="Artisan working on a slate plaque" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          <div className="flex flex-col justify-center p-12 md:p-20 bg-white space-y-6">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Our Signature Material</span>
            <h2 className="font-heading text-4xl font-bold text-primary">Welsh Slate Commemorative Plaques</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Sourced from the heart of Snowdonia, our Welsh Slate is world-renowned for its quality and longevity. 
              Deeply engraved and finished with enamel or 23ct gold leaf, these plaques are the gold standard 
              for heritage sites and prestigious openings.
            </p>
            <ul className="space-y-3 pt-4">
              {["500 Million Year Old Stone", "Deep V-Cut Engraving", "Hand-Painted Finishes"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-primary font-medium">
                  <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <Check className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-6">
              <Link href="/commemorative-plaques">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white group">
                  Explore Slate Plaques <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Unveiling Ceremony Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <img src="/images/slate-texture-bg.png" className="w-full h-full object-cover mix-blend-overlay" alt="texture" />
        </div>
        
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
                Planning an Unveiling Ceremony?
              </h2>
              <p className="text-xl text-primary-foreground/80 leading-relaxed font-light">
                The reveal is the most critical moment of your event. Don't leave it to chance. 
                We provide everything you need for a flawless ceremony, from the plaque itself 
                to the curtains and easels.
              </p>
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm backdrop-blur-sm">
                <h4 className="font-heading text-xl font-bold text-secondary mb-2">Free Resource</h4>
                <p className="mb-4 text-sm">Download our comprehensive guide to planning the perfect unveiling event.</p>
                <Link href="/ceremony-guide">
                  <a className="text-white underline decoration-secondary underline-offset-4 hover:text-secondary transition-colors">
                    Read the Unveiling Guide &rarr;
                  </a>
                </Link>
              </div>

              <Link href="/unveiling-plaques">
                <Button size="lg" className="bg-white text-primary hover:bg-secondary hover:text-primary font-bold">
                  View Unveiling Packages
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-secondary/20 to-transparent rounded-full absolute -top-20 -right-20 w-96 h-96 blur-3xl" />
              <div className="relative z-10 bg-white p-2 shadow-2xl transform rotate-2">
                <img 
                  src="/images/hero-unveiling.png" 
                  alt="Unveiling curtains" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">
            Ready to Create History?
          </h2>
          <p className="text-xl text-muted-foreground">
            Start your project today. Get a free, no-obligation quote and design proof 
            from our expert team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg px-10 py-6 h-auto shadow-xl shadow-primary/20">
                Get Your Free Quote
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 h-auto">
                View Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
