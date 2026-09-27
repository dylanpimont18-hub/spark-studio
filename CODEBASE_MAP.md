# CODEBASE_MAP — Spark Studio (site vitrine one-page)

## index.html
Page unique : en-tête collant, hero, Inclus, Métiers, Tarif, Contact, pied de page.
- `header.site-header` — marque, bouton Menu (mobile), nav ancres, CTA
- `section.hero` — H1 en 3 lignes animées, filet ambre + étincelle, sous-titre, CTA, `figure.hero-phone` (capture mobile réelle du site pib-vierzon.fr dans un cadre de téléphone CSS)
- `section#inclus` — liste `.feature-list` (5 lignes titre + phrase, pictos SVG inline)
- `section#metiers` — tableau pleine largeur `.trade-list` (picto, famille, métiers), variante `.section-table`
- `section#realisations` — `.work-list` : 3 réalisations réelles (PIB Vierzon, Soly'bat 18, Spark Learning), fenêtre navigateur `.browser` (pastille URL + capture), `.work-text` avec `dl.work-facts` (budget réel, fréquentation), alternance via `.work-flip`
- `section#tarif` — sur devis, sans prix affiché : `.tier-list` de 3 formules chanfreinées en escalier (Site vitrine, Site et identité, Application web), chacune avec inclusions et site exemple ; `.tier-foot` (mention 15 jours + CTA)
- `section#contact` — accroche + `form#contact-form` (Nom, Métier, Ville, Email, Message), `action="mailto:…"`
- `footer.site-footer` — grand mot-marque fantôme `.footer-mark`, marque, nav, `details.legal` (mentions légales à compléter), copyright
- Email à remplacer : `contact@spark-studio.fr` (3 occurrences)

## css/style.css
Feuille unique, ordonnée : polices → tokens → base → en-tête → boutons → hero → sections → composants → pied → animation → responsive.
- `@font-face` Bricolage Grotesque — 2 sous-ensembles woff2 locaux (latin, latin-ext)
- `:root` — tokens couleurs (`--bleu`, `--platre`, `--acier`, `--ambre`…), `--noise` (grain SVG), espacements
- `.is-dark` / `.section-tint` — surfaces ; grain via `::before`, reflet lumineux via `.is-dark::after`
- `.site-header` — collant, translucide avec `backdrop-filter`
- `.btn` — bouton chanfreiné (dégradé 45°), `@property --btn-bg` pour la transition
- `.hero-*`, `.line`, `.spark` — structure du hero ; états initiaux sous `html.js`, animation sous `html.play`
- `.hero-phone`, `.phone`, `.phone-screen img` — téléphone (absolu à droite du hero, déborde en bas ; statique sous 56rem)
- `.work*`, `.browser*` — réalisations : fenêtres de navigateur avec ombre, texte aligné en bas, empilées sous 56rem
- `.section-grid`, `.section-head` (sticky, filet ambre `::before`), `.section-body`, `.section-table` (titre en haut, rangées pleine largeur)
- `.tier-list`, `.tier` — 3 colonnes, marches via `margin-top` décroissant (`nth-child`), chanfrein `clip-path`, bord haut ambre, brossé `::before`, `.tier-ref` poussé en bas (`margin-top: auto`)
- `.work-facts` — liste de définitions budget / fréquentation, valeurs en 700
- `.contact-form` — feuille claire chanfreinée ; `.field*`, `.form-status` — champs, erreurs inline, statut
- `.footer-mark` — mot-marque XXL en graisse 300, 10 % d'opacité
- `@media (prefers-reduced-motion)` — animation désactivée, tout visible
- `@media (max-width: 56rem)` — menu mobile, colonnes empilées ; `(max-width: 40rem)` — ajustements téléphone

## js/main.js
IIFE sans dépendance. Ajoute `html.js` puis `html.play`.
- play() — lance l'animation quand la police est chargée (ou après 700 ms)
- setOpen(open) — ouvre/ferme le menu mobile (`aria-expanded`, Échap, retour desktop)
- IntersectionObserver — pose `aria-current` sur le lien de la section visible
- validate(input) — validation inline en français (`.is-invalid`, `aria-invalid`)
- submit — construit le `mailto:` (sujet + corps) et affiche `#form-status`

## assets/
- `fonts/BricolageGrotesque-latin.woff2`, `…-latin-ext.woff2` — police variable auto-hébergée
- `favicon.svg` — étincelle ambre sur bleu
- `realisations/pib-desktop.webp`, `solybat-desktop.webp`, `sparklearning-desktop.webp` (1200×633), `pib-mobile.webp` (500×956) — captures des sites clients

## Autres
- Déploiement : https://dylanpimont18-hub.github.io/spark-studio/ (GitHub Pages, branche `main`, racine)
- `.gitignore` — fichiers système et page d'encapsulation de test `_shot.html`
- `.nojekyll` — GitHub Pages sans Jekyll
- `README.md` — lancement, déploiement, points à personnaliser
- `docs/superpowers/specs/2026-09-27-spark-studio-site-design.md` — spec de design
