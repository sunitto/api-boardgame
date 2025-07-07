# Étape 1 : image de base
FROM node:18

# Étape 2 : créer dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 : copier les fichiers nécessaires
COPY package*.json ./

# Étape 4 : installer les dépendances
RUN npm install

# Étape 5 : copier tout le projet
COPY . .

# Étape 6 : exposer le port (si ton app tourne sur 3000 par exemple)
EXPOSE 3000

# Étape 7 : démarrer l'app
CMD ["npm", "start"]
