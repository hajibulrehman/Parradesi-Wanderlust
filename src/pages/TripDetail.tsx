import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trips } from "@/data/trips";
import { tripImages } from "@/lib/images";
import { Clock, MapPin, Check, X, Star, ArrowLeft, Calendar, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Countdown = ({ date }: { date: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(date).getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
      });
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="flex gap-4">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.mins },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="w-16 h-16 rounded-xl bg-gradient-sunset flex items-center justify-center text-primary-foreground font-display font-bold text-2xl shadow-warm">
            {item.value}
          </div>
          <p className="text-xs mt-1 text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

const TripDetail = () => {
  const { id } = useParams();
  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Trip not found</h1>
          <Link to="/trips" className="text-primary hover:underline">← Back to trips</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden">
        <img src={tripImages[trip.image]} alt={trip.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container pb-10">
          <Link to="/trips" className="inline-flex items-center gap-1 text-sm text-secondary-foreground/70 hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Trips
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-bold text-secondary-foreground mb-2"
          >
            {trip.name}
          </motion.h1>
          <div className="flex flex-wrap gap-4 text-sm text-secondary-foreground/80">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{trip.destination}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{trip.duration}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Next: {new Date(trip.nextDeparture).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-display font-bold mb-3">Trip Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{trip.description}</p>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="text-2xl font-display font-bold mb-4">Itinerary</h2>
                <Accordion type="multiple" className="space-y-2">
                  {trip.itinerary.map((day) => (
                    <AccordionItem key={day.day} value={`day-${day.day}`} className="bg-card rounded-xl border-none shadow-card">
                      <AccordionTrigger className="px-5 py-4 hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <span className="w-10 h-10 rounded-full bg-gradient-sunset flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                            D{day.day}
                          </span>
                          <span className="font-display font-semibold">{day.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4">
                        <p className="text-sm text-muted-foreground mb-2"><strong>Activities:</strong> {day.activities}</p>
                        <p className="text-sm text-muted-foreground"><strong>Stay:</strong> {day.stay}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Inclusions / Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-display font-bold text-lg mb-3 text-accent">Inclusions</h3>
                  <ul className="space-y-2">
                    {trip.inclusions.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-accent shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-display font-bold text-lg mb-3 text-destructive">Exclusions</h3>
                  <ul className="space-y-2">
                    {trip.exclusions.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <X className="w-4 h-4 text-destructive shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-2xl font-display font-bold mb-4">Trip Highlights</h2>
                <div className="flex flex-wrap gap-3">
                  {trip.highlights.map((h) => (
                    <span key={h} className="flex items-center gap-1.5 bg-muted px-4 py-2 rounded-full text-sm font-medium">
                      <Star className="w-3.5 h-3.5 text-primary" /> {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-display font-bold mb-4">FAQs</h2>
                <Accordion type="multiple" className="space-y-2">
                  {trip.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border-none shadow-card">
                      <AccordionTrigger className="px-5 py-4 hover:no-underline text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <div className="bg-card rounded-2xl p-6 shadow-card text-center">
                  <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                  <p className="text-4xl font-display font-bold text-primary mb-1">₹{trip.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mb-6">per person</p>
                  <button className="w-full bg-gradient-sunset text-primary-foreground py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity text-base">
                    Book This Trip
                  </button>
                  <p className="text-xs text-muted-foreground mt-3">Limited seats available</p>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-display font-semibold mb-4 text-center">Next Departure In</h3>
                  <div className="flex justify-center">
                    <Countdown date={trip.nextDeparture} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TripDetail;
