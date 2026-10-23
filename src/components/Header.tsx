import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { Link, usePathname } from "./Link";
import { assets } from "../config/assets";
import { site } from "../config/site";
import { waFrom } from "../lib/whatsapp";

export const nav = [
  { to: "/expertises", label: "Expertises" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact & devis" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className={`mx-auto flex h-[64px] max-w-[1200px] items-center justify-between rounded-full pl-5 pr-2 transition-all duration-500 ${scrolled || open ? "bg-[#080808]/90 shadow-[0_10px_40px_rgba(0,0,0,.25)] backdrop-blur-md" : "bg-[#080808]/40 backdrop-blur-sm"}`}>
        <Link to="/" aria-label="NEO 7COMM, accueil" className="flex items-center">
          <img src={assets.logoHeader} alt="NEO 7COMM" width={579} height={140} className="h-8 w-auto sm:h-9" />
        </Link>
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => {
              const active = path === n.to;
              return (
                <li key={n.to}>
                  <Link to={n.to} aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${active ? "text-[#FF9900]" : "text-white/80 hover:text-white"}`}>
                    {n.label}
                    {active && <motion.span layoutId="navdot" className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#FF9900]" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={waFrom("en-tête du site")} target="_blank" rel="noopener noreferrer" className="btn btn-orange !min-h-[48px] !px-5 !text-[15px]">
            <MessageCircle size={18} aria-hidden /> <span className="hidden sm:inline">WhatsApp</span><span className="sr-only sm:hidden">Écrire sur WhatsApp</span>
          </a>
          <button ref={btn} type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu-mobile"
            className="flex h-12 w-12 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden">
            {open ? <X aria-hidden /> : <Menu aria-hidden />}<span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="menu-mobile" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
            className="mx-auto mt-2 max-w-[1200px] rounded-[28px] bg-[#080808] p-6 text-white shadow-2xl lg:hidden">
            <nav aria-label="Navigation mobile">
              <ul className="space-y-1">
                <li><Link to="/" className="block rounded-2xl px-3 py-3 font-display text-2xl font-semibold tracking-tight">Accueil</Link></li>
                {nav.map((n) => (
                  <li key={n.to}><Link to={n.to} aria-current={path === n.to ? "page" : undefined}
                    className={`block rounded-2xl px-3 py-3 font-display text-2xl font-semibold tracking-tight ${path === n.to ? "text-[#FF9900]" : ""}`}>{n.label}</Link></li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 grid gap-3 border-t border-white/10 pt-6">
              <a href={waFrom("menu mobile")} target="_blank" rel="noopener noreferrer" className="btn btn-orange w-full"><MessageCircle size={18} aria-hidden />Discuter sur WhatsApp</a>
              <a href={`tel:${site.phoneTel}`} className="btn btn-outline-light w-full"><Phone size={18} aria-hidden />Appeler le {site.phoneDisplay}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
