# NBA Guess Game Backend

Ce projet est le backend d'un jeu de devinettes NBA.

## Objectif du jeu

Le principe est simple :
- le serveur choisit un joueur aléatoire dans la base de données,
- il pose une question sur ce joueur (par exemple sa taille, son équipe, sa position, son pays, son numéro ou son âge),
- le joueur doit donner une réponse correcte à la question.

## Fonctionnement

- `GET /api` retourne la base de données complète des joueurs.
- `GET /api/player/random` renvoie un joueur aléatoire avec une question et plusieurs réponses possibles.
- `POST /api/player/check` vérifie si la réponse donnée est correcte.

## But

Le but est de deviner une information à propos d'un personnage aléatoire du roster NBA et de répondre correctement à la question posée.

