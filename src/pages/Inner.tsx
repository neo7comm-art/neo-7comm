import { useMemo, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { ButtonExternal, ButtonLink } from "../components/Button";
import { Eyebrow, Reveal, SplitWords } from "../components/Motion";
import { Link } from "../components/Link";
import { services } from "../data/services";
import { categories, projects, type CategoryId } from "../data/portfolio";
import { method, values } from "../data/content";
import { site } from "../config/site";
import { waFrom, waLink } from "../lib/whatsapp";
import { usePageMeta } from "../lib/hooks";
import { assets } from "../config/assets";

function PageHero({ eyebrow, title, accent, lead }: { eyebrow: string; title: string; accent: string[]; lead?: string }) {
  return (
    <section className="relative overflow-hidden bg-[#080808] pb-20 pt-40 text-white md:pb-28 md:pt-52">
      <div className="grid-night absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative">
        <Reveal><Eyebrow dark>{eyebrow}</Eyebrow></Reveal>
        <SplitWords text={title} accent={accent} className="display mt-6 max-w-[16ch] text-[clamp(2.6rem,7vw,6.4rem)]" />
        {lead && <Reveal delay={0.2}><p className="mt-8 max-w-2xl text-lg text-white/75">{lead}</p></Reveal>}
      </div>
    </section>
  );
}

export function Expertises() {
  usePageMeta("Expertises | NEO 7COMM : stratégie, communication, design, vidéo, web",
    "Six expertises : conseil business, stratégie marketing, communication digitale, branding, vidéo et motion design, web et transformation digitale.");
  return (
    <main id="contenu">
      <PageHero eyebrow="Expertises" title="Des expertises qui se répondent." accent={["répondent."]} lead="Six familles de services, pensées pour que chaque action serve votre stratégie globale." />
      <section className="bg-white py-24 md:py-32">
        <div className="container-x space-y-28">
          {services.map((s, i) => (
            <article key={s.id} id={s.id} className="scroll-mt-28 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
              <Reveal>
                <p className="font-display text-sm font-semibold text-[#080808]/60">{s.number}</p>
                <h2 className="h-sec mt-4 text-[clamp(2rem,4.2vw,3.4rem)]">{s.title}</h2>
                <p className="mt-5 text-lg text-[#080808]/75">{s.short}</p>
                <div className="mt-8"><ButtonExternal href={waFrom(`expertise : ${s.title}`, `Je souhaite demander un accompagnement en : ${s.title}.`)} variant="dark" icon="whatsapp" label={`Demander un accompagnement : ${s.title}`}>Demander un accompagnement</ButtonExternal></div>
              </Reveal>
              <Reveal delay={0.1} className="space-y-8">
                <div className="rounded-[28px] border-l-[3px] border-[#FF9900] bg-[#EAEAEA]/60 p-7">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#080808]/60">Le problème</h3>
                  <p className="mt-3 text-[17px]">{s.problem}</p>
                </div>
                <div className="rounded-[28px] bg-[#080808] p-7 text-white">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFC48D]">La valeur</h3>
                  <p className="mt-3 text-[17px] text-white/85">{s.value}</p>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#080808]/60">Livrables</h3>
                    <ul className="mt-3 space-y-2">{s.deliverables.map((d) => <li key={d} className="flex gap-2 text-[16px]"><Check aria-hidden size={18} className="mt-1 shrink-0 text-[#FF9900]" />{d}</li>)}</ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#080808]/60">Ce que nous couvrons</h3>
                    <ul className="mt-3 space-y-2 text-[16px] text-[#080808]/75">{s.items.map((d) => <li key={d}>— {d}</li>)}</ul>
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-[#EAEAEA] py-24">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="h-sec max-w-xl text-[clamp(2rem,4vw,3.2rem)]">Un projet qui ne rentre dans aucune case ?</h2>
          <ButtonLink to="/contact" variant="dark">Demander un devis</ButtonLink>
        </div>
      </section>
    </main>
  );
}

export function Realisations() {
  usePageMeta("Réalisations | NEO 7COMM", "Portfolio de NEO 7COMM : stratégie, identité de marque, design, vidéo, communication digitale et web.");
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const list = useMemo(() => projects.filter((p) => cat === "all" || p.category === cat), [cat]);
  return (
    <main id="contenu">
      <PageHero eyebrow="Réalisations" title="La preuve par le travail." accent={["travail."]} lead="Affiches, identités et visuels réalisés par NEO 7COMM. Les emplacements marqués « Exemple » seront remplacés par de vrais projets." />
      <section className="bg-white py-20">
        <div className="container-x">
          <div role="group" aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2">
            {[{ id: "all" as const, label: "Tout" }, ...categories].map((c) => (
              <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}
                className={`min-h-[44px] rounded-full border px-5 text-[15px] font-medium transition-all duration-300 ${cat === c.id ? "border-[#080808] bg-[#080808] text-white" : "border-[#080808]/20 hover:border-[#080808]"}`}>
                {c.label}
              </button>
            ))}
          </div>
          <motion.ul layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.li layout key={p.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}>
                  <article className="relative lift group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#080808]/10 bg-white">
                    <div className="relative aspect-[4/3] bg-[#080808]">
                      {p.video ? <video src={p.video} controls preload="metadata" aria-label={p.title} className="h-full w-full object-cover" /> : p.cover ? <img src={p.cover} alt={`${p.title}${p.client ? ` pour ${p.client}` : ""}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /> :
                        <div className="grid-night absolute inset-0 flex items-center justify-center"><img src={assets.logoSymbol} alt="" aria-hidden className="w-24 opacity-30 transition-transform duration-700 group-hover:rotate-45" /></div>}
                      {p.isDemo && <span className="absolute left-4 top-4 rounded-full bg-[#FF9900] px-3 py-1 text-xs font-semibold">Exemple de mise en page</span>}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#080808]/50">{categories.find((c) => c.id === p.category)?.label}</p>
                      <h2 className="h-sec mt-2 text-2xl"><Link to={`/realisations/${p.id}`} className="after:absolute after:inset-0">{p.title}</Link></h2>
                      <p className="mt-3 text-[15px] text-[#080808]/70">{p.summary}</p>
                      {p.gallery && p.gallery.length > 1 && <ul className="mt-5 grid grid-cols-4 gap-2" aria-label="Autres visuels du projet">{p.gallery.slice(1).map((g, i) => <li key={i}><img src={g} alt={`${p.title}, visuel ${i + 2}`} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" /></li>)}</ul>}
                      <ul className="mt-4 flex flex-wrap gap-2">{p.deliverables.map((d) => <li key={d} className="tag bg-[#EAEAEA]">{d}</li>)}</ul>
                    </div>
                  </article>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          <p className="mt-12 text-center text-[#080808]/60">Vous avez un projet similaire ? <a className="underline underline-offset-4" href={waFrom("portfolio", "Je souhaite un projet similaire à vos réalisations.")} target="_blank" rel="noopener noreferrer">Écrivez-nous sur WhatsApp</a>.</p>
        </div>
      </section>
    </main>
  );
}

export function APropos() {
  usePageMeta("À propos | NEO 7COMM", "NEO 7COMM : mission, vision, valeurs et méthode. Agence de stratégie, communication et impact basée à Abidjan.");
  return (
    <main id="contenu">
      <PageHero eyebrow="À propos" title="Une agence qui pense comme un cabinet et exécute comme un studio." accent={["cabinet", "studio."]} />
      <section className="bg-white py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="h-sec text-[clamp(2rem,4vw,3.2rem)]">Notre mission</h2>
            <p className="mt-6 text-lg text-[#080808]/80">Aider les entreprises à mieux communiquer, à renforcer leur image, à structurer leur stratégie et à utiliser les outils digitaux pour atteindre leurs objectifs.</p>
            <h2 className="h-sec mt-14 text-[clamp(2rem,4vw,3.2rem)]">Notre vision</h2>
            <p className="mt-6 text-lg text-[#080808]/80">Devenir une référence africaine en stratégie marketing, communication digitale, design et solutions créatives au service de la croissance des organisations.</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[28px] bg-[#080808] p-10 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFC48D]">Notre promesse</p>
            <p className="display mt-6 text-[clamp(2rem,4vw,3.2rem)]">{site.promise}</p>
            <p className="mt-8 text-white/70">Dirigée par {site.ceo}. Basée à {site.market}.</p>
          </Reveal>
        </div>
      </section>
      <section className="bg-[#EAEAEA] py-24">
        <div className="container-x">
          <h2 className="h-sec text-[clamp(2rem,4vw,3.2rem)]">Nos valeurs</h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[28px] bg-[#080808]/10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.05} className="bg-[#EAEAEA] p-8">
                <p className="font-display text-sm font-semibold text-[#080808]/60">0{i + 1}</p>
                <h3 className="h-sec mt-4 text-2xl">{v.title}</h3>
                <p className="mt-3 text-[16px] text-[#080808]/70">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="container-x">
          <h2 className="h-sec text-[clamp(2rem,4vw,3.2rem)]">Notre méthode</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {method.map((m) => <li key={m.n} className="border-t-2 border-[#080808] pt-6"><p className="font-display text-sm text-[#FF9900] font-semibold">{m.n}</p><h3 className="h-sec mt-3 text-2xl">{m.title}</h3><p className="mt-3 text-[16px] text-[#080808]/70">{m.text}</p></li>)}
          </ol>
          <div className="mt-14"><ButtonLink to="/contact" variant="dark">Parler de votre projet</ButtonLink></div>
        </div>
      </section>
    </main>
  );
}

const PROJECT_TYPES = ["Stratégie marketing", "Conseil business", "Community management", "Création d'identité visuelle", "Création de site web", "Vidéo et motion design", "Infographie et design", "Autre"];
const BUDGETS = ["Non précisé", "Moins de 250 000 FCFA", "250 000 à 1 000 000 FCFA", "1 000 000 à 3 000 000 FCFA", "Plus de 3 000 000 FCFA"];

export function Contact() {
  usePageMeta("Contact et devis | NEO 7COMM", "Demandez un devis à NEO 7COMM ou discutez directement sur WhatsApp.");
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", service: "", budget: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Indiquez votre nom.";
    if (!/^\+?[0-9 ()-]{8,}$/.test(form.phone.trim())) e.phone = "Un numéro valide est nécessaire pour vous recontacter.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Adresse e-mail invalide.";
    if (form.message.trim().length < 15) e.message = "Décrivez votre besoin en quelques lignes (15 caractères minimum).";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const message = useMemo(() => [
    "Bonjour NEO 7COMM, demande de devis depuis le site web.",
    `Nom : ${form.name}`, form.company && `Entreprise : ${form.company}`, `Téléphone : ${form.phone}`,
    form.email && `E-mail : ${form.email}`, form.service && `Service : ${form.service}`,
    form.budget && form.budget !== "Non précisé" && `Budget indicatif : ${form.budget}`,
    `Besoin : ${form.message}`].filter(Boolean).join("\n"), [form]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(waLink(message), "_blank", "noopener,noreferrer");
    setDone(true);
  };
  return (
    <main id="contenu">
      <PageHero eyebrow="Contact & devis" title="Parlons de votre projet." accent={["projet."]} lead="Le plus rapide : écrivez-nous sur WhatsApp. Ou remplissez le formulaire, il prépare votre demande pour WhatsApp." />
      <section className="bg-white py-24">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="space-y-8">
            <div className="rounded-[28px] bg-[#080808] p-8 text-white">
              <p className="h-sec text-2xl">Le plus rapide</p>
              <p className="mt-3 text-white/70">WhatsApp {site.whatsappDisplay}</p>
              <div className="mt-6"><ButtonExternal href={waFrom("page contact")} variant="orange" icon="whatsapp">Discuter sur WhatsApp</ButtonExternal></div>
            </div>
            <div className="rounded-[28px] bg-[#EAEAEA] p-8">
              <p className="h-sec text-2xl">Par téléphone</p>
              <p className="mt-3"><a className="underline underline-offset-4" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a></p>
              <p className="mt-3 text-[#080808]/75">{site.market}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {done ? (
              <div role="status" className="rounded-[28px] border border-[#080808]/10 p-10">
                <p className="h-sec text-3xl">Merci {form.name.split(" ")[0]} !</p>
                <p className="mt-4 text-[#080808]/75">Votre demande est prête dans WhatsApp. Envoyez simplement le message pour que nous puissions vous répondre. Si la fenêtre ne s'est pas ouverte, <a className="underline" href={waLink(message)} target="_blank" rel="noopener noreferrer">cliquez ici</a>.</p>
                <button type="button" onClick={() => { setDone(false); setForm({ name: "", company: "", phone: "", email: "", service: "", budget: "", message: "" }); }} className="mt-8 underline underline-offset-4">Faire une autre demande</button>
              </div>
            ) : (
              <form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2" aria-label="Demande de devis">
                <Field id="name" label="Nom complet *" error={errors.name}><input id="name" className="input" autoComplete="name" value={form.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} /></Field>
                <Field id="company" label="Entreprise"><input id="company" className="input" autoComplete="organization" value={form.company} onChange={set("company")} /></Field>
                <Field id="phone" label="Téléphone (WhatsApp) *" error={errors.phone}><input id="phone" type="tel" className="input" autoComplete="tel" value={form.phone} onChange={set("phone")} aria-invalid={!!errors.phone} /></Field>
                <Field id="email" label="E-mail (facultatif)" error={errors.email}><input id="email" type="email" className="input" autoComplete="email" value={form.email} onChange={set("email")} aria-invalid={!!errors.email} /></Field>
                <Field id="service" label="Service recherché"><select id="service" className="input" value={form.service} onChange={set("service")}><option value="">Choisir</option>{PROJECT_TYPES.map((p) => <option key={p}>{p}</option>)}</select></Field>
                <Field id="budget" label="Budget indicatif (facultatif)"><select id="budget" className="input" value={form.budget} onChange={set("budget")}><option value="">Choisir</option>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select></Field>
                <Field id="message" label="Description du besoin *" error={errors.message} full><textarea id="message" className="input" value={form.message} onChange={set("message")} aria-invalid={!!errors.message} /></Field>
                <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-[#080808]/60">* Champs obligatoires. Aucune donnée n'est stockée sur ce site : votre demande est transmise via WhatsApp.</p>
                  <button type="submit" className="btn btn-dark"><MessageCircle size={18} aria-hidden />Préparer ma demande</button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Field({ id, label, error, children, full }: { id: string; label: string; error?: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-2 block text-[15px] font-medium">{label}</label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-2 text-sm font-medium text-[#080808] underline decoration-[#FF9900] decoration-2 underline-offset-4">{error}</p>}
    </div>
  );
}

export function Legal({ kind }: { kind: "mentions" | "confidentialite" }) {
  const isMentions = kind === "mentions";
  usePageMeta(isMentions ? "Mentions légales | NEO 7COMM" : "Politique de confidentialité | NEO 7COMM", "Informations légales et gestion des données personnelles.");
  return (
    <main id="contenu">
      <PageHero eyebrow="Légal" title={isMentions ? "Mentions légales" : "Politique de confidentialité"} accent={[]} />
      <section className="bg-white py-24">
        <div className="container-x max-w-3xl space-y-6 text-[17px] text-[#080808]/85">
          {isMentions ? <>
            <p><strong>Éditeur du site :</strong> NEO 7COMM, {site.market}. Responsable de publication : {site.ceo}.</p>
            <p><strong>Immatriculation et adresse postale :</strong> <mark className="bg-[#FF9900]/30">[À COMPLÉTER : numéro d'enregistrement et adresse, non fournis]</mark></p>
            <p><strong>Contact :</strong> WhatsApp {site.whatsappDisplay}, téléphone {site.phoneDisplay}.</p>
            <p><strong>Hébergement :</strong> <mark className="bg-[#FF9900]/30">[À COMPLÉTER : nom et adresse de l'hébergeur]</mark></p>
            <p><strong>Propriété intellectuelle :</strong> les textes, visuels, logo et contenus du site sont la propriété de NEO 7COMM. Toute reproduction sans accord écrit est interdite.</p>
          </> : <>
            <p>Ce site ne collecte aucune donnée via un formulaire tant qu'aucun service d'envoi n'est configuré. Les informations saisies dans le formulaire de devis servent uniquement à préparer un message WhatsApp, que vous envoyez vous-même.</p>
            <p>Les données échangées sur WhatsApp sont traitées selon les conditions de WhatsApp. Pour toute demande d'accès, de rectification ou de suppression, contactez-nous via WhatsApp.</p>
            <p><mark className="bg-[#FF9900]/30">[À COMPLÉTER : finalité, durée de conservation et base légale, à valider avec votre conseiller juridique.]</mark></p>
          </>}
        </div>
      </section>
    </main>
  );
}
