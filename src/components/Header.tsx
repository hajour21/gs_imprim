import React, { useEffect, useRef, useState } from 'react';
import { Calculator, ChevronDown, Menu, Phone, Search, ShoppingBag, UserRound } from 'lucide-react';
import type { CartItem, ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenEspacePro: () => void;
  onToggleMobileDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, cart, onOpenCart, onOpenSearch, onOpenEspacePro, onToggleMobileDrawer }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const products: Array<{ label: string; view: ViewType; detail: string }> = [
    { label: 'Cartes professionnelles', view: 'product-business-cards', detail: 'Papier premium & finition sur mesure' },
    { label: 'Stickers & étiquettes', view: 'product-stickers', detail: 'Découpe et adhésifs personnalisés' },
    { label: 'Roll-up publicitaire', view: 'product-rollups', detail: '85 × 200 cm ou 80 × 160 cm' },
    { label: 'Tampons professionnels', view: 'product-stamps', detail: 'Trodat, ronds et dateurs' },
    { label: 'Plaques ISO', view: 'product-iso-plaques', detail: 'Aluminium, plexiglas & entretoises' },
  ];

  useEffect(() => {
    const close = (event: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close); document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', escape); };
  }, []);

  const count = cart.length;
  const navigate = (view: ViewType) => { setOpen(false); onNavigate(view); };
  const active = (view: ViewType) => currentView === view;

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <button className="brand-mark" onClick={() => navigate('home')} aria-label="GS Imprim, accueil">
          <span className="brand-symbol">GS</span><span className="brand-copy"><strong>GS Imprim</strong><small>Studio d’impression</small></span>
        </button>
        <nav className="site-nav" aria-label="Navigation principale">
          <button className={active('home') ? 'nav-link active' : 'nav-link'} onClick={() => navigate('home')}>Accueil</button>
          <button className={active('catalog') ? 'nav-link active' : 'nav-link'} onClick={() => navigate('catalog')}>Catalogue</button>
          <div ref={menuRef} className="nav-products">
            <button className={`nav-link ${currentView.startsWith('product-') ? 'active' : ''}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="menu">Produits <ChevronDown size={15} /></button>
            {open && <div className="products-popover" role="menu"><div className="popover-kicker">Configurateurs dédiés</div>{products.map((product) => <button role="menuitem" className="popover-item" key={product.view} onClick={() => navigate(product.view)}><span className="popover-dot" /><span><strong>{product.label}</strong><small>{product.detail}</small></span></button>)}<button className="popover-all" onClick={() => navigate('catalog')}>Voir tout le catalogue <span>→</span></button></div>}
          </div>
          <button className={active('portfolio') ? 'nav-link active' : 'nav-link'} onClick={() => navigate('portfolio')}>Réalisations</button>
          <button className={active('about') ? 'nav-link active' : 'nav-link'} onClick={() => navigate('about')}>À propos</button>
        </nav>
        <div className="header-actions">
          <button className="icon-action" onClick={onOpenSearch} aria-label="Rechercher"><Search size={19} /></button>
          <button className="pro-action" onClick={onOpenEspacePro} aria-label="Ouvrir l’espace client"><UserRound size={17} /><span>Espace client</span></button>
          <button className="icon-action cart-action" onClick={onOpenCart} aria-label={`Panier, ${count} article${count > 1 ? 's' : ''}`}><ShoppingBag size={19} />{count > 0 && <b>{count}</b>}</button>
          <button className="quote-action" onClick={() => navigate('quote-express')}><Calculator size={16} /><span>Devis express</span></button>
          <button className="mobile-menu-action" onClick={onToggleMobileDrawer} aria-label="Ouvrir le menu mobile"><Menu size={23} /></button>
        </div>
      </div>
      <div className="header-ribbon"><span><Phone size={13} /> 74 461 868</span><span>Impression & façonnage à Sfax</span><span>Réponse devis sous 2h ouvrées</span></div>
    </header>
  );
};
