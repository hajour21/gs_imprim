import React from 'react';
import { ViewType } from '../types';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-[#E5E9EF] bg-[#FBFCFD] text-[#101828]">
      {/* 4 Reassurance Badges Banner */}
      <div className="w-full border-b border-[#E5E9EF] bg-white py-7">
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 items-center gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EFFAFF] text-[#007DA8] shadow-sm">
              <span className="material-symbols-outlined text-[28px]">precision_manufacturing</span>
            </div>
            <div>
              <p className="font-bold text-sm text-[#111111]">Atelier Haute Précision</p>
              <p className="text-xs text-[#333333]">Parc offset Heidelberg & numérique HP Indigo</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white text-[#00AEEF] flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <div>
              <p className="font-bold text-sm text-[#111111]">Normes ISO & FSC®</p>
              <p className="text-xs text-[#333333]">Papiers écoresponsables tracés & encres végétales</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white text-[#00AEEF] flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[28px]">local_shipping</span>
            </div>
            <div>
              <p className="font-bold text-sm text-[#111111]">Livraison Express</p>
              <p className="text-xs text-[#333333]">Partout en Tunisie sous 24h à 48h</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white text-[#00AEEF] flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[28px]">support_agent</span>
            </div>
            <div>
              <p className="font-bold text-sm text-[#111111]">Support PAO Dédié</p>
              <p className="text-xs text-[#333333]">Contrôle prépresse & vérification de fichiers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-[90rem] px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00AEEF] to-[#EC008C] flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                P
              </div>
              <span className="font-bold text-xl text-[#00AEEF]">GS Imprim</span>
            </div>
            <p className="text-sm text-[#333333] leading-relaxed max-w-md">
              Référence de l'impression haut de gamme en Tunisie (Atelier Print Studio). Spécialiste du façonnage minutieux, de la dorure à chaud galbée, du gaufrage et des finitions d'exception pour professionnels et créatifs exigeants.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5F5F5] text-[#EC008C] text-xs font-semibold">
                FSC Certified
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5F5F5] text-[#EC008C] text-xs font-semibold">
                Imprim'Vert
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5F5F5] text-[#333333] text-xs font-semibold">
                Made in Tunisia 🇹🇳
              </span>
            </div>
            <div className="pt-2 space-y-1.5 text-xs text-[#333333]">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00AEEF] text-[16px]">location_on</span>
                Route de Gabès km 1,5, 3000 Sfax, Tunisie
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00AEEF] text-[16px]">call</span>
                74 461 868 / 56 495 697
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00AEEF] text-[16px]">mail</span>
                hajer.gharsallah12@gmail.com
              </p>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <p className="font-bold text-sm text-[#111111] mb-4">Catalogue Print</p>
            <ul className="space-y-2 text-xs text-[#333333]">
              <li>
                <button onClick={() => onNavigate('product-business-cards')} className="hover:text-[#00AEEF] transition-colors text-left">
                  Cartes de visite & Finitions Luxe
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product-stickers')} className="hover:text-[#00AEEF] transition-colors text-left">
                  Stickers, Étiquettes & Vinyles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product-banners')} className="hover:text-[#00AEEF] transition-colors text-left">
                  Bâches, Banderoles & Roll-ups
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product-stamps')} className="hover:text-[#00AEEF] transition-colors text-left">
                  Cachets professionnels Trodat
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product-flyers')} className="hover:text-[#00AEEF] transition-colors text-left">
                  Flyers, Dépliants & Brochures
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product-iso-plaques')} className="hover:text-[#00AEEF] transition-colors text-left font-bold text-[#00AEEF]">
                  Plaques de Certification ISO & Signalétique ★
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#00AEEF] transition-colors text-left">
                  Packaging & Boîtes sur-mesure
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio & About */}
          <div>
            <p className="font-bold text-sm text-[#111111] mb-4">Entreprise & Studio</p>
            <ul className="space-y-2 text-xs text-[#333333]">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#00AEEF] transition-colors text-left">
                  À propos de la maison
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-[#00AEEF] transition-colors text-left">
                  Nos réalisations & Projets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quote-express')} className="hover:text-[#00AEEF] transition-colors text-left">
                  Devis immédiat & Tarifs pro
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#00AEEF] transition-colors text-left">
                  Studio Graphique & Prépresse
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#00AEEF] transition-colors text-left">
                  Prendre contact / Showroom
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Certifications & Help */}
          <div>
            <p className="font-bold text-sm text-[#111111] mb-4">Certifications & PAO</p>
            <div className="space-y-2.5">
              <div className="p-2.5 rounded-lg bg-[#F5F5F5] text-xs">
                <p className="font-bold text-[#111111]">ISO 9001 & ISO 14001</p>
                <p className="text-[#333333] text-[11px] mt-0.5">Management qualité & respect de l'environnement certifié.</p>
                <button
                  onClick={() => onNavigate('product-iso-plaques')}
                  className="mt-1.5 text-[11px] font-bold text-[#00AEEF] hover:underline flex items-center gap-1"
                >
                  <span>Voir les plaques de certification ISO</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F5F5F5] text-xs">
                <p className="font-bold text-[#111111]">FSC® Mixte & Recyclé</p>
                <p className="text-[#333333] text-[11px] mt-0.5">Gestion forestière durable et traçabilité matière.</p>
              </div>
              <a
                href="https://wa.me/21656495697"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EC008C] hover:underline pt-1"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                Support WhatsApp direct (+216 56 495 697)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E5E9EF] pt-6 text-xs text-[#526071] md:flex-row">
          <p>© 2025 GS Imprim Tunisie (Atelier Print Studio). Tous droits réservés. Façonnage de prestige certifié.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button onClick={() => onNavigate('about')} className="hover:text-[#00AEEF] transition-colors">Mentions Légales</button>
            <button onClick={() => onNavigate('about')} className="hover:text-[#00AEEF] transition-colors">Conditions Générales (CGV)</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#00AEEF] transition-colors">Support Client</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
