import React, { useState } from 'react';
import { CartItem, ViewType } from '../types';

interface StickersViewProps {
  onAddToCart: (item: CartItem) => void;
  onNavigate: (view: ViewType) => void;
}

export const StickersView: React.FC<StickersViewProps> = ({ onAddToCart, onNavigate }) => {
  const [cutType, setCutType] = useState<'die-cut' | 'kiss-cut' | 'sheet' | 'roll'>('die-cut');
  const [material, setMaterial] = useState<'gloss-white' | 'matte-white' | 'transparent' | 'holographic' | 'kraft'>('gloss-white');
  const [lamination, setLamination] = useState<'none' | 'uv-gloss' | 'matte-soft'>('uv-gloss');
  const [widthCm, setWidthCm] = useState<number>(6);
  const [heightCm, setHeightCm] = useState<number>(6);
  const [quantity, setQuantity] = useState<number>(100);
  const [hasWhiteInk, setHasWhiteInk] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [addedNotice, setAddedNotice] = useState(false);

  // Surface calculation
  const areaCm2 = widthCm * heightCm;

  // Price computation in DT
  const calculatePrice = () => {
    // Base cost per unit depending on area and material
    let unitBase = 0.18; // 0.18 DT for standard 5x5 cm

    // Area scaling factor
    const areaFactor = Math.sqrt(areaCm2 / 25);
    unitBase *= areaFactor;

    if (material === 'transparent') unitBase += 0.05;
    if (material === 'holographic') unitBase += 0.12;
    if (material === 'kraft') unitBase += 0.04;

    if (lamination === 'uv-gloss') unitBase += 0.03;
    if (lamination === 'matte-soft') unitBase += 0.06;

    if (material === 'transparent' && hasWhiteInk) unitBase += 0.05;

    if (cutType === 'die-cut') unitBase += 0.02;
    if (cutType === 'roll') unitBase += 0.04;

    // Quantity discounts
    let discount = 1;
    if (quantity === 50) discount = 1.2;
    else if (quantity === 100) discount = 1.0;
    else if (quantity === 250) discount = 0.85;
    else if (quantity === 500) discount = 0.72;
    else if (quantity === 1000) discount = 0.58;
    else if (quantity === 2500) discount = 0.45;

    const total = Math.max(18, Math.round(unitBase * quantity * discount));
    return total;
  };

  const totalPrice = calculatePrice();
  const unitPrice = (totalPrice / quantity).toFixed(3);

  const handleAddToCart = () => {
    const specs = `Découpe: ${
      cutType === 'die-cut' ? 'Découpe Pleine Unitaire (Die-Cut)' : cutType === 'kiss-cut' ? 'Découpe Mi-Chair (Kiss-Cut)' : cutType === 'sheet' ? 'En Planche A4' : 'En Rouleau Distributeur'
    } | Support: ${
      material === 'gloss-white' ? 'Vinyle Blanc Brillant HD' : material === 'matte-white' ? 'Vinyle Blanc Mat Velouté' : material === 'transparent' ? `Vinyle Transparent ${hasWhiteInk ? '+ Blanc de soutien' : ''}` : material === 'holographic' ? 'Vinyle Holographique Prisme' : 'Papier Kraft Adhésif'
    } | Format: ${widthCm} × ${heightCm} cm (${areaCm2} cm²) | Plastification: ${
      lamination === 'uv-gloss' ? 'Pelliculage Anti-UV Brillant' : lamination === 'matte-soft' ? 'Pelliculage Mat Anti-Rayure' : 'Sans Plastification'
    }`;

    onAddToCart({
      id: `stk-${Date.now()}`,
      productId: 'stickers-diecut',
      title: 'Stickers & Étiquettes Vinyle Découpées',
      specs: specs,
      quantity: `${quantity} ex`,
      unitPrice: Number(unitPrice),
      totalPrice: totalPrice,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtYQbeLYWspdKFfux36ZuzA2AUXfY8Dvxg4byIdBXMZckPOzaDSHGJ5EVJafBCJUluPo8W71_E6JSvO9rxuaoa19KSd0IKaDcYz2HdoeZkEnubx71MbOvqy4UWPjJ7wyaGCAo6YAWKflMKyGyqog0CcK1MG3g67o9ZEG9ukPDWd_tzXGgk-VTAnbBxRMla6xtdXcR9xbmDU1F-Apn0rE5LnMLazRfIwWjazZ3V1m6OiwEaXhlEQ2a9_A'
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
          <button onClick={() => onNavigate('catalog')} className="hover:text-[#00AEEF]">Adhésifs & Vinyles</button>
          <span>/</span>
          <span className="text-[#111111] font-bold">Stickers & Étiquettes Vinyle Découpées</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Simulator & Technical Previews */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                  Simulation en Temps Réel ({widthCm} × {heightCm} cm)
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                  100% Étanche & Anti-UV
                </span>
              </div>

              {/* Interactive Sticker Preview Viewport */}
              <div className="relative aspect-[16/11] bg-gradient-to-tr from-slate-100 via-slate-200 to-indigo-100/40 rounded-2xl p-8 flex items-center justify-center overflow-hidden border border-[#E5E5E5]">
                
                {/* Visual Sticker Graphic */}
                <div 
                  className={`relative transition-all duration-300 shadow-xl flex items-center justify-center p-6 text-center select-none ${
                    cutType === 'die-cut' ? 'rounded-3xl' : 'rounded-lg'
                  } ${
                    material === 'holographic' 
                      ? 'bg-gradient-to-tr from-pink-300 via-indigo-300 to-emerald-300 text-slate-900 animate-pulse' 
                      : material === 'transparent'
                      ? 'bg-white/40 backdrop-blur-md text-slate-900 border border-white/60'
                      : material === 'kraft'
                      ? 'bg-[#d8bc98] text-[#332211]'
                      : material === 'matte-white'
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'bg-white text-slate-900 shadow-lg'
                  }`}
                  style={{
                    width: `${Math.min(260, Math.max(140, widthCm * 26))}px`,
                    height: `${Math.min(260, Math.max(140, heightCm * 26))}px`,
                  }}
                >
                  {/* Glossy reflection sweep */}
                  {lamination === 'uv-gloss' && (
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none rounded-inherit"></div>
                  )}

                  {/* Cut line visual guide */}
                  <div className="absolute inset-1 border-2 border-dashed border-red-500/40 pointer-events-none rounded-inherit"></div>

                  <div className="z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#00AEEF] text-white flex items-center justify-center font-bold text-lg mb-2 shadow-sm">
                      <span className="material-symbols-outlined text-[24px]">coffee</span>
                    </div>
                    <span className="font-extrabold text-sm sm:text-base tracking-tight leading-tight">
                      Café Artisan Tunis
                    </span>
                    <span className="text-[10px] font-semibold text-[#00AEEF] mt-0.5 uppercase tracking-wider">
                      Torréfaction Locale
                    </span>
                    <span className="text-[9px] text-[#666666] mt-1">
                      {material === 'holographic' ? 'Effet Holographique' : '100% Waterproof'}
                    </span>
                  </div>

                  {/* Die-cut peelable tab visual indicator */}
                  {cutType === 'die-cut' && (
                    <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded shadow-xs">
                      Pelage Facile
                    </div>
                  )}
                </div>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="p-3 bg-[#F5F5F5] rounded-xl">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">water_drop</span>
                  <span className="text-[11px] font-bold text-[#111111] block">Résiste à l'Eau</span>
                  <span className="text-[10px] text-[#666666]">Lavage & immersion</span>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-xl">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">wb_sunny</span>
                  <span className="text-[11px] font-bold text-[#111111] block">Protection UV</span>
                  <span className="text-[10px] text-[#666666]">Couleurs vives 3 ans</span>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-xl">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">content_cut</span>
                  <span className="text-[11px] font-bold text-[#111111] block">Découpe Laser</span>
                  <span className="text-[10px] text-[#666666]">Toutes formes libres</span>
                </div>
              </div>
            </div>

            {/* Applications & Surfaces compatibility */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
              <h4 className="font-bold text-sm text-[#111111] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00AEEF] text-[20px]">verified</span>
                Supports et Usages Compatibles
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#333333]">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">check</span>
                  <span>Flacons verre & bocaux alimentaires</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">check</span>
                  <span>Gobelets café & emballages carton</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">check</span>
                  <span>Coques téléphones & ordinateurs</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">check</span>
                  <span>Carrosserie auto & vitrines extérieures</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 6-step Configurator */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E5E5] shadow-sm space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E6F8FF] text-[#00AEEF] text-xs font-bold uppercase tracking-wider">
                    Adhésifs & Packaging
                  </span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    ★ 5.0/5 (210 avis vérifiés)
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  Stickers & Étiquettes Vinyle Découpées
                </h1>
                <p className="text-xs sm:text-sm text-[#333333] mt-1.5 leading-relaxed">
                  Autocollants en vinyle polymère haute adhérence avec découpe vectorielle à la forme exacte de votre logo ou illustration.
                </p>
              </div>

              {/* Step 1: Mode de découpe */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  1. Mode de Présentation & Découpe
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'die-cut', title: 'Découpe Pleine (Die-Cut)', desc: 'Unitaire découpé à la forme exacte du sticker' },
                    { id: 'kiss-cut', title: 'Mi-Chair (Kiss-Cut)', desc: 'Autocollant pelable sur carré protecteur' },
                    { id: 'sheet', title: 'En Planche A4', desc: 'Multiples stickers regroupés sur feuille' },
                    { id: 'roll', title: 'En Rouleau Bobine', desc: 'Pour étiqueteuse automatique ou manuelle' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCutType(c.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        cutType === c.id
                          ? 'border-[#00AEEF] bg-[#E6F8FF]/30 ring-1 ring-[#00AEEF]'
                          : 'border-[#E5E5E5] hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-xs font-bold text-[#111111]">{c.title}</p>
                      <p className="text-[11px] text-[#333333] mt-0.5">{c.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Matière Vinyle */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  2. Matière Vinyle
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'gloss-white', label: 'Vinyle Blanc Brillant HD', tag: 'Standard Pro' },
                    { id: 'matte-white', label: 'Vinyle Blanc Mat Velouté', tag: 'Anti-Reflet' },
                    { id: 'transparent', label: 'Vinyle Transparent Cristal', tag: 'Design Épuré' },
                    { id: 'holographic', label: 'Vinyle Holographique Arc-en-ciel', tag: 'Effet Prisme' },
                    { id: 'kraft', label: 'Papier Kraft Adhésif Naturel', tag: 'Écoresponsable' },
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
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#111111]">{m.label}</span>
                      </div>
                      <span className="text-[10px] text-[#666666]">{m.tag}</span>
                    </button>
                  ))}
                </div>

                {material === 'transparent' && (
                  <div className="mt-2 p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#00AEEF] block">Blanc de soutien sélectif (+5 DT)</span>
                      <span className="text-[11px] text-[#333333]">Permet de garder vos couleurs opaques et éclatantes sur fond transparent.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasWhiteInk}
                      onChange={(e) => setHasWhiteInk(e.target.checked)}
                      className="h-4 w-4 rounded text-[#00AEEF]"
                    />
                  </div>
                )}
              </div>

              {/* Step 3: Dimensions sur mesure */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  3. Dimensions du sticker (cm) — Surface : {areaCm2} cm²
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#666666] mb-1">Largeur (cm)</label>
                    <input
                      type="number"
                      min={2}
                      max={50}
                      value={widthCm}
                      onChange={(e) => setWidthCm(Math.max(2, Number(e.target.value)))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#666666] mb-1">Hauteur (cm)</label>
                    <input
                      type="number"
                      min={2}
                      max={50}
                      value={heightCm}
                      onChange={(e) => setHeightCm(Math.max(2, Number(e.target.value)))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] font-bold outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[11px] text-[#666666] mr-1">Formats classiques :</span>
                  {[{w: 4, h: 4}, {w: 6, h: 6}, {w: 8, h: 8}, {w: 10, h: 5}].map((preset) => (
                    <button
                      key={`${preset.w}x${preset.h}`}
                      onClick={() => { setWidthCm(preset.w); setHeightCm(preset.h); }}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-[#E6F8FF] text-[10px] font-bold text-[#111111]"
                    >
                      {preset.w} × {preset.h} cm
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Pelliculage / Lamination */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  4. Plastification de Protection
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'uv-gloss', name: 'Anti-UV Brillant', desc: 'Couleurs éclatantes' },
                    { id: 'matte-soft', name: 'Mat Velouté', desc: 'Sans reflet, élégant' },
                    { id: 'none', name: 'Brut Sans Film', desc: 'Usage éphémère' },
                  ].map((lam) => (
                    <button
                      key={lam.id}
                      onClick={() => setLamination(lam.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        lamination === lam.id
                          ? 'border-[#00AEEF] bg-[#E6F8FF]/30 ring-1 ring-[#00AEEF]'
                          : 'border-[#E5E5E5] hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-xs font-bold text-[#111111]">{lam.name}</p>
                      <p className="text-[10px] text-[#666666]">{lam.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Quantités dégressives */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  5. Quantité (Prix dégressif en volume)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[50, 100, 250, 500, 1000, 2500].map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setQuantity(qty)}
                      className={`py-3 px-1 rounded-xl border text-center transition-all ${
                        quantity === qty
                          ? 'border-[#00AEEF] bg-[#00AEEF] text-white shadow-xs'
                          : 'border-[#E5E5E5] hover:bg-slate-50 text-[#111111]'
                      }`}
                    >
                      <span className="text-sm font-extrabold block">{qty}</span>
                      <span className="text-[9px] opacity-80">stickers</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 6: Upload Logo File */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  6. Téléverser votre visuel avec tracé de découpe
                </label>
                <div className="border-2 border-dashed border-[#c6c5d8] hover:border-[#00AEEF] rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50">
                  <input
                    type="file"
                    accept=".pdf,.ai,.svg,.eps,.png,.jpg"
                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="file-upload-stk"
                  />
                  <label htmlFor="file-upload-stk" className="cursor-pointer block">
                    <span className="material-symbols-outlined text-[28px] text-[#00AEEF] block mb-1">
                      cloud_upload
                    </span>
                    {uploadedFile ? (
                      <p className="text-xs font-bold text-emerald-700">
                        {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} Mo)
                      </p>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-[#111111]">Cliquez ou glissez votre fichier vectoriel</p>
                        <p className="text-[11px] text-[#666666] mt-0.5">
                          SVG, AI, PDF ou PNG haute résolution (300 DPI)
                        </p>
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
                    <span className="text-xs font-semibold text-[#666666]">HT ({unitPrice} DT / sticker)</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    Découpe vectorielle sans frais de cliché
                  </p>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#00AEEF] hover:bg-[#008CC4] text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  Ajouter au panier
                </button>
              </div>

              {addedNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between animate-in fade-in duration-200">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">done_all</span>
                    <strong>{quantity} stickers vinyle ajoutés à votre panier !</strong>
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
