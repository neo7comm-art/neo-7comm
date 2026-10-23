import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type ElementType } from "react";

export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: ElementType }) {
  const reduce = useReducedMotion();
  const M = (motion as unknown as Record<string, ElementType>)[as as string] ?? motion.div;
  return (
    <M className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </M>
  );
}

/** Titre révélé mot à mot (masque). `accent` = mots en orange. */
export function SplitWords({ text, accent = [], className = "", delay = 0, as: Tag = "h2" }: { text: string; accent?: string[]; className?: string; delay?: number; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block align-bottom" style={{ marginRight: "0.22em" }}>
          <motion.span className={`inline-block ${accent.includes(w.replace(/[.,!?]/g, "")) ? "text-[#FF9900]" : ""}`}
            initial={reduce ? false : { y: 40, opacity: 0 }} animate={inView || reduce ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}>
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] ${dark ? "text-white/70" : "text-[#080808]/65"}`}>
      <span aria-hidden className="relative flex h-3 w-3 items-center justify-center">
        <span className="absolute h-3 w-3 rounded-full border-2 border-[#FF9900]" />
      </span>
      {children}
    </p>
  );
}
