import React, { useState } from 'react';
import { ViewType } from '../types';
import { saveQuoteRequest } from '../lib/data';

interface QuoteExpressViewProps {
  onNavigate: (view: ViewType) => void;
}

export const QuoteExpressView: React.FC<QuoteExpressViewProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState(() => {
    const defaults = {
      fullName: '', company: '', phone: '', email: '', governorate: 'Tunis',
      productType: 'Cartes de visite de prestige', quantity: '500 exemplaires',
      finishing: 'Dorure à chaud + Vernis 3D', delay: 'Standard (3-4 jours)', message: '',
    };
    try {
      const saved = JSON.parse(sessionStorage.getItem('gs-imprim-quote-prefill') ?? 'null') as { product?: string; quantity?: string; details?: string } | null;
      if (!saved) return defaults;
      sessionStorage.removeItem('gs-imprim-quote-prefill');
      return { ...defaults, productType: saved.product ?? defaults.productType, quantity: saved.quantity ?? defaults.quantity, message: saved.details ?? defaults.message };
    } catch {
      return defaults;
    }
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const details = [
        `Finition : ${formData.finishing}`,
        `Délai : ${formData.delay}`,
        formData.message ? `Message : ${formData.message}` : '',
        uploadedFile ? `Fichier joint : ${uploadedFile.name}` : '',
      ].filter(Boolean).join('\n');
      const request = await saveQuoteRequest({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        product: formData.productType,
        quantity: formData.quantity,
        details,
      });
      setQuoteReference(`DEV-${request.id.slice(0, 8).toUpperCase()}`);
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Impossible d’enregistrer votre demande de devis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell min-h-screen bg-white py-8">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-8">
        <nav className="flex items-center gap-2 text-xs text-[#666666] mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#00AEEF]">Accueil</button>
          <span>/</span>
          <span className="text-[#111111] font-bold">Devis Express en Ligne</span>
        </nav>
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Demande de Devis Express & Conseil Technique
          </h1>
          <p className="text-sm text-[#333333] mt-1.5 leading-relaxed">
            Pour vos projets spécifiques, tirages volumineux, packagings ou formats hors-standard : notre équipe commerciale et prépresse vous adresse une proposition chiffrée détaillée sous 2 heures ouvrées.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#E5E5E5] shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[36px]">mark_email_read</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                  Dossier Enregistré • Réf {quoteReference}
                </span>
                <h2 className="text-2xl font-bold text-[#111111]">Merci, {formData.fullName} !</h2>
                <p className="text-sm text-[#333333] max-w-md mx-auto leading-relaxed">
                  Votre demande pour <strong className="text-[#111111]">{formData.productType} ({formData.quantity})</strong> a été transmise à notre chef de projet à l'atelier de Sfax (Route de Gabès).
                </p>

                <div className="p-4 bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5] max-w-sm mx-auto text-left text-xs space-y-2">
                  <p className="font-bold text-[#00AEEF]">Engagement Réponse Rapide :</p>
                  <p className="text-[#333333]">Un chiffrage officiel HT et TTC avec options alternatives vous parviendra par email ({formData.email}) et sur WhatsApp sous 2 heures.</p>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => { setSubmitted(false); }}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#111111] text-xs font-bold rounded-xl"
                  >
                    Nouvelle demande
                  </button>
                  <button
                    onClick={() => onNavigate('catalog')}
                    className="px-6 py-2.5 bg-[#00AEEF] hover:bg-[#008CC4] text-white text-xs font-bold rounded-xl"
                  >
                    Explorer le catalogue en direct
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>}
                <div>
                  <h3 className="text-base font-bold text-[#111111] border-b pb-2 border-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00AEEF] text-[20px]">assignment</span>
                    1. Vos coordonnées professionnelles
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-xs font-bold text-[#333333] mb-1">Nom et Prénom *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Ex: Mohamed Khemir"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#333333] mb-1">Société / Organisation</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Ex: Architecture Studio"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#333333] mb-1">Numéro de téléphone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+216 98 123 456"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#333333] mb-1">Adresse Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@entreprise.tn"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#111111] border-b pb-2 border-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00AEEF] text-[20px]">tune</span>
                    2. Détails techniques du besoin d'impression
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-xs font-bold text-[#333333] mb-1">Catégorie de produit *</label>
                      <select
                        value={formData.productType}
                        onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none bg-white"
                      >
                        <option value="Cartes de visite de prestige">Cartes de visite de prestige (Soft-touch, Dorure)</option>
                        <option value="Porte-clés en Plexiglas découpé">Porte-clés en Plexiglas Découpe Laser (Hôtels, Goodies)</option>
                        <option value="Pulls & Sweats Personnalisés">Pulls, Hoodies & Sweats Personnalisés (Broderie, DTF)</option>
                        <option value="Plaques de Certification ISO">Plaques de Certification ISO (Alu brossé, Plexi)</option>
                        <option value="Bâches & Banderoles PVC Grand Format">Bâches & Banderoles PVC Grand Format</option>
                        <option value="Stickers & Étiquettes Découpées">Stickers & Étiquettes Découpées</option>
                        <option value="Tampons & Cachets Trodat">Tampons & Cachets Trodat (Printy, Rond, Dateur)</option>
                        <option value="Flyers, Dépliants & Catalogues">Flyers, Dépliants & Catalogues</option>
                        <option value="Packaging & Boîtes pliantes">Packaging & Boîtes pliantes</option>
                        <option value="Signalétique Salon & Roll-ups">Signalétique Salon & Roll-ups</option>
                        <option value="Autre projet spécifique">Autre projet spécifique</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#333333] mb-1">Quantité souhaitée</label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="Ex: 1000 ex ou 50 m²"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#333333] mb-1">Finitions & Façonnage particulier</label>
                      <input
                        type="text"
                        value={formData.finishing}
                        onChange={(e) => setFormData({ ...formData, finishing: e.target.value })}
                        placeholder="Ex: Dorure or chaud, coins arrondis, œillets..."
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#333333] mb-1">Gouvernorat de livraison</label>
                      <select
                        value={formData.governorate}
                        onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none bg-white"
                      >
                        <option value="Tunis">Tunis (Grand Tunis)</option>
                        <option value="Ariana">Ariana</option>
                        <option value="Ben Arous">Ben Arous</option>
                        <option value="Sousse">Sousse</option>
                        <option value="Sfax">Sfax</option>
                        <option value="Nabeul">Nabeul / Hammamet</option>
                        <option value="Autre région">Autre Gouvernorat</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-[#333333] mb-1">Description détaillée du projet</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Précisez les dimensions, types de papiers, contraintes d'événements..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Upload Section */}
                <div>
                  <h3 className="text-base font-bold text-[#111111] border-b pb-2 border-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00AEEF] text-[20px]">cloud_upload</span>
                    3. Joindre vos fichiers maquette ou croquis (optionnel)
                  </h3>
                  <div className="mt-3 border-2 border-dashed border-[#c6c5d8] hover:border-[#00AEEF] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50">
                    <input
                      type="file"
                      onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="quote-file-input"
                    />
                    <label htmlFor="quote-file-input" className="cursor-pointer block">
                      <span className="material-symbols-outlined text-[32px] text-[#00AEEF] block mb-1">
                        upload_file
                      </span>
                      {uploadedFile ? (
                        <p className="text-xs font-bold text-emerald-700">
                          {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} Mo)
                        </p>
                      ) : (
                        <>
                          <p className="text-xs font-bold text-[#111111]">Cliquez ou déposez votre fichier (PDF, AI, PSD, ZIP)</p>
                          <p className="text-[11px] text-[#666666] mt-0.5">Jusqu'à 100 Mo par envoi</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full py-4 bg-[#00AEEF] hover:bg-[#008CC4] text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  {loading ? 'Enregistrement en cours…' : 'Envoyer ma demande de devis express'}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Assistance & Showroom Information */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#E5E5E5] shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-[#111111] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00AEEF] text-[20px]">schedule</span>
                Délai de Réponse Garanti
              </h4>
              <p className="text-xs text-[#333333] leading-relaxed">
                Nos chargés d'affaires B2B traitent toutes les demandes en moins de <strong>2 heures ouvrées</strong> du lundi au samedi.
              </p>
              <div className="p-3 bg-[#F5F5F5] rounded-xl text-xs space-y-1">
                <p className="font-bold text-[#00AEEF]">Besoin d'un chiffrage urgentissime ?</p>
                <p className="text-[#333333]">Contactez directement notre chef de fabrication par téléphone :</p>
                <p className="font-mono font-bold text-sm text-[#111111] pt-1">74 461 868 / 56 495 697</p>
                <p className="text-[11px] text-[#666666]">Email : hajer.gharsallah12@gmail.com</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#EC008C] to-[#004e5b] p-6 rounded-3xl text-white shadow-md space-y-3">
              <span className="material-symbols-outlined text-[28px] text-cyan-300">verified</span>
              <h4 className="font-bold text-base">Atelier Certifié FSC® & Imprim'Vert</h4>
              <p className="text-xs text-white/85 leading-relaxed">
                Tous nos supports sont issus de forêts éco-gérées. Papiers certifiés FSC®, encres sans solvants nocifs et recyclage à 100% de nos chutes de massicot.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
