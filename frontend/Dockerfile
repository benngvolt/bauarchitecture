# Étape 1 : Build de l'application
FROM node:18 AS build

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Générer les fichiers statiques
RUN npm run build

# Étape 2 : Servir avec Nginx
FROM nginx:stable-alpine

# Copier le build vers le dossier de Nginx
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour Nginx
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
