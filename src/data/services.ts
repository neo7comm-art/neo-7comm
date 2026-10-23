export type Service = {
  id: string;
  number: string;
  title: string;
  short: string;
  problem: string;
  value: string;
  deliverables: string[];
  items: string[];
};

export const services: Service[] = [
  {
    id: "conseil-strategie",
    number: "01",
    title: "Conseil business et stratégie",
    short: "Clarifier où aller, et comment y aller.",
    problem:
      "Votre entreprise grandit, mais les décisions se prennent au cas par cas : positionnement flou, offres qui se chevauchent, croissance difficile à piloter.",
    value:
      "Une lecture claire de votre marché, un positionnement assumé et une feuille de route priorisée que votre équipe peut réellement exécuter.",
    deliverables: [
      "Rapport d'audit de positionnement",
      "Analyse concurrentielle",
      "Feuille de route de croissance",
      "Architecture des offres",
      "Cartographie du parcours client",
    ],
    items: [
      "Audit de positionnement",
      "Stratégie de croissance",
      "Étude de marché et analyse concurrentielle",
      "Développement commercial",
      "Stratégie de marque et de communication",
      "Structuration des offres et optimisation du parcours client",
    ],
  },
  {
    id: "marketing-acquisition",
    number: "02",
    title: "Stratégie marketing et acquisition",
    short: "Attirer les bons clients, de façon prévisible.",
    problem:
      "Vos actions marketing existent, mais restent ponctuelles : difficile de savoir lesquelles vous apportent vraiment des clients.",
    value:
      "Un plan marketing structuré, des campagnes ciblées et des indicateurs suivis, pour investir là où votre budget produit des résultats.",
    deliverables: [
      "Plan marketing",
      "Plan de campagnes d'acquisition",
      "Stratégie de contenu",
      "Campagnes de publicité digitale",
      "Tableau de suivi des performances",
    ],
    items: [
      "Élaboration de plans marketing",
      "Campagnes d'acquisition",
      "Stratégie de contenu",
      "Publicité digitale",
      "Optimisation des performances marketing",
    ],
  },
  {
    id: "communication-digitale",
    number: "03",
    title: "Communication digitale",
    short: "Une présence régulière, cohérente, qui crée la relation.",
    problem:
      "Vos réseaux sociaux sont alimentés sans ligne directrice, ou mis de côté faute de temps. Votre audience ne sait pas vraiment ce que vous faites.",
    value:
      "Une ligne éditoriale claire, des contenus soignés et une communauté animée avec constance, pour rester visible et crédible.",
    deliverables: [
      "Stratégie éditoriale",
      "Calendrier de publication",
      "Création de contenus",
      "Animation et modération des pages",
      "Bilans d'activité réguliers",
    ],
    items: [
      "Community management",
      "Stratégie éditoriale",
      "Gestion des réseaux sociaux",
      "Création de contenus",
      "Calendriers de publication",
    ],
  },
  {
    id: "branding-design",
    number: "04",
    title: "Branding et design graphique",
    short: "Une image qui inspire confiance au premier regard.",
    problem:
      "Votre image ne reflète pas votre niveau de sérieux : supports disparates, logo vieillissant, aucune charte pour guider vos équipes.",
    value:
      "Une identité visuelle cohérente et mémorable, déclinée sur tous vos points de contact, du document commercial à la publicité.",
    deliverables: [
      "Logo et déclinaisons",
      "Charte graphique",
      "Supports publicitaires",
      "Présentations professionnelles",
      "Direction artistique de vos contenus",
    ],
    items: [
      "Création d'identité visuelle",
      "Logos et chartes graphiques",
      "Supports publicitaires",
      "Présentations professionnelles",
      "Direction artistique",
    ],
  },
  {
    id: "video-motion",
    number: "05",
    title: "Vidéo et motion design",
    short: "Des messages qui captent l'attention en quelques secondes.",
    problem:
      "Vos offres sont difficiles à expliquer et vos contenus statiques peinent à retenir l'attention dans un fil d'actualité saturé.",
    value:
      "Des vidéos et des animations qui rendent votre message clair, mémorable et facile à partager.",
    deliverables: [
      "Montage vidéo",
      "Spots publicitaires",
      "Animations en motion design",
      "Formats courts pour les réseaux sociaux",
      "Présentations animées",
    ],
    items: [
      "Montage vidéo",
      "Vidéos publicitaires",
      "Motion design",
      "Contenus courts pour réseaux sociaux",
      "Présentations animées",
    ],
  },
  {
    id: "web-digital",
    number: "06",
    title: "Web et transformation digitale",
    short: "Des outils numériques au service de votre croissance.",
    problem:
      "Votre site ne génère pas de demandes, ou vous n'avez pas encore de vitrine digitale à la hauteur de votre entreprise.",
    value:
      "Un site rapide, clair et pensé pour convertir, et des outils numériques, IA comprise, intégrés à votre façon de travailler.",
    deliverables: [
      "Site vitrine",
      "Site e-commerce (selon le périmètre retenu)",
      "Maquettes UX/UI",
      "Recommandations d'outils et d'IA",
      "Accompagnement à la prise en main",
    ],
    items: [
      "Création de sites vitrines",
      "Sites e-commerce selon le périmètre retenu",
      "Conception UX/UI",
      "Conseil sur les outils numériques et l'intégration de l'IA",
    ],
  },
];
