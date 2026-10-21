# Mobilo : cahier des charges

> Nom provisoire. Projet React individuel, Sup de Vinci.

## 1. Présentation

Mobilo est une boutique en ligne de téléphonie : smartphones, tablettes et accessoires mobiles. On peut parcourir le catalogue, rechercher et filtrer, consulter la fiche d'un produit, ajouter des produits à sa wishlist et proposer un nouveau produit via un formulaire.

**API** : [DummyJSON](https://dummyjson.com/docs/products), ressource `products`, limitée à 3 catégories :

| Catégorie API        | Libellé affiché | Produits |
| -------------------- | --------------- | -------- |
| `smartphones`        | Smartphones     | 16       |
| `tablets`            | Tablettes       | 3        |
| `mobile-accessories` | Accessoires     | 14       |
| **Total**            |                 | **33**   |

Marques présentes : Apple, Samsung, Oppo, Realme, Vivo, Beats, Amazon… Prix de 12,99 $ à 1 099,99 $.

## 2. Stack

| Besoin       | Choix                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------- |
| Build        | Vite (template `react-ts`)                                                                   |
| UI           | React + TypeScript 6 (mode `strict`, actif par défaut)                                       |
| Routing      | react-router (v7)                                                                            |
| État partagé | Context API (`createContext`, `useContext`)                                                  |
| Requêtes     | `fetch` + `useEffect`                                                                        |
| Style        | CSS classique avec variables CSS                                                             |
| Qualité      | oxlint (linter fourni par le template Vite) + Prettier, vérification des types avec `tsc -b` |
| Déploiement  | Vercel (bonus)                                                                               |

Pas de TanStack, Redux ou Zustand : avec 33 éléments et 3 contextes, ces outils ajouteraient des concepts sans rien simplifier.

## 3. Endpoints utilisés

| Méthode | Route               | Usage                                                   |
| ------- | ------------------- | ------------------------------------------------------- |
| GET     | `/products?limit=0` | charger tout le catalogue, puis garder les 3 catégories |
| GET     | `/products/{id}`    | fiche détail                                            |
| POST    | `/products/add`     | création (simulée par l'API)                            |

Header d'envoi : `Content-Type: application/json`.

## 4. Pages et routes

| Page      | Route           | Contenu                                                  |
| --------- | --------------- | -------------------------------------------------------- |
| Accueil   | `/`             | en-tête, accroche, accès au catalogue et à la wishlist   |
| Catalogue | `/products`     | recherche, 2 filtres, grille de cartes, pagination       |
| Détail    | `/products/:id` | fiche complète, bouton wishlist                          |
| Wishlist  | `/wishlist`     | produits sauvegardés, lien vers la fiche, bouton retirer |
| Création  | `/create`       | formulaire de nouveau produit                            |
| 404       | `*`             | page introuvable + lien retour                           |

Navigation présente sur toutes les pages, avec les liens Accueil, Catalogue, Wishlist (avec compteur), Ajouter un produit :

- **Desktop et tablette (640px et plus)** : en-tête en haut avec le logo et les liens.
- **Mobile (moins de 640px)** : en-tête réduit au logo, liens dans une barre d'onglets fixée en bas de l'écran (icône + libellé). Bascule en CSS uniquement (media query), sans état React.

L'accès direct à une URL et le rechargement fonctionnent (rewrite Vercel vers `index.html`).

## 5. Fonctionnalités

### 5.1 Carte produit

- Image (`thumbnail`, alt = nom du produit)
- Nom
- Marque
- Prix
- Note (étoiles)
- Bouton wishlist

Toute la carte mène à la fiche détail.

### 5.2 Fiche détail

Reprend la carte et ajoute :

- Image principale en grand (`images[0]`)
- Description
- Disponibilité et stock (`availabilityStatus`, `stock`)
- Garantie (`warrantyInformation`)
- Livraison (`shippingInformation`)
- Politique de retour (`returnPolicy`)
- Avis clients (`reviews` : nom, note, commentaire)
- Référence produit (`sku`), optionnel

Si l'id existe mais n'appartient pas aux 3 catégories (ex. `/products/1`, un mascara), on affiche « Produit introuvable ».

### 5.3 Recherche, filtres, pagination

- **Recherche texte** sur le nom et la marque (champ stylisé avec label).
- **Filtre 1** : catégorie (Toutes, Smartphones, Tablettes, Accessoires).
- **Filtre 2** : prix max (Tous, moins de 50 $, 100 $, 300 $, 500 $, 1 000 $).
- Bouton « Réinitialiser ».
- Nombre de résultats affiché au-dessus de la grille (« 4 modèles disponibles »).
- Mobile : recherche en pleine largeur, les 2 filtres côte à côte, bouton Réinitialiser en pleine largeur.
- Les trois critères se combinent : un résultat doit respecter tous les critères.
- Pagination : 6 produits par page, boutons Précédent / Suivant, indication « Page 2 / 6 ».
- La pagination porte sur les résultats filtrés.
- Toute modification d'un critère ramène à la page 1.
- Critères et page courante conservés dans `FiltersContext` pendant la navigation.

**Choix technique** : filtrage et pagination côté client.

- L'API ne permet pas de combiner recherche, catégorie et prix : `/products/search` et `/products/category/{slug}` sont des endpoints séparés, et il n'existe pas de filtre par prix.
- Avec 33 produits utiles, tout charger une fois puis filtrer en JS est instantané.
- Alternative possible : 3 appels `/products/category/{slug}` en parallèle (`Promise.all`). Écartée pour garder un seul appel simple.

### 5.4 Wishlist

- Ajout / retrait depuis la carte et depuis la fiche.
- Pas de doublon : on vérifie l'id avant d'ajouter.
- Persistance dans le `localStorage` (clé `mobilo:wishlist`), restaurée au chargement.
- On stocke un résumé (id, nom, marque, prix, note, image) : la page Wishlist n'appelle pas l'API.
- Page Wishlist : liste des cartes, lien vers la fiche, bouton retirer, message si vide.

### 5.5 Création d'un produit

**Champs** (tous contrôlés, chacun avec un label) :

| Champ       | Type     | Règle                                          |
| ----------- | -------- | ---------------------------------------------- |
| Nom         | texte    | obligatoire, 3 à 80 caractères                 |
| Marque      | texte    | obligatoire                                    |
| Catégorie   | select   | obligatoire, une des 3 catégories              |
| Prix ($)    | nombre   | obligatoire, entre 1 et 5 000, 2 décimales max |
| Stock       | nombre   | entier, 0 ou plus                              |
| Description | textarea | obligatoire, 10 caractères minimum             |

**Déroulé** :

1. Validation à la soumission (`validateProduct`), messages sous chaque champ en erreur.
2. Si valide : `POST /products/add`, bouton désactivé et libellé « Envoi… ».
3. Vérification de `response.ok`.
4. Échec : message d'erreur, valeurs conservées, possibilité de renvoyer.
5. Succès : confirmation + affichage du produit renvoyé par l'API (avec son id, 195).

DummyJSON ne sauvegarde pas la création : le produit n'apparaît pas dans le catalogue après un rechargement.

## 6. États de l'interface

| Situation                        | Affichage                                                           |
| -------------------------------- | ------------------------------------------------------------------- |
| Chargement                       | `Loader` (catalogue et fiche)                                       |
| Erreur réseau / HTTP             | `ErrorMessage` + bouton Réessayer                                   |
| Recherche sans résultat          | `EmptyState` « Aucun produit ne correspond » + bouton réinitialiser |
| Wishlist vide                    | `EmptyState` « Votre wishlist est vide » + lien vers le catalogue   |
| Id inexistant ou hors catégories | « Produit introuvable » + lien retour                               |

## 7. Responsive et accessibilité

- Mobile d'abord : grille 1 colonne, 2 en tablette, 3 en desktop. Aucun débordement horizontal.
- Navigation repliable sur mobile si nécessaire.
- Tous les champs ont un `<label htmlFor>`.
- Images avec un `alt` pertinent.
- Toutes les actions sont des `<button>` ou des `<Link>` (accessibles au clavier).
- Focus visible (`:focus-visible`) sur tous les éléments interactifs.
- Bouton wishlist avec `aria-pressed` et un `aria-label` explicite.
- Contrastes suffisants en clair comme en sombre.

## 8. Architecture

```
src/
├── main.tsx
├── App.tsx
├── styles/
│   ├── variables.css             // tokens de la maquette (clair + sombre)
│   └── global.css                // reset, body, focus visible
├── config/
│   ├── api.ts                    // API_URL
│   └── shop.ts                   // catégories gardées + libellés, seuils de prix
├── types/
│   ├── product.ts                // Product, Review, ProductsResponse, WishlistItem
│   ├── filters.ts                // Filters
│   └── form.ts                   // ProductFormValues, ProductFormErrors, NewProduct
├── services/
│   └── productService.ts
├── context/
│   ├── FiltersContext.tsx
│   ├── WishlistContext.tsx
│   └── ThemeContext.tsx          (bonus)
├── utils/
│   ├── filterProducts.ts
│   ├── formatPrice.ts            // 1099.99 → « 1 099,99 $ »
│   └── validateProduct.ts
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   ├── MobileNav.tsx         // barre d'onglets en bas (mobile)
│   │   └── Footer.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── SearchForm.tsx
│   │   ├── Pagination.tsx
│   │   ├── ProductSpecs.tsx      // disponibilité, garantie, livraison, retours, référence
│   │   ├── ProductReviews.tsx
│   │   └── WishlistButton.tsx
│   └── ui/
│       ├── Loader.tsx
│       ├── ErrorMessage.tsx
│       ├── EmptyState.tsx
│       └── Rating.tsx            // « ★ 4.8 / 5 », utilisé par la carte, la fiche et les avis
└── pages/
    ├── Home.tsx
    ├── Products.tsx
    ├── ProductDetail.tsx
    ├── Wishlist.tsx
    ├── CreateProduct.tsx
    └── NotFound.tsx
```

| Dossier      | Rôle                                                  |
| ------------ | ----------------------------------------------------- |
| `config`     | constantes (URL de l'API, catégories, seuils de prix) |
| `types`      | types et interfaces partagés, aucun code exécuté      |
| `services`   | tous les appels réseau, une fonction par endpoint     |
| `context`    | état partagé entre les pages                          |
| `utils`      | fonctions pures, sans React                           |
| `components` | UI réutilisable, reçoit des props                     |
| `pages`      | une page par route, assemble les composants           |

## 9. Gestion de l'état

| État                                  | Où                                 | Pourquoi                                        |
| ------------------------------------- | ---------------------------------- | ----------------------------------------------- |
| Produits chargés, loading, error      | `useState` dans la page            | utile à une seule page                          |
| search, category, maxPrice, page      | `FiltersContext`                   | doit survivre à la navigation catalogue → fiche |
| wishlist                              | `WishlistContext` + `localStorage` | utilisée partout, doit survivre au rechargement |
| thème                                 | `ThemeContext` + `localStorage`    | bonus                                           |
| valeurs du formulaire, erreurs, envoi | `useState` dans `CreateProduct`    | local au formulaire                             |

Hooks utilisés : `useState`, `useEffect`, `useContext`, `useRef` (délai de recherche), `useParams`, `useNavigate`.

Chaque contexte expose un hook (`useFilters`, `useWishlist`, `useTheme`) qui lève une erreur s'il est appelé hors de son provider. Le contexte est créé avec `null` comme valeur par défaut, ce qui évite de manipuler une valeur `null` dans les composants.

## 10. TypeScript

### Types principaux

| Type                | Contenu                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `Product`           | produit tel que renvoyé par l'API (champs utilisés uniquement)                                                                          |
| `Review`            | `{ rating: number; comment: string; reviewerName: string; date: string }`                                                               |
| `ProductCategory`   | `'smartphones' \| 'tablets' \| 'mobile-accessories'`                                                                                    |
| `ProductsResponse`  | `{ products: Product[]; total: number; skip: number; limit: number }`                                                                   |
| `WishlistItem`      | `Pick<Product, 'id' \| 'title' \| 'brand' \| 'price' \| 'rating' \| 'thumbnail'>`                                                       |
| `Filters`           | `{ search: string; category: string; maxPrice: number \| null; page: number }` (`''` = toutes les catégories, `null` = pas de prix max) |
| `ProductFormValues` | valeurs du formulaire, toutes en `string` (les inputs renvoient des strings)                                                            |
| `ProductFormErrors` | `Partial<Record<keyof ProductFormValues, string>>`                                                                                      |
| `NewProduct`        | données envoyées à l'API après conversion (`Number()`)                                                                                  |

### Points d'attention

- `response.json()` renvoie `any` : le type de retour des services est une promesse faite par le code, pas une vérification à l'exécution.
- Lecture du `localStorage` : `JSON.parse` dans un `try/catch`, tableau vide en cas de contenu absent ou invalide.
- Formulaire : valeurs gardées en `string` pendant la saisie, converties seulement au moment de l'envoi.
- `useParams()` renvoie `string | undefined` : conversion de l'id avec `Number()` et vérification avant l'appel API.
- Événements typés : `ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>`, `FormEvent<HTMLFormElement>`.
- Pas de `any` dans le code (règle oxlint `typescript/no-explicit-any` en `error`).

### Scripts

| Script         | Commande                                         |
| -------------- | ------------------------------------------------ |
| `dev`          | `vite`                                           |
| `build`        | `tsc -b && vite build`                           |
| `typecheck`    | `tsc -b` (le template Vite active déjà `noEmit`) |
| `lint`         | `oxlint`                                         |
| `format`       | `prettier --write .`                             |
| `format:check` | `prettier --check .`                             |

## 11. Conventions de code

- Composants en PascalCase, fonctions et variables en camelCase.
- Un composant par fichier.
- Types partagés dans `types/`, types locaux (props d'un seul composant) dans le fichier du composant.
- Pas de `fetch` en dehors de `services/`.
- Commentaires : pas de paraphrase du code. Une ligne quand le code fait un choix qui ne se devine pas (le « pourquoi »).
- `npm run typecheck`, `npm run lint` et `npm run format:check` passent sans erreur avant chaque commit.

## 12. Bonus prévus

- [x] Projet en TypeScript
- [ ] Dark mode partagé par contexte et sauvegardé dans le `localStorage`
- [ ] Recherche déclenchée 300 ms après la dernière frappe (`useRef` pour le timer)
- [ ] Déploiement Vercel
- [ ] CRUD complet (si le temps le permet : modification `PUT` + suppression `DELETE` avec confirmation)

## 13. Limites connues

- DummyJSON simule les créations : un produit créé n'est pas conservé après rechargement.
- Données en anglais (noms, descriptions, avis) et prix en dollars.
- On charge les 194 produits pour n'en garder que 33 : acceptable ici, mais un vrai catalogue demanderait un filtrage serveur.
- Les critères de recherche ne survivent pas au rechargement (non exigé).

## 14. Ordre de développement

1. ~~Setup : Vite (template `react-ts`), router, oxlint, Prettier, structure des dossiers~~ (fait)
2. ~~Types et config (`types/`, `config/shop.ts`, `vercel.json`)~~ (fait)
3. ~~Service + page catalogue simple~~ (fait)
4. ~~Layout et navigation : `Layout` (avec le seul `<main>` de l'app), `Header`, `MobileNav`, `Footer`, page Accueil, page 404~~ (fait)
5. ~~Fiche détail~~ (fait)
6. FiltersContext, recherche, filtres, pagination
7. WishlistContext + page Wishlist
8. Formulaire de création
9. États (chargement, erreur, vide), accessibilité, responsive
10. Bonus
11. README final

## 15. Checklist de conformité

**Pages et navigation**

- [x] Accueil avec en-tête et navigation vers catalogue et wishlist
- [x] Cartes : 1 image + 3 infos minimum
- [x] Fiche détail : 5 infos minimum dont 2 absentes de la carte
- [ ] Page wishlist
- [ ] URL distinctes, navigation interne, accès direct et rechargement OK

**Recherche, filtres, pagination**

- [ ] Pagination avec commandes et page courante
- [ ] Champ de recherche stylisé + 2 filtres
- [ ] Critères combinés
- [ ] Pagination appliquée aux résultats filtrés, filtrage sur l'ensemble des données
- [ ] Retour page 1 à chaque modification
- [ ] Critères conservés dans un contexte

**Wishlist**

- [ ] Ajout / retrait
- [ ] Pas de doublon
- [ ] Persistance `localStorage`
- [ ] Page wishlist : accès aux fiches + retrait

**Création**

- [ ] Formulaire accessible depuis l'app, champs contrôlés
- [ ] Validation avec messages clairs
- [ ] `POST` JSON + header `Content-Type`
- [ ] Indicateur d'envoi + bouton désactivé
- [ ] Vérification `response.ok`, erreur + réessai sans perte
- [ ] Confirmation + données renvoyées par l'API

**Interface**

- [ ] Responsive sans débordement
- [ ] Indicateur de chargement
- [ ] Erreur compréhensible + réessai
- [ ] Messages listes vides
- [ ] Labels, alt, clavier, focus visible

**Qualité et livrables**

- [ ] Linter (oxlint) + Prettier configurés, lint et format OK
- [ ] `npm run typecheck` sans erreur
- [ ] README complet (sujet, API, installation, config, choix techniques, fonctionnalités, bonus, limites, usage de l'IA, lien Vercel)
- [ ] Dépôt GitHub rendu sur Cesar
