# Mobilo

Boutique en ligne de téléphonie (smartphones, tablettes, accessoires) réalisée en React + TypeScript. Projet individuel Sup de Vinci.

**Site en ligne** : https://mobilo-delta.vercel.app

## Sujet et API

- **Sujet** : catalogue avec recherche, filtres et pagination, fiche produit, wishlist sauvegardée dans le navigateur et formulaire d'ajout de produit.
- **API** : [DummyJSON](https://dummyjson.com/docs/products), ressource `products`, limitée aux catégories `smartphones`, `tablets` et `mobile-accessories` (33 produits).

| Méthode | Route               | Usage                                                   |
| ------- | ------------------- | ------------------------------------------------------- |
| GET     | `/products?limit=0` | charger tout le catalogue, puis garder les 3 catégories |
| GET     | `/products/{id}`    | fiche détail                                            |
| POST    | `/products/add`     | création (simulée par l'API)                            |

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

Aucune variable d'environnement.

- `src/config/api.ts` : URL de l'API.
- `src/config/shop.ts` : catégories gardées et leurs libellés, seuils du filtre de prix, nombre de produits par page (8), clé du `localStorage` (`mobilo:wishlist`).
- `vercel.json` : redirige toutes les URL vers `index.html` sur Vercel, pour que l'accès direct à une page (ex. `/products/1`) et le rechargement fonctionnent. Inutile en local : le serveur de Vite le fait déjà.

## Pages

| Page      | Route           | Contenu                                                             |
| --------- | --------------- | ------------------------------------------------------------------- |
| Accueil   | `/`             | une tuile par rayon (catalogue filtré), lien vers tout le catalogue |
| Catalogue | `/products`     | recherche, 2 filtres, grille de cartes, pagination                  |
| Détail    | `/products/:id` | fiche complète, avis clients, bouton wishlist                       |
| Wishlist  | `/wishlist`     | produits sauvegardés, lien vers la fiche, bouton retirer            |
| Création  | `/create`       | formulaire d'ajout de produit                                       |
| 404       | `*`             | page introuvable et lien de retour                                  |

## Structure du projet

```
src/
├── config/        constantes (URL de l'API, catégories, seuils de prix)
├── types/         types partagés (Product, Filters, ProductFormValues…)
├── services/      productService.ts : les seuls appels fetch de l'application
├── context/       FiltersContext (critères de recherche), WishlistContext (wishlist), ThemeContext (thème)
├── utils/         fonctions pures : filterProducts, validateProduct, formatPrice
├── components/
│   ├── layout/    Layout, Header, MobileNav, Footer
│   ├── products/  cartes, grille, recherche, pagination, fiche, formulaire
│   └── ui/        Loader, ErrorMessage, EmptyState, Rating, FormField
├── pages/         une page par route
└── styles/        variables.css (couleurs, tailles, espacements), global.css
```

## Choix techniques

- **Recherche, filtres et pagination côté client** : l'API ne permet pas de combiner recherche, catégorie et prix (`/products/search` et `/products/category/{slug}` sont des endpoints séparés, et il n'existe pas de filtre par prix). On charge le catalogue une seule fois, puis on filtre en JavaScript, ce qui est instantané avec 33 produits.
- **Données dérivées calculées au rendu** : la liste filtrée, le nombre de pages et les 8 produits de la page courante sont recalculés à chaque rendu, sans être stockés dans un état.
- **Context API** :
  - `FiltersContext` garde la recherche, les 2 filtres et la page courante. Placé au-dessus des routes, il conserve les critères quand on passe du catalogue à une fiche puis qu'on revient. Chaque changement de critère ramène à la page 1.
  - Les tuiles de l'accueil appellent `showCategory`, qui remet tous les critères à zéro et choisit le rayon en une seule mise à jour. Appeler `resetFilters` puis `setCategory` ne marcherait pas : `setCategory` repartirait de l'ancien état et remettrait l'ancienne recherche.
  - La recherche est appliquée 300 ms après la dernière frappe, pour ne pas refiltrer à chaque lettre. Le minuteur est gardé dans un `useRef`, et chaque frappe annule le précédent.
  - `WishlistContext` garde la wishlist. Elle est lue dans le `localStorage` au premier rendu (initialisation lazy de `useState`), puis sauvegardée à chaque changement (`useEffect`). Seul un résumé du produit est stocké (id, nom, marque, prix, note, image), ce qui évite à la page Wishlist d'appeler l'API.
  - `ThemeContext` garde le thème clair ou sombre, choisi avec le bouton du header (visible aussi sur mobile). Il est sauvegardé dans le `localStorage` et restauré à l'ouverture. Sans choix enregistré, on suit le réglage de l'appareil (`prefers-color-scheme`). Le thème s'applique avec l'attribut `data-theme` sur `<html>`, qui active les couleurs sombres définies dans `variables.css`.
  - Chaque contexte est créé avec `null` et exposé par un hook (`useFilters`, `useWishlist`, `useTheme`) qui lève une erreur s'il est utilisé hors de son provider.
- **`fetch` + `useEffect`** plutôt qu'une bibliothèque de requêtes : il y a peu d'appels et pas besoin de cache. Tous les `fetch` sont dans `services/productService.ts`. Chaque fonction vérifie `response.ok`, car `fetch` ne lève pas d'erreur sur une réponse 404 ou 500.
- **Produit introuvable** : un id inexistant (réponse 404), non numérique, ou hors des 3 catégories (ex. `/products/1`, un mascara) affiche « Produit introuvable » et non une erreur.
- **Formulaire** : champs contrôlés gardés en `string` pendant la saisie, convertis avec `Number()` seulement à l'envoi. La validation est une fonction pure (`validateProduct`) appelée à la soumission. En cas d'échec de l'envoi, les valeurs sont conservées pour pouvoir renvoyer.
- **Routing** : `BrowserRouter` avec une route `Layout` qui entoure toutes les pages (`Outlet`) et porte le seul `<main>` de l'application.
- **CSS classique avec variables** : toutes les couleurs, tailles et espacements viennent de `src/styles/variables.css`. Mobile d'abord, puis trois points de rupture (640px, 768px pour les lignes du catalogue, et 1024px). Chaque rayon a sa couleur : l'attribut `data-category` posé sur une page ou une tuile change la variable `--accent`, que le CSS utilise partout.
- **Accueil sans appel API** : la photo et le prix de départ de chaque tuile sont écrits dans `Home.tsx`, relevés une fois dans les données fixes de DummyJSON. Charger les 194 produits juste pour afficher 3 prix ralentirait la première page. Sur mobile, la navigation passe dans une barre d'onglets en bas de l'écran, uniquement en CSS.
- **Accessibilité** :
  - chaque champ a un `<label>`, et ses erreurs y sont reliées par `aria-describedby` ;
  - le bouton wishlist utilise `aria-pressed` ;
  - le nombre de résultats et la page courante sont annoncés aux lecteurs d'écran (`aria-live`) ;
  - le focus est visible au clavier et chaque page a son propre titre (`<title>`) ;
  - les contrastes sont vérifiés (4,5:1 minimum pour le texte, 3:1 pour les icônes et le contour des champs), en clair comme en sombre.
- **Qualité** : TypeScript en mode strict sans `any`, oxlint et Prettier sans erreur ni warning.

## Bibliothèques utilisées

- `react`, `react-dom`
- `react-router` : navigation entre les pages
- `typescript`, `vite`, `@vitejs/plugin-react`
- `oxlint` : linter
- `prettier` : formatage

Aucune autre dépendance : pas de bibliothèque de composants, d'icônes ou de requêtes. Les icônes sont des SVG écrits directement dans les composants.

## Fonctionnalités

- [x] Accueil avec une tuile par rayon, qui ouvre le catalogue déjà filtré
- [x] Navigation sur toutes les pages, avec compteur de la wishlist (en-tête sur desktop, barre d'onglets sur mobile)
- [x] Catalogue paginé (8 produits par page) avec recherche sur le nom et la marque, filtre par catégorie et par prix max, critères combinés et bouton « Réinitialiser »
- [x] Fiche produit : image, description, disponibilité et stock, garantie, livraison, politique de retour, référence, avis clients
- [x] Wishlist : ajout et retrait depuis la carte et la fiche, sans doublon, sauvegardée dans le `localStorage`
- [x] Formulaire d'ajout de produit avec validation, indicateur d'envoi, gestion des erreurs et affichage du produit renvoyé par l'API
- [x] États de chargement, d'erreur (avec « Réessayer ») et listes vides
- [x] Responsive (de 320px au desktop, sans débordement) et accessibilité

## Bonus

- [x] TypeScript
- [x] Dark mode
- [x] Recherche avec délai (300 ms)
- [x] Déploiement Vercel (https://mobilo-delta.vercel.app)
- [ ] CRUD complet (non prévu)

## Limites connues

- DummyJSON simule les créations : un produit ajouté renvoie toujours l'id 195 et n'est pas conservé après rechargement.
- Données en anglais (noms, descriptions, avis, disponibilité, garantie, livraison) et prix en dollars.
- Le catalogue complet (194 produits) est chargé pour n'en garder que 33 : acceptable ici, mais un vrai catalogue demanderait un filtrage côté serveur.
- Les prix « dès » de l'accueil sont écrits en dur : ils ne suivraient pas un changement de prix dans l'API.
- Les critères de recherche ne sont pas conservés après un rechargement de la page.
- Pas de tests automatisés : les vérifications ont été faites à la main dans le navigateur.

## Utilisation de l'IA

- **Google Stitch** : maquettes de l'interface (`docs/maquettes/`).
- **Claude** : choix du sujet et de l'API, rédaction du cahier des charges (`docs/cahier-des-charges.md`), configuration du projet, relecture du code de chaque étape.
- **Claude Code** : écriture du code étape par étape, en suivant l'ordre du cahier des charges et les règles de simplicité fixées dans `CLAUDE.md` (hooks autorisés, pas de dépendance ajoutée, commentaires sur le « pourquoi »). À chaque étape, j'ai relu le code, testé dans le navigateur, demandé des corrections si besoin, puis fait le commit moi-même.

## Déploiement

Déployé sur Vercel : https://mobilo-delta.vercel.app

Déploiement fait avec la CLI Vercel, sans l'ajouter aux dépendances du projet :

```bash
npx vercel login    # une seule fois
npx vercel --prod   # build (npm run build) puis mise en ligne de dist/
```

Vercel détecte Vite tout seul. Le dossier `.vercel/` (lien entre le dossier local et le projet Vercel) est ignoré par Git.
