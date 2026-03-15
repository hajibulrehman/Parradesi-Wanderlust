import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePackageDetail } from "@/hooks/usePackages";
import { Clock, MapPin, Check, X, Star, ArrowLeft, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

const InquiryForm = ({ packageId, packageName }: { packageId: string; packageName: string }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.from("inquiries").insert({
      ...form,
      package_id: packageId,
    });
    if (error) {
      toast.error("Failed to send inquiry");
    } else {
      toast.success("Inquiry sent! We'll get back to you soon. 🌍");
      setForm({ name: "", email: "", phone: "", message: "" });
    }
    setSending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="font-display font-semibold text-sm">Inquire about {packageName}</h3>
      <Input placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <Textarea placeholder="Message (optional)" rows={2} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      <Button type="submit" disabled={sending} className="w-full bg-gradient-sunset text-primary-foreground rounded-full hover:opacity-90">
        {sending ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
};

const TripDetail = () => {
  const { slug } = useParams();
  const { pkg: trip, itinerary, faqs, loading } = usePackageDetail(slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

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
        {trip.image_url ? (
          <img src={trip.image_url} alt={trip.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
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
            {trip.duration && <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{trip.duration}</span>}
            {trip.next_departure && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Next: {new Date(trip.next_departure).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-display font-bold mb-3">Trip Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{trip.description}</p>
              </div>

              {itinerary.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold mb-4">Itinerary</h2>
                  <Accordion type="multiple" className="space-y-2">
                    {itinerary.map((day) => (
                      <AccordionItem key={day.day_number} value={`day-${day.day_number}`} className="bg-card rounded-xl border-none shadow-card">
                        <AccordionTrigger className="px-5 py-4 hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <span className="w-10 h-10 rounded-full bg-gradient-sunset flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                              D{day.day_number}
                            </span>
                            <span className="font-display font-semibold">{day.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-4">
                          {day.activities && <p className="text-sm text-muted-foreground mb-2"><strong>Activities:</strong> {day.activities}</p>}
                          {day.stay && <p className="text-sm text-muted-foreground"><strong>Stay:</strong> {day.stay}</p>}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {(trip.inclusions.length > 0 || trip.exclusions.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trip.inclusions.length > 0 && (
                    <div className="bg-card rounded-2xl p-6 shadow-card">
                      <h3 className="font-display font-bold text-lg mb-3 text-accent-foreground">Inclusions</h3>
                      <ul className="space-y-2">
                        {trip.inclusions.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-accent-foreground shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {trip.exclusions.length > 0 && (
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
                  )}
                </div>
              )}

              {trip.highlights.length > 0 && (
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
              )}

              {faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold mb-4">FAQs</h2>
                  <Accordion type="multiple" className="space-y-2">
                    {faqs.map((faq, i) => (
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
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <div className="bg-card rounded-2xl p-6 shadow-card text-center">
                  <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                  <p className="text-4xl font-display font-bold text-primary mb-1">₹{Number(trip.price).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mb-6">per person</p>
                  <InquiryForm packageId={trip.id} packageName={trip.name} />
                </div>

                {trip.next_departure && (
                  <div className="bg-card rounded-2xl p-6 shadow-card">
                    <h3 className="font-display font-semibold mb-4 text-center">Next Departure In</h3>
                    <div className="flex justify-center">
                      <Countdown date={trip.next_departure} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TripDetail;
