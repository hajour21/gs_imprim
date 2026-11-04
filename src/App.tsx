/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { ViewType, CartItem } from './types';
import { applySeo, productIdFromPath, productPath, ROUTES, viewFromPath } from './lib/seo';
import { CATALOG_PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileDrawer } from './components/MobileDrawer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { EspaceProModal } from './components/EspaceProModal';
import { AuthModal } from './components/AuthModal';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { TouchInkLayer } from './components/TouchInkLayer';
import { StudioConfiguratorView } from './views/StudioConfiguratorView';

// Views are split by route so the initial catalogue shell stays small.
const HomeView = lazy(() => import('./views/HomeView').then((module) => ({ default: module.HomeView })));
const CatalogView = lazy(() => import('./views/CatalogView').then((module) => ({ default: module.CatalogView })));
const BusinessCardsView = lazy(() => import('./views/BusinessCardsView').then((module) => ({ default: module.BusinessCardsView })));
const StickersView = lazy(() => import('./views/StickersView').then((module) => ({ default: module.StickersView })));
const StampsView = lazy(() => import('./views/StampsView').then((module) => ({ default: module.StampsView })));
const BannersView = lazy(() => import('./views/BannersView').then((module) => ({ default: module.BannersView })));
const FlyersView = lazy(() => import('./views/FlyersView').then((module) => ({ default: module.FlyersView })));
const PortfolioView = lazy(() => import('./views/PortfolioView').then((module) => ({ default: module.PortfolioView })));
const QuoteExpressView = lazy(() => import('./views/QuoteExpressView').then((module) => ({ default: module.QuoteExpressView })));
const AboutView = lazy(() => import('./views/AboutView').then((module) => ({ default: module.AboutView })));
const ContactView = lazy(() => import('./views/ContactView').then((module) => ({ default: module.ContactView })));
const IsoPlaquesView = lazy(() => import('./views/IsoPlaquesView').then((module) => ({ default: module.IsoPlaquesView })));
const KeychainsView = lazy(() => import('./views/KeychainsView').then((module) => ({ default: module.KeychainsView })));
const TextilePullsView = lazy(() => import('./views/TextilePullsView').then((module) => ({ default: module.TextilePullsView })));
const NotFoundView = lazy(() => import('./views/NotFoundView').then((module) => ({ default: module.NotFoundView })));
const GenericProductView = lazy(() => import('./views/GenericProductView').then((module) => ({ default: module.GenericProductView })));
const AdminView = lazy(() => import('./views/AdminView').then((module) => ({ default: module.AdminView })));
const RollupsView = lazy(() => import('./views/RollupsView').then((module) => ({ default: module.RollupsView })));

const loadingFallback = <div className="flex min-h-[40vh] items-center justify-center px-4"><div className="surface-card px-5 py-4 text-sm font-semibold text-[#526071]" role="status">Chargement de la page…</div></div>;

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>(() => viewFromPath(window.location.pathname));
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(() => productIdFromPath(window.location.pathname));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [espaceProOpen, setEspaceProOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Cart state preloaded with sample item so user can immediately experience cart & checkout
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'initial-sample-bc',
      productId: 'business-cards-softtouch',
      title: 'Cartes de Visite Soft-Touch Luxe',
      specs: 'Format: 85 × 55 mm | Papier: Couché Mat 350g | Finition: Pelliculage Soft-Touch + Vernis 3D | Recto/Verso',
      quantity: '250 ex',
      unitPrice: 0.26,
      totalPrice: 65,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCQzwvuLStYeTQ-xczAs2sBC97PAnb3-ygcbt6QbJwsM1Z07xA3tONc10OMbeXSeT5NTGd4KPuLbzM1DOr8D_bYNsjhPDU7VytAEGsUb-WB66YxdHsNO3IYr5Tj3gYCQwUQ4CJXHcuUFeZLtRVTdU1O8PSX5nmO3wqMC6TlpDqf4fRsqD6SPsZz-FjtmEsFA8pOrV3F2u21XDsRQJXxRlHWAFCd82KuBy3jeYuyGbrH2UOiYN2snsyHw',
    }
  ]);

  // Smooth scroll to top on navigation
  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    setSelectedProductId(undefined);
    const nextPath = ROUTES[view];
    if (window.location.pathname !== nextPath) window.history.pushState({ view }, '', nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('catalog');
    window.history.pushState({ productId }, '', productPath(productId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(viewFromPath(window.location.pathname));
      setSelectedProductId(productIdFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    applySeo(currentView, selectedProductId);
  }, [currentView, selectedProductId]);

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [item, ...prev]);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // If numeric quantity
          return item;
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Keyboard shortcut for search (Cmd+K or Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setCartOpen(false);
        setEspaceProOpen(false);
        setAuthOpen(false);
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const hasOverlay = searchOpen || cartOpen || espaceProOpen || authOpen || mobileDrawerOpen;
    if (!hasOverlay) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => {
      const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
      const firstControl = dialog?.querySelector<HTMLElement>('button, input, select, textarea, [tabindex="0"]');
      firstControl?.focus();
    }, 0);
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [searchOpen, cartOpen, espaceProOpen, authOpen, mobileDrawerOpen]);

  return (
    <div className="app-shell min-h-screen flex flex-col text-[#111111] antialiased selection:bg-[#00AEEF] selection:text-white">
      <TouchInkLayer />
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cart={cart}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenEspacePro={() => setEspaceProOpen(true)}
        onToggleMobileDrawer={() => setMobileDrawerOpen(!mobileDrawerOpen)}
      />

      {/* Main View Container (offset by header height) */}
      <main className="flex-1 pt-[4.5rem]">
        <Suspense fallback={loadingFallback}>
          {currentView === 'home' && <StudioConfiguratorView />}
          {currentView === 'catalog' && selectedProductId ? (
            (() => {
              const product = CATALOG_PRODUCTS.find((item) => item.id === selectedProductId);
              return product ? <GenericProductView product={product} onNavigate={handleNavigate} /> : <NotFoundView onNavigate={handleNavigate} />;
            })()
          ) : currentView === 'catalog' ? <CatalogView onNavigate={handleNavigate} onOpenProduct={handleOpenProduct} /> : null}
          {currentView === 'product-business-cards' && (
          <BusinessCardsView onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
          )}
          {currentView === 'product-stickers' && (
          <StickersView onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
          )}
          {currentView === 'product-stamps' && (
          <StampsView onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
          )}
          {currentView === 'product-banners' && (
          <BannersView onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
          )}
          {currentView === 'product-rollups' && <RollupsView onNavigate={handleNavigate} />}
          {currentView === 'product-flyers' && (
          <FlyersView onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
          )}
          {currentView === 'product-iso-plaques' && (
          <IsoPlaquesView onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
          )}
          {currentView === 'product-keychains' && (
          <KeychainsView onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
          )}
          {currentView === 'product-textile-pulls' && (
          <TextilePullsView onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
          )}
          {currentView === 'portfolio' && <PortfolioView onNavigate={handleNavigate} />}
          {currentView === 'quote-express' && <QuoteExpressView onNavigate={handleNavigate} />}
          {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}
          {currentView === 'contact' && <ContactView onNavigate={handleNavigate} />}
          {currentView === 'admin' && <AdminView onNavigate={handleNavigate} />}
          {currentView === 'not-found' && <NotFoundView onNavigate={handleNavigate} />}
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Overlays and Modals */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onRequireAuth={() => setAuthOpen(true)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <EspaceProModal
        isOpen={espaceProOpen}
        onClose={() => setEspaceProOpen(false)}
        onNavigate={handleNavigate}
      />

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenEspacePro={() => setEspaceProOpen(true)}
      />

      {/* Floating WhatsApp Widget */}
      <WhatsAppFloating />
    </div>
  );
}
