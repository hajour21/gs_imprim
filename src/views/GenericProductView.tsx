import React, { useMemo, useState } from 'react';
import type { ProductSummary, ViewType } from '../types';

type Props = { product: ProductSummary; onNavigate: (view: ViewType) => void };

export const GenericProductView: React.FC<Props> = ({ product, onNavigate }) => {
  const [quantity, setQuantity] = useState('100');
  const [format, setFormat] = useState('Standard');
  const [finish, setFinish] = useState('Sans finition particulière');
  const [doubleSided, setDoubleSided] = useState(false);
  const [designService, setDesignService] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [instructions, setInstructions] = useState('');

  const requestQuote = () => {
    sessionStorage.setItem('gs-imprim-quote-prefill', JSON.stringify({
      product: product.title,
      quantity,
      details: [`Format : ${format}`, `Finition : ${finish}`, `Recto-verso : ${doubleSided ? 'Oui' : 'Non'}`, `Conception graphique : ${designService ? 'Oui' : 'Non'}`, fileName ? `Fichier : ${fileName}` : '', instructions].filter(Boolean).join('\n'),
    }));
    onNavigate('quote-express');
  };

  const options = useMemo(() => {
    if (product.category === 'textile') {
      return { formats: ['Taille standard', 'Du XS au XL', 'Du 2XL au 3XL'], finishes: ['Impression DTF', 'Broderie', 'Impression + broderie'] };
    }
    if (product.category === 'publicite' || product.category === 'decoration') {
      return { formats: ['Format standard', 'Format personnalisé', 'Grand format'], finishes: ['Mat', 'Brillant', 'Protection extérieure'] };
    }
    if (product.category === 'rollups') {
      return { formats: ['85 × 200 cm', '80 × 160 cm'], finishes: ['Structure aluminium standard', 'Structure aluminium renforcée'] };
    }
    if (product.category === 'stickers' || product.category === 'packaging') {
      return { formats: ['Rond', 'Carré', 'Rectangulaire', 'Forme personnalisée'], finishes: ['Mat', 'Brillant', 'Pelliculage protecteur'] };
    }
    return { formats: ['Standard', 'A4', 'A5', 'Format personnalisé'], finishes: ['Sans finition particulière', 'Mat', 'Brillant', 'Vernis sélectif'] };
  }, [product.category]);

  return (
    <div className="page-shell min-h-screen bg-white py-8">
      <div className="page-intro">
        <nav className="flex items-center gap-2 text-xs text-[#526071]" aria-label="Fil d’Ariane">
          <button onClick={() => onNavigate('home')} className="hover:text-[#007DA8]">Accueil</button><span>/</span>
          <button onClick={() => onNavigate('catalog')} className="hover:text-[#007DA8]">Catalogue</button><span>/</span>
          <span className="font-bold text-[#101828]">{product.title}</span>
        </nav>
        <span className="eyebrow mt-5 block">Configuration sur mesure</span>
        <h1 className="mt-2">{product.title}</h1>
        <p>{product.shortDesc}</p>
      </div>

      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-12 lg:px-10">
        <section className="surface-card overflow-hidden lg:col-span-5">
          <div className="aspect-[4/3] bg-[#F7F8FA] p-8">
            <img src={product.image} alt={product.title} className="h-full w-full object-contain mix-blend-multiply" />
          </div>
          <div className="space-y-3 p-6">
            <span className="rounded-full bg-[#EFFAFF] px-3 py-1 text-xs font-bold text-[#007DA8]">Tarif commercial sur devis</span>
            <p className="text-sm leading-7 text-[#526071]">Les options seront confirmées avec l’atelier avant validation de la commande.</p>
          </div>
        </section>

        <section className="surface-card p-6 sm:p-8 lg:col-span-7" aria-labelledby="configuration-title">
          <h2 id="configuration-title" className="text-xl font-extrabold tracking-tight text-[#101828]">Configurez votre demande</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="text-sm font-bold text-[#101828]">Quantité
              <select value={quantity} onChange={(event) => setQuantity(event.target.value)} className="control-base mt-2 w-full px-3 text-sm">
                <option>50</option><option>100</option><option>250</option><option>500</option><option>1000</option><option>Sur mesure</option>
              </select>
            </label>
            <label className="text-sm font-bold text-[#101828]">Format / taille
              <select value={format} onChange={(event) => setFormat(event.target.value)} className="control-base mt-2 w-full px-3 text-sm">
                {options.formats.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="text-sm font-bold text-[#101828]">Finition / support
              <select value={finish} onChange={(event) => setFinish(event.target.value)} className="control-base mt-2 w-full px-3 text-sm">
                {options.finishes.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-[#E5E9EF] p-3 text-sm font-bold text-[#101828]">
              <input type="checkbox" checked={doubleSided} onChange={(event) => setDoubleSided(event.target.checked)} className="h-5 w-5 accent-[#007DA8]" />
              Impression recto / verso
            </label>
          </div>

          <label className="mt-5 flex items-center gap-3 text-sm font-bold text-[#101828]">
            <input type="checkbox" checked={designService} onChange={(event) => setDesignService(event.target.checked)} className="h-5 w-5 accent-[#EC008C]" />
            Je souhaite un accompagnement graphique
          </label>

          <label className="mt-6 block text-sm font-bold text-[#101828]">Fichier à examiner
            <input type="file" accept=".pdf,.png,.jpg,.jpeg,.ai,.svg" onChange={(event) => {
              const file = event.target.files?.[0];
              setFileError('');
              setFileName('');
              if (!file) return;
              if (file.size > 10 * 1024 * 1024) {
                setFileError('Le fichier ne doit pas dépasser 10 Mo.');
                return;
              }
              setFileName(file.name);
            }} className="control-base mt-2 block w-full cursor-pointer px-3 py-2 text-sm" aria-describedby="file-help" />
          </label>
          <p id="file-help" className="mt-2 text-xs text-[#526071]">Formats acceptés : PDF, PNG, JPG, AI ou SVG — 10 Mo maximum.</p>
          {fileName && <p className="mt-2 text-xs text-[#526071]">Fichier sélectionné : {fileName}</p>}
          {fileError && <p role="alert" className="mt-2 text-xs font-semibold text-red-700">{fileError}</p>}

          <label className="mt-5 block text-sm font-bold text-[#101828]">Instructions personnalisées
            <textarea value={instructions} onChange={(event) => setInstructions(event.target.value)} rows={4} maxLength={2000} placeholder="Dimensions, usage, contraintes ou informations utiles…" className="control-base mt-2 w-full resize-none px-3 py-3 text-sm" />
          </label>

          <button onClick={requestQuote} className="btn-primary mt-7 w-full">Demander un devis pour cette configuration</button>
          <p className="mt-3 text-center text-xs leading-5 text-[#526071]">Votre demande contiendra les options sélectionnées et sera confirmée avant toute commande.</p>
        </section>
      </div>
    </div>
  );
};
