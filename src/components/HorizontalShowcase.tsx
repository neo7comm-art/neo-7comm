import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Link } from "./Link";
import { Eyebrow, Reveal } from "./Motion";
import { projects } from "../data/portfolio";
import { useCinematic } from "../lib/hooks";

/** Réalisations : défilement horizontal piloté par le scroll (bureau), grille simple sur mobile. */
export function HorizontalShowcase() {
  const items = projects.filter((p) => !p.isDemo && p.cover);
  const cinematic = useCinematic();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  const x = useTransform(smooth, [0, 1], ["0%", `-${Math.max(0, items.length - 2.2) * 38}%`]);

  if (!cinematic) {
    return (
      <section id="realisations" aria-labelledby="show-title" className="bg-white py-28 md:py-40">
        <div className="container-x">
          <Reveal><Eyebrow>Réalisations</Eyebrow></Reveal>
          <h2 id="show-title" className="h-sec mt-6 max-w-2xl text-[clamp(2.2rem,5vw,4.2rem)]">La preuve par le travail.</h2>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {items.slice(0, 4).map((p) => <li key={p.id}><Card p={p} /></li>)}
          </ul>
          <div className="mt-12"><Link to="/realisations" className="btn btn-outline-dark">Voir toutes les réalisations</Link></div>
        </div>
      </section>
    );
  }
  return (
    <section ref={ref} id="realisations" aria-labelledby="show-title" className="relative bg-white" style={{ height: `${items.length * 62}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="container-x mb-10 flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Réalisations</Eyebrow>
            <h2 id="show-title" className="h-sec mt-5 text-[clamp(2.2rem,5vw,4.2rem)]">La preuve par le travail.</h2>
          </div>
          <Link to="/realisations" className="btn btn-outline-dark !min-h-[46px] !px-5 !text-[15px]">Tout voir</Link>
        </div>
        <motion.ul style={{ x: reduce ? 0 : x }} className="flex gap-6 pl-[max(20px,calc((100vw-1200px)/2+32px))] will-change-transform">
          {items.map((p, i) => (
            <motion.li key={p.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="w-[min(46vw,560px)] shrink-0">
              <Card p={p} index={i} />
            </motion.li>
          ))}
        </motion.ul>
        <div className="container-x mt-10">
          <div className="h-[2px] w-full bg-[#080808]/10"><motion.div style={{ scaleX: smooth, transformOrigin: "0% 50%" }} className="h-[2px] w-full bg-[#FF9900]" /></div>
        </div>
      </div>
    </section>
  );
}

function Card({ p, index = 0 }: { p: (typeof projects)[number]; index?: number }) {
  return (
    <Link to="/realisations" className="group block">
      <article>
        <div className="relative overflow-hidden rounded-[28px] bg-[#080808]">
          <img src={p.cover!} alt={`${p.title}${p.client ? ` pour ${p.client}` : ""}`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]" />
          <span className="absolute left-4 top-4 rounded-full bg-[#FF9900] px-3 py-1 text-xs font-semibold text-[#080808]">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3 className="h-sec mt-5 text-2xl">{p.title}</h3>
        {p.client && <p className="mt-1 text-[15px] text-[#080808]/65">{p.client}</p>}
      </article>
    </Link>
  );
}
