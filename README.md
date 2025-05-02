# Challenge

## Jour 2

### Étape 0 : Setup

- `pnpm install` (depuis l'hôte)
- `docker compose build --no-cache`
- `docker compose up -d -V` (il va générer le client Prisma + les types des resolvers avant de lancer le serveur)

### Étape 1 : Query

- Récupérer les données de la base de données avec Prisma pour les requêtes suivantes :
  - Récupérer tous les managers
  - Récupérer toutes les notes
  - Récupérer toutes les cuisines
  - Récupérer toutes les villes

### Étape 2 : Resolvers Restaurant

- Créer les resolvers pour récupérer depuis le restaurant :
  - Les cuisines
  - Les notes
  - Le managers

### Étape 3 : mutation

- Créer une mutation pour ajouter une ville
- Créer une mutation pour modifier une ville

(input / mutation + génération des types + resolver)

### Étape 4 (Bonus) : Resolvers

- Créer le resolvers pour récupérer depuis la ville les restaurants

### Étape 5 (Bonus) : Mutation

- Créer une mutation pour modifier un restaurant
- Créer une mutation pour supprimer un restaurant
- Créer une mutation pour ajouter une note

## Jour 1

### Étape 1 : MCD

- Terminer le MCD suivant avec mocodo 
  - Un manager peut gérer plusieurs restaurants
  - Un restaurant peut avoir plusieurs cuisines
  - Un restaurant peut avoir plusieurs notes
  - Un restaurant ne peut être situé que dans une seule ville

```mocodo
MANAGER: code manager, email, téléphone, prénom, nom
RESTAURANT: code restaurant, name, description, terrace, adresse
NOTE: code note, valeur
CUISINE: id, label
VILLE: code ville, nom, code postal, coordonnées
```

### Étape 2 : Serveur GraphQL

- Créer un serveur GraphQL avec ApolloServer (toutes les dépendances sont déjà installées)
- Créer un schéma GraphQL avec les types suivants :
  - Manager
  - Restaurant
  - Note
  - Cuisine
  - Ville
- Créer un type Query pour faire les requêtes suivantes :
  - Récupérer tous les managers
  - Récupérer tous les restaurants
  - Récupérer toutes les notes
  - Récupérer toutes les cuisines
  - Récupérer toutes les villes

- Faire les résolvers pour les requêtes (les données doivent être retournées en dur pour le moment)

### Étape 3 (Bonus) : Docker

- Créer un Dockerfile pour le serveur GraphQL
- Créer un docker-compose pour le serveur GraphQL

### Étape 4 (Bonus) : BDD

- Ajouter une base de données PostgreSQL dans le docker-compose
- Initialiser `prisma` pour la base de données
- Créer un schéma Prisma avec les types suivants :
  - Manager
  - Restaurant
  - Note
  - Cuisine
  - Ville
- Générer la migration pour la base de données avec `prisma`

### Étape 5 (Bonus) : Seeding

- Créer un client Prisma pour se connecter à la base de données
- Créer un fichier `src/seed.ts` pour insérer des données dans la base de données
  - Vous pouvez installer Faker pour générer des données aléatoires

