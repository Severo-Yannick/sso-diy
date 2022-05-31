Single Sign-On
========

1 - Lancer
```docker compose up```

2 - Lancer
```sudo nano /etc/hosts```

Ajouter en fin de fichier
```
# docker local
127.0.0.1       adminer.test
# nodeJS local
127.0.1         sso-server.test
```

Création d'un service pour le serveur central d'authentification (sso-server) => http://sso-server.test

Adminer est une application web offrant une interface graphique pour notre système de gestion de base de données => http://adminer.test/