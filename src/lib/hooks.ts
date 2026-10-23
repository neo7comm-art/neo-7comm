import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
export function useMedia(query: string, initial = false) {
  const [m, setM] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setM(mq.matches);
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return m;
}
/** true si on peut jouer les animations liées au scroll (desktop/tablette et pas de mouvement réduit). */
export function useCinematic(minWidth = 768) {
  const reduce = useReducedMotion();
  const wide = useMedia(`(min-width: ${minWidth}px)`);
  return !reduce && wide;
}
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
    m.setAttribute("content", description);
  }, [title, description]);
}
