import React, { useState } from 'react';
import { CartItem, ViewType } from '../types';

interface IsoPlaquesViewProps {
  onAddToCart: (item: CartItem) => void;
  onNavigate: (view: ViewType) => void;
}

export const IsoPlaquesView: React.FC<IsoPlaquesViewProps> = ({ onAddToCart, onNavigate }) => {
  // Configurator state
  const [material, setMaterial] = useState<'alu-brosse' | 'plexi-cristal' | 'laiton-or' | 'dibond'>('alu-brosse');
  const [isoStandard, setIsoStandard] = useState<'iso-9001' | 'iso-14001' | 'iso-45001' | 'double-9001-14001' | 'triple-qse' | 'iso-17025'>('iso-9001');
  const [dimensions, setDimensions] = useState<'300x200' | '400x300' | '500x350' | '600x400'>('300x200');
  const [spacers, setSpacers] = useState<'inox-15mm' | 'inox-noir' | 'laiton-dore'>('inox-15mm');

  // Custom text for engraving / UV print
  const [companyName, setCompanyName] = useState('MEDITERRANEAN HIGH-TECH INDUSTRIES');
  const [scopeText, setScopeText] = useState('Conception, fabrication et distribution de solutions industrielles certifiées');
  const [certNumber, setCertNumber] = useState('CERT-TN-9001-2024-A');
  const [certifier, setCertifier] = useState('TÜV Rheinland / AFAQ');
  const [validityYear, setValidityYear] = useState('2024 — 2027');

  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'configurator' | 'atelier-certifs'>('configurator');

  // Pricing calculations
  const calculatePrice = () => {
    let base = 48; // 300x200 alu brossé
    if (dimensions === '400x300') base = 78;
    if (dimensions === '500x350') base = 115;
    if (dimensions === '600x400') base = 165;

    if (material === 'plexi-cristal') base += 14;
    if (material === 'laiton-or') base += 38;
    if (material === 'dibond') base -= 5;

    if (isoStandard === 'double-9001-14001' || isoStandard === 'triple-qse') base += 10;

    return base * quantity;
  };

  const totalPrice = calculatePrice();

  const handleAddToCart = () => {
    const specs = `Support: ${
      material === 'alu-brosse' ? 'Aluminium Anodisé Brossé 3mm' : material === 'plexi-cristal' ? 'Plexiglas Cristal Biseauté 5mm' : material === 'laiton-or' ? 'Laiton Poli Miroir Doré 2.5mm' : 'Dibond Composite Métallisé'
    } | Norme: ${
      isoStandard === 'iso-9001' ? 'ISO 9001:2015 (Qualité)' : isoStandard === 'iso-14001' ? 'ISO 14001:2015 (Environnement)' : isoStandard === 'iso-45001' ? 'ISO 45001:2018 (Santé/Sécurité)' : isoStandard === 'double-9001-14001' ? 'Double Certification ISO 9001 + 14001' : 'Triple Certification QSE'
    } | Dimensions: ${dimensions.replace('x', ' × ')} mm | Entretoises: ${
      spacers === 'inox-15mm' ? '4 Entretoises Inox Brossé Ø16mm' : spacers === 'inox-noir' ? '4 Entretoises Noir Mat' : '4 Entretoises Laiton Doré'
    } | Entreprise: "${companyName}" | Certificat n° ${certNumber}`;

    onAddToCart({
      id: `iso-plaque-${Date.now()}`,
      productId: 'plaques-iso-certifications',
      title: 'Plaque de Certification ISO & Signalétique Murale',
      specs: specs,
      quantity: `${quantity} plaque${quantity > 1 ? 's' : ''}`,
      unitPrice: totalPrice / quantity,
      totalPrice: totalPrice,
      image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80'
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3500);
  };

  return (
    <div className="page-shell min-h-screen bg-white py-8">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <nav className="flex items-center gap-2 text-xs text-[#666666]">
          <button onClick={() => onNavigate('home')} className="hover:text-[#00AEEF]">Accueil</button>
          <span>/</span>
          <button onClick={() => onNavigate('catalog')} className="hover:text-[#00AEEF]">Plaques & Signalétique Pro</button>
          <span>/</span>
          <span className="text-[#111111] font-bold">Plaques de Certification ISO</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Main Tab Switch: Configurator vs Atelier Certifications */}
        <div className="flex border-b border-[#E5E5E5] mb-8 bg-white p-2 rounded-2xl shadow-xs">
          <button
            onClick={() => setActiveTab('configurator')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'configurator'
                ? 'bg-[#00AEEF] text-white shadow-sm'
                : 'text-[#333333] hover:text-[#111111]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>Personnaliser ma Plaque ISO (Pour votre entreprise)</span>
          </button>
          <button
            onClick={() => setActiveTab('atelier-certifs')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'atelier-certifs'
                ? 'bg-[#00AEEF] text-white shadow-sm'
                : 'text-[#333333] hover:text-[#111111]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Consulter les Agréments ISO de l'Atelier GS Imprim</span>
          </button>
        </div>

        {activeTab === 'atelier-certifs' ? (
          /* Atelier GS Imprim's Own Official ISO Plaques & Badges */
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white p-8 rounded-3xl border border-[#E5E5E5] text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EC008C] bg-[#E6F8FF] px-3 py-1 rounded-full">
                Audit de Conformité Annuel Réussi (Sfax)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                Agréments & Certifications ISO de notre Atelier
              </h2>
              <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                Notre imprimerie Route de Gabès km 1,5 à Sfax est auditée chaque année par des organismes d'accréditation internationaux pour certifier la traçabilité de nos matières, la précision de nos encrages et la sécurité de notre personnel.
              </p>
            </div>

            {/* 4 Official ISO Plaques Cards Displayed as Wall Plaques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Plaque ISO 9001 */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-3xl border-2 border-slate-300 shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform">
                {/* 4 corner metallic spacers */}
                <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>

                <div className="space-y-4 text-center my-2">
                  <div className="w-16 h-16 rounded-2xl bg-[#00AEEF] text-white flex items-center justify-center mx-auto shadow-md">
                    <span className="font-black text-2xl font-serif">ISO</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#111111] tracking-tight">ISO 9001 : 2015</h3>
                    <p className="text-xs font-bold text-[#00AEEF] uppercase tracking-wider mt-0.5">
                      Système de Management de la Qualité (SMQ)
                    </p>
                  </div>
                  <div className="text-xs text-[#333333] space-y-1 bg-white/70 backdrop-blur-xs p-4 rounded-xl border border-white">
                    <p><strong>Organisme :</strong> AFAQ / AFNOR International & INNORPI</p>
                    <p><strong>N° Enregistrement :</strong> CERT-TN-2018-9001-A48</p>
                    <p><strong>Périmètre :</strong> Impression offset feuille, numérique HD, façonnage de prestige et dorure à chaud.</p>
                    <p className="text-emerald-700 font-bold pt-1">Statut : Certificat Actif & Renouvelé</p>
                  </div>
                </div>
              </div>

              {/* Plaque ISO 14001 */}
              <div className="bg-gradient-to-br from-emerald-50 to-slate-200 p-8 rounded-3xl border-2 border-emerald-300 shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform">
                <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>

                <div className="space-y-4 text-center my-2">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mx-auto shadow-md">
                    <span className="font-black text-2xl font-serif">ISO</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#111111] tracking-tight">ISO 14001 : 2015</h3>
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mt-0.5">
                      Système de Management Environnemental
                    </p>
                  </div>
                  <div className="text-xs text-[#333333] space-y-1 bg-white/70 backdrop-blur-xs p-4 rounded-xl border border-white">
                    <p><strong>Engagement :</strong> Zéro déchet toxique dans les sols tunisiens</p>
                    <p><strong>Procédés :</strong> Encres 100% végétales sans métaux lourds & recyclage des chutes de papier.</p>
                    <p><strong>N° Enregistrement :</strong> CERT-TN-2020-14001-ENV</p>
                    <p className="text-emerald-700 font-bold pt-1">Statut : Certificat Actif & Conforme</p>
                  </div>
                </div>
              </div>

              {/* Plaque ISO 12647-2 (Colorimétrie Imprimerie) */}
              <div className="bg-gradient-to-br from-indigo-50 to-slate-200 p-8 rounded-3xl border-2 border-indigo-300 shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform">
                <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>

                <div className="space-y-4 text-center my-2">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-800 text-white flex items-center justify-center mx-auto shadow-md">
                    <span className="material-symbols-outlined text-[32px]">palette</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#111111] tracking-tight">ISO 12647-2 : Procédés Graphiques</h3>
                    <p className="text-xs font-bold text-indigo-800 uppercase tracking-wider mt-0.5">
                      Contrôle des Procédés Offset & Numériques
                    </p>
                  </div>
                  <div className="text-xs text-[#333333] space-y-1 bg-white/70 backdrop-blur-xs p-4 rounded-xl border border-white">
                    <p><strong>Standard :</strong> Fogra 39 & Fogra 51 (ISO Coated v2)</p>
                    <p><strong>Garantie :</strong> Respect absolu de votre charte graphique et saturation colorimétrique sans dérive.</p>
                    <p className="text-emerald-700 font-bold pt-1">Spectrophotomètres X-Rite eXact calibrés</p>
                  </div>
                </div>
              </div>

              {/* Plaque FSC & Imprim'Vert */}
              <div className="bg-gradient-to-br from-amber-50 to-slate-200 p-8 rounded-3xl border-2 border-amber-300 shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform">
                <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100 border border-slate-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                </div>

                <div className="space-y-4 text-center my-2">
                  <div className="w-16 h-16 rounded-2xl bg-amber-700 text-white flex items-center justify-center mx-auto shadow-md">
                    <span className="material-symbols-outlined text-[32px]">forest</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#111111] tracking-tight">FSC® Chain of Custody & Imprim'Vert</h3>
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mt-0.5">
                      Traçabilité & Gestion Durable des Forêts
                    </p>
                  </div>
                  <div className="text-xs text-[#333333] space-y-1 bg-white/70 backdrop-blur-xs p-4 rounded-xl border border-white">
                    <p><strong>Code Licence FSC :</strong> FSC-C149204</p>
                    <p><strong>Papiers autorisés :</strong> Fedrigoni, Arjowiggins, Clairefontaine & papeteries certifiées.</p>
                    <p className="text-emerald-700 font-bold pt-1">Label Imprim'Vert n° 2024-TN-102</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA to customize company plaque */}
            <div className="bg-[#00AEEF] text-white p-8 rounded-3xl text-center space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold">Votre entreprise est également certifiée ISO ?</h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto">
                Affichez fièrement votre agrément dans votre hall d'accueil avec nos plaques gravées haut de gamme en aluminium brossé ou plexiglas avec entretoises en inox.
              </p>
              <button
                onClick={() => setActiveTab('configurator')}
                className="px-6 py-3 bg-white text-[#00AEEF] rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors shadow-md mt-2"
              >
                Personnaliser votre plaque d'entreprise ISO →
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Plaque Configurator for Customers */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Visual Realistic Wall Simulation */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-sm">
                <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                    Aperçu Haute Définition sur Mur d'Accueil
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-[#00AEEF]">
                    Entretoises Inox Ø16mm Incluses
                  </span>
                </div>

                {/* Concrete / Stone Wall Viewport */}
                <div className="relative aspect-[16/11] bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 rounded-2xl p-8 flex items-center justify-center overflow-hidden shadow-2xl border border-slate-700">
                  {/* Subtle ambient lighting */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                  {/* The Physical Plaque Representation */}
                  <div
                    className={`relative w-80 sm:w-96 aspect-[300/200] p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_25px_50px_rgba(0,0,0,0.6)] ${
                      material === 'alu-brosse'
                        ? 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 text-slate-900 border border-slate-400'
                        : material === 'plexi-cristal'
                        ? 'bg-white/85 backdrop-blur-md text-slate-900 border-2 border-white/80 shadow-2xl'
                        : material === 'laiton-or'
                        ? 'bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 text-slate-900 border border-amber-400'
                        : 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-900'
                    }`}
                    style={{
                      borderRadius: '8px'
                    }}
                  >
                    {/* Metallic brushed grain effect */}
                    <div className="absolute inset-0 bg-white/15 mix-blend-overlay pointer-events-none rounded-[7px]"></div>

                    {/* 4 Inox Spacers at corners */}
                    <div className="absolute top-2.5 left-2.5 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-500 via-slate-200 to-slate-600 border border-slate-700 shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                    </div>
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-500 via-slate-200 to-slate-600 border border-slate-700 shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-500 via-slate-200 to-slate-600 border border-slate-700 shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-500 via-slate-200 to-slate-600 border border-slate-700 shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                    </div>

                    {/* Header Zone: Company & Seal */}
                    <div className="z-10 text-center border-b border-black/10 pb-2">
                      <p className="text-[10px] tracking-widest uppercase font-extrabold text-[#00AEEF]">
                        ENTREPRISE CERTIFIÉE CONFORME
                      </p>
                      <h4 className="text-sm sm:text-base font-black tracking-tight uppercase leading-snug mt-0.5">
                        {companyName || 'VOTRE RAISON SOCIALE'}
                      </h4>
                    </div>

                    {/* Middle Zone: ISO Badges and description */}
                    <div className="z-10 my-auto text-center space-y-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full border border-black/10 mx-auto">
                        <div className="w-4 h-4 rounded-full bg-[#00AEEF] text-white flex items-center justify-center text-[8px] font-black">
                          ✓
                        </div>
                        <span className="font-black text-xs tracking-wider">
                          {isoStandard === 'iso-9001' && 'ISO 9001 : 2015'}
                          {isoStandard === 'iso-14001' && 'ISO 14001 : 2015'}
                          {isoStandard === 'iso-45001' && 'ISO 45001 : 2018'}
                          {isoStandard === 'double-9001-14001' && 'ISO 9001 + ISO 14001'}
                          {isoStandard === 'triple-qse' && 'ISO 9001 • 14001 • 45001'}
                          {isoStandard === 'iso-17025' && 'ISO / IEC 17025'}
                        </span>
                      </div>
                      <p className="text-[9px] max-w-[280px] mx-auto opacity-80 leading-tight">
                        {scopeText}
                      </p>
                    </div>

                    {/* Footer Zone: Certifier & Dates */}
                    <div className="z-10 flex items-center justify-between text-[8px] opacity-75 border-t border-black/10 pt-1 font-mono">
                      <span>Certificat n° {certNumber}</span>
                      <span>Organisme : {certifier}</span>
                      <span>Validité : {validityYear}</span>
                    </div>
                  </div>
                </div>

                {/* Assurance Badges */}
                <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                  <div className="p-3 bg-[#F5F5F5] rounded-xl">
                    <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">verified</span>
                    <span className="text-[11px] font-bold text-[#111111] block">Logos Vectoriels</span>
                    <span className="text-[10px] text-[#666666]">Norme ISO officielle</span>
                  </div>
                  <div className="p-3 bg-[#F5F5F5] rounded-xl">
                    <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">shield</span>
                    <span className="text-[11px] font-bold text-[#111111] block">Inoxydable 10 Ans</span>
                    <span className="text-[10px] text-[#666666]">Intérieur & Extérieur</span>
                  </div>
                  <div className="p-3 bg-[#F5F5F5] rounded-xl">
                    <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">hardware</span>
                    <span className="text-[11px] font-bold text-[#111111] block">Kit Fixation Inclus</span>
                    <span className="text-[10px] text-[#666666]">4 entretoises + vis</span>
                  </div>
                </div>
              </div>

              {/* Guidelines on Official Certifications */}
              <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
                <h4 className="font-bold text-sm text-[#111111] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px]">info</span>
                  Règles d'Usage des Logos ISO & Certificateurs
                </h4>
                <ul className="text-xs text-[#333333] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00AEEF] font-bold">•</span>
                    <span><strong>Logo ISO :</strong> La mention de la norme doit impérativement préciser l'année de version (ex: ISO 9001:2015).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00AEEF] font-bold">•</span>
                    <span><strong>Organisme certificateur :</strong> Possibilité d'apposer le logo officiel de votre organisme (AFAQ, TÜV, SGS, Bureau Veritas, INNORPI).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00AEEF] font-bold">•</span>
                    <span><strong>Finition Inox :</strong> Entretoises fournies permettant un décollement mural de 15 mm avec effet d'ombre flottante très valorisant.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: 6-step Configurator */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E5E5] shadow-sm space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E6F8FF] text-[#00AEEF] text-xs font-bold uppercase tracking-wider">
                      Signalétique & Prestige Entreprise
                    </span>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                      Gravure Haute Définition 0.05 mm
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                    Plaques de Certification ISO & Signalétique Murale
                  </h1>
                  <p className="text-xs sm:text-sm text-[#333333] mt-1.5 leading-relaxed">
                    Valorisez vos agréments de qualité et certifications auprès de vos clients, auditeurs et partenaires grâce à nos plaques murales prestigieuses.
                  </p>
                </div>

                {/* Step 1: Norme ISO */}
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                    1. Norme(s) ISO & Label à Afficher
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'iso-9001', label: 'ISO 9001 : 2015', desc: 'Management de la Qualité' },
                      { id: 'iso-14001', label: 'ISO 14001 : 2015', desc: 'Management Environnemental' },
                      { id: 'iso-45001', label: 'ISO 45001 : 2018', desc: 'Santé & Sécurité au Travail' },
                      { id: 'double-9001-14001', label: 'Double ISO 9001 + 14001', desc: 'Qualité & Environnement (+10 DT)' },
                      { id: 'triple-qse', label: 'Triple QSE (9001/14001/45001)', desc: 'Qualité, Sécurité, Environnement (+10 DT)' },
                      { id: 'iso-17025', label: 'ISO/IEC 17025', desc: 'Laboratoires & Essais' },
                    ].map((norm) => (
                      <button
                        key={norm.id}
                        onClick={() => setIsoStandard(norm.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isoStandard === norm.id
                            ? 'border-[#00AEEF] bg-[#E6F8FF]/30 ring-1 ring-[#00AEEF]'
                            : 'border-[#E5E5E5] hover:bg-slate-50'
                        }`}
                      >
                        <p className="text-xs font-bold text-[#111111]">{norm.label}</p>
                        <p className="text-[11px] text-[#333333] mt-0.5">{norm.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Matière */}
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                    2. Matière & Support Prestige
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'alu-brosse', title: 'Aluminium Brossé 3mm', desc: 'Inoxydable, moderne & sobre', tag: 'Standard' },
                      { id: 'plexi-cristal', title: 'Plexiglas Biseauté 5mm', desc: 'Effet verre transparent flottant (+14 DT)', tag: 'Haut de gamme' },
                      { id: 'laiton-or', title: 'Laiton Poli Miroir 2.5mm', desc: 'Noblesse dorée joaillerie (+38 DT)', tag: 'Luxe' },
                      { id: 'dibond', title: 'Dibond Composite Métal', desc: 'Léger & rigide (-5 DT)', tag: 'Éco' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMaterial(m.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          material === m.id
                            ? 'border-[#00AEEF] bg-[#E6F8FF]/30 ring-1 ring-[#00AEEF]'
                            : 'border-[#E5E5E5] hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xs font-bold text-[#111111] block">{m.title}</span>
                        <span className="text-[11px] text-[#333333] block mt-0.5">{m.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Dimensions */}
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                    3. Dimensions de la Plaque
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: '300x200', label: '300 × 200 mm', desc: 'Format A4' },
                      { id: '400x300', label: '400 × 300 mm', desc: 'Format A3 (+30 DT)' },
                      { id: '500x350', label: '500 × 350 mm', desc: 'Hall d\'entrée (+67 DT)' },
                      { id: '600x400', label: '600 × 400 mm', desc: 'Façade monumentale' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setDimensions(d.id as any)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          dimensions === d.id
                            ? 'border-[#00AEEF] bg-[#00AEEF] text-white'
                            : 'border-[#E5E5E5] text-[#111111] hover:bg-slate-50'
                        }`}
                      >
                        <p className="text-xs font-bold">{d.label}</p>
                        <p className={`text-[10px] mt-0.5 ${dimensions === d.id ? 'opacity-80' : 'text-[#666666]'}`}>{d.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Fixations entretoises */}
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                    4. Type d'Entretoises Murales (Kit de 4 pièces fourni)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'inox-15mm', label: 'Inox Brossé Ø16mm', desc: 'Finition satinée' },
                      { id: 'inox-noir', label: 'Noir Mat Épuré', desc: 'Design contemporain' },
                      { id: 'laiton-dore', label: 'Laiton Doré Luxe', desc: 'Finition or brillant' },
                    ].map((sp) => (
                      <button
                        key={sp.id}
                        onClick={() => setSpacers(sp.id as any)}
                        className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                          spacers === sp.id
                            ? 'border-[#00AEEF] bg-[#E6F8FF]/30 font-bold text-[#00AEEF]'
                            : 'border-[#E5E5E5] text-[#333333] hover:bg-slate-50'
                        }`}
                      >
                        <p className="font-bold">{sp.label}</p>
                        <p className="text-[10px] text-[#666666]">{sp.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 5: Text inputs */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider">
                    5. Mentions Personnalisées de votre Plaque
                  </label>

                  <div>
                    <label className="block text-[11px] font-bold text-[#333333] mb-1">
                      Raison Sociale / Nom de l'Établissement *
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ex: MEDITERRANEAN HIGH-TECH INDUSTRIES"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none font-bold uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#333333] mb-1">
                      Périmètre de certification / Activité
                    </label>
                    <input
                      type="text"
                      value={scopeText}
                      onChange={(e) => setScopeText(e.target.value)}
                      placeholder="Ex: Conception, fabrication et distribution de solutions industrielles"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-[#333333] mb-1">N° Certificat</label>
                      <input
                        type="text"
                        value={certNumber}
                        onChange={(e) => setCertNumber(e.target.value)}
                        placeholder="CERT-TN-9001-A"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#333333] mb-1">Certificateur</label>
                      <input
                        type="text"
                        value={certifier}
                        onChange={(e) => setCertifier(e.target.value)}
                        placeholder="AFAQ / TÜV / SGS / INNORPI"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#333333] mb-1">Validité</label>
                      <input
                        type="text"
                        value={validityYear}
                        onChange={(e) => setValidityYear(e.target.value)}
                        placeholder="2024 — 2027"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs font-bold text-[#111111]">Nombre d'exemplaires</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#c6c5d8] font-bold text-sm hover:bg-slate-100 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-[#c6c5d8] font-bold text-sm hover:bg-slate-100 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-[#00AEEF]">{totalPrice} DT</span>
                      <span className="text-xs font-semibold text-[#666666]">HT (Kit entretoises inclus)</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                      Livraison partout en Tunisie sous 48h
                    </p>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#00AEEF] hover:bg-[#008CC4] text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    Commander ma plaque ISO
                  </button>
                </div>

                {addedNotice && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between animate-in fade-in duration-200">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-emerald-600">done_all</span>
                      <strong>Plaque de certification ISO ajoutée au panier !</strong>
                    </span>
                    <button
                      onClick={() => onNavigate('catalog')}
                      className="underline font-bold hover:text-emerald-950"
                    >
                      Continuer
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
