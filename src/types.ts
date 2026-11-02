export type ViewType = 
  | 'home' 
  | 'not-found'
  | 'catalog' 
  | 'product-business-cards' 
  | 'product-stickers' 
  | 'product-stamps' 
  | 'product-banners' 
  | 'product-rollups'
  | 'product-flyers' 
  | 'product-iso-plaques' 
  | 'product-keychains'
  | 'product-textile-pulls'
  | 'portfolio' 
  | 'quote-express' 
  | 'about' 
  | 'contact'
  | 'admin';

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  specs: string;
  quantity: number | string;
  unitPrice: number;
  totalPrice: number;
  image: string;
  options?: Record<string, any>;
}

export interface ProductSummary {
  id: string;
  viewId: ViewType;
  title: string;
  category: 'papeterie' | 'publicite' | 'rollups' | 'stickers' | 'packaging' | 'bureautique' | 'evenementiel' | 'goodies' | 'textile' | 'decoration';
  categoryLabel: string;
  shortDesc: string;
  startingPrice?: number;
  priceUnit?: string;
  pricingStatus?: 'published' | 'quote';
  subcategoryId?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  badgeType?: 'primary' | 'secondary' | 'tertiary';
  tags: string[];
}
