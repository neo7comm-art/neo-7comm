import { site } from "../config/site";

/** Construit un lien WhatsApp avec message prérempli. */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Message standard qui précise la provenance de la demande. */
export function waFrom(source: string, detail?: string): string {
  const base = `Bonjour NEO 7COMM, je vous contacte depuis votre site web (${source}).`;
  return waLink(detail ? `${base}\n${detail}` : `${base}\nJ'aimerais échanger sur mon projet.`);
}
