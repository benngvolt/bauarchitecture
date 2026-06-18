# Utiliser une image Node.js officielle
FROM node:18

# Créer un répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Copier le fichier .env si besoin (si pas déjà ignoré)
# COPY ./env/.env .env

# 🔧 Créer le dossier /uploads dans le conteneur (au cas où il n’est pas monté)
RUN mkdir -p /usr/src/app/uploads

# Exposer le port de ton API (ex :  3000)
EXPOSE 3000

# Lancer l’application
CMD ["node", "server.js"]