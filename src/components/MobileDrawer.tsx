import React from 'react';
import { ViewType } from '../types';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenEspacePro: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  onNavigate,
  onOpenEspacePro,
}) => {
  if (!isOpen) return null;

  const links: { label: string; view: ViewType; icon: string }[] = [
    { label: 'Accueil', view: 'home', icon: 'home' },
    { label: 'Catalogue Général', view: 'catalog', icon: 'inventory_2' },
    { label: 'Cartes Soft-Touch', view: 'product-business-cards', icon: 'badge' },
    { label: 'Stickers & Étiquettes', view: 'product-stickers', icon: 'label' },
    { label: 'Tampons Trodat Pro', view: 'product-stamps', icon: 'approval' },
    { label: 'Bâches & Grand Format', view: 'product-banners', icon: 'campaign' },
    { label: 'Flyers & Dépliants', view: 'product-flyers', icon: 'menu_book' },
    { label: 'Plaques Certification ISO', view: 'product-iso-plaques', icon: 'verified' },
    { label: 'Porte-clés Plexiglas', view: 'product-keychains', icon: 'key' },
    { label: 'Pulls & Sweats Brodés', view: 'product-textile-pulls', icon: 'apparel' },
    { label: 'Nos réalisations', view: 'portfolio', icon: 'auto_awesome_motion' },
    { label: 'Devis Express', view: 'quote-express', icon: 'calculate' },
    { label: 'À propos', view: 'about', icon: 'storefront' },
    { label: 'Contact & Showroom', view: 'contact', icon: 'mail' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/5" role="dialog" aria-modal="true" aria-label="Menu mobile">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <aside className="relative z-50 flex h-full w-[min(88%,24rem)] flex-col bg-white shadow-[0_18px_45px_rgba(16,24,40,0.16)] animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00AEEF] to-[#EC008C] flex items-center justify-center text-white font-extrabold text-sm">
              P
            </div>
            <span className="font-bold text-lg text-[#00AEEF]">GS Imprim</span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#111111] hover:bg-[#E5E5E5] transition-colors"
            aria-label="Fermer le menu"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-1">
          {links.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.view);
                  onClose();
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
                  isActive
                    ? 'bg-[#E6F8FF] text-[#00AEEF] font-bold'
                    : 'text-[#111111] hover:bg-[#F5F5F5]'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#00AEEF]' : 'text-[#666666]'}`}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="my-4 pt-4 border-t border-[#E5E5E5] flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('quote-express');
                onClose();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#00AEEF] text-white rounded-xl text-sm font-bold shadow-md active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">calculate</span>
              <span>Demander un devis immédiat</span>
            </button>
            <a
              href="https://wa.me/21656495697"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#EC008C] text-white rounded-xl text-sm font-bold active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>WhatsApp Direct Sfax (+216 56 495 697)</span>
            </a>
          </div>
        </div>

        {/* Espace Pro Drawer Footer */}
        <div className="p-4 bg-[#F5F5F5] border-t border-[#E5E5E5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/aistudio/Image_15_15122008.jpeg"
              alt="Profil"
              className="w-9 h-9 rounded-full object-cover border border-[#c6c5d8]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida/AEtjO1UgPDHvQ6tB0nAqJwKlB3Xq3mot0sifC0s7on-IJk0J-i9XPz7LEpm7L5Ia4-jQR06lov-Y-HMQAdSby32C3IlyskiWVdhmfmZvbeYllABoLQkxVmErxb7Ll1MtnR4k-F4da3u6XIAS9PT49NfqgkAfFz-29MKZ1GZkBU1XrMxkhAH_kCc-MEBidKFmeZAyFIFW9zN_2K8acgKvEXPCn9Y6nUSNRgQIPqtRCnvvEdiODZml-puN6tZU-4jT";
              }}
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#111111]">Espace Pro Tunisie</span>
              <span className="text-[11px] text-[#333333]">Facturation & Recommandes</span>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenEspacePro();
            }}
            className="text-xs font-bold text-[#00AEEF] hover:underline"
          >
            Accéder
          </button>
        </div>
      </aside>
    </div>
  );
};
