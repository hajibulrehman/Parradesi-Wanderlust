import { useState } from "react";
import { motion } from "framer-motion";
import { trips } from "@/data/trips";
import TripCard from "@/components/TripCard";
import { Search } from "lucide-react";

const types = ["All", "Adventure", "Relaxation", "Backpacking", "International"] as const;

const Trips = () => {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = trips.filter((t) => {
    const matchType = filter === "All" || t.type === filter;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.destination.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-12 pb-8 bg-secondary">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-bold text-secondary-foreground mb-3"
          >
            All <span className="text-gradient-sunset">Trips</span>
          </motion.h1>
          <p className="text-secondary-foreground/70 max-w-lg mx-auto mb-8">
            Find your next adventure. Filter by type, search by destination — your perfect trip is waiting.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-secondary-foreground/10 border border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === type
                    ? "bg-gradient-sunset text-primary-foreground shadow-warm"
                    : "bg-secondary-foreground/10 text-secondary-foreground/70 hover:bg-secondary-foreground/20"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-background">
        <div className="container">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No trips found. Try a different filter!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((trip, i) => (
                <TripCard key={trip.id} trip={trip} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Trips;
