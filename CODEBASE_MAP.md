# CODEBASE_MAP — Spark Studio (site vitrine one-page)

## index.html
Page unique : en-tête collant, hero, Inclus, Métiers, Tarif, Contact, pied de page.
- `header.site-header` — marque, bouton Menu (mobile), nav ancres, CTA
- `section.hero` — H1 en 3 lignes animées, filet ambre + étincelle, sous-titre, CTA, `figure.hero-phone` (maquette CSS d'un site d'artisan fictif, légendée « exemple »)
- `section#inclus` — liste `.feature-list` (5 lignes titre + phrase, pictos SVG inline)
- `section#metiers` — tableau pleine largeur `.trade-list` (picto, famille, métiers), variante `.section-table`
- `section#tarif` — `.price-panel` chanfreiné : Pack complet, 350 €, 4 inclusions, mention, CTA
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
- `.hero-phone`, `.phone`, `.ms-*` — maquette téléphone (absolue à droite du hero, déborde en bas ; statique sous 56rem)
- `.section-grid`, `.section-head` (sticky, filet ambre `::before`), `.section-body`, `.section-table` (titre en haut, rangées pleine largeur)
- `.price-panel` — `clip-path` chanfrein, bord haut ambre, brossé via `::before`
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

## Autres
- Déploiement : https://dylanpimont18-hub.github.io/spark-studio/ (GitHub Pages, branche `main`, racine)
- `.gitignore` — fichiers système et page d'encapsulation de test `_shot.html`
- `.nojekyll` — GitHub Pages sans Jekyll
- `README.md` — lancement, déploiement, points à personnaliser
- `docs/superpowers/specs/2026-09-27-spark-studio-site-design.md` — spec de design
