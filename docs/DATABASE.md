# Structure Firestore GS Imprim

## Collections

- `users/{userId}` : profil client et coordonnées.
- `users/{userId}/cart/{itemId}` : panier persistant du client connecté.
- `products/{productId}` : catalogue public, modifiable uniquement par l’administration.
- `orders/{orderId}` : commandes envoyées par les clients, en attente de validation commerciale.
- `quoteRequests/{quoteId}` : demandes de devis publiques.
- `contactMessages/{messageId}` : messages du formulaire de contact.
- `reviews/{reviewId}` : avis clients modérés.

## Statuts de commande

`pending_quote` → `confirmed` → `in_production` → `ready` → `delivered` ou `cancelled`.

Le client envoie uniquement un `estimatedTotals`. Le montant final doit être calculé ou validé côté administration avant confirmation.

## Sécurité

Les clients lisent uniquement leurs propres profils et commandes. Les écritures d’administration devront passer par un backend sécurisé ou une fonction Firebase protégée.
