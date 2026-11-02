import React from 'react';
import { ViewType } from '../types';
import { CATALOG_PRODUCTS } from '../data/products';

interface StudioHomeViewProps {
  onNavigate: (view: ViewType) => void;
}

const services: { number: string; title: string; text: string; view: ViewType; color: string }[] = [
  { number: '01', title: 'Papeterie premium', text: 'Cartes, entêtes, dépliants et finitions qui donnent du poids à votre marque.', view: 'product-business-cards', color: '#00AEEF' },
  { number: '02', title: 'Grand format', text: 'Bâches, affiches et signalétique conçues pour être vues de loin.', view: 'product-banners', color: '#EC008C' },
  { number: '03', title: 'Marquage & stickers', text: 'Découpes précises, supports résistants et couleurs nettes.', view: 'product-stickers', color: '#FFD100' },
  { number: '04', title: 'Objets & textile', text: 'Plexiglas, pulls et pièces personnalisées pour vos campagnes.', view: 'product-textile-pulls', color: '#111111' },
];

export const StudioHomeView: React.FC<StudioHomeViewProps> = ({ onNavigate }) => {
  const featured = CATALOG_PRODUCTS.slice(0, 3);

  return (
    <div className="page-shell min-h-screen bg-[#F4F1EA] text-[#101828]">
      <section className="relative overflow-hidden border-b-2 border-[#111111] bg-[#111111] text-white">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#EC008C] mix-blend-screen opacity-90" />
        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-[#00AEEF] mix-blend-screen opacity-75" />
        <div className="relative mx-auto max-w-[1500px] px-5 pb-10 pt-8 sm:px-8 lg:px-14 lg:pb-16">
          <div className="mb-16 flex items-start justify-between gap-6 border-b border-white/25 pb-4 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span>GS / Imprim — Sfax</span>
            <span className="hidden sm:block">Studio d'impression & façonnage</span>
            <span>CMJN / 2026</span>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-8">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#FFD100]"><span className="h-2 w-2 rounded-full bg-[#FFD100]" /> Atelier en mouvement</p>
              <h1 className="max-w-5xl text-[clamp(3.5rem,9vw,9.5rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]">
                Nous<br /><span className="text-[#00AEEF]">imprimons</span><br /><span className="text-[#EC008C]">l'impact.</span>
              </h1>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4 lg:pb-3">
              <p className="max-w-sm border-l-2 border-[#FFD100] pl-4 text-sm leading-relaxed text-white/75">
                Des supports tactiles, des couleurs calibrées et des finitions qui transforment une idée en présence physique.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button onClick={() => onNavigate('catalog')} className="bg-[#FFD100] px-5 py-3 text-xs font-black uppercase tracking-wider text-[#111111] transition-transform hover:-translate-y-1">Explorer le studio ↗</button>
                <button onClick={() => onNavigate('quote-express')} className="border border-white/50 px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors hover:border-white hover:bg-white hover:text-[#111111]">Parler du projet</button>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-px border border-white/25 bg-white/25 sm:grid-cols-4">
            {['Offset & numérique', 'Façonnage expert', 'Livraison Tunisie', 'Conseil créatif'].map((item, index) => (
              <div key={item} className="bg-[#111111] p-4 text-[10px] font-bold uppercase tracking-widest text-white/65"><span className="mr-2 text-[#00AEEF]">0{index + 1}</span>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b-2 border-[#111111] bg-[#FFD100] py-3 text-center text-xs font-black uppercase tracking-[0.25em] text-[#111111]">
        Papier · couleur · matière · précision · papier · couleur · matière · précision ·
      </div>

      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-14">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#EC008C]">Ce que nous faisons</p><h2 className="max-w-xl text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">Votre marque,<br />en matière.</h2></div>
          <p className="max-w-xs text-sm leading-relaxed text-black/60">Un atelier pour les projets qui doivent être vus, touchés et retenus.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 border-t-2 border-[#111111] md:grid-cols-2">
          {services.map((service) => (
            <button key={service.number} onClick={() => onNavigate(service.view)} className="group grid grid-cols-[64px_1fr_28px] gap-4 border-b-2 border-[#111111] py-6 text-left transition-all hover:bg-white md:px-4">
              <span className="text-sm font-black" style={{ color: service.color }}>{service.number}</span>
              <span><strong className="block text-xl font-black uppercase tracking-tight">{service.title}</strong><span className="mt-2 block max-w-md text-sm leading-relaxed text-black/60">{service.text}</span></span>
              <span className="self-center text-2xl transition-transform group-hover:translate-x-2">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-[#111111] bg-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-12">
          <div className="flex flex-col justify-between border-b-2 border-[#111111] p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r-2 lg:p-14">
            <div><p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#00AEEF]">Sélection atelier</p><h2 className="text-4xl font-black uppercase leading-none">Les pièces<br />qui parlent.</h2></div>
            <button onClick={() => onNavigate('catalog')} className="mt-10 w-fit border-b-2 border-[#EC008C] pb-1 text-xs font-black uppercase tracking-wider hover:text-[#EC008C]">Voir tout le catalogue →</button>
          </div>
          <div className="grid gap-px bg-[#111111] sm:grid-cols-3 lg:col-span-8">
            {featured.map((product, index) => (
              <button key={product.id} onClick={() => onNavigate(product.viewId)} className="group bg-[#F4F1EA] p-4 text-left transition-colors hover:bg-[#00AEEF]">
                <div className="relative mb-5 aspect-square overflow-hidden bg-white"><img src={product.image} alt={product.title} className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110" /><span className="absolute left-3 top-3 bg-[#FFD100] px-2 py-1 text-[10px] font-black">0{index + 1}</span></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-black/45 group-hover:text-black/70">{product.categoryLabel}</span><h3 className="mt-1 text-lg font-black uppercase leading-tight">{product.title}</h3><span className="mt-4 block text-xs font-bold">À partir de {product.startingPrice} DT ↗</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-8 px-5 py-20 sm:px-8 md:flex-row md:items-end lg:px-14">
        <div><p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#EC008C]">Un projet en tête ?</p><h2 className="max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl">Faisons-le<br /><span className="text-[#00AEEF]">exister.</span></h2></div>
        <button onClick={() => onNavigate('quote-express')} className="bg-[#111111] px-7 py-4 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-[#EC008C]">Démarrer un devis →</button>
      </section>
    </div>
  );
};
