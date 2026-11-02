import React, { useState } from 'react';
import { ViewType } from '../types';
import { saveContactMessage } from '../lib/data';

interface ContactViewProps {
  onNavigate: (view: ViewType) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Renseignement général',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await saveContactMessage(formData);
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Impossible d’envoyer votre message.');
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
          <span className="text-[#111111] font-bold">Contact & Showrooms</span>
        </nav>
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Rencontrons-nous à l'Atelier ou au Showroom
          </h1>
          <p className="text-sm text-[#333333] mt-1.5 leading-relaxed">
            Venez découvrir nos papiers d'art, échanger avec nos directeurs de fabrication ou poser vos questions par téléphone et WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#E5E5E5] shadow-sm">
            {sent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-[#111111]">Message bien reçu !</h3>
                <p className="text-xs sm:text-sm text-[#333333] max-w-sm mx-auto leading-relaxed">
                  Merci {formData.name}. Notre responsable clientèle vous répondra dans les meilleurs délais sur votre boîte {formData.email}.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2.5 bg-[#00AEEF] text-white text-xs font-bold rounded-xl"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-[#111111] border-b pb-2 border-slate-100 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[20px]">mail</span>
                  Formulaire de Contact Direct
                </h3>
                {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">Nom et Prénom *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Mohamed Ben Salem"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+216 71 000 000"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">Adresse Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@societe.tn"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">Objet de votre demande</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none bg-white"
                    >
                      <option value="Renseignement général">Renseignement général</option>
                      <option value="Suivi de commande en cours">Suivi de commande en cours</option>
                      <option value="Rendez-vous showroom échantillons">Rendez-vous showroom échantillons</option>
                      <option value="Partenariat agence & grand compte">Partenariat agence & grand compte</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#333333] mb-1">Votre message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c6c5d8] focus:border-[#00AEEF] outline-none resize-none"
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full py-3.5 bg-[#00AEEF] hover:bg-[#008CC4] text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  {loading ? 'Envoi en cours…' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Physical Addresses & Locations */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Siège & Showroom Principal Sfax */}
            <div className="bg-white p-6 rounded-3xl border border-[#E5E5E5] shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E6F8FF] text-[#00AEEF] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">storefront</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">Siège & Showroom Principal (Sfax)</h4>
                  <p className="text-[11px] text-[#666666]">Accueil clients, consultation des nuanciers & commandes</p>
                </div>
              </div>
              <div className="text-xs text-[#333333] space-y-1.5 pt-1">
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[16px]">location_on</span>
                  <strong>Route de Gabès km 1,5, 3000 Sfax, Tunisie</strong>
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[16px]">call</span>
                  <span>Fixe : <strong>74 461 868</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[16px]">phone_iphone</span>
                  <span>Mobile & WhatsApp : <strong>56 495 697</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[16px]">mail</span>
                  <a href="mailto:hajer.gharsallah12@gmail.com" className="hover:underline font-semibold text-[#00AEEF]">
                    hajer.gharsallah12@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00AEEF] text-[16px]">schedule</span>
                  Lundi - Vendredi : 08h30 - 18h00 | Samedi : 08h30 - 13h00
                </p>
              </div>
            </div>

            {/* Atelier Central & Retrait Express */}
            <div className="bg-white p-6 rounded-3xl border border-[#E5E5E5] shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#EC008C] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">factory</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">Atelier de Production & Expéditions</h4>
                  <p className="text-[11px] text-[#666666]">Parc offset, découpe laser & façonnage de prestige</p>
                </div>
              </div>
              <div className="text-xs text-[#333333] space-y-1.5 pt-1">
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#EC008C] text-[16px]">location_on</span>
                  Route de Gabès km 1,5, 3000 Sfax, Tunisie
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#EC008C] text-[16px]">local_shipping</span>
                  Livraison sécurisée partout en Tunisie (24 gouvernorats)
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-gradient-to-r from-[#25d366] to-[#128c7e] p-6 rounded-3xl text-white shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Discuter directement sur WhatsApp</span>
                <span className="material-symbols-outlined text-[24px]">chat</span>
              </div>
              <p className="text-xs text-white/90">
                Idéal pour nous envoyer un fichier à inspecter rapidement ou pour valider un BAT en direct.
              </p>
              <a
                href="https://wa.me/21656495697"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 px-4 py-2 bg-white text-[#128c7e] text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors"
              >
                Ouvrir WhatsApp (+216 56 495 697) →
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
