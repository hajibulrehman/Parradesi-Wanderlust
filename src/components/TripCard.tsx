import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { PackageData } from "@/hooks/usePackages";

const TripCard = ({ trip, index = 0 }: { trip: PackageData; index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/trips/${trip.slug}`} className="group block">
        <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
          <div className="relative h-52 overflow-hidden">
            {trip.image_url ? (
              <img
                src={trip.image_url}
                alt={trip.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              {trip.type}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent h-20" />
          </div>
          <div className="p-5">
            <h3 className="font-display font-bold text-lg text-foreground mb-1">{trip.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{trip.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{trip.destination}</span>
              {trip.duration && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{trip.duration}</span>}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-lg text-primary">₹{Number(trip.price).toLocaleString()}</span>
              <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                View Details <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TripCard;
