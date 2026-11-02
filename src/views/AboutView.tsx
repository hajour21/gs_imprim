import React from 'react';
import { ViewType } from '../types';

interface AboutViewProps {
  onNavigate: (view: ViewType) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="page-shell min-h-screen bg-white py-8">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-8">
        <nav className="flex items-center gap-2 text-xs text-[#666666] mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#00AEEF]">Accueil</button>
          <span>/</span>
          <span className="text-[#111111] font-bold">À Propos de la Maison</span>
        </nav>
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AEEF] block mb-1">
            Maison d'Impression & de Façonnage depuis 2012
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            L'Alliance de la Haute Technologie & du Geste Artisanal
          </h1>
          <p className="text-sm text-[#333333] mt-2 leading-relaxed">
            Implanté à Sfax (Route de Gabès km 1,5) avec la vision d'élever les standards de l'art graphique en Tunisie, GS Imprim (Atelier Print Studio) accompagne créatifs, marques de luxe et institutions dans la matérialisation de leurs projets les plus audacieux.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        
        {/* Heritage & Machine Fleet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#111111]">
              Un Parc Industriel à la Pointe Européenne
            </h2>
            <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
              Dans notre atelier moderne situé Route de Gabès km 1,5 à Sfax, nous avons réuni les équipements les plus réputés au monde pour garantir une netteté de point microscopique et une constance colorimétrique absolue d'un tirage à l'autre.
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#E5E5E5] flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E6F8FF] text-[#00AEEF] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111111]">Presses Offset Heidelberg Speedmaster XL</h4>
                  <p className="text-[11px] text-[#333333] mt-0.5">Pour les tirages en volume avec encrage haute fidélité Fogra 39 et vernis en ligne.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E5E5E5] flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E6F8FF] text-[#00AEEF] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111111]">Presses Numériques HP Indigo 7K</h4>
                  <p className="text-[11px] text-[#333333] mt-0.5">Encre liquide ElectroInk offrant le rendu de l'offset même pour un seul exemplaire.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E5E5E5] flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E6F8FF] text-[#00AEEF] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111111]">Façonnage MGI JetVarnish 3D & Dorure à Chaud</h4>
                  <p className="text-[11px] text-[#333333] mt-0.5">Dépôt sélectif de vernis avec relief tactile et feuilles métallisées brillantes.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E5E5E5] aspect-[4/3] bg-slate-900 relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCQzwvuLStYeTQ-xczAs2sBC97PAnb3-ygcbt6QbJwsM1Z07xA3tONc10OMbeXSeT5NTGd4KPuLbzM1DOr8D_bYNsjhPDU7VytAEGsUb-WB66YxdHsNO3IYr5Tj3gYCQwUQ4CJXHcuUFeZLtRVTdU1O8PSX5nmO3wqMC6TlpDqf4fRsqD6SPsZz-FjtmEsFA8pOrV3F2u21XDsRQJXxRlHWAFCd82KuBy3jeYuyGbrH2UOiYN2snsyHw"
              alt="Atelier GS Imprim"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <span className="text-white text-xs font-bold">
                L'exigence du détail dans chaque feuille façonnée à Sfax
              </span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="p-6 bg-white rounded-2xl border border-[#E5E5E5]">
            <span className="material-symbols-outlined text-[#00AEEF] text-[28px] mb-2 block">eco</span>
            <h3 className="font-bold text-sm text-[#111111]">Écoresponsabilité</h3>
            <p className="text-xs text-[#333333] mt-1.5 leading-relaxed">
              100% de nos papiers proviennent de forêts certifiées FSC®. Encres végétales à faible émission de COV.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-[#E5E5E5]">
            <span className="material-symbols-outlined text-[#00AEEF] text-[28px] mb-2 block">verified_user</span>
            <h3 className="font-bold text-sm text-[#111111]">Garantie Qualité</h3>
            <p className="text-xs text-[#333333] mt-1.5 leading-relaxed">
              En cas d'anomalie d'impression non conforme au BAT validé, réimpression immédiate à nos frais sous 24h.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-[#E5E5E5]">
            <span className="material-symbols-outlined text-[#00AEEF] text-[28px] mb-2 block">local_shipping</span>
            <h3 className="font-bold text-sm text-[#111111]">Livraison Nationale</h3>
            <p className="text-xs text-[#333333] mt-1.5 leading-relaxed">
              Expéditions sécurisées avec suivi direct par SMS/email sur les 24 gouvernorats tunisiens.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-[#E5E5E5]">
            <span className="material-symbols-outlined text-[#00AEEF] text-[28px] mb-2 block">palette</span>
            <h3 className="font-bold text-sm text-[#111111]">Studio PAO Interne</h3>
            <p className="text-xs text-[#333333] mt-1.5 leading-relaxed">
              Une équipe de 6 graphistes experts dédiés à la mise aux normes prépresse et à la conception sur-mesure.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#00AEEF] text-white p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Donnons vie à vos projets d'impression</h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto">
            Visitez notre showroom Route de Gabès km 1,5 à Sfax pour découvrir nos catalogues d'échantillons ou configurez directement votre tirage en ligne.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('catalog')}
              className="px-6 py-3 bg-white text-[#00AEEF] rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm"
            >
              Découvrir les produits
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-[#EC008C] hover:bg-[#008299] text-white rounded-xl font-bold text-xs transition-colors"
            >
              Contacter notre équipe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
