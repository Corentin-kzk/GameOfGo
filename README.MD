# Projet Docker Compose Python avec MongoDB

Ce projet est un exemple de configuration Docker Compose pour exécuter une application Python avec MongoDB et mongo-express dans des conteneurs Docker.

## Prérequis

Assurez-vous d'avoir Docker et Docker Compose installés sur votre système avant de continuer. Vous pouvez les télécharger et les installer à partir du [site officiel de Docker](https://www.docker.com/get-started).

## Instructions

### 1. Clonage du projet :

Clonez ce projet sur votre machine en utilisant la commande suivante :

```bash
git clone git@github.com:Corentin-kzk/GameOfGo.git
```

### 2. Lancement des conteneurs Docker :

Accédez au répertoire racine du projet et exécutez la commande suivante pour lancer les conteneurs Docker :

```bash
docker compose up --remove-orphans --build -d
```

Cela démarrera les conteneurs et exposera votre application Django sur le port 8000 et mongo-express sur le port 8081 de votre machine locale.

### 3. Accès à l'application :

Ouvrez un navigateur web et accédez à l'URL suivante pour voir votre application en cours d'exécution :

```
http://localhost:8000
```

Pour accéder à l'interface de gestion de la base de données MongoDB via mongo-express, utilisez l'URL suivante :

```
http://localhost:8080
```
