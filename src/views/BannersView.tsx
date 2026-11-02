import React, { useState } from 'react';
import { CartItem, ViewType } from '../types';

interface BannersViewProps {
  onAddToCart: (item: CartItem) => void;
  onNavigate: (view: ViewType) => void;
}

export const BannersView: React.FC<BannersViewProps> = ({ onAddToCart, onNavigate }) => {
  const [substrate, setSubstrate] = useState<'frontlit-510' | 'mesh-300' | 'blockout-650'>('frontlit-510');
  const [widthM, setWidthM] = useState<number>(3.0);
  const [heightM, setHeightM] = useState<number>(1.5);
  const [hemming, setHemming] = useState<'renforce' | 'brut'>('renforce');
  const [eyelets, setEyelets] = useState<'50cm' | '100cm' | 'corners' | 'none'>('50cm');
  const [accessories, setAccessories] = useState<'none' | 'sandows-10' | 'sandows-20'>('none');
  const [turnaround, setTurnaround] = useState<'standard' | 'express'>('standard');
  const [includePAO, setIncludePAO] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [addedNotice, setAddedNotice] = useState(false);

  // Surface calculation in m²
  const areaM2 = Number((widthM * heightM).toFixed(2));

  // Substrate pricing per m²
  const substratePrices = {
    'frontlit-510': { price: 18, name: 'Bâche PVC Frontlit 510g', desc: 'Bâche pleine universelle haute densité' },
    'mesh-300': { price: 21, name: 'Bâche Micro-perforée Mesh 300g', desc: 'Laisse passer le vent, idéal échafaudage' },
    'blockout-650': { price: 26, name: 'Bâche Blockout Opaque 650g', desc: 'Âme noire 100% occultante, zéro transparence' },
  };

  const calculatePrice = () => {
    let basePricePerM2 = substratePrices[substrate].price;
    let cost = areaM2 * basePricePerM2;

    // Minimum order price for grand format
    cost = Math.max(25, cost);

    // Hemming & Eyelets
    if (hemming === 'renforce') cost += areaM2 * 2;
    if (eyelets === '50cm') cost += 12;
    else if (eyelets === '100cm') cost += 8;
    else if (eyelets === 'corners') cost += 4;

    // Accessories
    if (accessories === 'sandows-10') cost += 18;
    if (accessories === 'sandows-20') cost += 32;

    // Turnaround
    if (turnaround === 'express') cost += 20;

    // Studio PAO
    if (includePAO) cost += 35;

    return Math.round(cost);
  };

  const totalPrice = calculatePrice();
  const pricePerM2 = (totalPrice / Math.max(1, areaM2)).toFixed(2);

  const handleAddToCart = () => {
    const specs = `${substratePrices[substrate].name} | Dimensions: ${widthM} × ${heightM} m (${areaM2} m²) | Ourlet: ${
      hemming === 'renforce' ? 'Ourlet thermo-soudé haute résistance' : 'Coupe brute sans ourlet'
    } | Œillets: ${
      eyelets === '50cm' ? 'Œillets tous les 50 cm' : eyelets === '100cm' ? 'Œillets tous les 100 cm' : eyelets === 'corners' ? 'Aux 4 coins' : 'Sans œillets'
    }${accessories !== 'none' ? ` | Accessoires: ${accessories === 'sandows-10' ? '10 Tendeurs Sandows' : '20 Tendeurs Sandows'}` : ''}${
      turnaround === 'express' ? ' | Production Express 24h' : ''
    }`;

    onAddToCart({
      id: `banner-${Date.now()}`,
      productId: 'banners-pvc-510g',
      title: 'Bâche Publicitaire Haute Résistance',
      specs: specs,
      quantity: `1 pièce (${areaM2} m²)`,
      unitPrice: totalPrice,
      totalPrice: totalPrice,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO7mlucXIzJOABIXRuxqYP8-DiDZRKQIKxyWX5SLorylXmTKz2bwcIHwnaTmtwnrgXe6o-NMXcBJpJog-tSxrVTjY3aS3l4ROc1ct2rPgKtYjmw2ZfimXjVV4SkxIXKFnQOz6GIYYpfLsH_wm95TK6GINSBpL-33oZWZpavQo46QzVyf7bdEeTKa2IA4N6QLdK3ngQ70LUYOba5EVsO40kC-7jDA5naJeBJCTok1SVpHeBKSgq1ppzpQ'
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
          <button onClick={() => onNavigate('catalog')} className="hover:text-[#00AEEF]">Grand Format & Enseignes</button>
          <span>/</span>
          <span className="text-[#111111] font-bold">Bâches renforcées œillets PVC 510g</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Banner Visual & Technical Rendering */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                  Aperçu Technique du Banderolage ({widthM} m × {heightM} m)
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  Surface totale : {areaM2} m²
                </span>
              </div>

              {/* Graphic Banner Simulation */}
              <div className="relative aspect-[16/10] bg-gradient-to-b from-sky-100 via-slate-100 to-slate-200 rounded-2xl p-6 flex items-center justify-center overflow-hidden border border-[#E5E5E5]">
                {/* Wall or structure backdrop */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00AEEF_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* Banner Representation */}
                <div 
                  className={`relative bg-gradient-to-r from-[#00AEEF] to-[#EC008C] text-white shadow-2xl flex flex-col items-center justify-between p-6 transition-all duration-300 border-4 ${
                    hemming === 'renforce' ? 'border-[#008CC4]' : 'border-transparent'
                  }`}
                  style={{
                    width: `${Math.min(380, Math.max(220, (widthM / Math.max(widthM, heightM)) * 340))}px`,
                    height: `${Math.min(240, Math.max(140, (heightM / Math.max(widthM, heightM)) * 220))}px`,
                  }}
                >
                  {/* Eyelets simulation on corners and edges */}
                  {eyelets !== 'none' && (
                    <>
                      <div className="absolute top-2 left-2 w-3.5 h-3.5 rounded-full bg-slate-200 border-2 border-slate-600 shadow-inner"></div>
                      <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-slate-200 border-2 border-slate-600 shadow-inner"></div>
                      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 rounded-full bg-slate-200 border-2 border-slate-600 shadow-inner"></div>
                      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full bg-slate-200 border-2 border-slate-600 shadow-inner"></div>
                      
                      {eyelets === '50cm' && (
                        <>
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-slate-200 border-2 border-slate-600 shadow-inner"></div>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-slate-200 border-2 border-slate-600 shadow-inner"></div>
                        </>
                      )}
                    </>
                  )}

                  {/* Mesh micro-perforated texture if selected */}
                  {substrate === 'mesh-300' && (
                    <div className="absolute inset-0 bg-[radial-gradient(black_1px,transparent_1px)] [background-size:4px_4px] opacity-25 pointer-events-none"></div>
                  )}

                  <div className="w-full flex items-center justify-between text-[10px] tracking-wider uppercase opacity-80">
                    <span>★ GS Imprim Grand Format</span>
                    <span>Tunisie</span>
                  </div>

                  <div className="text-center z-10 my-auto">
                    <h3 className="text-base sm:text-xl font-black uppercase tracking-tight">
                      GRANDE OUVERTURE SHOWROOM
                    </h3>
                    <p className="text-[11px] sm:text-xs opacity-90 mt-0.5">
                      Les Berges du Lac 2 • Impression Haute Précision UV
                    </p>
                  </div>

                  <div className="w-full flex items-center justify-between text-[10px] opacity-80 border-t border-white/20 pt-1">
                    <span>Format {widthM} m × {heightM} m</span>
                    <span>Toile {substratePrices[substrate].name}</span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Strip */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="p-3 bg-[#F5F5F5] rounded-xl">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">shield</span>
                  <span className="text-[11px] font-bold text-[#111111] block">Anti-Déchirure</span>
                  <span className="text-[10px] text-[#666666]">Trame polyester blindée</span>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-xl">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">wb_sunny</span>
                  <span className="text-[11px] font-bold text-[#111111] block">Encres UV 3 Ans</span>
                  <span className="text-[10px] text-[#666666]">Haute résistance solaire</span>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-xl">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">iron</span>
                  <span className="text-[11px] font-bold text-[#111111] block">Thermo-Soudé</span>
                  <span className="text-[10px] text-[#666666]">Ourlet sans colle</span>
                </div>
              </div>
            </div>

            {/* Installation & Wind Guidelines */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
              <h4 className="font-bold text-sm text-[#111111] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00AEEF] text-[20px]">construction</span>
                Conseils de Pose & Fixation Banderole
              </h4>
              <p className="text-xs text-[#333333] leading-relaxed mb-3">
                Pour une tenue maximale en extérieur sous les vents côtiers de Tunisie, nous recommandons de tendre la bâche avec des sandows élastiques plutôt que des colliers rilsan rigides :
              </p>
              <div className="space-y-2 text-xs text-[#333333]">
                <div className="p-2.5 rounded-lg bg-slate-50 flex items-start gap-2">
                  <span className="text-[#00AEEF] font-bold">1.</span>
                  <span><strong>Prise au vent :</strong> Pour les surfaces supérieures à 8 m² ou sur clôture grillagée / échafaudage, choisissez impérativement la <em>toile micro-perforée Mesh 300g</em>.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 flex items-start gap-2">
                  <span className="text-[#00AEEF] font-bold">2.</span>
                  <span><strong>Espacement des œillets :</strong> L'intervalle de 50 cm assure une tension homogène et prévient tout pli disgracieux.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Configurator */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E5E5] shadow-sm space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E6F8FF] text-[#00AEEF] text-xs font-bold uppercase tracking-wider">
                    Grand Format & Événements
                  </span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Garantie Extérieure 36 Mois
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  Bâches renforcées œillets PVC 510g
                </h1>
                <p className="text-xs sm:text-sm text-[#333333] mt-1.5 leading-relaxed">
                  L'incontournable de la publicité extérieure en Tunisie : banderoles événementielles, façades de chantier, enseignes temporaires et salons.
                </p>
              </div>

              {/* Step 1: Substrate type */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  1. Choix de la Toile
                </label>
                <div className="space-y-2">
                  {Object.entries(substratePrices).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setSubstrate(key as any)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        substrate === key
                          ? 'border-[#00AEEF] bg-[#E6F8FF]/30 ring-1 ring-[#00AEEF]'
                          : 'border-[#E5E5E5] hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-[#111111] block">{item.name}</span>
                        <span className="text-[11px] text-[#666666]">{item.desc}</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#00AEEF]">{item.price} DT / m²</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Custom dimensions */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  2. Dimensions en Mètres (Surface calculée : {areaM2} m²)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#666666] mb-1">Largeur (mètres)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="30"
                      value={widthM}
                      onChange={(e) => setWidthM(Math.max(0.5, Number(e.target.value)))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#666666] mb-1">Hauteur (mètres)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="5"
                      value={heightM}
                      onChange={(e) => setHeightM(Math.max(0.5, Number(e.target.value)))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[11px] text-[#666666] mr-1">Tailles standard :</span>
                  {[
                    { w: 2.0, h: 1.0 },
                    { w: 3.0, h: 1.0 },
                    { w: 3.0, h: 1.5 },
                    { w: 4.0, h: 2.0 },
                    { w: 6.0, h: 2.5 },
                  ].map((preset) => (
                    <button
                      key={`${preset.w}x${preset.h}`}
                      onClick={() => { setWidthM(preset.w); setHeightM(preset.h); }}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-[#E6F8FF] text-[10px] font-bold text-[#111111]"
                    >
                      {preset.w} × {preset.h} m
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Hemming & Eyelets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                    3. Façonnage Ourlet
                  </label>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setHemming('renforce')}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                        hemming === 'renforce' ? 'border-[#00AEEF] bg-[#E6F8FF]/30 font-bold text-[#00AEEF]' : 'border-[#E5E5E5] text-[#333333]'
                      }`}
                    >
                      <span className="block font-bold">Ourlet Renforcé (+2 DT/m²)</span>
                      <span className="text-[10px] text-[#666666]">Thermo-soudé haute solidité</span>
                    </button>
                    <button
                      onClick={() => setHemming('brut')}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                        hemming === 'brut' ? 'border-[#00AEEF] bg-[#E6F8FF]/30 font-bold text-[#00AEEF]' : 'border-[#E5E5E5] text-[#333333]'
                      }`}
                    >
                      <span className="block font-bold">Coupe Brute</span>
                      <span className="text-[10px] text-[#666666]">Sans ourlet de pourtour</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                    4. Disposition des Œillets
                  </label>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setEyelets('50cm')}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                        eyelets === '50cm' ? 'border-[#00AEEF] bg-[#E6F8FF]/30 font-bold text-[#00AEEF]' : 'border-[#E5E5E5] text-[#333333]'
                      }`}
                    >
                      <span className="block font-bold">Tous les 50 cm</span>
                      <span className="text-[10px] text-[#666666]">Recommandé extérieur</span>
                    </button>
                    <button
                      onClick={() => setEyelets('100cm')}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                        eyelets === '100cm' ? 'border-[#00AEEF] bg-[#E6F8FF]/30 font-bold text-[#00AEEF]' : 'border-[#E5E5E5] text-[#333333]'
                      }`}
                    >
                      <span className="block font-bold">Tous les 100 cm</span>
                      <span className="text-[10px] text-[#666666]">Pour intérieur / modéré</span>
                    </button>
                    <button
                      onClick={() => setEyelets('corners')}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                        eyelets === 'corners' ? 'border-[#00AEEF] bg-[#E6F8FF]/30 font-bold text-[#00AEEF]' : 'border-[#E5E5E5] text-[#333333]'
                      }`}
                    >
                      <span className="block font-bold">Aux 4 angles seuls</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 5: Tendeurs & Accessoires */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  5. Accessoires de Tension
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'none', label: 'Sans Sandows', price: '0 DT' },
                    { id: 'sandows-10', label: 'Pack 10 Sandows', price: '+18 DT' },
                    { id: 'sandows-20', label: 'Pack 20 Sandows', price: '+32 DT' },
                  ].map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => setAccessories(acc.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        accessories === acc.id
                          ? 'border-[#00AEEF] bg-[#E6F8FF]/30 font-bold text-[#00AEEF]'
                          : 'border-[#E5E5E5] text-[#333333] hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-xs font-bold">{acc.label}</p>
                      <p className="text-[10px] text-[#666666]">{acc.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 6: Turnaround & PAO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-[#111111] block mb-1">Délai Atelier</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTurnaround('standard')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                        turnaround === 'standard' ? 'bg-[#00AEEF] text-white' : 'bg-white border text-[#333333]'
                      }`}
                    >
                      Standard 48h
                    </button>
                    <button
                      onClick={() => setTurnaround('express')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                        turnaround === 'express' ? 'bg-[#00AEEF] text-white' : 'bg-white border text-[#333333]'
                      }`}
                    >
                      Express 24h (+20 DT)
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#00AEEF] block">Studio Graphique (+35 DT)</span>
                    <span className="text-[10px] text-[#333333]">Création visuelle par notre équipe PAO</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includePAO}
                    onChange={(e) => setIncludePAO(e.target.checked)}
                    className="h-4 w-4 rounded text-[#00AEEF]"
                  />
                </div>
              </div>

              {/* Upload Dropzone */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  7. Déposez votre maquette HD (Échelle 1:10 à 300 DPI ou 1:1 à 100 DPI)
                </label>
                <div className="border-2 border-dashed border-[#c6c5d8] hover:border-[#00AEEF] rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50">
                  <input
                    type="file"
                    accept=".pdf,.tif,.tiff,.jpg,.png"
                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="file-upload-banner"
                  />
                  <label htmlFor="file-upload-banner" className="cursor-pointer block">
                    <span className="material-symbols-outlined text-[28px] text-[#00AEEF] block mb-1">
                      cloud_upload
                    </span>
                    {uploadedFile ? (
                      <p className="text-xs font-bold text-emerald-700">
                        {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} Mo)
                      </p>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-[#111111]">Cliquez ou glissez votre fichier d'impression</p>
                        <p className="text-[11px] text-[#666666] mt-0.5">PDF ou TIFF CMJN aplati avec repères d'œillets</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#00AEEF]">{totalPrice} DT</span>
                    <span className="text-xs font-semibold text-[#666666]">HT ({pricePerM2} DT / m²)</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Encres grand format certifiées résistant intempéries
                  </p>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#00AEEF] hover:bg-[#008CC4] text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  Commander ma bâche
                </button>
              </div>

              {addedNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between animate-in fade-in duration-200">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">done_all</span>
                    <strong>Bâche de {areaM2} m² ajoutée à votre panier !</strong>
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
