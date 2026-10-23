import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ButtonExternal, ButtonLink } from "../components/Button";
import { NodeField } from "../components/NodeField";
import { Eyebrow, Reveal, SplitWords } from "../components/Motion";
import { services } from "../data/services";
import { projects } from "../data/portfolio";
import { Ticker } from "../components/Ticker";
import { HorizontalShowcase } from "../components/HorizontalShowcase";
import { approach, method, problems, problemsConclusion } from "../data/content";
import { site } from "../config/site";
import { waFrom } from "../lib/whatsapp";
import { useCinematic, usePageMeta } from "../lib/hooks";
import { Link } from "../components/Link";

export function Home() {
  usePageMeta("NEO 7COMM | Stratégie, communication, impact : agence à Abidjan",
    "NEO 7COMM accompagne les entreprises en stratégie marketing, communication digitale, branding, vidéo et création de sites web. Abidjan, Côte d'Ivoire.");
  return (
    <main id="contenu">
      <Hero />
      <Ticker />
      <Problems />
      <Approach />
      <Services />
      <Method />
      <HorizontalShowcase />
      <FinalCTA />
    </main>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const cinematic = useCinematic();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, cinematic ? 140 : 0]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative min-h-[100svh] overflow-hidden bg-[#080808] pt-32 text-white md:pt-0">
      <div className="grid-night absolute inset-0 opacity-70" aria-hidden />
      <NodeField progress={scrollYProgress} className="pointer-events-none absolute right-[-18%] top-1/2 hidden h-[min(120vh,980px)] w-[min(120vh,980px)] -translate-y-1/2 md:block" />
      <motion.div style={{ y, opacity: fade }} className="container-x relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-10 md:pb-32">
        <Eyebrow dark>Agence de stratégie et de communication · Abidjan</Eyebrow>
        <h1 id="hero-title" className="display mt-8 max-w-[11ch] text-[clamp(2.9rem,8.2vw,7.4rem)]">
          <SplitWords text="Votre ambition mérite une stratégie à sa hauteur." accent={["stratégie", "hauteur."]} delay={0.1} as="span" />
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 max-w-xl text-[18px] leading-relaxed text-white/75">
          Nous aidons les entreprises à clarifier leur vision, renforcer leur marque et transformer leur potentiel en croissance.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonExternal href={waFrom("accueil", "Je souhaite parler de mon projet.")} variant="orange" icon="whatsapp">Parlons de votre projet</ButtonExternal>
          <ButtonLink to="/expertises" variant="outline-light">Découvrir nos expertises</ButtonLink>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mt-16 font-display text-sm tracking-wide text-white/50">
          {site.promise}
        </motion.p>
      </motion.div>
    </section>
  );
}

function Problems() {
  const ref = useRef<HTMLElement>(null);
  const cinematic = useCinematic();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!cinematic) return;
    return scrollYProgress.on("change", (v) => setActive(v < 0.3 ? 0 : v < 0.55 ? 1 : 2));
  }, [cinematic, scrollYProgress]);
  const sticky = cinematic;
  return (
    <section ref={ref} aria-labelledby="problems-title" className="relative bg-white">
      <div className={sticky ? "relative h-[210vh]" : ""}>
        <div className={`${sticky ? "sticky top-0 h-[100svh]" : "py-24"} container-x flex flex-col justify-center`}>
          <Reveal><Eyebrow>Le constat</Eyebrow></Reveal>
          <h2 id="problems-title" className="sr-only">Les défis des dirigeants</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.1fr]">
            <div className="space-y-6">
              {problems.map((p, i) => {
                const on = !sticky || active === i;
                return (
                  <motion.p key={i} animate={{ opacity: on ? 1 : 0.22, x: on ? 0 : 8 }} transition={{ duration: 0.5 }}
                    className="display text-[clamp(1.9rem,4.4vw,3.8rem)] text-[#080808]">
                    {p.lead} <span className={`mark ${on ? "on" : ""} font-semibold`}>{p.mark}</span>{p.end}
                  </motion.p>
                );
              })}
            </div>
            <div className="flex items-end">
              <Reveal delay={0.1}>
                <p className="h-sec max-w-md text-[clamp(1.6rem,2.8vw,2.4rem)]">{problemsConclusion}</p>
                <div className="mt-8"><ButtonLink to="/a-propos" variant="dark">Notre approche</ButtonLink></div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const dims = approach;
  return (
    <section aria-labelledby="approach-title" className="relative overflow-hidden bg-[#080808] py-28 text-white md:py-40">
      <div className="grid-night absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative">
        <Reveal><Eyebrow dark>Notre approche</Eyebrow></Reveal>
        <h2 id="approach-title" className="h-sec mt-6 max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)]">Trois dimensions. <span className="text-[#FF9900]">Une seule direction.</span></h2>
        <ol className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 md:grid-cols-3">
          {dims.map((d, i) => (
            <Reveal as="li" key={d.n} delay={i * 0.12} className="group relative flex min-h-[380px] flex-col justify-between bg-[#080808] p-8 transition-colors duration-500 hover:bg-[#141414] md:p-10">
              <span className="font-display text-sm font-semibold tracking-widest text-white/50">{d.n}</span>
              <div>
                <p className={`display text-[clamp(2.4rem,5vw,4.2rem)] leading-[.9] ${d.style === "outline" ? "stroke-text" : d.style === "accent" ? "text-[#FF9900]" : "text-white"}`}>{d.word}</p>
                <p className="mt-6 space-y-1 text-[17px] text-white/75">
                  {d.verbs.map((v) => <span key={v} className="block">{v}.</span>)}
                </p>
              </div>
              <span aria-hidden className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#FF9900] transition-all duration-700 group-hover:w-full" />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section aria-labelledby="services-title" className="bg-white py-28 md:py-40">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal><Eyebrow>Expertises</Eyebrow></Reveal>
            <h2 id="services-title" className="h-sec mt-6 max-w-2xl text-[clamp(2.2rem,5vw,4.2rem)]">Six expertises, un même objectif : votre croissance.</h2>
          </div>
          <Reveal delay={0.1}><ButtonLink to="/expertises" variant="outline-dark">Toutes les expertises</ButtonLink></Reveal>
        </div>
        <ul className="mt-16 divide-y divide-[#080808]/10 border-y border-[#080808]/10">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.05}>
              <Link to={`/expertises#${s.id}`} className="group grid items-center gap-4 py-7 transition-colors duration-300 hover:bg-[#EAEAEA]/60 md:grid-cols-[80px_1fr_1fr_40px] md:px-4">
                <span className="font-display text-sm font-semibold text-[#080808]/60">{s.number}</span>
                <span className="h-sec text-[clamp(1.5rem,2.8vw,2.2rem)] transition-transform duration-500 group-hover:translate-x-2">{s.title}</span>
                <span className="text-[16px] text-[#080808]/75">{s.short}</span>
                <ArrowRight aria-hidden className="justify-self-end text-[#FF9900] opacity-0 transition-all duration-300 group-hover:opacity-100 md:justify-self-auto" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section aria-labelledby="method-title" className="grid-paper bg-[#EAEAEA] py-28 md:py-40">
      <div className="container-x">
        <Reveal><Eyebrow>Notre méthode</Eyebrow></Reveal>
        <h2 id="method-title" className="h-sec mt-6 max-w-2xl text-[clamp(2.2rem,5vw,4.2rem)]">Quatre étapes. Aucune zone floue.</h2>
        <ol className="relative mt-16 grid gap-6 md:grid-cols-4">
          <span aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-[#080808]/15 md:block" />
          {method.map((m, i) => (
            <Reveal as="li" key={m.n} delay={i * 0.1} className="relative rounded-[28px] bg-white p-7 shadow-[0_8px_48px_rgba(0,0,0,.06)]">
              <span className="relative z-10 inline-flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#080808] font-display text-sm font-semibold text-[#FF9900]">{m.n}</span>
              <h3 className="h-sec mt-8 text-2xl">{m.title}</h3>
              <p className="mt-3 text-[16px] text-[#080808]/70">{m.text}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-14"><ButtonLink to="/a-propos" variant="dark">Découvrir qui nous sommes</ButtonLink></Reveal>
      </div>
    </section>
  );
}

function Showcase() {
  const picks = projects.slice(0, 3);
  return (
    <section aria-labelledby="show-title" className="bg-white py-28 md:py-40">
      <div className="container-x">
        <Reveal><Eyebrow>Réalisations</Eyebrow></Reveal>
        <h2 id="show-title" className="h-sec mt-6 max-w-2xl text-[clamp(2.2rem,5vw,4.2rem)]">La preuve par le travail.</h2>
        <p className="mt-4 max-w-xl text-[#080808]/75">Les réalisations ci-dessous sont des emplacements de démonstration. Nos vrais projets arrivent très bientôt.</p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {picks.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <Link to="/realisations" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#080808]">
                  <div className="grid-night absolute inset-0" aria-hidden />
                  <span className="absolute left-5 top-5 rounded-full bg-[#FF9900] px-3 py-1 text-xs font-semibold text-[#080808]">Démo</span>
                  <p className="display absolute bottom-6 left-6 right-6 text-3xl text-white transition-transform duration-500 group-hover:-translate-y-2">{p.title}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-[#080808] py-32 text-white md:py-44">
      <div className="grid-night absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative text-center">
        <Reveal><Eyebrow dark>Passons à l'action</Eyebrow></Reveal>
        <h2 id="cta-title" className="display mx-auto mt-6 max-w-[14ch] text-[clamp(2.6rem,7vw,6rem)]">Votre prochain niveau commence par une <span className="text-[#FF9900]">conversation.</span></h2>
        <Reveal delay={0.1}><p className="mx-auto mt-8 max-w-xl text-lg text-white/75">Parlons de vos objectifs, de vos défis et des opportunités de croissance de votre entreprise.</p></Reveal>
        <Reveal delay={0.2} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonExternal href={waFrom("CTA final", "Je souhaite discuter de mes objectifs.")} variant="orange" icon="whatsapp" label="Discuter avec NEO 7COMM sur WhatsApp">Discuter avec NEO 7COMM</ButtonExternal>
          <ButtonLink to="/contact" variant="outline-light">Demander un devis</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
