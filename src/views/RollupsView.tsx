import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Maximize2, Upload, Zap } from 'lucide-react';
import type { ViewType } from '../types';

const ROLLUP_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD1oKYyxFychO4o0AMvSeJ0Uv-0Su1z8uHF7hIO3OhBzw_qOFVfcIil-dvVbTclGS9MxICWSckuWUXvYTktyDjlF2ZXeVGnxKPT2PFUF_PP2eUPs9rUokl2LFMcv7m6Ekk0GCRijFCIOfykdENax9hhhHeHjzbxXlRds-R75wuuiMHkZDN6MEWOwWg2qEKyi8IdGxw9DPVr5LbWfmBp-vA-zHavXaogfr139LJzWw_NXyD-cHKzyOZ8g';

const sizes = [
  { id: '85x200', label: '85 × 200 cm', ratio: '85 / 200', note: 'Le format salon classique' },
  { id: '80x160', label: '80 × 160 cm', ratio: '80 / 160', note: 'Compact et facile à transporter' },
] as const;

export const RollupsView: React.FC<{ onNavigate: (view: ViewType) => void }> = ({ onNavigate }) => {
  const [size, setSize] = useState<(typeof sizes)[number]['id']>('85x200');
  const [quantity, setQuantity] = useState('1');
  const [fileName, setFileName] = useState('');
  const selectedSize = useMemo(() => sizes.find((item) => item.id === size) ?? sizes[0], [size]);

  const requestQuote = () => {
    sessionStorage.setItem('gs-imprim-quote-prefill', JSON.stringify({
      product: 'Roll-up publicitaire',
      quantity: `${quantity} unité(s)`,
      details: `Format : ${selectedSize.label}${fileName ? `\nFichier : ${fileName}` : ''}`,
    }));
    onNavigate('quote-express');
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#101828] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 lg:px-12">
        <nav className="mb-12 flex items-center gap-2 text-xs text-white/55" aria-label="Fil d’Ariane">
          <button onClick={() => onNavigate('home')} className="hover:text-white">Accueil</button><span>/</span>
          <button onClick={() => onNavigate('catalog')} className="hover:text-white">Catalogue</button><span>/</span><span className="text-white">Roll-up</span>
        </nav>

        <header className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="eyebrow text-[#FFD100]">Signalétique mobile · édition 01</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-7xl">Votre marque,<br /><span className="text-[#00AEEF]">verticalement.</span></h1>
          </div>
          <p className="max-w-md justify-self-end text-sm leading-7 text-white/65">Un Roll-up pensé comme un objet de scène : lisible à distance, rapide à installer et prêt à suivre vos événements.</p>
        </header>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="relative flex min-h-[560px] items-end justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[#1b2940] p-8 sm:p-12">
            <div className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-[#EC008C]/25 blur-3xl" />
            <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-[#00AEEF]/25 blur-3xl" />
            <div className="relative flex h-[470px] w-[min(72%,360px)] flex-col items-center justify-between rounded-t-md border-x-[12px] border-t-[10px] border-slate-300 bg-white shadow-[0_30px_70px_rgba(0,0,0,.4)]" style={{ aspectRatio: selectedSize.ratio }}>
              <img src={ROLLUP_IMAGE} alt="Aperçu Roll-up publicitaire" className="h-full w-full object-cover opacity-90 mix-blend-multiply" />
              <div className="absolute inset-x-[-18px] bottom-[-20px] h-5 rounded bg-slate-200 shadow-lg" />
              <div className="absolute -bottom-12 left-1/2 h-12 w-40 -translate-x-1/2 rounded-b-xl border-x-8 border-b-8 border-slate-300" />
              <span className="absolute left-4 top-4 rounded-full bg-[#EC008C] px-3 py-1 text-[10px] font-black uppercase tracking-widest">{selectedSize.label}</span>
            </div>
            <div className="absolute bottom-5 left-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50"><Maximize2 size={13} /> Aperçu proportionnel</div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 text-[#101828] sm:p-10">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-[#007DA8]">Configuration express</p><h2 className="mt-2 text-3xl font-black tracking-tight">Construisez votre présence.</h2></div><span className="rounded-full bg-[#EFFAFF] p-3 text-[#00AEEF]"><Zap size={20} /></span></div>
            <div className="mt-8 space-y-7">
              <div><label className="text-xs font-black uppercase tracking-widest text-[#526071]">1. Choisissez le format</label><div className="mt-3 grid gap-3 sm:grid-cols-2">{sizes.map((item) => <button type="button" key={item.id} onClick={() => setSize(item.id)} className={`rounded-2xl border p-4 text-left transition ${size === item.id ? 'border-[#00AEEF] bg-[#EFFAFF] ring-2 ring-[#00AEEF]/20' : 'border-slate-200 hover:border-[#00AEEF]'}`}><span className="block text-lg font-black">{item.label}</span><span className="mt-1 block text-xs text-[#526071]">{item.note}</span>{size === item.id && <Check size={17} className="mt-3 text-[#00AEEF]" />}</button>)}</div></div>
              <div><label htmlFor="rollup-quantity" className="text-xs font-black uppercase tracking-widest text-[#526071]">2. Quantité</label><select id="rollup-quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)} className="control-base mt-3 w-full px-4"><option>1</option><option>2</option><option>5</option><option>10</option><option>Sur mesure</option></select></div>
              <div><label htmlFor="rollup-file" className="text-xs font-black uppercase tracking-widest text-[#526071]">3. Votre visuel</label><label htmlFor="rollup-file" className="mt-3 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-slate-300 p-4 transition hover:border-[#00AEEF] hover:bg-[#EFFAFF]"><Upload size={20} className="text-[#00AEEF]" /><span className="text-sm font-semibold">{fileName || 'Importer un fichier PDF, PNG ou JPG'}</span></label><input id="rollup-file" type="file" accept=".pdf,.png,.jpg,.jpeg" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')} /></div>
              <button type="button" onClick={requestQuote} className="btn-tertiary flex w-full items-center justify-center gap-2">Demander mon devis Roll-up <ArrowRight size={17} /></button>
              <p className="text-center text-xs text-[#526071]">Dimensions, support et impression confirmés par l’atelier avant production.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
