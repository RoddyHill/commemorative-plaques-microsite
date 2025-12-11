import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Gallery() {
  // Placeholder data for gallery items
  const projects = [
    {
      title: "University Library Opening",
      category: "Welsh Slate",
      image: "/images/hero-unveiling.png", // Reusing generated assets for now
      desc: "A prestigious opening ceremony plaque for a new university library wing."
    },
    {
      title: "Historical Society Marker",
      category: "Cast Bronze",
      image: "/images/bronze-plaque-detail.png",
      desc: "Marking the birthplace of a notable local poet."
    },
    {
      title: "Corporate HQ Dedication",
      category: "Stainless Steel",
      image: "/images/slate-texture-bg.png", // Placeholder
      desc: "Modern etched steel plaque for a tech company headquarters."
    },
    {
      title: "Memorial Garden",
      category: "Welsh Slate",
      image: "/images/craftsmanship-workshop.png",
      desc: "A serene memorial plaque placed in a public garden."
    }
  ];

  return (
    <Layout>
      <div className="bg-background py-16 container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Our Portfolio</h1>
          <p className="text-xl text-muted-foreground">
            A selection of our recent commissions, showcasing the variety of materials and 
            craftsmanship we offer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="group relative overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-all duration-300 bg-card border border-border">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">{project.category}</span>
                <h3 className="font-heading text-2xl font-bold text-primary">{project.title}</h3>
                <p className="text-muted-foreground text-sm">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-muted/30 p-12 rounded-sm">
          <h3 className="font-heading text-2xl font-bold text-primary mb-4">See Something You Like?</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We can replicate any style you see here, or create something entirely unique for your project.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90">Start Your Project</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
