import { Link } from "react-router-dom";
import { Compass, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Compass className="w-7 h-7 text-primary" />
              <span className="font-display text-xl font-bold">Parr-Desi</span>
            </Link>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              Travel with strangers. Leave as family. Join India's most vibrant travel community.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-primary">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-secondary-foreground/70">
              <Link to="/trips" className="hover:text-primary transition-colors">All Trips</Link>
              <Link to="/community" className="hover:text-primary transition-colors">Community</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-primary">Trip Types</h4>
            <div className="flex flex-col gap-2 text-sm text-secondary-foreground/70">
              <span>Adventure</span>
              <span>Relaxation</span>
              <span>Backpacking</span>
              <span>International</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-primary">Connect</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-sm text-secondary-foreground/70">hello@parrdesi.com</p>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-6 text-center text-sm text-secondary-foreground/50">
          © {new Date().getFullYear()} Parr-Desi. All rights reserved. Made with ❤️ for travelers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
