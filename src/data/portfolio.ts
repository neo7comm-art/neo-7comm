import motionVideo from "../assets/portfolio/motion-neo7comm.mp4";
import kim from "../assets/portfolio/kim-divine.jpg";
import ew from "../assets/portfolio/easy-work-logo.jpg";
import ewm from "../assets/portfolio/easy-work-mockup.jpg";
import ewa from "../assets/portfolio/easy-work-alt.jpg";
import pf from "../assets/portfolio/peak-fit.jpg";
import pfa from "../assets/portfolio/peak-fit-alt.jpg";
import pf3 from "../assets/portfolio/peak-fit-3.jpg";
import kick from "../assets/portfolio/kick-start.jpg";
import spk from "../assets/portfolio/speakers.jpg";
import t2 from "../assets/portfolio/thumb-02.jpg";
import t3 from "../assets/portfolio/thumb-03.jpg";
import t4 from "../assets/portfolio/thumb-04.jpg";
import t1 from "../assets/portfolio/thumb-01.jpg";
import kar from "../assets/portfolio/karate.jpg";
import mc from "../assets/portfolio/masterclass.jpg";
import rej from "../assets/portfolio/rejouissance.jpg";
import fem from "../assets/portfolio/femme-poete.jpg";
import c7 from "../assets/portfolio/creation-07.jpg";
import c8 from "../assets/portfolio/creation-08.jpg";
import c9 from "../assets/portfolio/creation-09.jpg";
import beh from "../assets/portfolio/gallery-01.jpg";

/**
 * PORTFOLIO : une entrée = un projet. `cover` = visuel principal, `gallery` = toutes les images du projet.
 * Pour ajouter une réalisation : copiez une entrée, mettez isDemo: false et renseignez les images.
 * Les entrées isDemo: true sont des exemples de mise en page, jamais de vrais clients.
 */
export type CategoryId = "strategie" | "identite" | "design" | "video" | "digital" | "web";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "strategie", label: "Stratégie et marketing" },
  { id: "identite", label: "Identité de marque" },
  { id: "design", label: "Design graphique" },
  { id: "video", label: "Vidéo et motion design" },
  { id: "digital", label: "Communication digitale" },
  { id: "web", label: "Web et expérience utilisateur" },
];

export type Project = {
  id: string;
  title: string;
  category: CategoryId;
  isDemo: boolean;
  client: string | null;
  summary: string;
  objectives: string[];
  deliverables: string[];
  cover: string | null;
  gallery?: string[];
  video?: string;
};

export const projects: Project[] = [
  { id: "motion-neo7comm", title: "Vidéo motion design NEO 7COMM", category: "video", isDemo: false, client: "NEO 7COMM", summary: "Spot de présentation animé de 25 secondes : transitions, typographie et effets sonores.", objectives: [], deliverables: ["Motion design", "Montage", "Voix off et sound design"], cover: null, video: motionVideo },
  { id: "femme-poete", title: "Spectacle Femme Poète : slam et poésie", category: "design", isDemo: false, client: "Institut Français Abidjan-Plateau", summary: "Affiche d\'un spectacle de slam et de poésie, avec lieu et contacts de réservation.", objectives: [], deliverables: [], cover: fem },
  { id: "kim-divine", title: "Affiche Kim-Divine Services", category: "design", isDemo: false, client: "Kim-Divine Services", summary: "Affiche de services automobiles : équilibrage, parallélisme, pneus, batteries.", objectives: [], deliverables: ["Affiche"], cover: kim },
  { id: "easy-work", title: "Identité visuelle Easy Work", category: "identite", isDemo: false, client: "Easy Work", summary: "Logo, monogramme et mise en situation pour Easy Work.", objectives: [], deliverables: ["Logo","Monogramme","Mockups"], cover: ew, gallery: [ew, ewa, ewm] },
  { id: "peak-fit", title: "Identité Peak-Fit", category: "identite", isDemo: false, client: "Peak-Fit", summary: "Logo haltère et déclinaisons pour une marque de fitness, jusqu\'au textile.", objectives: [], deliverables: ["Logo","Application textile"], cover: pf, gallery: [pf, pfa, pf3] },
  { id: "thrive-together", title: "Kick Start : Thrive Together", category: "digital", isDemo: false, client: null, summary: "Visuels de conférence : affiche et programme des intervenants.", objectives: [], deliverables: ["Visuel événement","Programme intervenants"], cover: kick, gallery: [kick, spk] },
  { id: "love-and-faith", title: "Miniatures vidéo Love and Faith", category: "digital", isDemo: false, client: null, summary: "Miniatures de chaîne vidéo pour une diffusion YouTube.", objectives: [], deliverables: ["Miniatures YouTube"], cover: t2, gallery: [t2, t3, t4] },
  { id: "karate-challenge", title: "Karaté Challenge 2025", category: "design", isDemo: false, client: "Karaté Challenge", summary: "Affiche d\'événement sportif avec date, tarifs et contacts.", objectives: [], deliverables: ["Affiche","Visuel réseaux sociaux"], cover: kar },
  { id: "masterclass-parole", title: "Masterclass : Maître de la parole en public", category: "design", isDemo: false, client: null, summary: "Affiche de masterclass avec intervenants, horaires et tarifs.", objectives: [], deliverables: ["Affiche"], cover: mc },
  { id: "rejouissance-26", title: "Affiche Réjouissance 26", category: "design", isDemo: false, client: null, summary: "Affiche de rassemblement avec thèmes, date et lieu.", objectives: [], deliverables: ["Affiche"], cover: rej },
  { id: "programme-sunday", title: "Visuel de programme Sunday", category: "digital", isDemo: false, client: null, summary: "Visuel de programme pour une diffusion en ligne.", objectives: [], deliverables: ["Visuel"], cover: t1 },
  { id: "galerie-behance", title: "Galerie de réalisations", category: "digital", isDemo: false, client: null, summary: "Présentation de réalisations en galerie en ligne.", objectives: [], deliverables: ["Galerie"], cover: beh },
  { id: "creation-07", title: "Visuel de création : réseaux sociaux", category: "digital", isDemo: false, client: null, summary: "Visuel de communication digitale pour réseaux sociaux.", objectives: [], deliverables: ["Visuel"], cover: c7 },
  { id: "creation-08", title: "Visuel de création : campagne", category: "design", isDemo: false, client: null, summary: "Visuel de campagne réalisé par NEO 7COMM.", objectives: [], deliverables: ["Visuel"], cover: c8 },
  { id: "creation-09", title: "Visuel de création : affiche", category: "design", isDemo: false, client: null, summary: "Affiche de communication réalisée par NEO 7COMM.", objectives: [], deliverables: ["Affiche"], cover: c9 },
  { id: "exemple-strategie", title: "Plan de croissance d\'une PME de services", category: "strategie", isDemo: true, client: null, summary: "Exemple de mise en page : présentez ici une mission de conseil ou un plan marketing.", objectives: [], deliverables: ["Audit","Feuille de route"], cover: null },
  { id: "exemple-video", title: "Spot motion design de 25 secondes", category: "video", isDemo: true, client: null, summary: "Exemple de mise en page : présentez ici une vidéo, un spot ou une animation.", objectives: [], deliverables: ["Script","Animation"], cover: null },
  { id: "exemple-web", title: "Site vitrine orienté prise de contact", category: "web", isDemo: true, client: null, summary: "Exemple de mise en page : présentez ici un site web ou une interface UX/UI.", objectives: [], deliverables: ["Maquettes UX/UI","Développement"], cover: null },
];
