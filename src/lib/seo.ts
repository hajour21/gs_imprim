import { CATALOG_PRODUCTS } from '../data/products';
import type { ViewType } from '../types';

export const ROUTES: Record<ViewType, string> = {
  home: '/',
  'not-found': '/404',
  catalog: '/catalogue',
  'product-business-cards': '/produits/cartes-de-visite-soft-touch',
  'product-stickers': '/produits/stickers-etiquettes-vinyle',
  'product-stamps': '/produits/tampons-cachets-trodat',
  'product-banners': '/produits/baches-et-signaletique',
  'product-rollups': '/produits/roll-up',
  'product-flyers': '/produits/flyers-et-depliants',
  'product-iso-plaques': '/produits/plaques-iso-et-signaletique',
  'product-keychains': '/produits/porte-cles-plexiglas',
  'product-textile-pulls': '/produits/pulls-et-hoodies-personnalises',
  portfolio: '/realisations',
  'quote-express': '/devis-express',
  about: '/a-propos',
  contact: '/contact',
  admin: '/admin',
};

const PAGE_META: Record<ViewType, { title: string; description: string }> = {
  home: {
    title: 'GS Imprim | Impression et façonnage de prestige en Tunisie',
    description: 'GS Imprim accompagne les professionnels en impression, signalétique, textile et personnalisation sur mesure en Tunisie.',
  },
  'not-found': { title: 'Page introuvable | GS Imprim', description: 'La page demandée est introuvable.' },
  catalog: { title: 'Catalogue d’impression | GS Imprim', description: 'Découvrez les produits d’impression et de personnalisation proposés par GS Imprim.' },
  'product-business-cards': { title: 'Cartes de visite Soft-Touch Luxe | GS Imprim', description: 'Configurez vos cartes de visite premium avec finitions Soft-Touch, vernis sélectif et dorure.' },
  'product-stickers': { title: 'Stickers et étiquettes vinyle | GS Imprim', description: 'Personnalisez vos stickers et étiquettes vinyle avec découpe sur mesure et finitions adaptées.' },
  'product-stamps': { title: 'Tampons et cachets Trodat | GS Imprim', description: 'Commandez vos tampons professionnels Trodat, ronds, dateurs et modèles personnalisés.' },
  'product-banners': { title: 'Bâches et signalétique grand format | GS Imprim', description: 'Configurez vos bâches PVC, roll-ups et supports de signalétique grand format.' },
  'product-rollups': { title: 'Roll-up publicitaire | GS Imprim', description: 'Configurez votre roll-up publicitaire en 85 × 200 cm ou 80 × 160 cm.' },
  'product-flyers': { title: 'Flyers et dépliants | GS Imprim', description: 'Créez vos flyers, brochures et dépliants avec formats, papiers et finitions personnalisables.' },
  'product-iso-plaques': { title: 'Plaques ISO et signalétique professionnelle | GS Imprim', description: 'Configurez des plaques de certification ISO et signalétiques professionnelles sur mesure.' },
  'product-keychains': { title: 'Porte-clés plexiglas personnalisés | GS Imprim', description: 'Personnalisez vos porte-clés en plexiglas avec découpe laser, marquage UV ou gravure.' },
  'product-textile-pulls': { title: 'Pulls et hoodies personnalisés | GS Imprim', description: 'Configurez vos pulls et hoodies en coton lourd avec broderie ou impression DTF.' },
  portfolio: { title: 'Réalisations d’impression | GS Imprim', description: 'Explorez les réalisations de GS Imprim en impression, signalétique, textile et personnalisation.' },
  'quote-express': { title: 'Devis express en ligne | GS Imprim', description: 'Envoyez votre demande de devis express à GS Imprim pour vos projets d’impression sur mesure.' },
  about: { title: 'À propos de GS Imprim', description: 'Découvrez l’atelier, le savoir-faire et les engagements de GS Imprim en Tunisie.' },
  contact: { title: 'Contact et showroom | GS Imprim', description: 'Contactez GS Imprim ou rendez-vous au showroom pour vos projets d’impression et de façonnage.' },
  admin: { title: 'Administration | GS Imprim', description: 'Espace sécurisé de pilotage des commandes GS Imprim.' },
};

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    if (property) element.setAttribute('property', name);
    else element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function viewFromPath(pathname: string): ViewType {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized.startsWith('/produits/catalogue/')) return 'catalog';
  const entry = (Object.entries(ROUTES) as [ViewType, string][]).find(([, path]) => path === normalized);
  return entry?.[0] ?? 'not-found';
}

export function productPath(productId: string) {
  return `/produits/catalogue/${productId}`;
}

export function productIdFromPath(pathname: string) {
  const prefix = '/produits/catalogue/';
  return pathname.startsWith(prefix) ? pathname.slice(prefix.length) : undefined;
}

export function applySeo(view: ViewType, productId?: string) {
  const product = productId ? CATALOG_PRODUCTS.find((item) => item.id === productId) : undefined;
  const meta = product ? { title: `${product.title} | GS Imprim`, description: product.shortDesc } : PAGE_META[view];
  document.title = meta.title;
  setMeta('description', meta.description);
  setMeta('og:title', meta.title, true);
  setMeta('og:description', meta.description, true);
  setMeta('og:type', view.startsWith('product-') ? 'product' : 'website', true);
  setMeta('twitter:card', 'summary_large_image');

  const configuredUrl = import.meta.env.VITE_APP_URL?.replace(/\/$/, '');
  const canonicalUrl = configuredUrl ? `${configuredUrl}${productId ? productPath(productId) : ROUTES[view]}` : undefined;
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonicalUrl) {
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  } else {
    canonical?.remove();
  }

  const existingSchema = document.getElementById('gs-imprim-schema');
  existingSchema?.remove();
  const viewProduct = product ?? CATALOG_PRODUCTS.find((item) => item.viewId === view);
  const schema: Record<string, unknown> = viewProduct && viewProduct.startingPrice !== undefined
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: viewProduct.title,
        description: viewProduct.shortDesc,
        image: viewProduct.image,
        offers: { '@type': 'Offer', priceCurrency: 'TND', price: viewProduct.startingPrice },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'GS Imprim',
        ...(canonicalUrl ? { url: canonicalUrl } : {}),
      };
  const script = document.createElement('script');
  script.id = 'gs-imprim-schema';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
