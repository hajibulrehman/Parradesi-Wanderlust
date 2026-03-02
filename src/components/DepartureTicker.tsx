import { upcomingDepartures } from "@/data/trips";
import { Plane } from "lucide-react";

const DepartureTicker = () => {
  const items = [...upcomingDepartures, ...upcomingDepartures];

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-primary overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap py-1.5">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2 mx-8 text-xs font-medium text-primary-foreground">
            <Plane className="w-3 h-3" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DepartureTicker;
