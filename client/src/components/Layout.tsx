import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/commemorative-plaques", label: "Commemorative Plaques" },
    { href: "/unveiling-plaques", label: "Unveiling Plaques" },
    { href: "/ceremony-guide", label: "Ceremony Guide" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-body text-foreground bg-background selection:bg-secondary selection:text-secondary-foreground">
      {/* Top Bar - Contact Info */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> 01234 567890</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> enquiries@stonesign.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Cardiff, Wales
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-background/95 backdrop-blur-md border-border shadow-sm py-2" : "bg-background py-4"
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 group">
              {/* Logo Placeholder - Text based for now, matching Stone Sign style */}
              <div className="flex flex-col">
                <span className="font-heading font-bold text-2xl tracking-tight text-primary group-hover:text-primary/90 transition-colors">
                  STONE SIGN
                </span>
                <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground font-bold">
                  Commemorative Plaques
                </span>
              </div>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-secondary relative py-1",
                    location === link.href
                      ? "text-secondary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-secondary"
                      : "text-foreground/80 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-secondary after:transition-all hover:after:w-full"
                  )}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/contact">
              <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading tracking-wide">
                Get a Quote
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg animate-in slide-in-from-top-5">
            <nav className="container flex flex-col py-6 gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={cn(
                      "text-lg font-medium py-2 border-b border-border/50 transition-colors",
                      location === link.href ? "text-secondary" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
              <Link href="/contact">
                <Button className="w-full mt-4 bg-primary text-primary-foreground">Get a Quote</Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-primary-foreground/10">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold">STONE SIGN</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Six generations of craftsmanship. Creating timeless commemorative and unveiling plaques that honor history and celebrate achievement.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 text-secondary">Products</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/commemorative-plaques"><a className="hover:text-white transition-colors">Commemorative Plaques</a></Link></li>
              <li><Link href="/unveiling-plaques"><a className="hover:text-white transition-colors">Unveiling Plaques</a></Link></li>
              <li><Link href="/commemorative-plaques"><a className="hover:text-white transition-colors">Welsh Slate Plaques</a></Link></li>
              <li><Link href="/commemorative-plaques"><a className="hover:text-white transition-colors">Bronze Plaques</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 text-secondary">Resources</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/ceremony-guide"><a className="hover:text-white transition-colors">Unveiling Ceremony Guide</a></Link></li>
              <li><Link href="/gallery"><a className="hover:text-white transition-colors">Project Gallery</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-white transition-colors">FAQ</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 text-secondary">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <span>Unit 1, Example Ind. Est,<br />Cardiff, Wales, CF11 1AA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>01234 567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>enquiries@stonesign.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="container pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Stone Sign Company. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <Link href="/admin/cms"><a className="hover:text-white transition-colors opacity-50">Admin</a></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
