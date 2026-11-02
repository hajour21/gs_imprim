import React, { useState } from 'react';
import { ViewType } from '../types';

interface EspaceProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewType) => void;
}

export const EspaceProModal: React.FC<EspaceProModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'invoices' | 'settings'>('orders');
  const [reorderSuccess, setReorderSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const mockOrders = [
    {
      id: 'GS-2025-88412',
      date: '22 Fév 2025',
      title: '500 ex Cartes Soft-Touch + Vernis 3D Sélectif',
      client: 'Mohamed Khemir (Design Agency Tunis)',
      status: 'En livraison express',
      statusColor: 'bg-blue-100 text-blue-700',
      total: '85.000 DT TTC',
      pdf: 'Facture_GS88412.pdf'
    },
    {
      id: 'GS-2025-87190',
      date: '14 Fév 2025',
      title: 'Bâche PVC 510g (300 × 150 cm) + 12 Œillets',
      client: 'Mohamed Khemir (Design Agency Tunis)',
      status: 'Livré & Conforme',
      statusColor: 'bg-emerald-100 text-emerald-700',
      total: '81.000 DT TTC',
      pdf: 'Facture_GS87190.pdf'
    },
    {
      id: 'GS-2025-85901',
      date: '28 Jan 2025',
      title: 'Tampon Trodat Printy 4913 (Matricule fiscal SARL)',
      client: 'Mohamed Khemir (Design Agency Tunis)',
      status: 'Livré & Conforme',
      statusColor: 'bg-emerald-100 text-emerald-700',
      total: '35.000 DT TTC',
      pdf: 'Facture_GS85901.pdf'
    }
  ];

  const handleReorder = (orderId: string) => {
    setReorderSuccess(`Commande ${orderId} dupliquée dans votre panier technique.`);
    setTimeout(() => setReorderSuccess(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 p-4" role="dialog" aria-modal="true" aria-label="Espace client professionnel">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-50 flex h-[min(90vh,52rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#E5E9EF] bg-white shadow-[0_18px_45px_rgba(16,24,40,0.16)] animate-in fade-in zoom-in-95 duration-200">
        {/* Header Profile Banner */}
        <div className="bg-gradient-to-r from-[#00AEEF] to-[#EC008C] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="flex items-center gap-4">
            <img
              src="/assets/aistudio/Image_15_15122008.jpeg"
              alt="Profil Client"
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida/AEtjO1UgPDHvQ6tB0nAqJwKlB3Xq3mot0sifC0s7on-IJk0J-i9XPz7LEpm7L5Ia4-jQR06lov-Y-HMQAdSby32C3IlyskiWVdhmfmZvbeYllABoLQkxVmErxb7Ll1MtnR4k-F4da3u6XIAS9PT49NfqgkAfFz-29MKZ1GZkBU1XrMxkhAH_kCc-MEBidKFmeZAyFIFW9zN_2K8acgKvEXPCn9Y6nUSNRgQIPqtRCnvvEdiODZml-puN6tZU-4jT";
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold">Mohamed Khemir</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  Compte Agence Pro
                </span>
              </div>
              <p className="text-white/80 text-xs mt-0.5">Khemir Creative Studio • Tunis, Tunisie</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-white/90 font-medium">
                <span>Remise permanente : <strong>-15% B2B</strong></span>
                <span>•</span>
                <span>En-cours autorisé : <strong>1 500 DT</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E5E5E5] px-6 bg-[#FFFFFF]">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#00AEEF] text-[#00AEEF]'
                : 'border-transparent text-[#666666] hover:text-[#111111]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">inventory_2</span>
            Commandes en cours ({mockOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'invoices'
                ? 'border-[#00AEEF] text-[#00AEEF]'
                : 'border-transparent text-[#666666] hover:text-[#111111]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            Factures & Reçus
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'border-[#00AEEF] text-[#00AEEF]'
                : 'border-transparent text-[#666666] hover:text-[#111111]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">badge</span>
            Matricule Fiscal & Profil
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {reorderSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
              <span>{reorderSuccess}</span>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#c6c5d8] transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-extrabold text-[#00AEEF]">{order.id}</span>
                      <span className="text-xs text-[#666666] ml-2">Commandé le {order.date}</span>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full w-fit ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-[#111111]">{order.title}</h4>
                      <p className="text-xs text-[#666666] mt-0.5">Montant : {order.total}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-1 sm:pt-0">
                      <button
                        onClick={() => handleReorder(order.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#E6F8FF] text-[#00AEEF] hover:bg-[#00AEEF] hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[14px]">replay</span>
                        Recommander
                      </button>
                      <button
                        onClick={() => alert(`Téléchargement de la facture ${order.pdf}`)}
                        className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] hover:bg-slate-50 text-xs font-bold text-[#333333] transition-colors flex items-center gap-1"
                        title="Télécharger la facture PDF"
                      >
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-2">
              <p className="text-xs text-[#666666] mb-2">
                Historique comptable avec TVA 19% déductible et matricule fiscal tunisien.
              </p>
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E5E5] text-[#666666]">
                    <th className="py-2">Réf Facture</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Total TTC</th>
                    <th className="py-2">Statut</th>
                    <th className="py-2 text-right">Télécharger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  <tr>
                    <td className="py-2.5 font-bold text-[#111111]">FAC-2025-084</td>
                    <td className="py-2.5 text-[#666666]">22/02/2025</td>
                    <td className="py-2.5 font-bold text-[#00AEEF]">85.000 DT</td>
                    <td className="py-2.5"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">Acquittée</span></td>
                    <td className="py-2.5 text-right">
                      <button onClick={() => alert('Téléchargement Facture FAC-2025-084')} className="text-[#00AEEF] font-bold hover:underline">PDF</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#111111]">FAC-2025-061</td>
                    <td className="py-2.5 text-[#666666]">14/02/2025</td>
                    <td className="py-2.5 font-bold text-[#00AEEF]">81.000 DT</td>
                    <td className="py-2.5"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">Acquittée</span></td>
                    <td className="py-2.5 text-right">
                      <button onClick={() => alert('Téléchargement Facture FAC-2025-061')} className="text-[#00AEEF] font-bold hover:underline">PDF</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#111111]">FAC-2025-019</td>
                    <td className="py-2.5 text-[#666666]">28/01/2025</td>
                    <td className="py-2.5 font-bold text-[#00AEEF]">35.000 DT</td>
                    <td className="py-2.5"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">Acquittée</span></td>
                    <td className="py-2.5 text-right">
                      <button onClick={() => alert('Téléchargement Facture FAC-2025-019')} className="text-[#00AEEF] font-bold hover:underline">PDF</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white p-4 rounded-xl border border-[#E5E5E5] space-y-3 text-xs">
              <h4 className="font-bold text-sm text-[#111111]">Fiche Entreprise</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[#666666] block">Raison Sociale</span>
                  <span className="font-bold text-[#111111]">KHEMIR CREATIVE STUDIO SUARL</span>
                </div>
                <div>
                  <span className="text-[#666666] block">Matricule Fiscal</span>
                  <span className="font-bold text-[#111111]">1689420/A/M/000</span>
                </div>
                <div>
                  <span className="text-[#666666] block">Code TVA / Assujettissement</span>
                  <span className="font-bold text-[#111111]">A - Totalement assujetti</span>
                </div>
                <div>
                  <span className="text-[#666666] block">Contact Téléphone</span>
                  <span className="font-bold text-[#111111]">+216 29 111 222</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => alert('Coordonnées mises à jour avec succès')}
                  className="px-4 py-2 bg-[#00AEEF] text-white rounded-lg font-bold hover:bg-[#008CC4] transition-colors"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FFFFFF] border-t border-[#E5E5E5] flex items-center justify-between text-xs">
          <span className="text-[#666666]">Support Atelier Sfax dédié : 74 461 868 / 56 495 697</span>
          <button
            onClick={() => {
              onNavigate('catalog');
              onClose();
            }}
            className="px-4 py-2 bg-[#00AEEF] text-white rounded-lg font-bold hover:bg-[#008CC4] transition-colors"
          >
            Nouvelle commande →
          </button>
        </div>
      </div>
    </div>
  );
};
