import React, { useState } from 'react';
import { CartItem, ViewType } from '../types';

interface FlyersViewProps {
  onAddToCart: (item: CartItem) => void;
  onNavigate: (view: ViewType) => void;
}

export const FlyersView: React.FC<FlyersViewProps> = ({ onAddToCart, onNavigate }) => {
  const [format, setFormat] = useState<'a5' | 'a6' | 'dl' | 'a4'>('a5');
  const [folding, setFolding] = useState<'flat' | '1pli' | '3volets-roule' | '3volets-accordeon'>('flat');
  const [paper, setPaper] = useState<'135g' | '170g' | '250g' | '350g'>('170g');
  const [finish, setFinish] = useState<'standard' | 'soft-touch' | 'brillant'>('standard');
  const [quantity, setQuantity] = useState<number>(500);
  const [turnaround, setTurnaround] = useState<'standard' | 'express'>('standard');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [addedNotice, setAddedNotice] = useState(false);

  // Price calculation
  const calculatePrice = () => {
    let basePer100 = 8;
    if (format === 'a6') basePer100 = 6;
    if (format === 'a5') basePer100 = 9;
    if (format === 'dl') basePer100 = 8.5;
    if (format === 'a4') basePer100 = 16;

    if (paper === '170g') basePer100 += 2;
    if (paper === '250g') basePer100 += 4.5;
    if (paper === '350g') basePer100 += 7.5;

    if (folding !== 'flat') basePer100 += 3; // rainage & pliage machine

    if (finish === 'soft-touch') basePer100 += 4;
    if (finish === 'brillant') basePer100 += 2.5;

    // Volume multiplier
    let qtyFactor = 1;
    if (quantity === 250) qtyFactor = 2.4;
    else if (quantity === 500) qtyFactor = 4.0;
    else if (quantity === 1000) qtyFactor = 6.5;
    else if (quantity === 2500) qtyFactor = 12.0;
    else if (quantity === 5000) qtyFactor = 19.0;

    let total = basePer100 * qtyFactor;
    if (turnaround === 'express') total += 15;

    return Math.round(total);
  };

  const totalPrice = calculatePrice();
  const unitPrice = (totalPrice / quantity).toFixed(3);

  const handleAddToCart = () => {
    const specs = `Format: ${format.toUpperCase()} | Pliage: ${
      folding === 'flat' ? 'Flyer simple à plat (2 faces)' : folding === '1pli' ? 'Dépliant 2 volets / 1 pli central (4 faces)' : folding === '3volets-roule' ? 'Dépliant 3 volets pli roulé (6 faces)' : 'Dépliant 3 volets pli accordéon en Z (6 faces)'
    } | Papier: Couché ${paper} | Finition: ${
      finish === 'soft-touch' ? 'Pelliculage Soft-Touch Mat' : finish === 'brillant' ? 'Pelliculage Brillant Miroir' : 'Vernis de protection machine'
    }${turnaround === 'express' ? ' | Tirage Express 24h' : ''}`;

    onAddToCart({
      id: `flyer-${Date.now()}`,
      productId: 'flyers-a5',
      title: 'Flyers & Dépliants Publicitaires',
      specs: specs,
      quantity: `${quantity} ex`,
      unitPrice: Number(unitPrice),
      totalPrice: totalPrice,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBonRf0CI7Xl5jhqUzNZloqnQ3kAPJhNS16zRbrdMIgCQ1t-KvsADDYxkW96pF0ruMDi-SsT4WWWacux5jOtjRiAwc-J-aMRdDQL4Vu48FQITYkSFS3OkZU1-y9GpHu1nj7qJc5DgVC0vPz_fxvnQ2Q98JNBbPPfd0jmWY484-QzqpnhAclFo8cfpn6bPDAAajg22LJ-DuVs6Eiz82igibneXooDDQif78LJn4hNTqwOGU_PNM6woQMog'
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
          <button onClick={() => onNavigate('catalog')} className="hover:text-[#00AEEF]">Papeterie publicitaire</button>
          <span>/</span>
          <span className="text-[#111111] font-bold">Flyers & Dépliants 3 Volets</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Simulator & Fold Diagrams */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                  Schéma de Façonnage & Rainage Mécanique
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-[#00AEEF]">
                  Offset Heidelberg
                </span>
              </div>

              {/* Graphic Fold Representation */}
              <div className="relative aspect-[16/10] bg-slate-50 rounded-2xl p-6 flex items-center justify-center overflow-hidden border border-slate-200">
                {folding === '3volets-roule' || folding === '3volets-accordeon' ? (
                  /* 3-fold Diagram */
                  <div className="flex gap-1.5 w-full max-w-sm h-48">
                    <div className="flex-1 bg-white border border-[#00AEEF]/30 rounded-lg shadow-md p-3 flex flex-col justify-between relative overflow-hidden">
                      <div className="text-[10px] font-bold text-[#00AEEF]">VOLET 1 (Extérieur)</div>
                      <div className="space-y-1">
                        <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                        <div className="h-2 w-full bg-slate-100 rounded"></div>
                      </div>
                      <span className="text-[9px] text-[#666666]">Pli 1 rainé</span>
                    </div>
                    <div className="flex-1 bg-white border border-[#00AEEF]/30 rounded-lg shadow-md p-3 flex flex-col justify-between relative overflow-hidden">
                      <div className="text-[10px] font-bold text-[#00AEEF]">VOLET 2 (Centre)</div>
                      <div className="space-y-1">
                        <div className="h-2 w-full bg-slate-100 rounded"></div>
                        <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                      </div>
                      <span className="text-[9px] text-[#666666]">Dos</span>
                    </div>
                    <div className="flex-1 bg-white border border-[#00AEEF]/30 rounded-lg shadow-md p-3 flex flex-col justify-between relative overflow-hidden">
                      <div className="text-[10px] font-bold text-[#00AEEF]">VOLET 3 (Rabattable)</div>
                      <div className="space-y-1">
                        <div className="h-2 w-2/3 bg-slate-200 rounded"></div>
                        <div className="h-2 w-full bg-slate-100 rounded"></div>
                      </div>
                      <span className="text-[9px] text-[#666666]">Pli 2</span>
                    </div>
                  </div>
                ) : folding === '1pli' ? (
                  /* 2-fold Diagram */
                  <div className="flex gap-2 w-full max-w-xs h-52">
                    <div className="flex-1 bg-white border border-[#00AEEF]/30 rounded-lg shadow-md p-3 flex flex-col justify-between">
                      <div className="text-xs font-bold text-[#00AEEF]">Page 1 & 4</div>
                      <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                      <span className="text-[10px] text-[#666666]">Couverture</span>
                    </div>
                    <div className="flex-1 bg-white border border-[#00AEEF]/30 rounded-lg shadow-md p-3 flex flex-col justify-between">
                      <div className="text-xs font-bold text-[#00AEEF]">Page 2 & 3</div>
                      <div className="h-2 w-full bg-slate-200 rounded"></div>
                      <span className="text-[10px] text-[#666666]">Intérieur</span>
                    </div>
                  </div>
                ) : (
                  /* Flat Flyer */
                  <div className="w-48 h-64 bg-white border border-[#00AEEF]/30 rounded-lg shadow-lg p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#00AEEF] uppercase">{format.toUpperCase()}</span>
                      <span className="text-[10px] bg-[#E6F8FF] text-[#00AEEF] font-bold px-1.5 py-0.5 rounded">Recto/Verso</span>
                    </div>
                    <div className="space-y-1.5 my-auto">
                      <div className="h-3 w-3/4 bg-gradient-to-r from-[#00AEEF] to-[#EC008C] rounded"></div>
                      <div className="h-2 w-full bg-slate-200 rounded"></div>
                      <div className="h-2 w-5/6 bg-slate-200 rounded"></div>
                      <div className="h-2 w-2/3 bg-slate-200 rounded"></div>
                    </div>
                    <div className="text-[10px] text-[#666666] text-center border-t pt-1">
                      Impression Offset Haute Précision
                    </div>
                  </div>
                )}
              </div>

              {/* Technical strip */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="p-3 bg-[#F5F5F5] rounded-xl">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">line_weight</span>
                  <span className="text-[11px] font-bold text-[#111111] block">Rainage Zéro Pli</span>
                  <span className="text-[10px] text-[#666666]">Pas de fibre cassée</span>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-xl">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">palette</span>
                  <span className="text-[11px] font-bold text-[#111111] block">Quadri Heidelberg</span>
                  <span className="text-[10px] text-[#666666]">Saturation profonde</span>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-xl">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px] block mb-1">speed</span>
                  <span className="text-[11px] font-bold text-[#111111] block">Option Rush 24h</span>
                  <span className="text-[10px] text-[#666666]">Événements urgents</span>
                </div>
              </div>
            </div>

            {/* PAO Checklist */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
              <h4 className="font-bold text-sm text-[#111111] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00AEEF] text-[20px]">rule</span>
                Normes d'Impression pour Dépliants
              </h4>
              <ul className="text-xs text-[#333333] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] font-bold">•</span>
                  <span><strong>Fonds perdus :</strong> 2 mm de débord tout autour du document.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] font-bold">•</span>
                  <span><strong>Pli roulé (3 volets) :</strong> Le volet intérieur rabattable doit faire 2 mm de moins en largeur (ex: 97 / 100 / 100 mm pour un A4 ouvert).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] font-bold">•</span>
                  <span><strong>Textes vectorisés :</strong> Polices converties en tracés (courbes) pour éviter tout décalage d'affichage.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Configurator */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E5E5] shadow-sm space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E6F8FF] text-[#00AEEF] text-xs font-bold uppercase tracking-wider">
                    Édition & Prospection
                  </span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Parc Heidelberg Speedmaster
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  Flyers & Dépliants Publicitaires
                </h1>
                <p className="text-xs sm:text-sm text-[#333333] mt-1.5 leading-relaxed">
                  L'outil marketing par excellence pour salons, lancements de produits et distribution commerciale à grande échelle en Tunisie.
                </p>
              </div>

              {/* Step 1: Format selection */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  1. Format Fini
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'a5', name: 'A5', dim: '14.8 × 21 cm', desc: 'Le plus populaire' },
                    { id: 'a6', name: 'A6', dim: '10.5 × 14.8 cm', desc: 'Format poche' },
                    { id: 'dl', name: 'DL', dim: '10 × 21 cm', desc: 'Enveloppe / Menu' },
                    { id: 'a4', name: 'A4', dim: '21 × 29.7 cm', desc: 'Fiche produit' },
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
                      <p className="text-xs font-bold text-[#111111]">{f.name}</p>
                      <p className="text-[10px] text-[#666666]">{f.dim}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Pliage / Volets */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  2. Type de Pliage & Volets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'flat', title: 'Flyer Simple (2 Faces)', desc: 'À plat, sans pli' },
                    { id: '1pli', title: 'Dépliant 2 Volets (4 Faces)', desc: '1 pli central rainé' },
                    { id: '3volets-roule', title: '3 Volets Pli Roulé (6 Faces)', desc: 'Volets rabattus vers l\'intérieur' },
                    { id: '3volets-accordeon', title: '3 Volets Pli Accordéon (6 Faces)', desc: 'Pliage en Z continu' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setFolding(p.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        folding === p.id
                          ? 'border-[#00AEEF] bg-[#E6F8FF]/30 ring-1 ring-[#00AEEF]'
                          : 'border-[#E5E5E5] hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-xs font-bold text-[#111111]">{p.title}</p>
                      <p className="text-[10px] text-[#666666]">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Grammage papier */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  3. Grammage du Papier
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: '135g', name: '135g Éco', desc: 'Souple & léger' },
                    { id: '170g', name: '170g Standard', desc: 'Bel équilibre' },
                    { id: '250g', name: '250g Semi-rigide', desc: 'Tenue supérieure' },
                    { id: '350g', name: '350g Cartonné', desc: 'Finition prestige' },
                  ].map((pap) => (
                    <button
                      key={pap.id}
                      onClick={() => setPaper(pap.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        paper === pap.id
                          ? 'border-[#00AEEF] bg-[#E6F8FF]/30 ring-1 ring-[#00AEEF]'
                          : 'border-[#E5E5E5] hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-xs font-bold text-[#111111]">{pap.name}</p>
                      <p className="text-[10px] text-[#666666]">{pap.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Finition pelliculage */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  4. Finition de Surface
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'standard', title: 'Vernis Machine', desc: 'Protection de base' },
                    { id: 'soft-touch', title: 'Mat Soft-Touch', desc: 'Toucher peau de pêche' },
                    { id: 'brillant', title: 'Pelliculage Brillant', desc: 'Éclat haute brillance' },
                  ].map((fin) => (
                    <button
                      key={fin.id}
                      onClick={() => setFinish(fin.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        finish === fin.id
                          ? 'border-[#00AEEF] bg-[#E6F8FF]/30 font-bold text-[#00AEEF]'
                          : 'border-[#E5E5E5] text-[#333333] hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-xs font-bold">{fin.title}</p>
                      <p className="text-[10px] text-[#666666]">{fin.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Quantités dégressives */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  5. Quantité (Impression groupée avantageuse)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[250, 500, 1000, 2500, 5000].map((qty) => (
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

              {/* Step 6: Production Turnaround */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#111111] block">Délai d'impression</span>
                  <span className="text-[11px] text-[#666666]">Production à notre atelier de Sfax</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTurnaround('standard')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      turnaround === 'standard' ? 'bg-[#00AEEF] text-white' : 'bg-white border text-[#333333]'
                    }`}
                  >
                    Standard (3-4 jours)
                  </button>
                  <button
                    onClick={() => setTurnaround('express')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      turnaround === 'express' ? 'bg-[#00AEEF] text-white' : 'bg-white border text-[#333333]'
                    }`}
                  >
                    Rush 24h (+15 DT)
                  </button>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  7. Déposez votre maquette PDF prête à imprimer
                </label>
                <div className="border-2 border-dashed border-[#c6c5d8] hover:border-[#00AEEF] rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50">
                  <input
                    type="file"
                    accept=".pdf,.ai,.indd,.psd"
                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="file-upload-flyer"
                  />
                  <label htmlFor="file-upload-flyer" className="cursor-pointer block">
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
                        <p className="text-[11px] text-[#666666] mt-0.5">PDF HD avec traits de coupe et 2 mm de fond perdu</p>
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
                    <span className="text-xs font-semibold text-[#666666]">HT ({unitPrice} DT / ex)</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                    Livraison offerte à partir de 120 DT
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
                    <strong>{quantity} flyers / dépliants ajoutés à votre panier !</strong>
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
