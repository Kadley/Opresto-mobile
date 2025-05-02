# Plan d'action GraphQL

Les étapes lorsqu'on rajoute une nouvelle fonctionnalité à l'API GraphQL :

- Gérer le schéma (Ajouter un type / un input / une query / une mutation)
- Générer les types TypeScript
  - `pnpm codegen`
- Ajouter les résolveurs pour les queries / mutations / types ajoutés dans le schéma
