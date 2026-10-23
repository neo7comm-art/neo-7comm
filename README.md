# NEO 7COMM : site web

Site vitrine de NEO 7COMM (React, Vite, Tailwind CSS, Framer Motion).

## Lancer en local
```bash
npm install
npm run dev
```

## Construire
```bash
npm run build
npm run preview
```

## Déployer sur Vercel (gratuit)
1. Poussez ce dossier sur GitHub.
2. Sur vercel.com, « Add New Project », importez le dépôt. Vercel détecte Vite automatiquement.
3. Déployez. Aucune variable d'environnement n'est obligatoire.

## Modifier
- Numéros WhatsApp, appel, réseaux sociaux : `src/config/site.ts`
- Expertises : `src/data/services.ts`
- Réalisations (une entrée par projet, toutes ses images dans `gallery`) : `src/data/portfolio.ts`
- Images : `src/assets/portfolio/` (puis importez-les dans `portfolio.ts`)
- Logo : `src/brand/` (logo-header.png, logo-full.png, logo-symbol.png)

## Points à compléter avant mise en ligne
- Numéro d'enregistrement, adresse et hébergeur dans les mentions légales (`src/pages/Inner.tsx`, section Legal).
- Texte de la politique de confidentialité, à valider juridiquement.
