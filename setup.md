 # PREREQUIS

- Installer Docker
- Installer Docker-compose
- Installer Node.js 22 pour les developpeurs

# AJOUT D'UN SERVICE

- Lancer la commande ``npm install`` dans le dossier frontend et dans le dossier de chaque service pour générer un package-lock.json

- Créer un dockerfile à la racine du dossier du service

- Créer l'image ainsi que les différents stage dans le dockerfile

- Ajouter le service en mode production dans ``docker-compose.yml``

- Ne pas oublier de le mettre dans le bon network (``network: app-network``)

- Surcharger le container du service en mode dev dans ``compose.override.yml`` en spécifiant la target du build de l'image (``target: ./services/<nom_du_service>/.env``) et le env_file (``env_file: ./services/<nom_du_service>``). (le fichier sera chargé automatiquement à chaque docker compose up. Il faudra donc modifier les champs concernés pour le mode dev)

- Surcharger à nouveau le container du service en mode dans ``compose.prod.yml`` de la même manière que dans ``compose.override.yml`` mais avec les bonnes variables et chemin pour la prod.

**NOTE**: Décommenter le block du service sur lequel vous comptez travailler dans ``./frontend/nginx.conf`` pour activer la communication du frontend avec le service.

# LANCER LE PROJET EN MODE DEV

- Lancer la commande ``npm install`` dans chaque service pour générer un package-lock.json ( dans le dossier de chaque service)

- Lancer la commande ``docker compose up --build -d`` à la racine du projet pour lancer le projet en mode dev