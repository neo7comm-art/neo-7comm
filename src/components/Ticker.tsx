const words = ["Stratégie marketing", "Communication digitale", "Branding", "Motion design", "Création de sites web", "Intégration de l'IA", "Community management", "Conseil business"];
/** Bandeau défilant : ambiance « agence de conseil » sans chiffre inventé. */
export function Ticker() {
  const row = [...words, ...words];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-white/10 bg-[#080808] py-6">
      <div className="ticker flex w-max gap-12 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="display flex items-center gap-12 text-[clamp(1.6rem,3.4vw,2.6rem)] text-white/85">
            {w}<span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FF9900]" />
          </span>
        ))}
      </div>
    </div>
  );
}
