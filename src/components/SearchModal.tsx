import React, { useState, useMemo } from 'react';
import { CATALOG_PRODUCTS } from '../data/products';
import { ViewType } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewType) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return CATALOG_PRODUCTS.filter(
      p => p.title.toLowerCase().includes(q) ||
           p.categoryLabel.toLowerCase().includes(q) ||
           p.shortDesc.toLowerCase().includes(q) ||
           p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  const popularSearches = [
    { label: 'Porte-clés plexiglas sur-mesure', view: 'product-keychains' as ViewType },
    { label: 'Pulls & Hoodies brodés 320g', view: 'product-textile-pulls' as ViewType },
    { label: 'Cartes Soft-Touch', view: 'product-business-cards' as ViewType },
    { label: 'Plaque certification ISO', view: 'product-iso-plaques' as ViewType },
    { label: 'Tampon Rond Ø42mm & Dateurs', view: 'product-stamps' as ViewType },
    { label: 'Stickers découpe vinyle', view: 'product-stickers' as ViewType },
    { label: 'Bâche PVC 510g', view: 'product-banners' as ViewType },
    { label: 'Roll-up 85 × 200 cm / 80 × 160 cm', view: 'product-rollups' as ViewType },
    { label: 'Flyers A5 quadri', view: 'product-flyers' as ViewType },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/5 px-4 pt-20" role="dialog" aria-modal="true" aria-labelledby="search-dialog-title">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-50 w-full max-w-2xl overflow-hidden rounded-2xl border border-[#E5E9EF] bg-white shadow-[0_18px_45px_rgba(16,24,40,0.14)] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Header Bar */}
        <div className="p-4 border-b border-[#E5E5E5] flex items-center gap-3">
          <span id="search-dialog-title" className="material-symbols-outlined text-[24px] text-[#00AEEF]">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit, matière, format, finition..."
            className="flex-1 text-base text-[#111111] placeholder-[#666666] outline-none bg-transparent font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-bold text-[#666666] hover:text-[#111111] px-2 py-1 bg-slate-100 rounded"
            >
              Effacer
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Fermer la recherche"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#666666] hover:bg-[#E5E5E5] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Results or Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-3">
                Recherches fréquentes & Produits phares
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      onNavigate(item.view);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#F5F5F5] hover:bg-[#E6F8FF] text-xs font-bold text-[#00AEEF] transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E5E5]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-3">
                  Parcourir par univers
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => { onNavigate('catalog'); onClose(); }}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-[#F5F5F5] text-left transition-colors"
                  >
                    <span className="block text-xs font-bold text-[#111111]">Papeterie & Luxe</span>
                    <span className="text-[11px] text-[#666666]">Cartes, têtes de lettre, chemises</span>
                  </button>
                  <button
                    onClick={() => { onNavigate('product-banners'); onClose(); }}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-[#F5F5F5] text-left transition-colors"
                  >
                    <span className="block text-xs font-bold text-[#111111]">Grand Format</span>
                    <span className="text-[11px] text-[#666666]">Bâches, roll-ups, panneaux</span>
                  </button>
                  <button
                    onClick={() => { onNavigate('product-stickers'); onClose(); }}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-[#F5F5F5] text-left transition-colors"
                  >
                    <span className="block text-xs font-bold text-[#111111]">Adhésifs & Vinyle</span>
                    <span className="text-[11px] text-[#666666]">Stickers, étiquettes bobines</span>
                  </button>
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-sm text-[#666666]">
              <span className="material-symbols-outlined text-[32px] block mb-2 text-[#c6c5d8]">search_off</span>
              Aucun résultat pour « {query} ».
              <div className="mt-3">
                <button
                  onClick={() => {
                    onNavigate('quote-express');
                    onClose();
                  }}
                  className="text-xs font-bold text-[#00AEEF] hover:underline"
                >
                  Demander un devis sur mesure pour ce besoin →
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs font-bold text-[#666666]">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's trouvés' : ' trouvé'}
              </p>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onNavigate(p.viewId);
                    onClose();
                  }}
                  className="p-3 rounded-xl hover:bg-[#F5F5F5] cursor-pointer flex items-center justify-between gap-3 border border-transparent hover:border-[#E5E5E5] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#111111]">{p.title}</h4>
                      <p className="text-xs text-[#666666] line-clamp-1">{p.shortDesc}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#00AEEF]">
                      {p.startingPrice === undefined ? 'Sur devis' : `Dès ${p.startingPrice} DT`}
                    </span>
                    {p.startingPrice !== undefined && <span className="text-[10px] text-[#666666] block">{p.priceUnit}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#FFFFFF] border-t border-[#E5E5E5] flex items-center justify-between text-[11px] text-[#666666]">
          <span>Appuyez sur Échap ou cliquez à l'extérieur pour fermer</span>
          <span className="font-semibold text-[#00AEEF]">GS Imprim — Route de Gabès km 1,5, Sfax (Tél : 74 461 868)</span>
        </div>
      </div>
    </div>
  );
};
