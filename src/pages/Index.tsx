import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Users, Heart, Star, Send, ArrowRight } from "lucide-react";
import { trips, testimonials } from "@/data/trips";
import { tripImages } from "@/lib/images";
import TripCard from "@/components/TripCard";
import StatsCounter from "@/components/StatsCounter";
import heroImg from "@/assets/hero-travel.jpg";
import { useState, useRef } from "react";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    <img src={heroImg} alt="Travel community at sunset" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 hero-overlay" />
    <div className="relative z-10 container text-center text-secondary-foreground px-4">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm md:text-base font-medium tracking-widest uppercase mb-4 text-primary"
      >
        India's #1 Social Travel Community
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
      >
        Travel with Strangers.
        <br />
        <span className="text-gradient-sunset">Leave as Family.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-secondary-foreground/80"
      >
        Join curated group trips where every stranger becomes a friend. Adventure awaits, and so does your new crew.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link
          to="/trips"
          className="bg-gradient-sunset text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-base hover:opacity-90 transition-opacity inline-flex items-center gap-2"
        >
          Explore Trips <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/community"
          className="border-2 border-secondary-foreground/30 text-secondary-foreground px-8 py-3.5 rounded-full font-semibold text-base hover:bg-secondary-foreground/10 transition-colors"
        >
          Join the Community
        </Link>
      </motion.div>
    </div>
  </section>
);

const TripCarousel = () => {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Featured <span className="text-gradient-sunset">Adventures</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Hand-picked experiences designed for connection and discovery.</p>
        </motion.div>

        {/* 3D-ish stacked carousel */}
        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          <div className="relative h-[420px] md:h-[400px]">
            {trips.map((trip, i) => {
              const offset = i - active;
              const absOffset = Math.abs(offset);
              if (absOffset > 2) return null;

              return (
                <motion.div
                  key={trip.id}
                  className="absolute inset-0 cursor-pointer"
                  style={{ zIndex: 10 - absOffset }}
                  animate={{
                    x: `${offset * 60}px`,
                    scale: 1 - absOffset * 0.08,
                    opacity: 1 - absOffset * 0.3,
                    rotateY: offset * -5,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => setActive(i)}
                >
                  <div className="bg-card rounded-2xl overflow-hidden shadow-warm h-full flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-48 md:h-full relative overflow-hidden">
                      <img
                        src={tripImages[trip.image]}
                        alt={trip.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/50 to-transparent h-24" />
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-center">
                      <span className="text-xs font-bold text-primary uppercase tracking-wide mb-1">{trip.type}</span>
                      <h3 className="font-display font-bold text-xl mb-2">{trip.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{trip.duration}</p>
                      <p className="text-sm text-muted-foreground mb-3">{trip.highlight}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-display font-bold text-2xl text-primary">₹{trip.price.toLocaleString()}</span>
                        <Link
                          to={`/trips/${trip.id}`}
                          className="bg-gradient-sunset text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          View Itinerary
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {trips.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === active ? "bg-primary w-8" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { icon: MapPin, title: "Pick a Trip", desc: "Browse our curated trips and find one that sparks your wanderlust." },
    { icon: Users, title: "Meet New People", desc: "Get matched with like-minded travelers from across the country." },
    { icon: Heart, title: "Travel & Bond", desc: "Create unforgettable memories and lifelong friendships." },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
        >
          How It <span className="text-gradient-sunset">Works</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center mx-auto mb-4 shadow-warm">
                <step.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
      >
        Traveler <span className="text-gradient-sunset">Stories</span>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-card"
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, si) => (
                <Star key={si} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-sunset flex items-center justify-center text-primary-foreground text-xs font-bold">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.trip}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Newsletter = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-20 bg-gradient-ocean">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-foreground mb-3">
            Never Miss an <span className="text-gradient-sunset">Adventure</span>
          </h2>
          <p className="text-secondary-foreground/70 mb-8 max-w-md mx-auto">
            Get early access to trips, community updates, and exclusive deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3 rounded-full bg-secondary-foreground/10 border border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-gradient-sunset text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 justify-center">
              Subscribe <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            What is <span className="text-gradient-sunset">Parr-Desi?</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            We're not just a travel company — we're a movement. Parr-Desi brings together strangers who share one thing: the love for exploration and human connection.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every trip is designed to break the ice, build bonds, and create stories that last a lifetime. Whether you're a solo traveler or a social butterfly, there's a Parr-Desi trip waiting for you.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

const PopularTrips = () => (
  <section className="py-20 bg-muted">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
          Popular <span className="text-gradient-sunset">Trips</span>
        </h2>
        <p className="text-muted-foreground">Join hundreds of travelers on these trending adventures.</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.slice(0, 3).map((trip, i) => (
          <TripCard key={trip.id} trip={trip} index={i} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          to="/trips"
          className="inline-flex items-center gap-2 bg-gradient-sunset text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          View All Trips <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

const Index = () => {
  return (
    <>
      <HeroSection />
      <StatsCounter />
      <AboutSection />
      <TripCarousel />
      <HowItWorks />
      <PopularTrips />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Index;
