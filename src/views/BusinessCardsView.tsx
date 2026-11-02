import React, { useState } from 'react';
import { CartItem, ViewType } from '../types';

interface BusinessCardsViewProps {
  onAddToCart: (item: CartItem) => void;
  onNavigate: (view: ViewType) => void;
}

export const BusinessCardsView: React.FC<BusinessCardsViewProps> = ({ onAddToCart, onNavigate }) => {
  // Configurator state
  const [format, setFormat] = useState<'85x55' | '90x50' | '55x55' | 'custom'>('85x55');
  const [paper, setPaper] = useState<'couché-350' | 'couché-400' | 'rives' | 'kraft'>('couché-350');
  const [finishing, setFinishing] = useState<'plastifie' | 'non-plastifie'>('plastifie');
  const [printingSides, setPrintingSides] = useState<'recto-verso' | 'recto-seul'>('recto-verso');
  const [corners, setCorners] = useState<'droits' | 'arrondis'>('droits');
  const [quantity, setQuantity] = useState<number>(250);
  const [includePAODesign, setIncludePAODesign] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // 3D Preview tabs
  const [activePreviewTab, setActivePreviewTab] = useState<'recto' | 'verso'>('recto');
  const [addedNotice, setAddedNotice] = useState(false);

  // Price calculations
  const calculatePrice = () => {
    // Base unit price per 100 ex in Tunisian Dinars
    let base = 25; // 25 DT for 100 ex standard
    if (paper === 'couché-400') base += 5;
    if (paper === 'rives') base += 12;
    if (paper === 'kraft') base += 8;

    if (printingSides === 'recto-verso') base += 8;
    if (corners === 'arrondis') base += 5;

    // Quantity multiplier with volume discount
    let multiplier = 1;
    if (quantity === 100) multiplier = 1;
    else if (quantity === 250) multiplier = 1.9;
    else if (quantity === 500) multiplier = 3.2;
    else if (quantity === 1000) multiplier = 5.2;
    else if (quantity === 2000) multiplier = 8.8;

    let total = base * multiplier;
    if (includePAODesign) total += 25; // Studio PAO design addon

    return Math.round(total);
  };

  const totalPrice = calculatePrice();
  const unitPrice = (totalPrice / quantity).toFixed(3);

  const handleAddToCart = () => {
    const specsSummary = `Format: ${format.toUpperCase()} | Papier: ${
      paper === 'couché-350' ? 'Couché Mat 350g' : paper === 'couché-400' ? 'Couché Dense 400g' : paper === 'rives' ? 'Rives Vergé d’Art' : 'Kraft Naturel 300g'
    } | Plastification: ${finishing === 'plastifie' ? 'Plastifié' : 'Sans plastification'} | Impression: ${printingSides === 'recto-verso' ? 'Recto / Verso Quadri HD' : 'Recto Seul'} | Coins: ${corners === 'arrondis' ? '4 Coins Arrondis (R=5mm)' : 'Coins Droits Guillotine'}${
      includePAODesign ? ' | + Studio PAO Création Graphique' : ''
    }`;

    onAddToCart({
      id: `bc-${Date.now()}`,
      productId: 'business-cards-softtouch',
      title: 'Cartes de Visite Soft-Touch Luxe',
      specs: specsSummary,
      quantity: `${quantity} ex`,
      unitPrice: Number(unitPrice),
      totalPrice: totalPrice,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCQzwvuLStYeTQ-xczAs2sBC97PAnb3-ygcbt6QbJwsM1Z07xA3tONc10OMbeXSeT5NTGd4KPuLbzM1DOr8D_bYNsjhPDU7VytAEGsUb-WB66YxdHsNO3IYr5Tj3gYCQwUQ4CJXHcuUFeZLtRVTdU1O8PSX5nmO3wqMC6TlpDqf4fRsqD6SPsZz-FjtmEsFA8pOrV3F2u21XDsRQJXxRlHWAFCd82KuBy3jeYuyGbrH2UOiYN2snsyHw'
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
          <button onClick={() => onNavigate('catalog')} className="hover:text-[#00AEEF]">Papeterie de prestige</button>
          <span>/</span>
          <span className="text-[#111111] font-bold">Cartes de Visite Soft-Touch Luxe</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Preview Gallery & 3D Interactive Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-sm">
              
              {/* Preview Tabs */}
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                  Simulation Haute Fidélité
                </span>
                <div className="flex bg-[#F5F5F5] p-1 rounded-xl gap-1">
                  <button
                    onClick={() => setActivePreviewTab('recto')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      activePreviewTab === 'recto' ? 'bg-[#00AEEF] text-white shadow-xs' : 'text-[#333333] hover:text-[#111111]'
                    }`}
                  >
                    Recto Face
                  </button>
                  <button
                    onClick={() => setActivePreviewTab('verso')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      activePreviewTab === 'verso' ? 'bg-[#00AEEF] text-white shadow-xs' : 'text-[#333333] hover:text-[#111111]'
                    }`}
                  >
                    Verso
                  </button>
                </div>
              </div>

              {/* Card Canvas Simulation */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-8 flex items-center justify-center overflow-hidden shadow-inner">
                {/* Background ambient lighting */}
                <div className="absolute w-72 h-72 bg-[#008CC4]/20 rounded-full blur-3xl pointer-events-none"></div>

                {/* Interactive Business Card Representation */}
                  <div 
                    className={`relative w-80 sm:w-96 aspect-[85/55] transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 flex flex-col justify-between ${
                      corners === 'arrondis' ? 'rounded-2xl' : 'rounded-sm'
                    } ${
                      paper === 'kraft' 
                        ? 'bg-[#c8ad8d] text-[#2c1d11]' 
                        : paper === 'rives' 
                        ? 'bg-[#fcfaf5] text-slate-800 border border-[#e8dfc8]' 
                        : 'bg-[#121626] text-white'
                    }`}
                    style={{
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}
                  >
                    {/* Soft touch tactile texture effect */}
                    <div className="absolute inset-0 bg-white/5 pointer-events-none mix-blend-overlay"></div>

                    {/* Card Front Content */}
                    {activePreviewTab === 'recto' ? (
                      <>
                        <div className="flex items-start justify-between z-10">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded flex items-center justify-center font-black text-sm ${
                              finishing === 'plastifie' 
                                ? 'bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-900 shadow-md font-serif'
                                : finishing === 'non-plastifie'
                                ? 'bg-gradient-to-tr from-slate-200 to-slate-400 text-slate-900 shadow-md'
                                : 'bg-[#00AEEF] text-white'
                            }`}>
                              GS
                            </div>
                            <div>
                              <p className={`font-bold text-xs tracking-wider uppercase ${
                                finishing === 'plastifie' ? 'text-cyan-200' : ''
                              }`}>
                                Atelier Print Studio
                              </p>
                              <p className="text-[9px] opacity-70">Tunis • Carthage • Paris</p>
                            </div>
                          </div>
                          {finishing === 'plastifie' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-cyan-300 border border-cyan-400/30">
                              Vernis 3D
                            </span>
                          )}
                        </div>

                        <div className="z-10 mt-auto">
                          <h4 className={`text-base sm:text-lg font-black tracking-tight ${
                            finishing === 'plastifie' ? 'text-cyan-100' : ''
                          }`}>
                            Mohamed Khemir
                          </h4>
                          <p className="text-[11px] opacity-80 font-medium tracking-wide">Directeur Général & Fondateur</p>
                          <div className="h-[1px] w-12 bg-white/30 my-2"></div>
                          <div className="flex items-center justify-between text-[9px] opacity-75">
                            <span>74 461 868 / 56 495 697</span>
                            <span>hajer.gharsallah12@gmail.com</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Card Back Content */
                      <div className="h-full flex flex-col items-center justify-center text-center z-10 space-y-2">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif font-black text-2xl ${
                          finishing === 'plastifie'
                            ? 'bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-900 shadow-lg'
                            : 'bg-white/10 text-white'
                        }`}>
                          P
                        </div>
                        <p className="text-xs font-bold tracking-widest uppercase">GS Imprim • Luxe & Façonnage</p>
                        <p className="text-[10px] opacity-70 max-w-[200px]">Excellence papetière depuis 2012</p>
                      </div>
                    )}
                  </div>
              </div>

            </div>

            {/* PAO Technical Guidelines Box */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
              <h4 className="font-bold text-sm text-[#111111] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00AEEF] text-[20px]">architecture</span>
                Spécifications Techniques Prépresse (PAO)
              </h4>
              <ul className="text-xs text-[#333333] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] font-bold">•</span>
                  <span><strong>Format fini :</strong> 85 × 55 mm — Format avec fond perdu : 89 × 59 mm (2 mm de chaque côté).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] font-bold">•</span>
                  <span><strong>Zone tranquille :</strong> Éloignez vos textes et logos de 3 mm minimum des bords de coupe.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] font-bold">•</span>
                  <span><strong>Profil colorimétrique :</strong> CMJN Fogra 39 ou ISO Coated v2, résolution minimale 300 DPI.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] font-bold">•</span>
                  <span><strong>Plastification :</strong> Prévoir le rendu final souhaité : plastifié ou sans plastification.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: 8-Step Interactive Configurator */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E5E5] shadow-sm space-y-6">
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E6F8FF] text-[#00AEEF] text-xs font-bold uppercase tracking-wider">
                    Papeterie d'Affaires
                  </span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    ★ 4.9/5 (128 avis vérifiés)
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  Cartes de Visite Soft-Touch Luxe
                </h1>
                <p className="text-xs sm:text-sm text-[#333333] mt-1.5 leading-relaxed">
                  Notre support prestige pour vos cartes professionnelles. Choisissez une protection plastifiée ou un rendu papier naturel sans plastification.
                </p>
              </div>

              {/* Step 1: Format selection */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  1. Format de la carte
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: '85x55', label: '85 × 55 mm', desc: 'Standard CB' },
                    { id: '90x50', label: '90 × 50 mm', desc: 'Format US Slim' },
                    { id: '55x55', label: '55 × 55 mm', desc: 'Carré Créatif' },
                    { id: 'custom', label: 'Plié 2 volets', desc: '170 × 55 mm' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFormat(f.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        format === f.id
                          ? 'border-[#00AEEF] bg-[#E6F8FF]/30 ring-1 ring-[#00AEEF]'
                          : 'border-[#E5E5E5] hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-xs font-bold text-[#111111]">{f.label}</p>
                      <p className="text-[10px] text-[#666666]">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Paper substrate */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  2. Support & Papier
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'couché-350', name: 'Couché Mat 350g Rigide', desc: 'Le classique indémodable très épais', tag: 'Recommandé' },
                    { id: 'couché-400', name: 'Couché Dense 400g Premium', desc: 'Tenue en main ultra-solide (+5 DT)', tag: 'Ultra-lourd' },
                    { id: 'rives', name: 'Rives Tradition Vergé 320g', desc: 'Texture lignée d’artisanat d’art (+12 DT)', tag: 'Noblesse' },
                    { id: 'kraft', name: 'Kraft Brun Naturel 300g', desc: 'Aspect brut écoresponsable 100% bio (+8 DT)', tag: 'Écologique' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPaper(p.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        paper === p.id
                          ? 'border-[#00AEEF] bg-[#E6F8FF]/30 ring-1 ring-[#00AEEF]'
                          : 'border-[#E5E5E5] hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#111111]">{p.name}</span>
                      </div>
                      <p className="text-[11px] text-[#333333] mt-0.5">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Plastification */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  3. Plastification
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'plastifie', title: 'Plastifié', desc: 'Protection renforcée et toucher durable' },
                    { id: 'non-plastifie', title: 'Sans plastification', desc: 'Papier naturel, sans film de protection' },
                  ].map((fin) => (
                    <button
                      key={fin.id}
                      onClick={() => setFinishing(fin.id as 'plastifie' | 'non-plastifie')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        finishing === fin.id
                          ? 'border-[#00AEEF] bg-[#E6F8FF]/30 ring-1 ring-[#00AEEF]'
                          : 'border-[#E5E5E5] hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-xs font-bold text-[#111111]">{fin.title}</p>
                      <p className="text-[11px] text-[#333333] mt-0.5">{fin.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4 & 5: Sides & Corners */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                    4. Faces Imprimées
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPrintingSides('recto-verso')}
                      className={`flex-1 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        printingSides === 'recto-verso' ? 'border-[#00AEEF] bg-[#E6F8FF]/40 text-[#00AEEF]' : 'border-[#E5E5E5] text-[#333333]'
                      }`}
                    >
                      Recto / Verso
                    </button>
                    <button
                      onClick={() => setPrintingSides('recto-seul')}
                      className={`flex-1 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        printingSides === 'recto-seul' ? 'border-[#00AEEF] bg-[#E6F8FF]/40 text-[#00AEEF]' : 'border-[#E5E5E5] text-[#333333]'
                      }`}
                    >
                      Recto Seul
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                    5. Découpe des Coins
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCorners('droits')}
                      className={`flex-1 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        corners === 'droits' ? 'border-[#00AEEF] bg-[#E6F8FF]/40 text-[#00AEEF]' : 'border-[#E5E5E5] text-[#333333]'
                      }`}
                    >
                      Coins Droits
                    </button>
                    <button
                      onClick={() => setCorners('arrondis')}
                      className={`flex-1 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        corners === 'arrondis' ? 'border-[#00AEEF] bg-[#E6F8FF]/40 text-[#00AEEF]' : 'border-[#E5E5E5] text-[#333333]'
                      }`}
                    >
                      Coins Arrondis (+5 DT)
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 6: Quantities with volume tiers */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  6. Quantité (Tarifs dégressifs immédiats)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[100, 250, 500, 1000, 2000].map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setQuantity(qty)}
                      className={`py-3 px-2 rounded-xl border text-center transition-all ${
                        quantity === qty
                          ? 'border-[#00AEEF] bg-[#00AEEF] text-white shadow-xs'
                          : 'border-[#E5E5E5] hover:bg-slate-50 text-[#111111]'
                      }`}
                    >
                      <span className="text-sm font-extrabold block">{qty}</span>
                      <span className="text-[10px] opacity-80">exemplaires</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 7: Studio PAO design addon */}
              <div className="p-4 rounded-xl border border-dashed border-[#00AEEF]/30 bg-[#F5F5F5]/50">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePAODesign}
                    onChange={(e) => setIncludePAODesign(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded text-[#00AEEF] focus:ring-[#00AEEF]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#111111] block">
                      Option Studio Graphique GS Imprim (+25 DT)
                    </span>
                    <span className="text-[11px] text-[#333333] block leading-relaxed mt-0.5">
                      Vous n'avez pas de fichier prêt à imprimer ? Notre graphiste senior conçoit votre mise en page avec 3 propositions et modifications illimitées.
                    </span>
                  </div>
                </label>
              </div>

              {/* Step 8: File Upload Pre-flight */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  8. Déposez votre fichier d'impression (PDF HD, AI, PSD)
                </label>
                <div className="border-2 border-dashed border-[#c6c5d8] hover:border-[#00AEEF] rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50">
                  <input
                    type="file"
                    accept=".pdf,.ai,.psd,.eps,.jpg,.png"
                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="file-upload-bc"
                  />
                  <label htmlFor="file-upload-bc" className="cursor-pointer block">
                    <span className="material-symbols-outlined text-[28px] text-[#00AEEF] block mb-1">
                      cloud_upload
                    </span>
                    {uploadedFile ? (
                      <p className="text-xs font-bold text-emerald-700">
                        Fichier sélectionné : {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} Mo)
                      </p>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-[#111111]">
                          Cliquez pour téléverser ou glissez-déposez
                        </p>
                        <p className="text-[11px] text-[#666666] mt-0.5">
                          PDF vectoriel CMJN recommandé avec 2 mm de fond perdu
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Summary & Price Action Bar */}
              <div className="pt-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#00AEEF]">{totalPrice} DT</span>
                    <span className="text-xs font-semibold text-[#666666]">HT ({unitPrice} DT / carte)</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Vérification prépresse gratuite incluse
                  </p>
                </div>

                <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#00AEEF] hover:bg-[#008CC4] text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    Ajouter au panier
                  </button>
                </div>
              </div>

              {addedNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between animate-in fade-in duration-200">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">done_all</span>
                    <strong>{quantity} cartes configurées ajoutées à votre panier !</strong>
                  </span>
                  <button
                    onClick={() => onNavigate('catalog')}
                    className="underline font-bold hover:text-emerald-950"
                  >
                    Continuer mes achats
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
