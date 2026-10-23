import { motion } from "framer-motion";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import { ButtonExternal, ButtonLink } from "../components/Button";
import { Eyebrow, Reveal } from "../components/Motion";
import { Link } from "../components/Link";
import { categories, projects } from "../data/portfolio";
import { services } from "../data/services";
import { waLink } from "../lib/whatsapp";
import { usePageMeta } from "../lib/hooks";

/** Page détaillée d'un projet regroupé (une page par projet, toutes ses images). */
export function ProjectPage({ id }: { id: string }) {
  const p = projects.find((x) => x.id === id && !x.isDemo);
  const title = p ? p.title : "Projet introuvable";
  usePageMeta(`${title} | NEO 7COMM`, p?.summary ?? "Réalisation NEO 7COMM.");
  if (!p) {
    return (
      <main id="contenu" className="container-x py-40">
        <h1 className="h-sec text-4xl">Ce projet n'existe pas.</h1>
        <div className="mt-8"><ButtonLink to="/realisations" variant="dark">Retour aux réalisations</ButtonLink></div>
      </main>
    );
  }
  const images = [p.cover, ...(p.gallery ?? [])].filter((x, i, a): x is string => !!x && a.indexOf(x) === i);
  const cat = categories.find((c) => c.id === p.category)?.label;
  const related = services.filter((s) => s.title.toLowerCase().includes((cat ?? "").split(" ")[0].toLowerCase())).slice(0, 1);
  return (
    <main id="contenu">
      <section className="relative overflow-hidden bg-[#080808] pb-16 pt-36 text-white md:pt-44">
        <div className="container-x">
          <Link to="/realisations" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"><ArrowLeft size={16} aria-hidden />Toutes les réalisations</Link>
          <Reveal><Eyebrow dark>{cat}{p.client ? ` · ${p.client}` : ""}</Eyebrow></Reveal>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="display mt-6 max-w-[18ch] text-[clamp(2.6rem,6.4vw,5.6rem)]">{p.title}</motion.h1>
          <Reveal delay={0.15}><p className="mt-8 max-w-2xl text-lg text-white/80">{p.summary}</p></Reveal>
        </div>
      </section>
      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal className="space-y-10">
            {p.objectives.length > 0 && <div><h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#080808]/60">Objectifs</h2><ul className="mt-4 space-y-3">{p.objectives.map((o) => <li key={o} className="flex gap-2 text-[17px]"><Check aria-hidden size={18} className="mt-1 shrink-0 text-[#FF9900]" />{o}</li>)}</ul></div>}
            {p.deliverables.length > 0 && <div><h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#080808]/60">Livrables</h2><ul className="mt-4 flex flex-wrap gap-2">{p.deliverables.map((d) => <li key={d} className="tag bg-[#EAEAEA]">{d}</li>)}</ul></div>}
            <div className="rounded-[28px] bg-[#080808] p-8 text-white">
              <p className="h-sec text-2xl">Un projet similaire ?</p>
              <p className="mt-3 text-white/75">Parlons de vos objectifs, nous vous répondons sur WhatsApp.</p>
              <div className="mt-6"><ButtonExternal href={waLink(`Bonjour NEO 7COMM, je souhaite un projet proche de « ${p.title} » (vu sur votre site).`)} variant="orange" icon="whatsapp">Discuter de mon projet</ButtonExternal></div>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {video(p)}
            {images.map((src, i) => (
              <Reveal key={src} delay={i * 0.06} className={i === 0 && !p.video ? "sm:col-span-2" : ""}>
                <img src={src} alt={`${p.title}, visuel ${i + 1}`} loading="lazy" className="w-full rounded-[28px] object-cover transition-transform duration-700 hover:scale-[1.02]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#EAEAEA] py-20">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="h-sec text-[clamp(2rem,4vw,3.2rem)]">Votre projet, notre prochaine réalisation.</p>
            {related.length > 0 && <p className="mt-3 text-[#080808]/70">Découvrez aussi : <Link to={`/expertises#${related[0].id}`} className="underline underline-offset-4">{related[0].title}</Link></p>}
          </div>
          <ButtonLink to="/contact" variant="dark">Demander un devis</ButtonLink>
        </div>
      </section>
    </main>
  );
}

function video(p: (typeof projects)[number]) {
  if (!p.video) return null;
  return (
    <Reveal key="video" className="sm:col-span-2">
      <video src={p.video} controls preload="metadata" className="w-full rounded-[28px] bg-[#080808]" aria-label={p.title} />
    </Reveal>
  );
}
