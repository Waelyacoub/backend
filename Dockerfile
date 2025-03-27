# Utiliser l'image Node.js officielle
FROM node:16

# Créer un répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port utilisé par votre application
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
