import { Building2, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-accent" />
              <div className="flex flex-col">
                <span className="text-xl font-display font-semibold">WBPS</span>
                <span className="text-xs text-primary-foreground/70">Wealth Builders Property</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Professional property management and wealth building solutions for landlords and tenants.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-accent transition-smooth">About Us</a></li>
              <li><a href="/services" className="hover:text-accent transition-smooth">Services</a></li>
              <li><a href="/contact" className="hover:text-accent transition-smooth">Contact</a></li>
              <li><a href="/faq" className="hover:text-accent transition-smooth">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-accent transition-smooth">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-accent transition-smooth">Terms of Service</a></li>
              <li><a href="/kvkk" className="hover:text-accent transition-smooth">KVKK Compliance</a></li>
              <li><a href="/security" className="hover:text-accent transition-smooth">Data Security</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/70">info@wbps.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/70">+90 (212) 555-0123</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/70">Istanbul, Turkey</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} WBPS. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
                Bank-grade Security
              </span>
              <span>•</span>
              <span>SPK Licensed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
