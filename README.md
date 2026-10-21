# Mobilo

Boutique en ligne de téléphonie (smartphones, tablettes, accessoires) réalisée en React + TypeScript. Projet individuel Sup de Vinci.

## Sujet et API

- **Sujet** : catalogue avec recherche, filtres et pagination, fiche produit, wishlist sauvegardée dans le navigateur et formulaire d'ajout de produit.
- **API** : [DummyJSON](https://dummyjson.com/docs/products), ressource `products`, limitée aux catégories `smartphones`, `tablets` et `mobile-accessories`.

## Prérequis

- Node.js 22.22 ou plus
- npm

## Installation et lancement

```bash
npm install
npm run dev
```

L'application est disponible sur http://localhost:5173.

| Commande               | Rôle                                      |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | serveur de développement                  |
| `npm run build`        | vérification des types + build production |
| `npm run preview`      | prévisualiser le build                    |
| `npm run lint`         | linter (oxlint)                           |
| `npm run typecheck`    | vérification des types (`tsc -b`)         |
| `npm run format`       | formater le code (Prettier)               |
| `npm run format:check` | vérifier le formatage                     |

## Configuration

Aucune variable d'environnement. L'URL de l'API est définie dans `src/config/api.ts`.

## Choix techniques

<!-- À compléter en fin de projet -->

- **Recherche, filtres et pagination côté client** : l'API ne permet pas de combiner recherche, catégorie et prix. On charge le catalogue une fois puis on filtre en JavaScript (33 produits utiles).
- **Context API** pour les critères de recherche (conservés pendant la navigation) et la wishlist (sauvegardée dans le `localStorage`).
- **`fetch` + `useEffect`** plutôt qu'une bibliothèque de requêtes : peu d'appels, pas de cache nécessaire.
- **CSS classique avec variables** : thème centralisé dans `src/styles/variables.css`.

## Bibliothèques utilisées

- `react`, `react-dom`
- `react-router` : navigation entre les pages
- `oxlint` : linter
- `prettier` : formatage
- `typescript`, `vite`

## Fonctionnalités

<!-- À compléter : cocher au fur et à mesure -->

- [ ] Catalogue paginé avec recherche et 2 filtres combinés
- [ ] Fiche produit
- [ ] Wishlist sauvegardée dans le `localStorage`
- [ ] Formulaire d'ajout de produit avec validation
- [ ] États de chargement, d'erreur et listes vides
- [ ] Responsive et accessibilité

## Bonus

- [x] TypeScript
- [ ] Dark mode
- [ ] Recherche avec délai (300 ms)
- [ ] Déploiement Vercel
- [ ] CRUD complet

## Limites connues

- DummyJSON simule les créations : un produit ajouté n'est pas conservé après rechargement.
- Données en anglais (noms, descriptions, avis) et prix en dollars.
- Le catalogue complet (194 produits) est chargé pour n'en garder que 33.
- Les critères de recherche ne sont pas conservés après un rechargement de la page.

## Utilisation de l'IA

<!-- À compléter honnêtement -->

- **Google Stitch** : maquettes de l'interface (`docs/maquettes/`).
- **Claude** : choix du sujet et de l'API, rédaction du cahier des charges (`docs/cahier-des-charges.md`), configuration du projet.
- **Claude Code** : à compléter.

## Déploiement

<!-- Lien Vercel si le bonus est réalisé -->
