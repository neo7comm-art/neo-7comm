/**
 * CONFIGURATION CENTRALE DU SITE NEO 7COMM
 * Modifiez ici les numéros, réseaux sociaux et paramètres de contact.
 * Tous les boutons du site lisent ces valeurs.
 */
export const site = {
  name: "NEO 7COMM",
  signature: "Stratégie, Communication, Impacte",
  promise: "Votre vision. Notre expertise. Des possibilités infinies.",
  ceo: "Ephreme Ohao Nohone",
  market: "Abidjan, Côte d'Ivoire",

  /** Numéro WhatsApp au format international SANS « + » ni espaces (utilisé par wa.me). */
  whatsappNumber: "2250712394279",
  whatsappDisplay: "+225 07 12 39 42 79",

  /** Numéro pour les appels (lien tel:). */
  phoneTel: "+2250554938409",
  phoneDisplay: "+225 05 54 93 84 09",

  /** E-mail public : laissez vide tant qu'il n'est pas confirmé (il sera masqué). */
  email: "",

  /**
   * Optionnel : URL d'un service de formulaire (Formspree, Getform, votre API...).
   * Vide = le formulaire de devis génère un message WhatsApp prérempli.
   */
  formEndpoint: "",

  /** Réseaux sociaux : un lien vide n'est pas affiché. */
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/share/14sr8RK4hZE/" },
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "TikTok", href: "https://www.tiktok.com/@neo.7comm" },
  ],
} as const;

export type Social = (typeof site.socials)[number];
export const activeSocials = site.socials.filter((s) => s.href.trim() !== "");
