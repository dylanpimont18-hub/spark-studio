# Spark Studio — site vitrine

Site one-page de Spark Studio : création et entretien de sites internet pour artisans.
HTML, CSS et JavaScript autonomes, sans dépendance ni étape de build.

En ligne : https://dylanpimont18-hub.github.io/spark-studio/
Dépôt : https://github.com/dylanpimont18-hub/spark-studio

## Lancer en local

Ouvrir `index.html` dans un navigateur suffit. Pour un serveur local :

```
python -m http.server 8000
```

puis ouvrir http://localhost:8000.

## Déployer sur GitHub Pages

GitHub Pages est activé sur la branche `main`, dossier racine. Chaque `git push` sur `main`
met le site à jour en une minute environ. Le fichier `.nojekyll` est présent : GitHub sert
les fichiers sans traitement.

## À personnaliser avant la mise en ligne

- **Adresse email** : remplacer `contact@spark-studio.fr` dans `index.html` (trois occurrences :
  le lien de la section Contact, l'attribut `action` du formulaire, les mentions légales).
- **Mentions légales** : compléter les champs entre crochets dans le pied de page
  (forme juridique, adresse, SIRET, directeur de la publication).
- **Textes** : tout le contenu est dans `index.html`, section par section.
- **Réalisations** : pour ajouter un site, dupliquer un `li.work` dans la section `#realisations`
  et déposer une capture 1200×633 dans `assets/realisations/` (WebP, qualité 82).

## Formulaire de contact

Sans backend pour l'instant : à l'envoi, le navigateur ouvre la messagerie du visiteur
avec un email pré-rempli (`mailto:`). Pour brancher un service d'envoi plus tard
(Formspree, Netlify Forms, votre propre API), remplacer les deux lignes signalées
par un commentaire dans `js/main.js`, à la fin du gestionnaire `submit`.

## Structure

```
index.html          page complète (contenu et structure)
css/style.css       tokens, mise en page, composants, animation d'arrivée, responsive
js/main.js          menu mobile, section courante, validation du formulaire, mailto
assets/fonts/       Bricolage Grotesque (variable, woff2, auto-hébergée)
assets/favicon.svg  étincelle
assets/realisations captures WebP des sites clients (hero et section Réalisations)
docs/superpowers/   spec de design
```

## Direction de design

Concept « bleu de travail et étincelle » : bleu profond, plâtre clair, acier, et un seul
accent ambre. Une seule famille typographique (Bricolage Grotesque), graisses 800 et 300.
Une seule animation, au chargement du hero. Détails dans `docs/superpowers/specs/`.
