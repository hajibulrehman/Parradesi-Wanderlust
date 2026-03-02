import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Camera, Users, ArrowRight, Quote } from "lucide-react";
import communityHero from "@/assets/community-hero.jpg";
import { tripImages } from "@/lib/images";

const stories = [
  {
    name: "Riya & Amit",
    story: "We met as complete strangers on the Manali trip. 6 months later, we backpacked through Vietnam together. Parr-Desi didn't just give us a trip — it gave us our travel partners for life.",
    trip: "Manali Mountain Escape",
  },
  {
    name: "The Goa Squad",
    story: "12 strangers. 4 days. 1 unforgettable Goa trip. We now have a group chat that's been active for 2 years straight. Weekend plans? Always together.",
    trip: "Goa Beach Vibes",
  },
  {
    name: "Meera's Solo Journey",
    story: "I was terrified to travel solo. Parr-Desi made it feel like traveling with family. The Kerala trip was healing, beautiful, and exactly what I needed.",
    trip: "Kerala Backwater Bliss",
  },
];

const galleryImages = Object.values(tripImages);

const Community = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <img src={communityHero} alt="Travel community" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-bold text-secondary-foreground mb-3"
          >
            Our <span className="text-gradient-sunset">Community</span>
          </motion.h1>
          <p className="text-secondary-foreground/80 max-w-lg mx-auto">
            More than trips — we're building a family of travelers. Here's what makes us special.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, title: "Real Connections", desc: "Every trip is designed to foster genuine friendships, not just travel selfies." },
              { icon: Heart, title: "Inclusive Vibes", desc: "Solo, introvert, extrovert — everyone belongs here. We celebrate diversity." },
              { icon: Camera, title: "Shared Memories", desc: "Every trip creates stories worth telling. Every stranger becomes a chapter." },
            ].map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center bg-card rounded-2xl p-8 shadow-card"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-sunset flex items-center justify-center mx-auto mb-4 shadow-warm">
                  <val.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{val.title}</h3>
                <p className="text-sm text-muted-foreground">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Traveler <span className="text-gradient-sunset">Stories</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stories.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.story}</p>
                <div className="border-t border-border pt-3">
                  <p className="font-display font-semibold text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.trip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-8">
            Trip <span className="text-gradient-sunset">Memories</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl overflow-hidden ${i % 3 === 0 ? "row-span-2" : ""}`}
              >
                <img src={img} alt="Trip memory" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-ocean text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-foreground mb-4">
            Ready to Join the <span className="text-gradient-sunset">Adventure?</span>
          </h2>
          <p className="text-secondary-foreground/70 max-w-md mx-auto mb-8">
            Your next best friend is on the next trip. Don't miss out.
          </p>
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 bg-gradient-sunset text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Join the Next Adventure <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Community;
