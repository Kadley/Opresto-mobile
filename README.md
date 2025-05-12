# Challenge

## Intialisation des données

Une fois que le docker est lancé.

- exécuter les fichiers de migrations pour initialiser la base de données
  - `docker compose exec presto_app npx prisma db push`
- exécuter le fichier de seed pour insérer des données dans la base de données
  - `docker compose exec presto_app pnpm seed`

## Jour 4

### Étape 1 : Resolver / mutation

- Continuer les bonus du jour 3 pour finir les resolvers et les mutations.

### Étape 2 : Bonus

- Ajouter une pagination sur les Query & les resolvers

## Jour 3

Les bonus seront également à faire demain après midi pour continuer la pratique. Pas de pression, on avance à son rythme.

### Étape 1 : Resolver Météo d'une ville

- Implémenter le resolver pour récupérer la météo d'une ville ([resolver](./src/graphql/city/resolver.ts))

### Étape 2 : Resolver pour récupérer une donnée

- Créer un resolver pour récupérer une ville par rapport à son id
- Créer un resolver pour récupérer une ville par rapport à son code postal
- Créer un resolver pour récupérer un restaurant par rapport à son id

### Étape 3 (Bonus) : Finir les resolvers non implémentés

- les bonus 4 et 5 du jour 2
- Sur la ville :
  - Récupérer les restaurants
- Sur le manager :
  - Récupérer les restaurants
- Sur les notes :
  - Récupérer le restaurant
- Sur les styles de cuisine :
  - Récupérer les restaurants

### Étape 4 (Bonus) : Finir les mutations non implémentées

- Sur la ville :
  - Créer une mutation pour supprimer une ville
- Sur le restaurant :
  - Créer une mutation pour modifier un restaurant
  - Créer une mutation pour supprimer un restaurant
- Sur les types de cuisine :
  - Créer une mutation pour ajouter un type de cuisine
  - Créer une mutation pour supprimer un type de cuisine
- Sur les notes :
  - Créer une mutation pour ajouter une note
  - Créer une mutation pour modifier une note
  - Créer une mutation pour supprimer une note

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

