# BAU Architecture — frontend

React 19 + Vite, styles en SCSS.

## Scripts

- `npm start` (ou `npm run dev`) : serveur de développement sur http://localhost:3000
- `npm run build` : version de production dans `build/` (servie par nginx, voir `Dockerfile` et `nginx.conf`)
- `npm run preview` : sert le dossier `build/` en local pour le vérifier

Node 20.19 ou plus (22 recommandé).

L'adresse de l'API est dans `src/utils/constants.js` (`API_URL`).
