# Mobilo : instructions pour Claude Code

## Contexte

Projet React scolaire et individuel (Sup de Vinci) : une boutique de téléphonie qui consomme l'API DummyJSON.

L'élève sera interrogé à l'oral sur chaque ligne du code, devra justifier ses choix et faire une modification en direct. **La priorité absolue est un code simple, lisible et fonctionnel**, que l'élève peut expliquer sans aide. Entre une solution élégante et une solution évidente, choisis toujours l'évidente.

## Documents de référence

- `docs/cahier-des-charges.md` : **source de vérité**. Pages, fonctionnalités, archi, types, règles de validation, checklist de conformité (section 15). Lis-le avant toute tâche.
- `docs/maquettes/` : captures Stitch, pour le **style visuel uniquement** (couleurs, espacements, disposition).

Éléments des maquettes à **ne pas** coder (absents du CDC ou inexistants dans l'API) :

- Boutons « Acheter » et « Ajouter au panier » (pas de panier)
- Icône compte utilisateur
- « TVA incluse », « Livraison gratuite », « Achat vérifié », « Synchronisé avec votre compte client », « Chiffrement SSL », « Devise active », badges de couleur ou de stockage (« 128 Go »)
- Miniatures sous l'image de la fiche produit
- Fil d'Ariane, tri « Pertinence », liens Mentions légales / Confidentialité / CGV
- Menu burger : sur mobile, la navigation est une barre d'onglets en bas
- Encadrés « États du catalogue » : ce sont des démos d'états (vide, erreur, chargement), qui s'affichent **à la place** de la grille, pas en dessous

## Commandes

```bash
npm run dev           # serveur de dev
npm run lint          # oxlint
npm run typecheck     # tsc -b
npm run format        # Prettier, corrige
npm run format:check  # Prettier, vérifie
npm run build
```

Après chaque étape : `npm run lint`, `npm run typecheck` et `npm run format:check` doivent passer sans erreur ni warning.

## Stack imposée

React 19, TypeScript 6 (strict), Vite, react-router v8, Tailwind CSS v4, oxlint, Prettier.

**N'ajoute aucune dépendance** sans demander : pas de bibliothèque de composants, d'axios, de TanStack, de Redux, de Zustand, de lodash ni de bibliothèque d'icônes. Les icônes sont des SVG inline simples ou des caractères (♥, ★).

## Règles de simplicité

- Composants en `function` nommée avec `export default`, pas de `React.FC`.
- Props typées avec une `interface` dans le fichier du composant.
- Hooks utilisés : `useState`, `useEffect`, `useContext`, `useRef` (délai de recherche, bonus), `useParams`, `useNavigate`. Pas de `useReducer`, `useMemo`, `useCallback`, `useLayoutEffect`, `forwardRef`, `memo` ni portals.
- Pas de custom hook générique (`useFetch`, `useLocalStorage`…). Seuls hooks custom autorisés : ceux qui lisent un contexte (`useFilters`, `useWishlist`, `useTheme`).
- Pas de pattern avancé : pas de HOC, render props, compound components, `AbortController`, cache ou retry automatique.
- Les données dérivées sont calculées directement dans le rendu (`const filtered = filterProducts(...)`), sans les stocker dans un état.
- Un composant par fichier, fichiers courts. Si un composant dépasse environ 100 lignes, découpe-le.
- Pas de `any`, pas de `as` sauf nécessité réelle (et alors expliquée en commentaire).
- Routing : `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `Outlet`, `useParams`, `useNavigate`. Pas de data router (`createBrowserRouter`, loaders, actions).

## Organisation

Respecte l'archi de la section 8 du CDC :

- `config/` : constantes (déjà prêt : `api.ts`, `shop.ts`)
- `types/` : types partagés (déjà prêt : `product.ts`, `filters.ts`, `form.ts`)
- `services/productService.ts` : **seul endroit** où il y a des `fetch`. Une fonction par appel. Chaque fonction vérifie `response.ok` et lance une `Error` avec un message en français si la requête échoue.
- `context/` : `FiltersContext.tsx`, `WishlistContext.tsx`. Chaque contexte est créé avec `null` et expose un hook qui lève une erreur hors de son provider.
- `utils/` : fonctions pures sans React (`filterProducts.ts`, `validateProduct.ts`).
- `components/` : UI réutilisable, reçoit des props, ne fait pas d'appel API.
- `pages/` : une page par route. Gère son chargement (`loading`, `error`, données) avec `useState` + `useEffect`, et une fonction de chargement réutilisée par le bouton « Réessayer ».

## Style CSS

- Tailwind v4 : les styles sont des classes dans le JSX, pas de fichier `.css` par composant. Seuls fichiers CSS : `styles/variables.css` (thème `@theme`, mode sombre, couleurs de rayon) et `styles/global.css` (import de Tailwind, styles de base).
- **Toujours les classes du thème** (`text-muted`, `p-md`, `rounded-card`…) : aucune couleur, taille de police ou espacement en dur. Valeur entre crochets (`grid-cols-[1fr_13rem]`) seulement quand aucune classe n'existe.
- Liste de classes répétée dans un fichier : une constante en majuscules (`const INPUT_CLASSES = '...'`). Bouton ou lien en forme de bouton : le composant `ui/Button`.
- Mobile d'abord, puis les préfixes `sm:` (640px), `md:` (768px) et `lg:` (1024px).
- Mouvement uniquement en réponse à une action (survol, clic) et le spinner de chargement. Aucune animation d'apparition. Tout est coupé sous `prefers-reduced-motion`.

## Accessibilité (exigée par la consigne)

- Chaque champ a un `<label htmlFor>`.
- Images avec un `alt` pertinent (le nom du produit).
- Actions en `<button type="button">` ou `<Link>`, jamais de `div` cliquable.
- Bouton wishlist : `aria-pressed` + `aria-label` explicite (« Ajouter iPhone X à la wishlist »).
- Focus visible : déjà géré dans `global.css`, ne pas le supprimer.
- Messages d'erreur du formulaire reliés au champ avec `aria-describedby`.

## Commentaires

- En français, une ligne, uniquement pour le **pourquoi** : un choix qui ne se devine pas en lisant le code (filtrage côté client, retour à la page 1, initialisation lazy du `localStorage`, vérification de `response.ok`…).
- Jamais de commentaire qui paraphrase le code.
- Noms de variables et fonctions en anglais, textes affichés en français.

## Façon de travailler

1. Suis l'ordre de la section 14 du CDC, **une étape à la fois**. Les étapes 1 (setup) et 2 (types et config) sont faites.
2. À la fin de chaque étape : lance les vérifications, coche les cases correspondantes dans la checklist du CDC (section 15), puis explique à l'élève en quelques phrases simples ce que tu as fait, quels hooks tu as utilisés et pourquoi. Il doit pouvoir le redire à l'oral.
3. Donne-lui aussi une courte liste de choses à tester dans le navigateur (ex. « tape "iphone" puis choisis Tablettes : la liste doit être vide et afficher le message »). Une étape n'est terminée que quand ça fonctionne vraiment, pas seulement quand les vérifications passent.
4. Ne fais aucun bonus avant que toute la checklist obligatoire soit cochée.
5. Ne fais pas de commit : l'élève les fait lui-même.
6. Si une exigence du CDC te semble demander une solution complexe, propose d'abord l'option la plus simple et demande.
