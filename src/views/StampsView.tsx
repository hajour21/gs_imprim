import React, { useState } from 'react';
import { CartItem, ViewType } from '../types';

interface StampsViewProps {
  onAddToCart: (item: CartItem) => void;
  onNavigate: (view: ViewType) => void;
}

export type StampCategoryFilter = 'all' | 'printy' | 'rond' | 'pocket' | 'dateur' | 'imprint' | 'consommable';

export interface StampModelSpec {
  id: string;
  name: string;
  family: StampCategoryFilter;
  dim: string;
  lines: number;
  price: number;
  desc: string;
  image?: string;
  badge?: string;
  badgeColor?: string;
  isRound?: boolean;
  isDateur?: boolean;
  isPocket?: boolean;
  isConsommable?: boolean;
}

export const StampsView: React.FC<StampsViewProps> = ({ onAddToCart, onNavigate }) => {
  const [selectedFamily, setSelectedFamily] = useState<StampCategoryFilter>('all');
  const [model, setModel] = useState<string>('4913');
  const [casingColor, setCasingColor] = useState<'noir' | 'bleu' | 'rouge' | 'blanc' | 'vert'>('noir');
  const [inkColor, setInkColor] = useState<'noir' | 'bleu' | 'rouge' | 'vert'>('bleu');

  // Text lines for stamp engraving
  const [line1, setLine1] = useState('ALPHA TECH TUNISIE SARL');
  const [line2, setLine2] = useState('Au capital de 20 000 DT');
  const [line3, setLine3] = useState('Matricule Fiscal : 1584920/B/M/000');
  const [line4, setLine4] = useState('RNE : 1584920B - CD : 874521T');
  const [line5, setLine5] = useState('Route de Gabès km 1,5, Sfax — Tél : 74 461 868');

  // Dater specific text
  const [daterDate, setDaterDate] = useState('25 OCT 2026');
  const [daterFormula, setDaterFormula] = useState('PAYÉ LE');

  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Complete Catalog of Stamp Models
  const allStampModels: StampModelSpec[] = [
    // Standard Printy 4.0
    {
      id: '4911',
      name: 'Trodat Printy 4911',
      family: 'printy',
      dim: '38 × 14 mm',
      lines: 3,
      price: 22,
      desc: 'Compact 3 lignes pour signature & mention brève',
      image: '/assets/aistudio/image_78f8486d.png',
      badge: 'Bureautique',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: '4912',
      name: 'Trodat Printy 4912',
      family: 'printy',
      dim: '47 × 18 mm',
      lines: 4,
      price: 28,
      desc: 'Format standard 4 lignes pour professions libérales & médical',
      badge: 'Populaire',
      badgeColor: 'bg-indigo-100 text-indigo-700'
    },
    {
      id: '4913',
      name: 'Trodat Printy 4913',
      family: 'printy',
      dim: '58 × 22 mm',
      lines: 5,
      price: 35,
      desc: 'Recommandé SARL / SUARL avec Matricule Fiscal & RNE complet',
      badge: 'Bestseller',
      badgeColor: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: '4915',
      name: 'Trodat Printy 4915',
      family: 'printy',
      dim: '70 × 25 mm',
      lines: 6,
      price: 45,
      desc: 'Grand format administratif avec mentions bancaires (IBAN/RIB)',
      badge: 'Grand Format',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      id: '4916',
      name: 'Trodat Printy 4916 (Spécial RIB)',
      family: 'printy',
      dim: '70 × 10 mm',
      lines: 2,
      price: 32,
      desc: 'Format allongé 2 lignes idéal pour IBAN ou tampon chèque',
      badge: 'Banque',
      badgeColor: 'bg-slate-100 text-slate-700'
    },

    // Tampons Ronds Officiels
    {
      id: '4642',
      name: 'Trodat Printy Rond 4642',
      family: 'rond',
      dim: 'Ø 42 mm',
      lines: 5,
      price: 46,
      desc: 'Grand cachet circulaire officiel pour administration, ambassades & experts',
      image: '/assets/aistudio/image_01548933.png',
      badge: 'Nouveau',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      isRound: true
    },
    {
      id: '46040',
      name: 'Trodat Printy Rond 46040',
      family: 'rond',
      dim: 'Ø 40 mm',
      lines: 4,
      price: 42,
      desc: 'Cachet rond standard pour sociétés, sceaux et logos circulaires',
      isRound: true
    },
    {
      id: '46030',
      name: 'Trodat Printy Rond 46030',
      family: 'rond',
      dim: 'Ø 30 mm',
      lines: 3,
      price: 36,
      desc: 'Cachet rond compact pour paraphes, visas et contrôles qualité',
      isRound: true
    },

    // Tampons de Poche / Pocket Printy
    {
      id: '9512',
      name: 'Trodat Pocket Printy 9512',
      family: 'pocket',
      dim: '47 × 18 mm',
      lines: 4,
      price: 32,
      desc: 'Tampon de poche rétractable pliable d\'une seule main pour nomades & médecins',
      image: '/assets/aistudio/image_382187f2.png',
      badge: 'Nomade',
      badgeColor: 'bg-rose-100 text-rose-700',
      isPocket: true
    },
    {
      id: '9511',
      name: 'Trodat Pocket Printy 9511',
      family: 'pocket',
      dim: '38 × 14 mm',
      lines: 3,
      price: 26,
      desc: 'Ultra-compact clip poche pour infirmiers, chauffeurs & commerciaux',
      isPocket: true
    },

    // Tampons Dateurs
    {
      id: '4810',
      name: 'Trodat Printy Dater 4810',
      family: 'dateur',
      dim: '20 × 3.8 mm (Date)',
      lines: 1,
      price: 24,
      desc: 'Dateur automatique à bandes rotatives (Jour / Mois / Année sur 10 ans)',
      image: '/assets/aistudio/image_78f8486d.png',
      badge: 'Comptabilité',
      badgeColor: 'bg-amber-100 text-amber-800',
      isDateur: true
    },
    {
      id: '4850',
      name: 'Trodat Dater 4850 + Texte Personnalisé',
      family: 'dateur',
      dim: '25 × 5 mm + Date',
      lines: 2,
      price: 38,
      desc: 'Dateur automatique avec texte gravé au-dessus (ex: REÇU LE / PAYÉ LE)',
      badge: 'Bicolore',
      badgeColor: 'bg-red-100 text-red-800',
      isDateur: true
    },

    // Gamme Éco Imprint
    {
      id: 'imprint-8911',
      name: 'Tampon Imprint 89/11 Éco',
      family: 'imprint',
      dim: '38 × 14 mm',
      lines: 3,
      price: 18,
      desc: 'Alternative économique et fiable pour usage quotidien au bureau',
      image: '/assets/aistudio/image_78f8486d.png',
      badge: 'Prix Éco',
      badgeColor: 'bg-lime-100 text-lime-800'
    },
    {
      id: 'imprint-8912',
      name: 'Tampon Imprint 89/12 Éco',
      family: 'imprint',
      dim: '47 × 18 mm',
      lines: 4,
      price: 23,
      desc: 'Boîtier robuste 4 lignes à prix doux',
      image: '/assets/aistudio/image_78f8486d.png',
      badge: 'Prix Éco',
      badgeColor: 'bg-lime-100 text-lime-800'
    },

    // Consommables & Encreurs
    {
      id: 'cassette-recharge',
      name: 'Cassette d\'Encre Trodat Originale (6/4911 à 6/4913)',
      family: 'consommable',
      dim: 'Standard Trodat',
      lines: 0,
      price: 6.0,
      desc: 'Recharge d\'encre indélébile prête à l\'emploi pour tampons Trodat',
      image: '/assets/aistudio/image_78f8486d.png',
      badge: 'Consommable',
      badgeColor: 'bg-slate-100 text-slate-700',
      isConsommable: true
    },
    {
      id: 'encrier-9052',
      name: 'Boîte d\'Encrier Trodat 9052',
      family: 'consommable',
      dim: '110 × 70 mm',
      lines: 0,
      price: 5.8,
      desc: 'Boîtier encrier feutre pour tampons manuels bois et dateurs',
      image: '/assets/aistudio/image_78f8486d.png',
      badge: 'Consommable',
      badgeColor: 'bg-slate-100 text-slate-700',
      isConsommable: true
    }
  ];

  const currentSpec = allStampModels.find(m => m.id === model) || allStampModels[2];
  const totalPrice = currentSpec.price * quantity;

  // Filtered models by category tab
  const filteredModels = allStampModels.filter(m => 
    selectedFamily === 'all' || m.family === selectedFamily
  );

  // Prefill templates
  const prefillSARL = () => {
    setModel('4913');
    setLine1('MEDITERRANEAN TRADING SARL');
    setLine2('Capital : 50.000 DT — Import & Export');
    setLine3('Matricule Fiscal : 1729481/C/M/000');
    setLine4('RNE : 1729481C — Code TVA : Assujetti');
    setLine5('Route de Gabès km 1,5, Sfax — Tél : 74 461 868');
  };

  const prefillMedical = () => {
    setModel('4912');
    setLine1('Dr. Yassine MANAI');
    setLine2('Spécialiste en Cardiologie');
    setLine3('Ancien Interne des Hôpitaux');
    setLine4('Ordre des Médecins N° 14820 — Tél : 56 495 697');
    setLine5('Route de Gabès km 1,5, Sfax');
  };

  const prefillPocket = () => {
    setModel('9512');
    setLine1('Dr. Hajer GHARSALLAH');
    setLine2('Médecine Générale & Urgences');
    setLine3('Tél Mobile : +216 56 495 697');
    setLine4('Sfax, Tunisie');
    setLine5('');
  };

  const prefillRound4642 = () => {
    setModel('4642');
    setLine1('CABINET D\'EXPERTISE COMPTABLE');
    setLine2('ORDRE DES EXPERTS COMPTABLES DE TUNISIE');
    setLine3('Matricule Fiscal : 1294830/M/000');
    setLine4('SFAX — TUNIS');
    setLine5('');
  };

  const prefillDater = () => {
    setModel('4850');
    setDaterFormula('PAYÉ LE');
    setDaterDate('25 OCT 2026');
    setLine1('DIRECTION FINANCIÈRE SFAX');
    setLine2('Comptabilisé & Règlement Effectué');
    setLine3('');
    setLine4('');
    setLine5('');
  };

  const prefillArabic = () => {
    setModel('4913');
    setLine1('شركة الأفق للخدمات العامة ذ.م.م');
    setLine2('المعرف الجبائي : 1689420/A/M/000');
    setLine3('السجل الوطني للمؤسسات : 1689420A');
    setLine4('طريق قابس كلم 1,5 - صفاقس');
    setLine5('الهاتف : 74461868 / 56495697');
  };

  const handleAddToCart = () => {
    let specs = `${currentSpec.name} (${currentSpec.dim}) | Boîtier: ${casingColor.toUpperCase()} | Encre: ${inkColor.toUpperCase()}`;
    if (!currentSpec.isConsommable) {
      specs += ` | Texte gravé: "${line1}"`;
      if (currentSpec.isDateur) {
        specs += ` | Formule dateur: "${daterFormula} ${daterDate}"`;
      }
    }

    onAddToCart({
      id: `stamp-${Date.now()}`,
      productId: 'stamps-trodat',
      title: `${currentSpec.name}`,
      specs: specs,
      quantity: `${quantity} unité${quantity > 1 ? 's' : ''}`,
      unitPrice: currentSpec.price,
      totalPrice: totalPrice,
      image: currentSpec.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBASSSigZxYGdCODg2o2jM3N_krsmBmJJMTXd3Y1g9QT7Mezl3urCYuemE1dJKA4XNhgIVulTkGqvVKVD3Z7x1kPL4jyZ_8x9kulzJoa0yh6vsclXn9nd08pDginIiIQpjAv3pE9hnBahd7yyWqKyyAXL_Bozdn9TuAD7LiWHvQmeo5d7sHNvDuEassXkvFwU2R_BB4LQ-PipnDOtXDYUKKcivii4vHys_JpcDOaJhdPX6EAuaWxKw60g'
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3500);
  };

  // Get ink hex color for imprint preview
  const getInkHex = () => {
    if (inkColor === 'bleu') return '#154889';
    if (inkColor === 'noir') return '#111827';
    if (inkColor === 'rouge') return '#b91c1c';
    if (inkColor === 'vert') return '#15803d';
    return '#154889';
  };

  return (
    <div className="page-shell min-h-screen bg-white py-8">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <nav className="flex items-center gap-2 text-xs text-[#666666]">
          <button onClick={() => onNavigate('home')} className="hover:text-[#00AEEF]">Accueil</button>
          <span>/</span>
          <button onClick={() => onNavigate('catalog')} className="hover:text-[#00AEEF]">Bureautique & Administratif</button>
          <span>/</span>
          <span className="text-[#111111] font-bold">Cachets Encreurs Professionnels (Trodat, Ronds, Dateurs, Pocket, Imprint)</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Category Filter Bar */}
        <div className="bg-white p-3 rounded-2xl border border-[#E5E5E5] shadow-xs mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#666666] px-2 hidden sm:inline">Famille de cachet :</span>
          {[
            { id: 'all', label: 'Tous les modèles', icon: 'grid_view' },
            { id: 'printy', label: 'Trodat Printy 4.0 (Bureau)', icon: 'approval' },
            { id: 'rond', label: 'Tampons Ronds (Ø42 & 40mm)', icon: 'motion_photos_on' },
            { id: 'pocket', label: 'Pocket Printy (De poche)', icon: 'badge' },
            { id: 'dateur', label: 'Dateurs Automatiques', icon: 'calendar_month' },
            { id: 'imprint', label: 'Gamme Imprint (Éco)', icon: 'savings' },
            { id: 'consommable', label: 'Cassettes & Encreurs', icon: 'ink_bottle' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFamily(cat.id as any)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedFamily === cat.id
                  ? 'bg-[#00AEEF] text-white shadow-xs'
                  : 'text-[#333333] hover:bg-slate-100'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Real-Time Stamp Imprint Preview & Physical Visuals */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#666666] block">
                    Simulation de l'Empreinte en Temps Réel
                  </span>
                  <span className="text-[11px] text-[#333333]">
                    {currentSpec.name} • {currentSpec.dim}
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#00AEEF]">
                  Gravure Laser CO2 1000 DPI
                </span>
              </div>

              {/* Stamp Paper Imprint Box */}
              <div className="relative aspect-[16/10] bg-[#f8f9fa] rounded-2xl p-6 sm:p-8 flex items-center justify-center overflow-hidden border border-slate-200 shadow-inner">
                {/* Paper texture */}
                <div className="absolute inset-0 bg-white shadow-md mx-4 sm:mx-6 my-4 sm:my-6 rounded-lg border border-slate-100 flex items-center justify-center p-4 sm:p-6">
                  
                  {currentSpec.isConsommable ? (
                    /* Consumable Cassette / Ink Box Preview */
                    <div className="text-center space-y-3">
                      {currentSpec.image && (
                        <img
                          src={currentSpec.image}
                          alt={currentSpec.name}
                          className="w-32 h-28 object-contain mx-auto"
                        />
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-[#111111]">{currentSpec.name}</h4>
                        <p className="text-xs text-[#666666] mt-0.5">Encre indélébile certifiée ISO 14145-2</p>
                        <p className="text-xs font-bold text-[#00AEEF] mt-1">Couleur : {inkColor.toUpperCase()}</p>
                      </div>
                    </div>
                  ) : currentSpec.isRound ? (
                    /* Circular Stamp Imprint Simulation */
                    <div 
                      className="w-52 h-52 rounded-full border-4 flex flex-col items-center justify-center text-center p-4 transition-colors duration-300 font-mono relative"
                      style={{ borderColor: getInkHex(), color: getInkHex() }}
                    >
                      {/* Inner dotted or double circle */}
                      <div className="absolute inset-2 rounded-full border border-dashed opacity-50" style={{ borderColor: getInkHex() }}></div>
                      
                      <div className="w-full text-[9px] font-black uppercase tracking-wider z-10 px-2 leading-tight">
                        ★ {line1 || 'RAISON SOCIALE CIRCULAIRE'} ★
                      </div>
                      <div className="my-auto text-[10px] font-bold leading-tight px-3 z-10">
                        {line2}
                        {line3 && <span className="block mt-1 font-mono text-[9px]">{line3}</span>}
                      </div>
                      <div className="w-full text-[9px] font-extrabold uppercase z-10 border-t pt-1" style={{ borderColor: `${getInkHex()}40` }}>
                        {line4 || 'SFAX — TUNISIE'}
                      </div>
                    </div>
                  ) : currentSpec.isDateur ? (
                    /* Dater Imprint Simulation */
                    <div 
                      className="w-full max-w-sm border-2 rounded p-4 transition-colors duration-300 font-sans shadow-xs text-center space-y-2"
                      style={{ borderColor: getInkHex(), color: getInkHex() }}
                    >
                      {line1 && <p className="text-xs font-bold uppercase tracking-wider">{line1}</p>}
                      <div className="py-2 px-3 bg-slate-50 border rounded-lg inline-flex items-center gap-3 font-mono font-black text-base sm:text-lg tracking-wider" style={{ borderColor: getInkHex(), color: getInkHex() }}>
                        <span className="text-xs font-bold">{daterFormula}</span>
                        <span className="text-red-600 font-extrabold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          {daterDate}
                        </span>
                      </div>
                      {line2 && <p className="text-[11px] font-semibold mt-1">{line2}</p>}
                    </div>
                  ) : (
                    /* Standard Rectangular Stamp Imprint */
                    <div 
                      className="w-full max-w-sm border-2 rounded p-4 transition-colors duration-300 font-sans shadow-xs"
                      style={{ borderColor: getInkHex(), color: getInkHex() }}
                    >
                      <p className="text-sm sm:text-base font-black tracking-tight uppercase leading-snug border-b pb-1.5" style={{ borderColor: `${getInkHex()}40` }}>
                        {line1 || 'RAISON SOCIALE DE L\'ENTREPRISE'}
                      </p>
                      {line2 && <p className="text-xs font-semibold mt-1 leading-snug">{line2}</p>}
                      {line3 && <p className="text-xs font-mono font-bold mt-1 leading-snug tracking-wider">{line3}</p>}
                      {line4 && <p className="text-[11px] font-mono mt-0.5 opacity-90">{line4}</p>}
                      {line5 && <p className="text-[10px] mt-1 border-t pt-1 opacity-80" style={{ borderColor: `${getInkHex()}40` }}>{line5}</p>}
                    </div>
                  )}
                </div>

                <div className="absolute bottom-3 left-4 text-[10px] text-slate-400 font-mono">
                  Encre {inkColor.toUpperCase()} • Prêt en 2h à Sfax
                </div>
              </div>

              {/* Physical Product Image & Badges */}
              {currentSpec.image && (
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                  <img
                    src={currentSpec.image}
                    alt={currentSpec.name}
                    className="w-20 h-20 object-contain bg-white rounded-lg p-1 border shadow-xs"
                  />
                  <div>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${currentSpec.badgeColor || 'bg-slate-200 text-slate-800'}`}>
                      {currentSpec.badge || 'Modèle Certifié'}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#111111] mt-1">{currentSpec.name}</h4>
                    <p className="text-[11px] text-[#333333] mt-0.5">{currentSpec.desc}</p>
                  </div>
                </div>
              )}

              {/* Template quick-pick shortcuts */}
              <div className="mt-4 pt-3 border-t border-[#E5E5E5]">
                <p className="text-xs font-bold text-[#111111] mb-2">Exemples types conformes pour la Tunisie :</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={prefillSARL}
                    className="px-3 py-1.5 rounded-lg bg-[#E6F8FF] text-[#00AEEF] hover:bg-[#00AEEF] hover:text-white text-xs font-bold transition-colors"
                  >
                    Exemple SARL / SUARL
                  </button>
                  <button
                    onClick={prefillRound4642}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">motion_photos_on</span>
                    Tampon Rond Ø42mm
                  </button>
                  <button
                    onClick={prefillPocket}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-600 hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">badge</span>
                    Pocket Printy 9512
                  </button>
                  <button
                    onClick={prefillDater}
                    className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-600 hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                    Dateur 'PAYÉ LE'
                  </button>
                  <button
                    onClick={prefillArabic}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-[#333333] hover:bg-slate-200 text-xs font-bold transition-colors"
                  >
                    عربي / bilingue
                  </button>
                  <button
                    onClick={prefillMedical}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-[#333333] hover:bg-slate-200 text-xs font-bold transition-colors"
                  >
                    Médecin / Santé
                  </button>
                </div>
              </div>

              {/* Badges strip */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="p-3 bg-[#F5F5F5] rounded-xl">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">bolt</span>
                  <span className="text-[11px] font-bold text-[#111111] block">Prêt en 2h</span>
                  <span className="text-[10px] text-[#666666]">Atelier Sfax Route de Gabès</span>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-xl">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">eco</span>
                  <span className="text-[11px] font-bold text-[#111111] block">Écologique 4.0</span>
                  <span className="text-[10px] text-[#666666]">70% plastique recyclé</span>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-xl">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">lock_reset</span>
                  <span className="text-[11px] font-bold text-[#111111] block">Rechargeable</span>
                  <span className="text-[10px] text-[#666666]">Cassette remplaçable</span>
                </div>
              </div>
            </div>

            {/* Legal requirements guide in Tunisia */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
              <h4 className="font-bold text-sm text-[#111111] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#EC008C] text-[20px]">gavel</span>
                Mentions Légales Obligatoires (Législation Tunisienne)
              </h4>
              <p className="text-xs text-[#333333] leading-relaxed mb-2">
                Pour être juridiquement valable sur vos factures, bons de commande, chèques et contrats en Tunisie, le cachet d'entreprise doit comporter :
              </p>
              <ul className="text-xs text-[#333333] space-y-1.5 list-disc list-inside">
                <li>La <strong>Raison Sociale</strong> exacte et la forme juridique (SARL, SUARL, SA).</li>
                <li>Le montant du <strong>Capital Social</strong> (ex: au capital de 20.000 DT).</li>
                <li>Le <strong>Matricule Fiscal</strong> complet (ex: 1234567/A/M/000).</li>
                <li>L'identifiant unique au <strong>RNE</strong> (Registre National des Entreprises).</li>
                <li>L'adresse du siège social et numéro de téléphone.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Configurator */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E5E5] shadow-sm space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E6F8FF] text-[#00AEEF] text-xs font-bold uppercase tracking-wider">
                    Bureautique Officielle & Cachets d'Entreprise
                  </span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Garantie Trodat Original Autriche
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  Cachets Encreurs Professionnels & Dateurs
                </h1>
                <p className="text-xs sm:text-sm text-[#333333] mt-1.5 leading-relaxed">
                  Gamme complète Trodat Printy, Tampons Ronds Ø42mm, Pocket Printy pliables de poche, Dateurs comptables et gamme économique Imprint.
                </p>
              </div>

              {/* Step 1: Model Selection Grid */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                    1. Sélectionner le Modèle ({filteredModels.length} disponibles)
                  </label>
                  <span className="text-xs font-bold text-[#00AEEF]">
                    {currentSpec.name}
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                  {filteredModels.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setModel(item.id)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        model === item.id
                          ? 'border-[#00AEEF] bg-[#E6F8FF]/30 ring-1 ring-[#00AEEF]'
                          : 'border-[#E5E5E5] hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-contain rounded bg-slate-50 p-0.5 border shrink-0"
                          />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#111111]">{item.name}</span>
                            <span className="text-[10px] font-mono bg-slate-100 text-[#333333] px-2 py-0.5 rounded">
                              {item.dim}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#666666] mt-0.5 line-clamp-1">{item.desc}</p>
                        </div>
                      </div>
                      <span className="text-sm font-extrabold text-[#00AEEF] shrink-0 ml-2">
                        {item.price.toFixed(item.price % 1 === 0 ? 0 : 3)} DT
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Ink Color & Casing Color */}
              {!currentSpec.isConsommable && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                      2. Couleur de l'Encre
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'bleu', label: 'Bleu Royal', color: '#154889' },
                        { id: 'noir', label: 'Noir Intense', color: '#111827' },
                        { id: 'rouge', label: 'Rouge Vif', color: '#b91c1c' },
                        { id: 'vert', label: 'Vert Émeraude', color: '#15803d' },
                      ].map((ink) => (
                        <button
                          key={ink.id}
                          onClick={() => setInkColor(ink.id as any)}
                          className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                            inkColor === ink.id
                              ? 'border-[#00AEEF] bg-[#E6F8FF]/30 font-bold'
                              : 'border-[#E5E5E5] hover:bg-slate-50'
                          }`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: ink.color }}></span>
                          <span className="text-xs text-[#111111]">{ink.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                      3. Couleur du Boîtier
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'noir', label: 'Noir Onyx' },
                        { id: 'bleu', label: 'Bleu Intense' },
                        { id: 'rouge', label: 'Rouge Rubis' },
                        { id: 'blanc', label: 'Blanc Arctique' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setCasingColor(c.id as any)}
                          className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                            casingColor === c.id
                              ? 'border-[#00AEEF] bg-[#E6F8FF]/30 font-bold text-[#00AEEF]'
                              : 'border-[#E5E5E5] text-[#333333] hover:bg-slate-50'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dater formula controls if dater */}
              {currentSpec.isDateur && (
                <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-3">
                  <h4 className="text-xs font-bold text-amber-900 uppercase">Configuration du Dateur</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-amber-900 mb-1">Formule commerciale</label>
                      <select
                        value={daterFormula}
                        onChange={(e) => setDaterFormula(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white font-bold"
                      >
                        <option value="PAYÉ LE">PAYÉ LE</option>
                        <option value="REÇU LE">REÇU LE</option>
                        <option value="COMPTABILISÉ LE">COMPTABILISÉ LE</option>
                        <option value="EXPÉDIÉ LE">EXPÉDIÉ LE</option>
                        <option value="VALIDÉ LE">VALIDÉ LE</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-amber-900 mb-1">Exemple date d'essai</label>
                      <input
                        type="text"
                        value={daterDate}
                        onChange={(e) => setDaterDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white font-mono font-bold uppercase"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Text Lines Input */}
              {!currentSpec.isConsommable && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider">
                    4. Texte Personnalisé de Gravure ({currentSpec.lines} lignes max)
                  </label>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-[#333333] mb-1">
                      Ligne 1 (Raison Sociale / Titre principal) *
                    </label>
                    <input
                      type="text"
                      value={line1}
                      onChange={(e) => setLine1(e.target.value)}
                      placeholder="Ex: ALPHA TECH SARL"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none font-bold uppercase"
                    />
                  </div>

                  {currentSpec.lines >= 2 && (
                    <div>
                      <label className="block text-[11px] font-bold text-[#333333] mb-1">
                        Ligne 2 (Activité / Capital / Spécialité)
                      </label>
                      <input
                        type="text"
                        value={line2}
                        onChange={(e) => setLine2(e.target.value)}
                        placeholder="Ex: Au capital de 20 000 DT"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                      />
                    </div>
                  )}

                  {currentSpec.lines >= 3 && (
                    <div>
                      <label className="block text-[11px] font-bold text-[#333333] mb-1">
                        Ligne 3 (Matricule Fiscal / Téléphone mobile)
                      </label>
                      <input
                        type="text"
                        value={line3}
                        onChange={(e) => setLine3(e.target.value)}
                        placeholder="Ex: Matricule Fiscal : 1689420/A/M/000"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none font-mono"
                      />
                    </div>
                  )}

                  {currentSpec.lines >= 4 && (
                    <div>
                      <label className="block text-[11px] font-bold text-[#333333] mb-1">
                        Ligne 4 (RNE / Registre de Commerce / Ville)
                      </label>
                      <input
                        type="text"
                        value={line4}
                        onChange={(e) => setLine4(e.target.value)}
                        placeholder="Ex: RNE : 1689420A - CD : 874521T"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none font-mono"
                      />
                    </div>
                  )}

                  {currentSpec.lines >= 5 && (
                    <div>
                      <label className="block text-[11px] font-bold text-[#333333] mb-1">
                        Ligne 5 (Adresse / Contact téléphone)
                      </label>
                      <input
                        type="text"
                        value={line5}
                        onChange={(e) => setLine5(e.target.value)}
                        placeholder="Ex: Route de Gabès km 1,5, Sfax — Tél : 74 461 868"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Quantity selector */}
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
                    <span className="text-3xl font-black text-[#00AEEF]">
                      {totalPrice.toFixed(totalPrice % 1 === 0 ? 0 : 3)} DT
                    </span>
                    <span className="text-xs font-semibold text-[#666666]">TTC</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Prêt en 2h à l'atelier Sfax (Route de Gabès km 1,5)
                  </p>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#00AEEF] hover:bg-[#008CC4] text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  Commander ce modèle
                </button>
              </div>

              {addedNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between animate-in fade-in duration-200">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">done_all</span>
                    <strong>{currentSpec.name} ajouté à votre panier !</strong>
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
      </div>
    </div>
  );
};
