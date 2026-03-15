import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, Shield } from "lucide-react";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/trips", label: "Trips" },
  { to: "/community", label: "Community" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/90 backdrop-blur-md border-b border-secondary-foreground/10">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img alt="Parr-Desi" className="w-8 h-8 object-contain" src={logo} />
          <span className="font-display text-xl font-bold text-secondary-foreground tracking-tight">
            Parr-Desi
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-secondary-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {isAdmin && (
            <Link to="/admin" className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={() => signOut()}
              className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          ) : (
            <Link to="/auth" className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </Link>
          )}

          <Link
            to="/trips"
            className="bg-gradient-sunset text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Book a Trip
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-secondary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-secondary border-t border-secondary-foreground/10"
          >
            <div className="container py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-base font-medium py-2 transition-colors ${
                    location.pathname === link.to ? "text-primary" : "text-secondary-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isAdmin && (
                <Link to="/admin" onClick={() => setOpen(false)} className="text-base font-medium py-2 text-secondary-foreground/80 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Admin Panel
                </Link>
              )}

              {user ? (
                <button
                  onClick={() => { signOut(); setOpen(false); }}
                  className="text-base font-medium py-2 text-secondary-foreground/80 flex items-center gap-2 text-left"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              ) : (
                <Link to="/auth" onClick={() => setOpen(false)} className="text-base font-medium py-2 text-secondary-foreground/80 flex items-center gap-2">
                  <LogIn className="w-4 h-4" /> Sign In
                </Link>
              )}

              <Link
                to="/trips"
                onClick={() => setOpen(false)}
                className="bg-gradient-sunset text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold text-center mt-2"
              >
                Book a Trip
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
