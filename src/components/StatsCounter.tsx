import { useEffect, useState, useRef } from "react";
import { stats } from "@/data/trips";
import { motion, useInView } from "framer-motion";

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = value / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-gradient-sunset">
      {count}{suffix}
    </span>
  );
};

const StatsCounter = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-secondary-foreground/70 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
