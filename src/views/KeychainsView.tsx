import React, { useState } from 'react';
import { CartItem, ViewType } from '../types';

interface KeychainsViewProps {
  onAddToCart: (item: CartItem) => void;
  onNavigate: (view: ViewType) => void;
}

export type AcrylicType = 'transparent' | 'miroir-or' | 'miroir-argent' | 'noir-opaque' | 'depoli-givre' | 'glitter-or';
export type KeychainShape = 'hotel' | 'rectangle-arrondi' | 'rond' | 'coeur' | 'hexagone' | 'decoupe-libre';
export type KeychainAttache = 'anneau-argent' | 'mousqueton-or' | 'chainette-billes' | 'anneau-noir';
export type KeychainTechnique = 'uv-quadri' | 'gravure-laser' | 'mixte-uv-gravure';

export const KeychainsView: React.FC<KeychainsViewProps> = ({ onAddToCart, onNavigate }) => {
  // Customizer state
  const [shape, setShape] = useState<KeychainShape>('hotel');
  const [acrylicType, setAcrylicType] = useState<AcrylicType>('transparent');
  const [thickness, setThickness] = useState<'3mm' | '4mm' | '5mm'>('3mm');
  const [technique, setTechnique] = useState<KeychainTechnique>('uv-quadri');
  const [attache, setAttache] = useState<KeychainAttache>('mousqueton-or');
  
  // Customization fields
  const [mainTitle, setMainTitle] = useState('HÔTEL LA SOURCE');
  const [subText, setSubText] = useState('Chambre 204 • Sfax');
  const [spotifyCode, setSpotifyCode] = useState(false);
  const [spotifySong, setSpotifySong] = useState('Nour El Ain — Amr Diab');
  const [textColor, setTextColor] = useState<'blanc' | 'noir' | 'or' | 'bleu'>('blanc');

  // Quantity & Ordering
  const [quantity, setQuantity] = useState<number>(20);
  const [addedNotice, setAddedNotice] = useState(false);

  // Pricing formula (in DT)
  const getUnitPrice = (qty: number, thick: string, tech: KeychainTechnique, type: AcrylicType): number => {
    let base = 5.5; // for 20 ex
    if (qty >= 100) base = 3.5;
    else if (qty >= 50) base = 4.2;
    else if (qty >= 20) base = 5.5;
    else if (qty >= 10) base = 7.0;
    else base = 12.0; // unitaire / échantillon

    if (thick === '4mm') base += 0.5;
    if (thick === '5mm') base += 1.0;
    if (type === 'miroir-or' || type === 'miroir-argent' || type === 'glitter-or') base += 0.8;
    if (tech === 'mixte-uv-gravure') base += 0.6;

    return Number(base.toFixed(2));
  };

  const unitPrice = getUnitPrice(quantity, thickness, technique, acrylicType);
  const totalPrice = Number((unitPrice * quantity).toFixed(2));

  // Quick preset templates
  const applyPreset = (presetName: string) => {
    if (presetName === 'hotel') {
      setShape('hotel');
      setAcrylicType('transparent');
      setTechnique('uv-quadri');
      setAttache('mousqueton-or');
      setMainTitle('HÔTEL DAR LES PALMIERS');
      setSubText('Suite 108 • Sfax, Tunisie');
      setTextColor('or');
      setSpotifyCode(false);
    } else if (presetName === 'spotify') {
      setShape('rectangle-arrondi');
      setAcrylicType('transparent');
      setTechnique('uv-quadri');
      setAttache('anneau-argent');
      setMainTitle('Ya Rayah — Rachid Taha');
      setSubText('Spotify Code Audio Scan');
      setTextColor('blanc');
      setSpotifyCode(true);
    } else if (presetName === 'corporate') {
      setShape('rond');
      setAcrylicType('miroir-or');
      setTechnique('gravure-laser');
      setAttache('anneau-noir');
      setMainTitle('ALPHA TECH TUNISIE');
      setSubText('www.alphatech.tn');
      setTextColor('noir');
      setSpotifyCode(false);
    } else if (presetName === 'calligraphie') {
      setShape('coeur');
      setAcrylicType('glitter-or');
      setTechnique('gravure-laser');
      setAttache('mousqueton-or');
      setMainTitle('Yasmine & Rayen');
      setSubText('25.10.2026 • Mariage');
      setTextColor('blanc');
      setSpotifyCode(false);
    }
  };

  const handleAddToCartSubmit = () => {
    const item: CartItem = {
      id: `keychain-${Date.now()}`,
      productId: 'porte-cles-plexiglas',
      title: 'Porte-clés Plexiglas Personnalisé Découpé Laser',
      specs: `Forme: ${shape} | Plexi: ${acrylicType} (${thickness}) | Marquage: ${technique} | Attache: ${attache} | Texte: "${mainTitle}" / "${subText}"`,
      quantity: `${quantity} ex`,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80',
      options: {
        shape,
        acrylicType,
        thickness,
        technique,
        attache,
        mainTitle,
        subText,
        textColor,
        spotifyCode
      }
    };

    onAddToCart(item);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3500);
  };

  // Rendering background style for the visual preview
  const getPlexiBackground = () => {
    switch (acrylicType) {
      case 'transparent':
        return 'bg-gradient-to-br from-white/70 via-slate-100/40 to-blue-50/60 backdrop-blur-md border border-white/80 shadow-[inset_0_1px_4px_rgba(255,255,255,0.9),0_12px_28px_rgba(0,0,0,0.12)]';
      case 'miroir-or':
        return 'bg-gradient-to-br from-[#ffd700] via-[#f5c518] to-[#b8860b] border-2 border-[#fff3b0] shadow-[0_12px_28px_rgba(184,134,11,0.35)]';
      case 'miroir-argent':
        return 'bg-gradient-to-br from-[#e8ecf1] via-[#d1d5db] to-[#9ca3af] border-2 border-white shadow-[0_12px_28px_rgba(100,116,139,0.35)]';
      case 'noir-opaque':
        return 'bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617] border border-slate-700 shadow-[0_12px_28px_rgba(0,0,0,0.4)]';
      case 'depoli-givre':
        return 'bg-gradient-to-br from-white/80 via-slate-100/70 to-slate-200/80 backdrop-blur-lg border border-white/90 shadow-[0_10px_24px_rgba(0,0,0,0.08)]';
      case 'glitter-or':
        return 'bg-gradient-to-br from-[#f6d365] via-[#fda085] to-[#f6d365] border-2 border-[#fff0aa] shadow-[0_12px_28px_rgba(246,211,101,0.35)]';
      default:
        return 'bg-white/80';
    }
  };

  const getTextColorClass = () => {
    if (acrylicType === 'noir-opaque') return 'text-white';
    if (acrylicType === 'miroir-or' || acrylicType === 'miroir-argent') return 'text-slate-900';
    switch (textColor) {
      case 'blanc': return 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]';
      case 'noir': return 'text-[#111111]';
      case 'or': return 'text-[#b8860b] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]';
      case 'bleu': return 'text-[#00AEEF]';
      default: return 'text-white';
    }
  };

  const getAttacheRender = () => {
    switch (attache) {
      case 'mousqueton-or':
        return (
          <div className="flex flex-col items-center">
            {/* Hook */}
            <div className="w-8 h-12 rounded-t-full border-4 border-[#d4af37] bg-gradient-to-b from-[#ffd700] to-[#b8860b] shadow-md flex items-center justify-center -mb-2">
              <div className="w-2 h-4 bg-white/40 rounded-full" />
            </div>
            {/* Swivel ring */}
            <div className="w-6 h-6 rounded-full border-[3px] border-[#d4af37] bg-transparent" />
            <div className="w-1.5 h-3 bg-[#b8860b]" />
          </div>
        );
      case 'anneau-argent':
        return (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-4 border-slate-300 bg-transparent shadow-md relative">
              <div className="absolute inset-0 rounded-full border-2 border-slate-400 opacity-50" />
            </div>
            <div className="w-1.5 h-4 bg-slate-300 -mt-1" />
          </div>
        );
      case 'anneau-noir':
        return (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-4 border-slate-800 bg-transparent shadow-md" />
            <div className="w-1.5 h-4 bg-slate-800 -mt-1" />
          </div>
        );
      case 'chainette-billes':
        return (
          <div className="flex flex-col items-center space-y-1 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 shadow-xs" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 shadow-xs" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 shadow-xs" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 shadow-xs" />
          </div>
        );
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
          <span className="text-[#111111] font-bold">Porte-clés Plexiglas Personnalisés</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-[#EC008C] text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-[16px]">key</span>
              Découpe & Gravure Laser Haute Définition
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Porte-clés en Plexiglas Sur Mesure
            </h1>
            <p className="text-sm text-[#333333] mt-1 max-w-3xl leading-relaxed">
              Découpés au laser au millimètre près dans notre atelier à Sfax. Plexiglas coulé transparent cristal, miroir or/argent ou dépoli avec impression UV HD quadri et gravure inaltérable.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Dès 3.500 DT l'unité
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E5E5] text-xs font-bold text-[#00AEEF]">
              Prêt en 24h/48h à Sfax
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: INTERACTIVE VISUAL PREVIEW & PRESETS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Inspiration Templates */}
            <div className="bg-white p-4 rounded-2xl border border-[#E5E5E5] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666] block mb-2">
                Modèles populaires préconfigurés en 1 clic :
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => applyPreset('hotel')}
                  className="p-2.5 rounded-xl bg-[#F5F5F5] hover:bg-[#E6F8FF] text-left transition-colors border border-transparent hover:border-[#00AEEF]/30"
                >
                  <span className="block text-xs font-bold text-[#111111]">Hôtel & Suite</span>
                  <span className="text-[10px] text-[#666666]">Plexi losange N° chambre</span>
                </button>
                <button
                  onClick={() => applyPreset('spotify')}
                  className="p-2.5 rounded-xl bg-[#F5F5F5] hover:bg-[#E6F8FF] text-left transition-colors border border-transparent hover:border-[#00AEEF]/30"
                >
                  <span className="block text-xs font-bold text-[#111111]">Code Spotify</span>
                  <span className="text-[10px] text-[#666666]">Scan chanson préférée</span>
                </button>
                <button
                  onClick={() => applyPreset('corporate')}
                  className="p-2.5 rounded-xl bg-[#F5F5F5] hover:bg-[#E6F8FF] text-left transition-colors border border-transparent hover:border-[#00AEEF]/30"
                >
                  <span className="block text-xs font-bold text-[#111111]">Miroir Or Luxe</span>
                  <span className="text-[10px] text-[#666666]">Logo d'entreprise gravé</span>
                </button>
                <button
                  onClick={() => applyPreset('calligraphie')}
                  className="p-2.5 rounded-xl bg-[#F5F5F5] hover:bg-[#E6F8FF] text-left transition-colors border border-transparent hover:border-[#00AEEF]/30"
                >
                  <span className="block text-xs font-bold text-[#111111]">Mariage & Cadeau</span>
                  <span className="text-[10px] text-[#666666]">Prénoms & paillettes</span>
                </button>
              </div>
            </div>

            {/* LIVE SIMULATOR CANVAS */}
            <div className="bg-gradient-to-b from-slate-100 to-slate-200/80 rounded-3xl p-8 sm:p-12 border border-[#E5E5E5] shadow-inner relative overflow-hidden flex flex-col items-center justify-center min-h-[440px]">
              {/* Grid texture for scale perception */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00AEEF_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Watermark/Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-[#333333] border border-white">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Rendu temps réel 1:1 • Épaisseur {thickness}
              </div>

              {/* Physical Keychain Assembly Preview */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Fastener Ring / Chain */}
                <div className="relative z-20">
                  {getAttacheRender()}
                </div>

                {/* Hole in acrylic */}
                <div className="-mt-1.5 z-30 w-3 h-3 rounded-full bg-slate-300 border-2 border-slate-400 shadow-inner" />

                {/* Main Acrylic Body */}
                <div 
                  className={`relative transition-all duration-300 flex flex-col items-center justify-center p-6 text-center select-none ${getPlexiBackground()} ${
                    shape === 'hotel' ? 'w-52 h-72 rounded-[40px] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]' :
                    shape === 'rectangle-arrondi' ? 'w-64 h-40 rounded-3xl' :
                    shape === 'rond' ? 'w-52 h-52 rounded-full' :
                    shape === 'coeur' ? 'w-52 h-52 rounded-3xl rotate-45 flex items-center justify-center' :
                    shape === 'hexagone' ? 'w-56 h-56 rounded-2xl [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]' :
                    'w-60 h-44 rounded-3xl'
                  }`}
                >
                  {/* Subtle Light reflection overlay for realistic acrylic gloss */}
                  <div className="absolute inset-0 rounded-inherit bg-gradient-to-tr from-white/30 via-transparent to-transparent pointer-events-none" />

                  {/* Inner Content (compensate rotate for heart) */}
                  <div className={`relative z-10 space-y-2 ${shape === 'coeur' ? '-rotate-45' : ''}`}>
                    {/* Decorative icon or logo */}
                    <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center bg-white/20 border border-white/30 backdrop-blur-xs">
                      <span className="material-symbols-outlined text-[22px] text-[#111111]">
                        {shape === 'hotel' ? 'hotel' : shape === 'coeur' ? 'favorite' : 'workspace_premium'}
                      </span>
                    </div>

                    <h3 className={`font-black text-sm uppercase tracking-wider leading-tight max-w-[180px] mx-auto break-words ${getTextColorClass()}`}>
                      {mainTitle || 'VOTRE TEXTE'}
                    </h3>

                    <p className={`text-[11px] font-semibold opacity-90 max-w-[170px] mx-auto ${getTextColorClass()}`}>
                      {subText || 'Sous-titre ou coordonnées'}
                    </p>

                    {/* Spotify Code Bar Simulation */}
                    {spotifyCode && (
                      <div className="pt-2">
                        <div className="flex items-end justify-center gap-0.5 h-6 px-2 bg-black/60 rounded-md py-1">
                          {[4, 12, 8, 16, 20, 14, 6, 18, 10, 15, 7, 19, 11, 5].map((h, i) => (
                            <div key={i} className="w-1 bg-white rounded-full" style={{ height: `${h}px` }} />
                          ))}
                        </div>
                        <span className="text-[9px] font-mono text-white/90 block mt-1">
                          {spotifySong}
                        </span>
                      </div>
                    )}

                    {/* Technique Badge */}
                    <div className="pt-1">
                      <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/30 backdrop-blur-xs text-[#111111]">
                        {technique === 'uv-quadri' ? 'Impression UV Quadri' : technique === 'gravure-laser' ? 'Gravure Laser Creuse' : 'UV + Gravure'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Features reminder */}
              <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-4 text-[10px] text-[#666666] font-semibold">
                <span>✓ Plexiglas coulé anti-rayures</span>
                <span>•</span>
                <span>✓ Découpe laser polie brillante</span>
                <span>•</span>
                <span>✓ Résistant à l'eau et aux frottements</span>
              </div>
            </div>

            {/* Gallery of realized Acrylic Keychains */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
              <h4 className="font-bold text-sm text-[#111111] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00AEEF] text-[20px]">photo_library</span>
                Exemples de réalisations récentes à notre atelier de Sfax
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="aspect-video bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-[36px] text-[#00AEEF]">hotel</span>
                  </div>
                  <h5 className="font-bold text-xs text-[#111111]">Porte-clés Hôtel & Airbnb</h5>
                  <p className="text-[11px] text-[#666666]">Plexiglas transparent 4mm avec numéros gravés et logo thermo-laqué.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="aspect-video bg-gradient-to-tr from-amber-100 to-yellow-200 rounded-lg flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-[36px] text-amber-700">stars</span>
                  </div>
                  <h5 className="font-bold text-xs text-[#111111]">Plexi Miroir Or & Argent</h5>
                  <p className="text-[11px] text-[#666666]">Reflet miroir haut de gamme avec découpe à la forme du logo.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="aspect-video bg-gradient-to-tr from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-[36px] text-purple-700">music_note</span>
                  </div>
                  <h5 className="font-bold text-xs text-[#111111]">Goodies Événements & Codes</h5>
                  <p className="text-[11px] text-[#666666]">Codes Spotify, QR codes d'accès Wi-Fi et prénoms personnalisés.</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: CUSTOMIZER CONTROLS & ORDERING */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-[#E5E5E5] shadow-sm space-y-5">
              
              {/* 1. Shape Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                  1. Forme du Porte-clés
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hotel', label: 'Losange Hôtel', icon: 'diamond' },
                    { id: 'rectangle-arrondi', label: 'Rectangle', icon: 'crop_landscape' },
                    { id: 'rond', label: 'Rond Ø50mm', icon: 'circle' },
                    { id: 'coeur', label: 'Cœur romantique', icon: 'favorite' },
                    { id: 'hexagone', label: 'Hexagone', icon: 'hexagon' },
                    { id: 'decoupe-libre', label: 'Forme du logo', icon: 'interests' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setShape(s.id as KeychainShape)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                        shape === s.id
                          ? 'border-[#00AEEF] bg-[#F5F5F5] text-[#00AEEF] shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-[#333333]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                      <span className="text-[11px] text-center">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Acrylic Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                  2. Type de Plexiglas (Acrylique Coulé)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'transparent', label: 'Transparent Cristal', desc: '100% limpide, effet verre' },
                    { id: 'miroir-or', label: 'Miroir Or Deluxe', desc: 'Reflet doré précieux' },
                    { id: 'miroir-argent', label: 'Miroir Argent', desc: 'Effet chromé étincelant' },
                    { id: 'noir-opaque', label: 'Noir Piano Brillant', desc: 'Opaque sobre & chic' },
                    { id: 'depoli-givre', label: 'Dépoli Givré / Sablé', desc: 'Mat velouté moderne' },
                    { id: 'glitter-or', label: 'Pailleté Or Glitter', desc: 'Micro-paillettes en fusion' },
                  ].map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setAcrylicType(mat.id as AcrylicType)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        acrylicType === mat.id
                          ? 'border-[#00AEEF] bg-[#F5F5F5] text-[#00AEEF] shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-[#333333]'
                      }`}
                    >
                      <span className="text-xs font-bold block">{mat.label}</span>
                      <span className="text-[10px] text-[#666666]">{mat.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Thickness & Technique */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                    Épaisseur
                  </label>
                  <div className="flex gap-1.5">
                    {(['3mm', '4mm', '5mm'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setThickness(t)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                          thickness === t
                            ? 'bg-[#00AEEF] text-white border-[#00AEEF]'
                            : 'bg-slate-50 border-slate-200 text-[#333333] hover:bg-slate-100'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                    Type d'attache
                  </label>
                  <select
                    value={attache}
                    onChange={(e) => setAttache(e.target.value as KeychainAttache)}
                    className="w-full py-2 px-2.5 text-xs font-bold rounded-lg border border-slate-200 bg-white focus:border-[#00AEEF] outline-none"
                  >
                    <option value="mousqueton-or">Mousqueton Doré Deluxe</option>
                    <option value="anneau-argent">Anneau Inox Argenté</option>
                    <option value="anneau-noir">Anneau Plat Noir Mat</option>
                    <option value="chainette-billes">Chaînette à billes</option>
                  </select>
                </div>
              </div>

              {/* 4. Marking Technique */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                  3. Technique de Personnalisation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'uv-quadri', label: 'UV Quadri HD', sub: 'Couleurs vives' },
                    { id: 'gravure-laser', label: 'Gravure Laser', sub: 'Inaltérable creusé' },
                    { id: 'mixte-uv-gravure', label: 'UV + Gravure', sub: 'Finition prestige' },
                  ].map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => setTechnique(tech.id as KeychainTechnique)}
                      className={`p-2 rounded-xl text-center border transition-all ${
                        technique === tech.id
                          ? 'border-[#00AEEF] bg-[#F5F5F5] text-[#00AEEF]'
                          : 'border-slate-200 text-[#333333]'
                      }`}
                    >
                      <span className="block text-xs font-bold">{tech.label}</span>
                      <span className="text-[10px] text-[#666666]">{tech.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Custom Text Fields */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                  4. Textes & Personnalisation Gravée
                </span>
                
                <div>
                  <label className="block text-[11px] font-semibold text-[#333333] mb-1">
                    Ligne principale (Nom, Hôtel, Marque) :
                  </label>
                  <input
                    type="text"
                    value={mainTitle}
                    onChange={(e) => setMainTitle(e.target.value)}
                    placeholder="Ex: HÔTEL LE PALACE"
                    className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:border-[#00AEEF] outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#333333] mb-1">
                    Sous-titre (N° chambre, slogan, ville) :
                  </label>
                  <input
                    type="text"
                    value={subText}
                    onChange={(e) => setSubText(e.target.value)}
                    placeholder="Ex: Suite 101 • Sfax"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-[#00AEEF] outline-none bg-white"
                  />
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#111111]">
                    <input
                      type="checkbox"
                      checked={spotifyCode}
                      onChange={(e) => setSpotifyCode(e.target.checked)}
                      className="rounded text-[#00AEEF] focus:ring-[#00AEEF]"
                    />
                    <span>Ajouter un Spotify Code audio scannable</span>
                  </label>
                </div>

                {spotifyCode && (
                  <div>
                    <input
                      type="text"
                      value={spotifySong}
                      onChange={(e) => setSpotifySong(e.target.value)}
                      placeholder="Artiste — Titre de la musique"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                )}
              </div>

              {/* 6. Quantity tiers */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                  5. Quantité souhaitée (Tarifs Dégressifs)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 10, 20, 50, 100].map((q) => (
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
                      <span className="text-[10px] opacity-80">
                        {getUnitPrice(q, thickness, technique, acrylicType)} DT/u
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price summary & CTA */}
              <div className="p-4 bg-[#F5F5F5] rounded-2xl border border-[#E6F8FF] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#666666] block">Total TTC pour {quantity} porte-clés :</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-[#00AEEF]">{totalPrice} DT</span>
                    <span className="text-xs font-bold text-[#333333]">({unitPrice} DT / ex)</span>
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
                  <span>Vos porte-clés plexiglas ont été ajoutés au panier !</span>
                </div>
              )}

              {/* Fast Sfax Workshop Guarantee */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#666666]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-emerald-600">bolt</span>
                  Production express en 24h/48h
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
