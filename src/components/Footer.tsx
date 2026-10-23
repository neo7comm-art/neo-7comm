import { MessageCircle, Phone, Mail } from "lucide-react";
import { Link } from "./Link";
import { nav } from "./Header";
import { assets } from "../config/assets";
import { activeSocials, site } from "../config/site";
import { waFrom } from "../lib/whatsapp";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#080808] text-white">
      <div className="container-x grid gap-14 py-20 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <img src={assets.logoFull} alt="NEO 7COMM — Stratégie, Communication, Impacte" width={1200} height={884} loading="lazy" className="h-auto w-[210px]" />
          <p className="mt-6 max-w-xs text-[15px] text-white/80">{site.promise}</p>
          <p className="mt-2 text-[15px] text-white/80">Agence de communication en Côte d'Ivoire, au service de l'Afrique francophone et au-delà.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFC48D]">Navigation</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li><Link to="/" className="text-white/75 hover:text-white">Accueil</Link></li>
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="text-white/75 hover:text-white">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFC48D]">Contact</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li><a href={waFrom("pied de page")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/75 hover:text-white"><MessageCircle size={16} aria-hidden />WhatsApp {site.whatsappDisplay}</a></li>
            <li><a href={`tel:${site.phoneTel}`} className="inline-flex items-center gap-2 text-white/75 hover:text-white"><Phone size={16} aria-hidden />Appel {site.phoneDisplay}</a></li>
            {site.email && <li><a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-white/75 hover:text-white"><Mail size={16} aria-hidden />{site.email}</a></li>}
            <li className="text-white/70">{site.market}</li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFC48D]">Réseaux</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            {activeSocials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">{s.label}</a></li>)}
          </ul>
          <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-[#FFC48D]">Légal</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li><Link to="/mentions-legales" className="text-white/75 hover:text-white">Mentions légales</Link></li>
            <li><Link to="/confidentialite" className="text-white/75 hover:text-white">Politique de confidentialité</Link></li>
          </ul>
        </div>
      </div>
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <p className="display whitespace-nowrap text-center text-[19vw] leading-[.8] text-white/[0.06]">NEO7COMM</p>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-white/70 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} NEO 7COMM. Tous droits réservés.</p>
        <p>{site.signature}</p>
      </div>
    </footer>
  );
}
