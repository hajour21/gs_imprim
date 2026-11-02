import React, { useState } from 'react';
import { CartItem, ViewType } from '../types';

interface TextilePullsViewProps {
  onAddToCart: (item: CartItem) => void;
  onNavigate: (view: ViewType) => void;
}

export type PullType = 'hoodie' | 'crewneck' | 'zip-hoodie' | 'oversize-heavy';
export type MarkingTechnique = 'broderie' | 'dtf-hd' | 'serigraphie' | 'flocage-3d';
export type PlacementPosition = 'coeur' | 'dos' | 'torse' | 'coeur-dos';

export interface PullColor {
  id: string;
  name: string;
  hex: string;
  textColor: string;
}

export const TextilePullsView: React.FC<TextilePullsViewProps> = ({ onAddToCart, onNavigate }) => {
  // Pull model & attributes
  const [pullType, setPullType] = useState<PullType>('hoodie');
  const [selectedColor, setSelectedColor] = useState<string>('noir');
  const [technique, setTechnique] = useState<MarkingTechnique>('broderie');
  const [placement, setPlacement] = useState<PlacementPosition>('coeur-dos');
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');

  // Sizes breakdown
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL'>('L');

  // Custom texts & design
  const [brandText, setBrandText] = useState('GS ATHLETICS CLUB');
  const [backText, setBackText] = useState('SFAX CREW • DEPUIS 2012');
  const [slogan, setSlogan] = useState('Premium Quality Cotton 320g');
  const [threadColor, setThreadColor] = useState<'or' | 'blanc' | 'noir' | 'rouge' | 'argent'>('blanc');

  // Quantity & ordering
  const [quantity, setQuantity] = useState<number>(10);
  const [addedNotice, setAddedNotice] = useState(false);

  const colors: PullColor[] = [
    { id: 'noir', name: 'Noir Minéral', hex: '#18181b', textColor: '#ffffff' },
    { id: 'marine', name: 'Bleu Marine Royal', hex: '#1e293b', textColor: '#ffffff' },
    { id: 'gris', name: 'Gris Chiné', hex: '#94a3b8', textColor: '#0f172a' },
    { id: 'blanc', name: 'Blanc Pur Coton', hex: '#f8fafc', textColor: '#0f172a' },
    { id: 'foret', name: 'Vert Forêt', hex: '#14532d', textColor: '#ffffff' },
    { id: 'bordeaux', name: 'Rouge Bordeaux', hex: '#7f1d1d', textColor: '#ffffff' },
    { id: 'sable', name: 'Beige Sable', hex: '#d6c7b2', textColor: '#1e293b' },
  ];

  const currentColorObj = colors.find(c => c.id === selectedColor) || colors[0];

  // Price calculations in DT
  const getBaseUnitPrice = (type: PullType, tech: MarkingTechnique, pos: PlacementPosition, qty: number): number => {
    let base = 52; // for 10 ex
    if (qty >= 100) base = 38;
    else if (qty >= 50) base = 42;
    else if (qty >= 25) base = 46;
    else if (qty >= 10) base = 52;
    else if (qty >= 5) base = 58;
    else base = 68; // 1 ex unitaire

    // Model delta
    if (type === 'crewneck') base -= 4;
    if (type === 'zip-hoodie') base += 6;
    if (type === 'oversize-heavy') base += 8;

    // Technique delta
    if (tech === 'broderie') base += 5;
    if (tech === 'flocage-3d') base += 3;

    // Placement delta
    if (pos === 'coeur-dos') base += 6;

    return Number(base.toFixed(2));
  };

  const unitPrice = getBaseUnitPrice(pullType, technique, placement, quantity);
  const totalPrice = Number((unitPrice * quantity).toFixed(2));

  // Quick preset templates
  const applyPreset = (preset: string) => {
    if (preset === 'startup') {
      setPullType('hoodie');
      setSelectedColor('noir');
      setTechnique('broderie');
      setPlacement('coeur');
      setBrandText('ALPHA TECH');
      setSlogan('ENGINEERING LAB');
      setThreadColor('blanc');
    } else if (preset === 'promo-etudiant') {
      setPullType('hoodie');
      setSelectedColor('marine');
      setTechnique('dtf-hd');
      setPlacement('coeur-dos');
      setBrandText('PROMO SFAX 2026');
      setBackText('FACULTÉ DE MÉDECINE DE SFAX');
      setThreadColor('or');
    } else if (preset === 'crewneck-cafe') {
      setPullType('crewneck');
      setSelectedColor('sable');
      setTechnique('broderie');
      setPlacement('torse');
      setBrandText('CAFÉ ARTISAN');
      setSlogan('Roasters & Coffee Makers');
      setThreadColor('noir');
    } else if (preset === 'staff-event') {
      setPullType('zip-hoodie');
      setSelectedColor('noir');
      setTechnique('serigraphie');
      setPlacement('coeur-dos');
      setBrandText('STAFF OFFICIEL');
      setBackText('SFAX FESTIVAL 2026 • SÉCURITÉ & ORGANISATION');
      setThreadColor('blanc');
    }
  };

  const handleAddToCartSubmit = () => {
    const item: CartItem = {
      id: `pull-${Date.now()}`,
      productId: 'pull-personnalise',
      title: `${pullType === 'hoodie' ? 'Sweat à Capuche (Hoodie)' : pullType === 'crewneck' ? 'Sweatshirt Col Rond (Crewneck)' : pullType === 'zip-hoodie' ? 'Sweat Zippé' : 'Sweat Oversize Luxe'} Personnalisé`,
      specs: `Couleur: ${currentColorObj.name} | Taille: ${selectedSize} | Technique: ${technique} | Emplacement: ${placement} | Marquage: "${brandText}" / "${backText}"`,
      quantity: `${quantity} ex`,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
      options: {
        pullType,
        selectedColor: currentColorObj.name,
        selectedSize,
        technique,
        placement,
        brandText,
        backText,
        threadColor
      }
    };

    onAddToCart(item);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3500);
  };

  const getThreadColorHex = () => {
    switch (threadColor) {
      case 'or': return '#d4af37';
      case 'argent': return '#cbd5e1';
      case 'noir': return '#0f172a';
      case 'rouge': return '#ef4444';
      default: return '#ffffff';
    }
  };

  return (
    <div className="page-shell min-h-screen bg-white py-8">
      {/* Breadcrumb & Title */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-8">
        <nav className="flex items-center gap-2 text-xs text-[#666666] mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#00AEEF]">Accueil</button>
          <span>/</span>
          <button onClick={() => onNavigate('catalog')} className="hover:text-[#00AEEF]">Catalogue</button>
          <span>/</span>
          <span className="text-[#111111] font-bold">Pulls & Sweats Personnalisés</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-[#00AEEF] text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-[16px]">apparel</span>
              Textile Professionnel & Marquage Haute Définition
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Pulls, Hoodies & Sweats Personnalisés
            </h1>
            <p className="text-sm text-[#333333] mt-1 max-w-3xl leading-relaxed">
              Pour entreprises, associations étudiantes, équipes sportives et marques de mode. Coton lourd 320g-350g peigné, broderie de précision au fil Madeira ou impression numérique directe DTF HD à notre atelier de Sfax.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Dès 38 DT l'unité en série
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E5E5] text-xs font-bold text-[#00AEEF]">
              Atelier Textile Sfax
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: INTERACTIVE SWEAT PREVIEW */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Inspiration Presets */}
            <div className="bg-white p-4 rounded-2xl border border-[#E5E5E5] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666] block mb-2">
                Configurations recommandées par secteur :
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => applyPreset('startup')}
                  className="p-2.5 rounded-xl bg-[#F5F5F5] hover:bg-[#E6F8FF] text-left transition-colors border border-transparent hover:border-[#00AEEF]/30"
                >
                  <span className="block text-xs font-bold text-[#111111]">Entreprise Tech</span>
                  <span className="text-[10px] text-[#666666]">Hoodie noir + Broderie cœur</span>
                </button>
                <button
                  onClick={() => applyPreset('promo-etudiant')}
                  className="p-2.5 rounded-xl bg-[#F5F5F5] hover:bg-[#E6F8FF] text-left transition-colors border border-transparent hover:border-[#00AEEF]/30"
                >
                  <span className="block text-xs font-bold text-[#111111]">Promo Étudiante</span>
                  <span className="text-[10px] text-[#666666]">Hoodie marine + Grand dos</span>
                </button>
                <button
                  onClick={() => applyPreset('crewneck-cafe')}
                  className="p-2.5 rounded-xl bg-[#F5F5F5] hover:bg-[#E6F8FF] text-left transition-colors border border-transparent hover:border-[#00AEEF]/30"
                >
                  <span className="block text-xs font-bold text-[#111111]">CHR & Resto</span>
                  <span className="text-[10px] text-[#666666]">Crewneck sable + torse</span>
                </button>
                <button
                  onClick={() => applyPreset('staff-event')}
                  className="p-2.5 rounded-xl bg-[#F5F5F5] hover:bg-[#E6F8FF] text-left transition-colors border border-transparent hover:border-[#00AEEF]/30"
                >
                  <span className="block text-xs font-bold text-[#111111]">Staff & Sécurité</span>
                  <span className="text-[10px] text-[#666666]">Zippé noir + dos visible</span>
                </button>
              </div>
            </div>

            {/* LIVE 2D SWEAT VISUALIZER CANVAS */}
            <div className="bg-gradient-to-b from-slate-100 to-slate-200/90 rounded-3xl p-6 sm:p-10 border border-[#E5E5E5] shadow-inner relative flex flex-col items-center justify-center min-h-[500px]">
              
              {/* Front/Back View Switcher */}
              <div className="absolute top-4 left-4 z-20 flex items-center bg-white rounded-full p-1 border border-slate-200 shadow-xs">
                <button
                  onClick={() => setActiveSide('front')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    activeSide === 'front' ? 'bg-[#00AEEF] text-white shadow-xs' : 'text-[#333333] hover:text-[#111111]'
                  }`}
                >
                  Face Avant
                </button>
                <button
                  onClick={() => setActiveSide('back')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    activeSide === 'back' ? 'bg-[#00AEEF] text-white shadow-xs' : 'text-[#333333] hover:text-[#111111]'
                  }`}
                >
                  Dos
                </button>
              </div>

              {/* Badges */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-[#333333] border border-white">
                  {currentColorObj.name} • {selectedSize}
                </span>
              </div>

              {/* Realistic SVG Hoodie Representation */}
              <div className="relative w-72 sm:w-80 h-96 flex items-center justify-center select-none transition-all duration-300">
                <svg
                  viewBox="0 0 300 360"
                  className="w-full h-full drop-shadow-[0_16px_30px_rgba(0,0,0,0.22)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Pull Silhouette (Torso + Sleeves) */}
                  <path
                    d="M 90 40 
                       L 50 75 
                       L 15 150 
                       L 45 170 
                       L 70 120 
                       L 70 320 
                       L 230 320 
                       L 230 120 
                       L 255 170 
                       L 285 150 
                       L 250 75 
                       L 210 40 
                       Z"
                    fill={currentColorObj.hex}
                    stroke="rgba(0,0,0,0.25)"
                    strokeWidth="2"
                  />

                  {/* Cuffs and waistband ribbing */}
                  <rect x="70" y="310" width="160" height="15" fill="rgba(0,0,0,0.15)" rx="2" />
                  <path d="M 15 150 L 45 170 L 38 185 L 8 165 Z" fill="rgba(0,0,0,0.15)" />
                  <path d="M 285 150 L 255 170 L 262 185 L 292 165 Z" fill="rgba(0,0,0,0.15)" />

                  {/* Hood details if hoodie */}
                  {(pullType === 'hoodie' || pullType === 'zip-hoodie' || pullType === 'oversize-heavy') && (
                    <>
                      {/* Hood background */}
                      <path
                        d="M 100 45 C 100 15, 200 15, 200 45 C 220 55, 80 55, 100 45 Z"
                        fill="rgba(0,0,0,0.2)"
                      />
                      {/* Hood drape curves */}
                      <path
                        d="M 110 40 C 120 70, 180 70, 190 40"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="2"
                        fill="none"
                      />
                      {/* Drawstrings if front view */}
                      {activeSide === 'front' && (
                        <>
                          <line x1="130" y1="55" x2="130" y2="105" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx="130" cy="107" r="2.5" fill="#d4af37" />
                          <line x1="170" y1="55" x2="170" y2="105" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx="170" cy="107" r="2.5" fill="#d4af37" />
                        </>
                      )}
                    </>
                  )}

                  {/* Crewneck collar if crewneck */}
                  {pullType === 'crewneck' && (
                    <ellipse cx="150" cy="48" rx="35" ry="14" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="4" />
                  )}

                  {/* Kangaroo pocket on front if hoodie or oversize */}
                  {activeSide === 'front' && (pullType === 'hoodie' || pullType === 'oversize-heavy') && (
                    <path
                      d="M 95 240 L 205 240 L 215 300 L 85 300 Z"
                      fill="rgba(0,0,0,0.08)"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="1.5"
                      rx="4"
                    />
                  )}

                  {/* Center Zipper if zip-hoodie */}
                  {pullType === 'zip-hoodie' && activeSide === 'front' && (
                    <>
                      <line x1="150" y1="45" x2="150" y2="320" stroke="rgba(200,200,200,0.6)" strokeWidth="3" />
                      <rect x="147" y="110" width="6" height="12" fill="#d4af37" rx="1" />
                    </>
                  )}
                </svg>

                {/* DYNAMIC OVERLAY: BRAND MARKING / EMBROIDERY */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* FRONT: Coeur (Left Chest) */}
                  {activeSide === 'front' && (placement === 'coeur' || placement === 'coeur-dos') && (
                    <div 
                      className="absolute top-28 left-24 p-2 rounded-lg text-center max-w-[85px] transition-all"
                      style={{ color: getThreadColorHex() }}
                    >
                      <div className="w-5 h-5 mx-auto mb-1 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                      </div>
                      <span className="block text-[9px] font-black tracking-widest uppercase leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                        {brandText || 'VOTRE NOM'}
                      </span>
                      <span className="text-[7px] font-mono opacity-80 block truncate">
                        {slogan}
                      </span>
                    </div>
                  )}

                  {/* FRONT: Torse complet (Center Chest) */}
                  {activeSide === 'front' && placement === 'torse' && (
                    <div 
                      className="absolute top-32 inset-x-0 mx-auto text-center p-3 max-w-[150px]"
                      style={{ color: getThreadColorHex() }}
                    >
                      <h4 className="text-xs font-black uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                        {brandText || 'LOGO ENTREPRISE'}
                      </h4>
                      <p className="text-[8px] font-bold opacity-90 tracking-wide mt-0.5">
                        {slogan}
                      </p>
                    </div>
                  )}

                  {/* BACK: Grand Dos (Large Back Print/Embroidery) */}
                  {activeSide === 'back' && (placement === 'dos' || placement === 'coeur-dos') && (
                    <div 
                      className="absolute top-24 inset-x-0 mx-auto text-center p-4 max-w-[170px] border-2 border-dashed border-white/20 rounded-2xl bg-black/10 backdrop-blur-xs"
                      style={{ color: getThreadColorHex() }}
                    >
                      <span className="material-symbols-outlined text-[24px] mb-1">all_inclusive</span>
                      <h3 className="text-xs font-black uppercase tracking-wider leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {backText || 'GS IMPRIM SFAX'}
                      </h3>
                      <p className="text-[8px] uppercase tracking-widest mt-1 opacity-90">
                        {slogan}
                      </p>
                      <div className="mt-2 text-[7px] font-mono bg-white/20 py-0.5 px-2 rounded-full inline-block">
                        {technique === 'broderie' ? 'Broderie Relief 3D' : technique === 'dtf-hd' ? 'Impression DTF HD' : 'Sérigraphie Fine'}
                      </div>
                    </div>
                  )}

                  {/* If back side selected and placement is coeur only */}
                  {activeSide === 'back' && placement === 'coeur' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[11px] font-bold text-white/50 bg-black/40 px-3 py-1 rounded-full">
                        (Dos vierge • Marquage sur le cœur)
                      </span>
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom specs bar */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] font-bold text-[#333333]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                  Coton 320g peigné lourd
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                  Tenue 60 lavages machine
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                  Certifié OEKO-TEX standard 100
                </span>
              </div>
            </div>

            {/* Quality & Technical Guide */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
              <h4 className="font-bold text-sm text-[#111111] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00AEEF] text-[20px]">precision_manufacturing</span>
                Nos 3 Techniques d'Atelier Textile à Sfax
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-[#111111] block">1. Broderie Industrielle</span>
                  <p className="text-[11px] text-[#666666] mt-1">
                    Fils polyester haute brillance Madeira. Relief tactile noble, inaltérable au lavage régulier. Idéal pour polos et sweats corporate.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-[#111111] block">2. Impression DTF HD</span>
                  <p className="text-[11px] text-[#666666] mt-1">
                    Direct-to-Film avec poudre thermo-fusible et presse pneumatique. Permet tous les dégradés et photos en millions de couleurs.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-[#111111] block">3. Sérigraphie Textile</span>
                  <p className="text-[11px] text-[#666666] mt-1">
                    Passage d'encre à travers cadre maillé. Rendement optimal et prix unitaire très compétitif pour les grandes séries de promo.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: CUSTOMIZER CONTROLS & ORDERING */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-[#E5E5E5] shadow-sm space-y-5">
              
              {/* 1. Pull Model */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                  1. Modèle de Pull / Sweat
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'hoodie', label: 'Sweat à Capuche (Hoodie)', desc: '320g Molleton doux, poche kangourou' },
                    { id: 'crewneck', label: 'Sweatshirt Col Rond', desc: '300g Coupe moderne sans capuche' },
                    { id: 'zip-hoodie', label: 'Sweat Zippé à Capuche', desc: '340g Zip invisible YKK métal' },
                    { id: 'oversize-heavy', label: 'Oversize Heavyweight', desc: '380g Coton lourd tendance streetwear' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPullType(m.id as PullType)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        pullType === m.id
                          ? 'border-[#00AEEF] bg-[#F5F5F5] text-[#00AEEF] shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-[#333333]'
                      }`}
                    >
                      <span className="text-xs font-bold block">{m.label}</span>
                      <span className="text-[10px] text-[#666666]">{m.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Color Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                  2. Couleur du Textile ({currentColorObj.name})
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.id)}
                      className={`w-9 h-9 rounded-xl border-2 transition-transform flex items-center justify-center ${
                        selectedColor === c.id ? 'scale-110 border-[#00AEEF] shadow-md ring-2 ring-[#00AEEF]/30' : 'border-slate-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.id && (
                        <span 
                          className="material-symbols-outlined text-[16px] font-bold"
                          style={{ color: c.id === 'blanc' || c.id === 'gris' || c.id === 'sable' ? '#000' : '#fff' }}
                        >
                          check
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Technique de Marquage */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                  3. Technique de Marquage
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'broderie', label: 'Broderie Relief Luxe', badge: 'Haut de gamme' },
                    { id: 'dtf-hd', label: 'Impression DTF HD', badge: 'Quadri illimitée' },
                    { id: 'serigraphie', label: 'Sérigraphie Textile', badge: 'Économique dès 20ex' },
                    { id: 'flocage-3d', label: 'Flocage Velours 3D', badge: 'Aspect feutré' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTechnique(t.id as MarkingTechnique)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        technique === t.id
                          ? 'border-[#00AEEF] bg-[#F5F5F5] text-[#00AEEF]'
                          : 'border-slate-200 text-[#333333]'
                      }`}
                    >
                      <span className="text-xs font-bold block">{t.label}</span>
                      <span className="text-[10px] text-[#666666]">{t.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Placement */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                  4. Emplacement du Marquage
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'coeur', label: 'Cœur Poitrine (10x10cm)' },
                    { id: 'dos', label: 'Grand Dos (30x35cm)' },
                    { id: 'torse', label: 'Centré Torse (28x20cm)' },
                    { id: 'coeur-dos', label: 'Cœur + Grand Dos (+6 DT)' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlacement(p.id as PlacementPosition)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-left ${
                        placement === p.id
                          ? 'border-[#00AEEF] bg-[#F5F5F5] text-[#00AEEF]'
                          : 'border-slate-200 text-[#333333]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Custom Texts */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                  5. Textes ou Logo à Apposer
                </span>

                <div>
                  <label className="block text-[11px] font-semibold text-[#333333] mb-1">
                    Texte Face Avant (Logo, Société, Marque) :
                  </label>
                  <input
                    type="text"
                    value={brandText}
                    onChange={(e) => setBrandText(e.target.value)}
                    placeholder="Ex: GS IMPRIM RACING"
                    className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:border-[#00AEEF] outline-none bg-white"
                  />
                </div>

                {(placement === 'dos' || placement === 'coeur-dos') && (
                  <div>
                    <label className="block text-[11px] font-semibold text-[#333333] mb-1">
                      Grand Texte Dos :
                    </label>
                    <input
                      type="text"
                      value={backText}
                      onChange={(e) => setBackText(e.target.value)}
                      placeholder="Ex: SFAX PROMO 2026"
                      className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:border-[#00AEEF] outline-none bg-white"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[10px] font-semibold text-[#666666] mb-1">
                      Couleur du fil / marquage
                    </label>
                    <select
                      value={threadColor}
                      onChange={(e) => setThreadColor(e.target.value as any)}
                      className="w-full py-1.5 px-2 text-xs font-bold rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="blanc">Blanc Pur</option>
                      <option value="noir">Noir Ébène</option>
                      <option value="or">Or Doré Brillant</option>
                      <option value="argent">Argent Métallique</option>
                      <option value="rouge">Rouge Vif</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#666666] mb-1">
                      Taille échantillon
                    </label>
                    <div className="flex gap-1">
                      {(['S', 'M', 'L', 'XL', '2XL'] as const).map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz as any)}
                          className={`flex-1 py-1 rounded text-[11px] font-bold border ${
                            selectedSize === sz ? 'bg-[#00AEEF] text-white border-[#00AEEF]' : 'bg-white text-slate-700'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Quantity Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                  6. Quantité (Prix dégressif par palier)
                </label>
                <div className="grid grid-cols-6 gap-1.5">
                  {[1, 5, 10, 25, 50, 100].map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuantity(q)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        quantity === q
                          ? 'border-[#00AEEF] bg-[#00AEEF] text-white shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-[#333333]'
                      }`}
                    >
                      <span className="block">{q} ex</span>
                      <span className="text-[9px] opacity-80 block">
                        {getBaseUnitPrice(pullType, technique, placement, q)} DT
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price summary & CTA */}
              <div className="p-4 bg-[#F5F5F5] rounded-2xl border border-[#E6F8FF] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#666666] block">Total TTC ({quantity} pièces) :</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-[#00AEEF]">{totalPrice} DT</span>
                    <span className="text-xs font-bold text-[#333333]">({unitPrice} DT / pull)</span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCartSubmit}
                  className="px-6 py-3 bg-[#00AEEF] hover:bg-[#008CC4] text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  <span>Ajouter au panier</span>
                </button>
              </div>

              {addedNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Vos pulls personnalisés ont été ajoutés au panier !</span>
                </div>
              )}

              {/* Fast Sfax Workshop Guarantee */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#666666]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
                  Répartition des tailles (S, M, L, XL) possible après commande
                </span>
                <span>Atelier Sfax : Route de Gabès km 1,5</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
