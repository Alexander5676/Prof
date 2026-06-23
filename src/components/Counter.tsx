import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true });
  const number = Number(value.replace(/\D/g, '')); const suffix = value.replace(/[\d\s]/g, '');
  const mv = useMotionValue(0); const spring = useSpring(mv, { duration: 1800 }); const [display, setDisplay] = useState(0);
  useEffect(() => { if (inView) mv.set(number); }, [inView, mv, number]);
  useEffect(() => spring.on('change', latest => setDisplay(Math.round(latest))), [spring]);
  return <motion.div ref={ref} className="rounded-3xl bg-white p-6 text-center shadow-soft dark:bg-slate-900" whileHover={{ y: -6 }}><div className="text-4xl font-black text-indigo-600 dark:text-cyan-300">{display}{suffix}</div><p className="mt-2 text-slate-600 dark:text-slate-300">{label}</p></motion.div>;
}
