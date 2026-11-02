import type { ProductSummary } from '../types';

export type CatalogCategory = {
  id: ProductSummary['category'];
  label: string;
  icon: string;
  subcategories: { id: string; label: string }[];
};

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  { id: 'papeterie', label: 'Cartes & Papeterie', icon: 'badge', subcategories: [
    { id: 'cartes-professionnelles', label: 'Cartes professionnelles' },
    { id: 'papeterie', label: 'Papeterie' },
  ] },
  { id: 'stickers', label: 'Stickers & Packaging', icon: 'label', subcategories: [
    { id: 'stickers', label: 'Stickers et étiquettes' },
    { id: 'packaging', label: 'Boîtes et emballages' },
  ] },
  { id: 'publicite', label: 'Grand Format', icon: 'campaign', subcategories: [
    { id: 'supports-plv', label: 'Supports PLV' },
    { id: 'signalétique', label: 'Signalétique et panneaux' },
  ] },
  { id: 'rollups', label: 'Roll-up', icon: 'present_to_all', subcategories: [
    { id: 'rollups', label: 'Roll-up publicitaire' },
  ] },
  { id: 'goodies', label: 'Cadeaux personnalisés', icon: 'redeem', subcategories: [{ id: 'cadeaux', label: 'Cadeaux et objets' }] },
  { id: 'decoration', label: 'Décoration & Photos', icon: 'photo_library', subcategories: [{ id: 'decoration', label: 'Décoration et photos' }] },
  { id: 'bureautique', label: 'Cachets & Bureautique', icon: 'approval', subcategories: [{ id: 'cachets', label: 'Cachets professionnels' }] },
  { id: 'textile', label: 'Textile personnalisé', icon: 'apparel', subcategories: [{ id: 'textile', label: 'Vêtements et sacs' }] },
];

const quoteProduct = (
  id: string,
  title: string,
  category: ProductSummary['category'],
  categoryLabel: string,
  subcategoryId: string,
  shortDesc: string,
  viewId: ProductSummary['viewId'] = 'catalog',
): ProductSummary => ({
  id,
  viewId,
  title,
  category,
  categoryLabel,
  subcategoryId,
  shortDesc,
  pricingStatus: 'quote',
  priceUnit: 'Sur devis',
  rating: 0,
  reviewsCount: 0,
  image: '/assets/aistudio/image_01548933.png',
  tags: ['Configuration sur mesure', 'Tarif commercial'],
});

export const EXPANDED_CATALOG_PRODUCTS: ProductSummary[] = [
  quoteProduct('cards-standard', 'Cartes de visite standards', 'papeterie', 'Cartes professionnelles', 'cartes-professionnelles', 'Cartes professionnelles pour une communication quotidienne.', 'product-business-cards'),
  quoteProduct('cards-premium', 'Cartes de visite Premium', 'papeterie', 'Cartes professionnelles', 'cartes-professionnelles', 'Supports premium avec finitions personnalisables.', 'product-business-cards'),
  quoteProduct('cards-vip', 'Cartes de visite VIP', 'papeterie', 'Cartes professionnelles', 'cartes-professionnelles', 'Cartes haut de gamme pour marques et dirigeants.', 'product-business-cards'),
  quoteProduct('cards-selective-varnish', 'Cartes avec vernis sélectif', 'papeterie', 'Cartes professionnelles', 'cartes-professionnelles', 'Mise en valeur de détails graphiques avec vernis sélectif.', 'product-business-cards'),
  quoteProduct('cards-square-fantasy', 'Cartes carrées et fantaisie', 'papeterie', 'Cartes professionnelles', 'cartes-professionnelles', 'Formats créatifs et découpes adaptées à votre identité.', 'product-business-cards'),
  quoteProduct('cards-nfc', 'Cartes NFC', 'papeterie', 'Cartes professionnelles', 'cartes-professionnelles', 'Cartes connectées avec personnalisation sur demande.', 'product-business-cards'),
  quoteProduct('badges-pvc-rfid', 'Badges PVC et cartes RFID', 'papeterie', 'Cartes professionnelles', 'cartes-professionnelles', 'Badges et cartes pour événements, équipes et accès.', 'catalog'),
  quoteProduct('badges-event', 'Badges événementiels', 'papeterie', 'Cartes professionnelles', 'cartes-professionnelles', 'Badges papier ou PVC pour événements et manifestations.', 'catalog'),
  quoteProduct('catalogues-a4-a5', 'Brochures et catalogues A4/A5', 'papeterie', 'Papeterie', 'papeterie', 'Brochures et catalogues à plusieurs pages.', 'product-flyers'),
  quoteProduct('letterheads', 'Papier à en-tête', 'papeterie', 'Papeterie', 'papeterie', 'Papier à en-tête professionnel pour vos correspondances.', 'product-business-cards'),
  quoteProduct('document-folders', 'Chemises porte-documents', 'papeterie', 'Papeterie', 'papeterie', 'Chemises personnalisées pour présenter vos documents.', 'catalog'),
  quoteProduct('ncr-notebooks', 'Carnets autocopiants NCR', 'papeterie', 'Papeterie', 'papeterie', 'Carnets autocopiants pour commandes, reçus et suivis.', 'product-flyers'),
  quoteProduct('order-books', 'Bons de commande', 'papeterie', 'Papeterie', 'papeterie', 'Bons de commande personnalisés pour entreprises.', 'product-flyers'),
  quoteProduct('calendars', 'Calendriers de bureau et muraux', 'papeterie', 'Papeterie', 'papeterie', 'Calendriers personnalisés pour communication annuelle.', 'catalog'),
  quoteProduct('postcards', 'Cartes postales personnalisées', 'papeterie', 'Papeterie', 'papeterie', 'Cartes postales pour campagnes, événements et tourisme.', 'product-flyers'),
  quoteProduct('tickets', 'Tickets et billetterie', 'papeterie', 'Papeterie', 'papeterie', 'Tickets numérotés et supports de billetterie.', 'product-flyers'),
  quoteProduct('stickers-round', 'Stickers ronds', 'stickers', 'Stickers et étiquettes', 'stickers', 'Stickers ronds personnalisés pour produits et communication.', 'product-stickers'),
  quoteProduct('stickers-square', 'Stickers carrés et rectangulaires', 'stickers', 'Stickers et étiquettes', 'stickers', 'Formats classiques pour étiquettes et supports publicitaires.', 'product-stickers'),
  quoteProduct('stickers-custom-shape', 'Stickers à forme personnalisée', 'stickers', 'Stickers et étiquettes', 'stickers', 'Découpes personnalisées suivant votre forme graphique.', 'product-stickers'),
  quoteProduct('vinyl-labels', 'Étiquettes vinyle', 'stickers', 'Stickers et étiquettes', 'stickers', 'Étiquettes vinyle pour produits, vitrines et emballages.', 'product-stickers'),
  quoteProduct('advertising-stickers', 'Autocollants publicitaires', 'stickers', 'Stickers et étiquettes', 'stickers', 'Autocollants pour campagnes, véhicules et vitrines.', 'product-stickers'),
  quoteProduct('custom-packaging', 'Boîtes et emballages personnalisables', 'packaging', 'Packaging', 'packaging', 'Emballages personnalisés selon votre produit et votre identité.', 'product-stickers'),
  quoteProduct('speedx', 'Speed’X', 'publicite', 'Supports PLV', 'supports-plv', 'Support de communication grand format pour événements.', 'product-banners'),
  quoteProduct('rollup-80x200', 'Roll-up 80 × 200 cm', 'publicite', 'Supports PLV', 'supports-plv', 'Roll-up compact pour salons et points de vente.', 'product-banners'),
  quoteProduct('rollup-85x200', 'Roll-up 85 × 200 cm', 'publicite', 'Supports PLV', 'supports-plv', 'Roll-up professionnel pour communication mobile.', 'product-banners'),
  quoteProduct('rollup-100x200', 'Roll-up 100 × 200 cm', 'publicite', 'Supports PLV', 'supports-plv', 'Roll-up grand format pour une visibilité renforcée.', 'product-banners'),
  quoteProduct('oriflammes', 'Oriflammes', 'publicite', 'Supports PLV', 'supports-plv', 'Drapeaux publicitaires pour intérieur et extérieur.', 'product-banners'),
  quoteProduct('popup-stands', 'Stands parapluie', 'publicite', 'Supports PLV', 'supports-plv', 'Stands événementiels à installation rapide.', 'product-banners'),
  quoteProduct('vinyl-microperforated', 'Vinyle microperforé', 'publicite', 'Signalétique', 'signalétique', 'Vinyle microperforé pour vitrages et surfaces vitrées.', 'product-banners'),
  quoteProduct('panels-pvc-mdf', 'Panneaux PVC, MDF et mousse', 'publicite', 'Signalétique', 'signalétique', 'Panneaux rigides pour signalétique et présentation.', 'product-banners'),
  quoteProduct('mugs', 'Mugs personnalisés', 'goodies', 'Cadeaux personnalisés', 'cadeaux', 'Mugs personnalisés pour équipes, événements et cadeaux.', 'catalog'),
  quoteProduct('magic-mugs', 'Mugs magiques', 'goodies', 'Cadeaux personnalisés', 'cadeaux', 'Mugs à révélation thermique personnalisables.', 'catalog'),
  quoteProduct('tshirts', 'T-shirts personnalisés', 'textile', 'Textile personnalisé', 'textile', 'T-shirts personnalisés avec impression sur demande.', 'product-textile-pulls'),
  quoteProduct('polos', 'Polos personnalisés', 'textile', 'Textile personnalisé', 'textile', 'Polos pour équipes, événements et entreprises.', 'product-textile-pulls'),
  quoteProduct('hoodies', 'Sweats et hoodies', 'textile', 'Textile personnalisé', 'textile', 'Sweats et hoodies personnalisés en plusieurs tailles.', 'product-textile-pulls'),
  quoteProduct('caps', 'Casquettes personnalisées', 'textile', 'Textile personnalisé', 'textile', 'Casquettes personnalisées pour campagnes et équipes.', 'product-textile-pulls'),
  quoteProduct('tote-bags', 'Tote bags et sacs TNT', 'goodies', 'Cadeaux personnalisés', 'cadeaux', 'Sacs personnalisés pour événements et communication.', 'catalog'),
  quoteProduct('pins', 'Pin’s personnalisés', 'goodies', 'Cadeaux personnalisés', 'cadeaux', 'Pin’s personnalisés pour marques et événements.', 'catalog'),
  quoteProduct('trophies', 'Trophées personnalisés', 'goodies', 'Cadeaux personnalisés', 'cadeaux', 'Trophées et récompenses personnalisées.', 'product-iso-plaques'),
  quoteProduct('welcome-packs', 'Welcome packs', 'goodies', 'Cadeaux personnalisés', 'cadeaux', 'Packs d’accueil personnalisés pour collaborateurs et clients.', 'catalog'),
  quoteProduct('photo-prints', 'Tirages photo et agrandissements', 'decoration', 'Décoration & Photos', 'decoration', 'Tirages photo dans différents formats.', 'catalog'),
  quoteProduct('polaroid-prints', 'Photos style Polaroid', 'decoration', 'Décoration & Photos', 'decoration', 'Tirages photo au format instantané.', 'catalog'),
  quoteProduct('photo-frames', 'Cadres photo', 'decoration', 'Décoration & Photos', 'decoration', 'Cadres personnalisés pour vos photos.', 'catalog'),
  quoteProduct('canvas-print', 'Impression sur toile', 'decoration', 'Décoration & Photos', 'decoration', 'Impression décorative sur toile.', 'catalog'),
  quoteProduct('wallpaper', 'Papier peint personnalisé', 'decoration', 'Décoration & Photos', 'decoration', 'Papier peint personnalisé pour espaces professionnels et privés.', 'product-banners'),
  quoteProduct('cachets-rectangular', 'Cachets rectangulaires', 'bureautique', 'Cachets professionnels', 'cachets', 'Cachets rectangulaires compatibles avec les modèles disponibles.', 'product-stamps'),
  quoteProduct('cachets-round', 'Cachets ronds', 'bureautique', 'Cachets professionnels', 'cachets', 'Cachets ronds pour entreprises, associations et administrations.', 'product-stamps'),
  quoteProduct('cachets-pocket', 'Cachets de poche', 'bureautique', 'Cachets professionnels', 'cachets', 'Cachets compacts pour une utilisation mobile.', 'product-stamps'),
];
