#!/bin/bash

# Arrêt et suppression des anciens conteneurs
echo "🧼 Suppression des anciens conteneurs..."
docker rm -f bau_frontend bau_backend 2>/dev/null || true

# Build backend
echo "🔧 Build du backend..."
docker build -t bau_backend ./backend

# Build frontend
echo "🎨 Build du frontend..."
docker build -t bau_frontend ./frontend

# Crée le dossier uploads s'il n'existe pas
mkdir -p ./uploads

# Lancer backend avec le dossier uploads monté
echo "🚀 Lancement du backend (port 3000)..."
docker run -d \
  -p 3005:3000 \
  -v $(pwd)/uploads:/usr/src/app/uploads \
  --name bau_backend \
  bau_backend

# Lancer frontend (Nginx) sur port 8080
echo "🚀 Lancement du frontend (port 8080)..."
docker run -d -p 8083:80 --name bau_frontend bau_frontend

echo "✅ Tout est prêt ! Frontend : http://localhost:8083 — Backend : http://localhost:3005"