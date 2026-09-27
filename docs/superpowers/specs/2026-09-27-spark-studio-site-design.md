# Spark Pro (ex Spark Studio) — site vitrine one-page (spec de design)

Date : 2026-09-27. Statut : implémenté en autonomie à partir du brief, puis enrichi (réalisations réelles, tarif sur devis).

## Objectif

Vitrine commerciale de Spark Pro (nom de marque retenu le 2026-09-27, après « Spark Studio » dans le brief), entreprise qui crée et héberge des sites
internet pour artisans (bâtiment, dépannage, commerces de proximité).
Le site doit inspirer confiance immédiatement et amener à demander un devis.

Succès = un visiteur artisan, non technique, comprend en 10 secondes ce qui est
proposé, à quel prix, et sait comment demander un devis.

## Contraintes (brief)

- Une seule page, ancres de navigation vers chaque section.
- HTML/CSS/JS autonomes, zéro dépendance à installer, déployable tel quel sur GitHub Pages.
- Formulaire sans backend : `mailto:` en solution temporaire.
- Rendu premium type agence créative, pas de template SaaS.
- À éviter : crème + terracotta, cartes SaaS identiques à ombre grise, labels ALL CAPS espacés,
  puces « → », icônes Font Awesome, dégradés pastel, fade-in répété sur chaque bloc.
- Responsive impeccable, focus clavier visible, contrastes AA.

## Direction esthétique retenue

Concept : **« bleu de travail et étincelle »**. La matière vient du vêtement de
travail (bleu profond), du plâtre/béton (fond clair neutre) et de l'acier
(gris froid, coins chanfreinés comme une plaque découpée). L'étincelle (ambre
incandescent) est l'accent unique : c'est le nom de la marque et la seule
animation de la page.

### Couleurs

| Token | Hex | Rôle |
|---|---|---|
| `--bleu` | `#1B2D48` | fond des sections sombres, texte principal sur clair |
| `--bleu-2` | `#22385A` | surfaces secondaires sur fond bleu |
| `--platre` | `#ECEBE7` | fond clair (plâtre / béton ciré) |
| `--acier` | `#9FAAB8` | texte secondaire sur bleu |
| `--acier-2` | `#5B6573` | texte secondaire sur plâtre |
| `--ambre` | `#F5A524` | accent unique : étincelle, CTA, focus |

Contrastes vérifiés : blanc/bleu 13,9 ; ambre/bleu 6,8 ; bleu/plâtre 11,6 ; acier-2/plâtre 4,95.

### Typographie

Une seule famille : **Bricolage Grotesque** (variable, auto-hébergée en woff2).
Le nom même de la police fait écho au métier. Contraste de graisse assumé :
800 pour les titres XXL, 300 pour la dernière ligne du hero et les sous-titres, 400 pour le corps.
Axe `opsz` actif pour la lisibilité du corps. Pas de petites capitales espacées.

### Mise en page

Grille 12 colonnes, largeur max 1280 px, alignement à gauche partout.
Asymétrie : titre de section sur 5 colonnes à gauche, contenu sur 6 colonnes
décalé à droite ; le hero pousse le sous-titre + CTA vers la droite sous le titre.

Rythme des fonds : hero (bleu) → inclus (plâtre) → métiers (plâtre) → tarif (bleu)
→ contact (plâtre) → pied (bleu).

Textures : un grain SVG (feTurbulence) très léger sur les fonds ; un « brossé »
(lignes 1 px) sur le panneau tarif. Coins à 0 ; les CTA et le panneau prix ont un
coin chanfreiné (clip-path) — signature « plaque d'acier découpée ».

### Animation unique

Au chargement : une étincelle ambre traverse le hero de gauche à droite en
laissant un filet ambre derrière elle ; les lignes du titre se révèlent à son
passage, puis sous-titre et CTA apparaissent. ~1,6 s au total. Désactivée sous
`prefers-reduced-motion`. Aucun autre effet d'entrée sur la page.

## Structure

1. Navigation collante : marque + ancres (Inclus, Métiers, Tarif, Contact) + CTA. Menu repliable sur mobile.
2. Hero : H1 « Un site qui inspire confiance dès la première visite. », sous-titre du brief, CTA « Demander un devis gratuit », mention « Réponse sous 48h, sans engagement. »
3. Inclus : liste de 5 lignes (titre + une phrase), séparées par un filet, pictos SVG maison.
4. Métiers : 3 rangées (famille + liste de métiers), typographie forte, pictos SVG maison.
5. Tarif (révisé le 2026-09-27 après mise en ligne) : sur devis, sans prix fixe. Trois formules en escalier (Site vitrine, Site et identité, Application web) adossées chacune à un site réel ; les budgets réels (350, 650, 2 000 €) et la fréquentation apparaissent sur les réalisations comme repères.
6. Contact : accroche + formulaire (Nom, Métier, Ville, Email, Message) + « Envoyer ma demande ». Validation inline en français, envoi via `mailto:`.
7. Pied de page : marque, ancres, mentions légales repliables (champs à compléter).

## Fichiers

- `index.html` — structure et contenu.
- `css/style.css` — tokens, layout, composants, animation.
- `js/main.js` — menu mobile, section courante, validation + mailto.
- `assets/fonts/` — Bricolage Grotesque woff2.
- `assets/favicon.svg` — étincelle.
- `.nojekyll` — GitHub Pages sans traitement Jekyll.

## Vérification

Captures headless (Edge) à 375, 768, 1024 et 1440 px, revue visuelle à chaque itération ;
validation HTML basique ; test clavier (skip link, focus visible) ; reduced-motion.
