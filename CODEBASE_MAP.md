# CODEBASE_MAP — Spark Pro (site vitrine one-page)

## index.html
Page unique : en-tête collant, hero, Inclus, Métiers, Tarif, Contact, pied de page.
- `header.site-header` — marque, bouton Menu (mobile), nav ancres, CTA
- `section.hero` — H1 en 3 lignes animées, filet ambre + étincelle, sous-titre, CTA, `figure.hero-build` (maquette « chantier » : fenêtre de navigateur `.build` avec adresse `votre-metier.fr`, page `.build-page` de 6 briques `.brick` > `.brick-drop` > `.brick-face` — en-tête, photos, texte, avis, devis, contact — qui se montent une à une sur un plan en pointillés ; `.build-caption` explique le principe ; tout le mock est `aria-hidden`)
- `section#inclus` — liste `.feature-list` (4 lignes titre + phrase, pictos SVG inline)
- `section#metiers` — tableau pleine largeur `.trade-list` (picto, famille, métiers), variante `.section-table`
- `section#realisations` — `.work-list` : 3 réalisations réelles (PIB Vierzon, Soly'bat 18, Spark Learning), fenêtre navigateur `.browser` (pastille URL + capture), `.work-text` avec `dl.work-facts` (budget réel, fréquentation), alternance via `.work-flip`
- `section#tarif` — sur devis, sans prix affiché : `.tier-list` de 3 formules chanfreinées en escalier (Site vitrine, Site et identité, Application web), chacune avec inclusions et site exemple ; `.tier-foot` (mention 15 jours + CTA)
- `section#contact` — accroche + `form#contact-form` (champs name, metier, ville, email, message) envoyé à Web3Forms (`access_key` caché, `subject`, `from_name`, piège `botcheck`)
- `footer.site-footer` — grand mot-marque fantôme `.footer-mark`, marque, nav, `details.legal` (mentions légales complètes : EI Dylan Pimont, SIRET, adresse), copyright
- Email : `contact@sparklearning.fr` (3 occurrences)

## 404.html
Page d'erreur servie par GitHub Pages : en-tête simplifié, hero sombre « Cette page n'existe pas », retour accueil. Chemins absolus (/css, /assets), `noindex`, sans JS.

## css/style.css
Feuille unique, ordonnée : polices → tokens → base → en-tête → boutons → hero → sections → composants → pied → animation → responsive.
- `@font-face` Bricolage Grotesque — 2 sous-ensembles woff2 locaux (latin, latin-ext)
- `:root` — tokens couleurs (`--bleu`, `--platre`, `--acier`, `--ambre`…), `--noise` (grain SVG), espacements
- `.is-dark` / `.section-tint` — surfaces ; grain via `::before`, reflet lumineux via `.is-dark::after`
- `.site-header` — collant, translucide avec `backdrop-filter`
- `.btn` — bouton chanfreiné (dégradé 45°), `@property --btn-bg` pour la transition
- `.hero-*`, `.line`, `.spark` — structure du hero ; états initiaux sous `html.js`, animation sous `html.play` : titre, filet, étincelle ; montage sous `html.build` (posé par le script quand la maquette est visible) : chute des briques de bas en haut (`@keyframes drop`, rebonds, contact à 0 s jusqu'à l'en-tête à 1,4 s) et adresse qui s'allume en ambre (`online`, 2,2 s)
- `.hero-build`, `.build*`, `.brick*`, `.mock-*` — maquette chantier (absolue à droite du hero, déborde en bas ; 20rem, 18rem sous 81rem, 16rem sous 62rem, statique et pleine largeur sous 56rem ; hero resserré sous 50rem de haut pour tenir sous le pli) ; briques chanfreinées via `clip-path` sur `.brick-face`, ombre portée via `filter` sur `.brick-drop` (animé), emplacement pointillé via `.brick::before`
- `.work*`, `.browser*` — réalisations : fenêtres de navigateur avec ombre, texte aligné en bas, empilées sous 56rem
- `.section-grid`, `.section-head` (sticky, filet ambre `::before`), `.section-body`, `.section-table` (titre en haut, rangées pleine largeur)
- `.tier-list`, `.tier` — 3 colonnes, marches via `margin-top` décroissant (`nth-child`), chanfrein `clip-path`, bord haut ambre, brossé `::before`, `.tier-ref` poussé en bas (`margin-top: auto`)
- `.work-facts` — liste de définitions budget / fréquentation, valeurs en 700
- `.contact-form` — feuille claire chanfreinée ; `.field*`, `.form-status` (`.is-error`), `.form-trap` — champs, erreurs inline, statut, piège à robots caché
- `.footer-mark` — mot-marque XXL en graisse 300, 10 % d'opacité
- `.nf-code` — petit « 404 » ambre de la page d'erreur
- `@media (prefers-reduced-motion)` — animation désactivée, tout visible
- `@media (max-width: 56rem)` — menu mobile, colonnes empilées ; `(max-width: 40rem)` — ajustements téléphone

## js/main.js
IIFE sans dépendance. Ajoute `html.js` puis `html.play`.
- play() — lance l'animation quand la police est chargée (ou après 700 ms)
- scheduleBuild() — pose `html.build` quand la police est prête et que `.hero-build` est visible (IntersectionObserver, seuil 30 %), au plus tôt 900 ms après le départ
- setOpen(open) — ouvre/ferme le menu mobile (`aria-expanded`, Échap, retour desktop)
- IntersectionObserver — pose `aria-current` sur le lien de la section visible
- validate(input) — validation inline en français (`.is-invalid`, `aria-invalid`)
- setStatus(text, isError) — affiche le message sous le formulaire
- submit — valide, envoie en `fetch` à api.web3forms.com, succès ou erreur dans `#form-status`

## assets/
- `fonts/BricolageGrotesque-latin.woff2`, `…-latin-ext.woff2` — police variable auto-hébergée
- `favicon.svg` — étincelle ambre sur bleu
- `realisations/pib-desktop.webp`, `solybat-desktop.webp`, `sparklearning-desktop.webp` (1200×633) — captures des sites clients

## Autres
- Déploiement : https://sparkpro.fr (GitHub Pages, branche `main`, racine, `CNAME` = sparkpro.fr ; miroir dylanpimont18-hub.github.io/sparkpro)
- `CNAME` — domaine personnalisé GitHub Pages
- `.gitignore` — fichiers système et page d'encapsulation de test `_shot.html`
- `.nojekyll` — GitHub Pages sans Jekyll
- `README.md` — lancement, déploiement, points à personnaliser
- `docs/superpowers/specs/2026-09-27-spark-studio-site-design.md` — spec de design
