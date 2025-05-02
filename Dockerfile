FROM node:22-slim

# Create app directory
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

# Installation de pnpm
RUN npm install -g pnpm

# Copie package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Installation des dépendances
RUN pnpm install

# Copie le reste du code
COPY . .

# Expose le port 4000
EXPOSE 4000

# Commande pour démarrer l'application
CMD ["pnpm", "start"]
