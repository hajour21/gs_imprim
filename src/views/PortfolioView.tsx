import React, { useState } from 'react';
import { ViewType } from '../types';

interface PortfolioViewProps {
  onNavigate: (view: ViewType) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'papeterie' | 'grandformat' | 'stickers' | 'packaging'>('all');

  const projects = [
    {
      id: 'p1',
      title: 'Cartes de Visite Soft-Touch & Dorure Galbée Or',
      client: 'Cabinet d\'Architecture Khemir & Associés (Les Berges du Lac 2)',
      category: 'papeterie',
      categoryLabel: 'Papeterie d\'excellence',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCQzwvuLStYeTQ-xczAs2sBC97PAnb3-ygcbt6QbJwsM1Z07xA3tONc10OMbeXSeT5NTGd4KPuLbzM1DOr8D_bYNsjhPDU7VytAEGsUb-WB66YxdHsNO3IYr5Tj3gYCQwUQ4CJXHcuUFeZLtRVTdU1O8PSX5nmO3wqMC6TlpDqf4fRsqD6SPsZz-FjtmEsFA8pOrV3F2u21XDsRQJXxRlHWAFCd82KuBy3jeYuyGbrH2UOiYN2snsyHw',
      specs: 'Papier couché mat 350g, pelliculage velours mat, dorure à chaud or pur avec repérage optique 0.1mm.',
      targetView: 'product-business-cards' as ViewType,
    },
    {
      id: 'p2',
      title: 'Banderoles Événementielles 6×2m & Signalétique Festival',
      client: 'Festival International de Carthage',
      category: 'grandformat',
      categoryLabel: 'Grand Format',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO7mlucXIzJOABIXRuxqYP8-DiDZRKQIKxyWX5SLorylXmTKz2bwcIHwnaTmtwnrgXe6o-NMXcBJpJog-tSxrVTjY3aS3l4ROc1ct2rPgKtYjmw2ZfimXjVV4SkxIXKFnQOz6GIYYpfLsH_wm95TK6GINSBpL-33oZWZpavQo46QzVyf7bdEeTKa2IA4N6QLdK3ngQ70LUYOba5EVsO40kC-7jDA5naJeBJCTok1SVpHeBKSgq1ppzpQ',
      specs: 'Toile PVC 510g haute densité ignifugée M1, encres éco-solvants UV 3 ans, ourlets thermo-soudés et 48 œillets.',
      targetView: 'product-banners' as ViewType,
    },
    {
      id: 'p3',
      title: 'Étiquettes Adhésives Flacons Cosmétiques en Vinyle Transparent',
      client: 'Laboratoire Botanique Méditerranéen',
      category: 'stickers',
      categoryLabel: 'Adhésifs & Vinyles',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtYQbeLYWspdKFfux36ZuzA2AUXfY8Dvxg4byIdBXMZckPOzaDSHGJ5EVJafBCJUluPo8W71_E6JSvO9rxuaoa19KSd0IKaDcYz2HdoeZkEnubx71MbOvqy4UWPjJ7wyaGCAo6YAWKflMKyGyqog0CcK1MG3g67o9ZEG9ukPDWd_tzXGgk-VTAnbBxRMla6xtdXcR9xbmDU1F-Apn0rE5LnMLazRfIwWjazZ3V1m6OiwEaXhlEQ2a9_A',
      specs: 'Vinyle transparent ultra-cristal avec blanc de soutien sélectif opaque, pelliculage anti-graisse résistant à l\'eau.',
      targetView: 'product-stickers' as ViewType,
    },
    {
      id: 'p4',
      title: 'Étuis Packaging Parfum & Boîtes Berlingot Haut de Gamme',
      client: 'Maison de Haute Parfumerie Tunisienne',
      category: 'packaging',
      categoryLabel: 'Packaging sur-mesure',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATjdbJAMc2j4Ri_juz1k-b8hgPRQqUT4-Gj9mgNu48vUWpHOR1izF9rFCTfQRVxMTLXPjj9dJzYbbWnp_wCOsUl_v6vs5wnmcSmdS1Y93yuCUxGjw7AO9g9NbsjWCwtUYQ3yexRXgYTKXrtVWhWWrAc_tgnXtQul91U-FVjJjjxDjxxBKc4d28kuwLmkdVEiyYnzyk3jwr2R78CGaUDJAfOehMG2FrhhRgH-ueNnT8meN5QkmJVcbXIw',
      specs: 'Carton graphique compact 320g, découpe emporte-pièce complexe, vernis sélectif UV 3D galbé.',
      targetView: 'catalog' as ViewType,
    },
    {
      id: 'p5',
      title: 'Dépliants 3 Volets Rainés 6 Faces Quadri',
      client: 'Groupe Hôtelier Thalasso Djerba',
      category: 'papeterie',
      categoryLabel: 'Brochures & Édition',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_jgdhjyncgPJPuzO7GnNM3XmwJrUwFcd_WB5aj1ubLflNE5432Tq9Q1u5JJXO3yG2-_EK1ZWs1Ji4Is-K5ICPmRaDZ8ZNRpM0dGmvFXICuM_IIjYGzAUeA3NV6n2IxYrB1UOxRNUeg9WLCs2KiX5n7aQRylKChfKG7dimfs74Lt_1xbp0Ejx9z4VUbqurrLg3-oM3yylnxBX6XUpCtLkfFf1dF5nISDTkBul4I66B-bB1MlL5Y4Ka8Q',
      specs: 'Papier couché satiné 200g, rainage mécanique anti-craquelure, vernis dispersion anti-traces.',
      targetView: 'product-flyers' as ViewType,
    },
    {
      id: 'p6',
      title: 'Structures Roll-Up Aluminium Pro avec Toile Anti-Curling',
      client: 'Salon International de l\'Industrie & des Technologies',
      category: 'grandformat',
      categoryLabel: 'Signalétique salon',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD1oKYyxFychO4o0AMvSeJ0Uv-0Su1z8uHF7hIO3OhBzw_qOFVfcIil-dvVbTclGS9MxICWSckuWUXvYTktyDjlF2ZXeVGnxKPT2PFUF_PP2eUPs9rUokl2LFMcv7m6Ekk0GCRijFCIOfykdENax9hhhHeHjzbxXlRds-R75wuuiMHkZDN6MEWOwWg2qEKyi8IdGxw9DPVr5LbWfmBp-vA-zHavXaogfr139LJzWw_NXyD-cHKzyOZ8g',
      specs: 'Carter lourd en aluminium anodisé satiné, toile sans PVC Ferrari anti-reflet sans courbure latérale.',
      targetView: 'product-banners' as ViewType,
    }
  ];

  const filteredProjects = projects.filter(
    p => filter === 'all' || p.category === filter
  );

  return (
    <div className="page-shell min-h-screen bg-white py-8">
      {/* Breadcrumb & Title */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-8">
        <nav className="flex items-center gap-2 text-xs text-[#666666] mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#00AEEF]">Accueil</button>
          <span>/</span>
          <span className="text-[#111111] font-bold">Nos Réalisations</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Galerie de Façonnages & Réalisations
            </h1>
            <p className="text-sm text-[#333333] mt-1 max-w-2xl">
              Découvrez les projets d'impression haut de gamme façonnés pour les plus belles entreprises, agences et institutions en Tunisie.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { id: 'all', label: 'Toutes les réalisations' },
            { id: 'papeterie', label: 'Papeterie & Luxe' },
            { id: 'grandformat', label: 'Grand Format & Bâches' },
            { id: 'stickers', label: 'Stickers & Vinyles' },
            { id: 'packaging', label: 'Packaging' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === tab.id
                  ? 'bg-[#00AEEF] text-white shadow-sm'
                  : 'bg-white text-[#333333] hover:bg-slate-100 border border-[#E5E5E5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#c6c5d8] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-[#111111]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-bold text-[#111111] group-hover:text-[#00AEEF] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#EC008C] mt-1">
                    Client : {item.client}
                  </p>
                  <p className="text-xs text-[#333333] mt-2.5 leading-relaxed bg-[#F5F5F5] p-3 rounded-xl border border-[#E5E5E5]">
                    {item.specs}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                <span className="text-[11px] text-[#666666]">Atelier GS Imprim Sfax</span>
                <button
                  onClick={() => onNavigate(item.targetView)}
                  className="px-4 py-2 bg-[#E6F8FF] hover:bg-[#00AEEF] hover:text-white text-[#00AEEF] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <span>Configurer similaire</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
