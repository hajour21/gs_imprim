# Catalogue GS Imprim

Le catalogue est organisé autour de catégories, sous-catégories et produits réutilisables.

## Catégories intégrées

- Cartes professionnelles et papeterie
- Stickers et packaging
- Grand format et signalétique
- Cadeaux personnalisés
- Textile personnalisé
- Décoration et photos
- Cachets et bureautique

Les références existantes conservent leurs configurateurs dédiés. Les nouvelles références sont disponibles dans le catalogue avec `pricingStatus: "quote"` tant qu’un tarif commercial validé n’a pas été publié.

## Tarification

`src/lib/pricing.ts` contient une fonction pure pour calculer un prix à partir de règles validées : paliers, finitions, recto-verso, conception et livraison. Le navigateur ne doit pas être considéré comme source d’autorité pour une commande finale ; la validation serveur devra réutiliser les mêmes règles depuis `pricingRules` ou une fonction Firebase protégée.

## Collections Firebase prévues

Les collections `categories`, `products`, `productVariants`, `customizationOptions`, `pricingRules` et `promotions` sont lisibles publiquement lorsque nécessaire, mais aucune écriture frontend n’est autorisée par les règles Firestore. Les fonctions d’administration devront utiliser des Custom Claims et un backend de confiance.
