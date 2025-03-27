# Étape 1 : Utiliser l'image officielle Node.js
FROM node:16

# Étape 2 : Créer et définir le répertoire de travail
WORKDIR /usr/src/app

# Étape 3 : Copier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Étape 4 : Installer les dépendances dans le conteneur
RUN npm install

# Étape 5 : Copier tous les autres fichiers du projet dans le conteneur
COPY . .

# Étape 6 : Exposer le port 3000 (ou un autre port si nécessaire)
EXPOSE 3000

# Étape 7 : Définir la commande pour démarrer l'application
CMD ["npm", "start"]
