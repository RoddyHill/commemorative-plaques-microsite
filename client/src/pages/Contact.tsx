import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container text-center space-y-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold">Get a Quote</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-light">
            Tell us about your project. We'll provide a free digital proof and a detailed quote 
            within 24 hours.
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-card border border-border p-8 rounded-sm shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-primary mb-6">Send us a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="01234 567890" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Plaque Type</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="type">
                  <option>Commemorative Plaque (General)</option>
                  <option>Unveiling Plaque & Curtains</option>
                  <option>Memorial Plaque</option>
                  <option>House Sign</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message / Wording Ideas</Label>
                <Textarea 
                  id="message" 
                  placeholder="Please describe your requirements, including rough size and wording if known..." 
                  className="min-h-[150px]"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary text-white hover:bg-primary/90 font-bold">
                Request Quote
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We are a family-run business based in Cardiff, serving the entire UK. 
                Visits to our workshop are welcome by appointment.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Phone</h3>
                    <p className="text-muted-foreground">01234 567890</p>
                    <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9am - 5pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Email</h3>
                    <p className="text-muted-foreground">enquiries@stonesign.com</p>
                    <p className="text-xs text-muted-foreground mt-1">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Workshop Address</h3>
                    <p className="text-muted-foreground">
                      Unit 1, Example Industrial Estate<br />
                      Cardiff, Wales<br />
                      CF11 1AA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-8 rounded-sm border border-border">
              <h3 className="font-heading text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" /> Current Lead Times
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between border-b border-border/50 pb-2">
                  <span>Standard Slate Plaques</span>
                  <span className="font-bold text-primary">2-3 Weeks</span>
                </li>
                <li className="flex justify-between border-b border-border/50 pb-2">
                  <span>Cast Bronze Plaques</span>
                  <span className="font-bold text-primary">4-6 Weeks</span>
                </li>
                <li className="flex justify-between pt-2">
                  <span>Unveiling Curtains (Hire)</span>
                  <span className="font-bold text-primary">Check Availability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
