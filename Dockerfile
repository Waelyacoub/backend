FROM node:16

# Créer et définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances dans le conteneur
RUN npm install

# Copier tous les autres fichiers du projet dans le répertoire de travail
COPY . .

# Exposer le port 3000 (ou autre si nécessaire)
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
