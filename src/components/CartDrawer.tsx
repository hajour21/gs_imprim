import React, { useState } from 'react';
import { CartItem } from '../types';
import { auth } from '../lib/firebase';
import { saveOrder } from '../lib/data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onRequireAuth: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onRequireAuth,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  
  // Checkout flow state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [authRequired, setAuthRequired] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    company: '',
    phone: '',
    governorate: 'Tunis',
    address: '',
    notes: '',
    paymentMethod: 'cod', // 'cod' | 'virement' | 'card'
  });

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const shippingThreshold = 120;
  const shippingCost = discountedSubtotal >= shippingThreshold || discountedSubtotal === 0 ? 0 : 8;
  const tvaRate = 0.19; // 19% TVA Tunisie
  const totalTVA = discountedSubtotal * tvaRate;
  const totalTTC = discountedSubtotal + totalTVA + shippingCost;
  const freeShippingProgress = Math.min(100, Math.round((discountedSubtotal / shippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'GSIMPRIMPRO') {
      setDiscountPercent(20);
      setPromoMessage({ text: 'Code GSIMPRIMPRO appliqué : -20% sur votre commande !', isError: false });
    } else if (cleanCode === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoMessage({ text: 'Code WELCOME10 appliqué : -10% de bienvenue !', isError: false });
    } else {
      setPromoMessage({ text: 'Code invalide. Essayez GSIMPRIMPRO pour 20% de remise.', isError: true });
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setAuthRequired(true);
      onRequireAuth();
      return;
    }
    const order = await saveOrder(auth.currentUser.uid, cart, customerInfo, {
      subtotal: discountedSubtotal,
      shipping: shippingCost,
      total: totalTTC,
    });
    setOrderId(order.id);
    setOrderConfirmed(true);
  };

  const handleFinishOrder = () => {
    onClearCart();
    setOrderConfirmed(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/5" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative z-50 flex h-full w-full max-w-lg flex-col bg-white shadow-[0_18px_45px_rgba(16,24,40,0.16)] animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E5E5E5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E6F8FF] text-[#00AEEF] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            </div>
            <div>
              <h2 id="cart-drawer-title" className="font-bold text-lg text-[#101828]">
                {orderConfirmed ? 'Commande Confirmée' : isCheckingOut ? 'Finalisation Commande' : 'Mon Panier'}
              </h2>
              <p className="text-xs text-[#666666]">
                {cart.length} {cart.length > 1 ? 'articles configurés' : 'article configuré'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#666666] hover:text-[#111111] hover:bg-[#E5E5E5] transition-colors"
            aria-label="Fermer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {!orderConfirmed && !isCheckingOut && (
          <div className="px-5 py-3 bg-[#E6F8FF]/60 border-b border-[#E5E5E5]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#111111] mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#EC008C]">local_shipping</span>
                {discountedSubtotal >= shippingThreshold ? (
                  <span className="text-[#EC008C] font-bold">Livraison offerte en Tunisie ! 🎉</span>
                ) : (
                  <span>
                    Plus que <strong className="font-bold text-[#00AEEF]">{(shippingThreshold - discountedSubtotal).toFixed(1)} DT</strong> pour la livraison offerte
                  </span>
                )}
              </span>
              <span>{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#EC008C] to-[#00AEEF] rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {orderConfirmed ? (
            /* Order Success View */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  Bon de commande n° {orderId}
                </span>
                <h3 className="text-2xl font-bold text-[#111111] mt-3">Merci pour votre confiance !</h3>
                <p className="text-sm text-[#333333] mt-2 max-w-sm mx-auto">
                  Votre dossier technique a été transmis à notre atelier de production (Route de Gabès km 1,5, Sfax). Notre équipe PAO inspecte vos fichiers d'impression.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E5E5E5] text-left text-xs space-y-2 mt-4">
                <div className="flex justify-between border-b pb-2 border-slate-100">
                  <span className="text-[#666666]">Client :</span>
                  <span className="font-bold text-[#111111]">{customerInfo.fullName} {customerInfo.company ? `(${customerInfo.company})` : ''}</span>
                </div>
                <div className="flex justify-between border-b pb-2 border-slate-100">
                  <span className="text-[#666666]">Gouvernorat de livraison :</span>
                  <span className="font-bold text-[#111111]">{customerInfo.governorate}</span>
                </div>
                <div className="flex justify-between border-b pb-2 border-slate-100">
                  <span className="text-[#666666]">Téléphone de contact :</span>
                  <span className="font-bold text-[#111111]">{customerInfo.phone}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm text-[#00AEEF]">
                  <span>Montant Total TTC :</span>
                  <span>{totalTTC.toFixed(2)} DT</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-center gap-2 text-left">
                <span className="material-symbols-outlined text-[20px] shrink-0 text-amber-600">notifications_active</span>
                <span>Un SMS et email de suivi avec BAT électronique (Bon À Tirer) vous seront envoyés sous 2 heures.</span>
              </div>

              <button
                onClick={handleFinishOrder}
                className="w-full py-3 bg-[#00AEEF] text-white rounded-xl font-bold text-sm hover:bg-[#008CC4] transition-colors shadow-sm"
              >
                Retourner à l'accueil
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form */
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              {authRequired && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                  Connectez-vous ou créez un compte pour enregistrer votre commande, puis cliquez à nouveau sur « Confirmer ».
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#00AEEF] hover:underline mb-1"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Retour au récapitulatif
              </button>

              <div className="bg-white p-4 rounded-xl border border-[#E5E5E5] space-y-3">
                <h3 className="font-bold text-sm text-[#111111] border-b pb-2 border-slate-100 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#00AEEF]">person</span>
                  Coordonnées de Facturation & Livraison
                </h3>

                <div>
                  <label className="block text-xs font-bold text-[#333333] mb-1">Nom et Prénom *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.fullName}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                    placeholder="Ex: Mohamed Ben Salem"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#c6c5d8] focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">Société / Raison Sociale</label>
                    <input
                      type="text"
                      value={customerInfo.company}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                      placeholder="Ex: Alpha Tech SARL"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#c6c5d8] focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">Téléphone mobile *</label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="+216 98 123 456"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#c6c5d8] focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">Gouvernorat *</label>
                    <select
                      value={customerInfo.governorate}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, governorate: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#c6c5d8] focus:border-[#00AEEF] bg-white outline-none"
                    >
                      <option value="Tunis">Tunis (Grand Tunis)</option>
                      <option value="Ariana">Ariana</option>
                      <option value="Ben Arous">Ben Arous</option>
                      <option value="Manouba">Manouba</option>
                      <option value="Nabeul">Nabeul / Hammamet</option>
                      <option value="Sousse">Sousse</option>
                      <option value="Monastir">Monastir</option>
                      <option value="Sfax">Sfax</option>
                      <option value="Bizerte">Bizerte</option>
                      <option value="Autre région">Autre Gouvernorat (Livraison Express)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">Adresse complète *</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      placeholder="Rue, Immeuble, Étage..."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#c6c5d8] focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#333333] mb-1">Instructions atelier / PAO</label>
                  <textarea
                    rows={2}
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    placeholder="Précisions de façonnage, date impérative d'événement..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#c6c5d8] focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] outline-none resize-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-white p-4 rounded-xl border border-[#E5E5E5] space-y-2.5">
                <h3 className="font-bold text-sm text-[#111111] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#EC008C]">payments</span>
                  Modalité de Règlement
                </h3>

                <label className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${customerInfo.paymentMethod === 'cod' ? 'border-[#00AEEF] bg-[#E6F8FF]/30' : 'border-[#E5E5E5] hover:bg-slate-50'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={customerInfo.paymentMethod === 'cod'}
                    onChange={() => setCustomerInfo({ ...customerInfo, paymentMethod: 'cod' })}
                    className="text-[#00AEEF]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#111111]">Paiement à la livraison (Espèces ou Chèque)</p>
                    <p className="text-[11px] text-[#666666]">Règlement direct lors de la réception par transporteur express.</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${customerInfo.paymentMethod === 'virement' ? 'border-[#00AEEF] bg-[#E6F8FF]/30' : 'border-[#E5E5E5] hover:bg-slate-50'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="virement"
                    checked={customerInfo.paymentMethod === 'virement'}
                    onChange={() => setCustomerInfo({ ...customerInfo, paymentMethod: 'virement' })}
                    className="text-[#00AEEF]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#111111]">Virement bancaire / Mandat Pro</p>
                    <p className="text-[11px] text-[#666666]">Facture proforma et RIB BIAT / Attijari fournis instantanément.</p>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#00AEEF] hover:bg-[#008CC4] text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">check</span>
                Confirmer ma commande ({totalTTC.toFixed(2)} DT TTC)
              </button>
            </form>
          ) : cart.length === 0 ? (
            /* Empty Cart View */
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F5F5] text-[#666666] mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">remove_shopping_cart</span>
              </div>
              <h3 className="font-bold text-lg text-[#111111]">Votre panier est vide</h3>
              <p className="text-xs text-[#666666] max-w-xs mx-auto">
                Explorez nos configurateurs interactifs pour personnaliser cartes de visite, bâches, stickers ou tampons.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#00AEEF] text-white rounded-lg text-xs font-bold hover:bg-[#008CC4] transition-colors"
              >
                Découvrir le catalogue
              </button>
            </div>
          ) : (
            /* Cart Items List */
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-white rounded-xl border border-[#E5E5E5] flex gap-3 shadow-xs hover:border-[#c6c5d8] transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-18 h-18 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-[#111111] truncate">{item.title}</h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#666666] hover:text-red-500 transition-colors p-0.5"
                        title="Supprimer"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-[#333333] line-clamp-2 mt-0.5 leading-snug">
                      {item.specs}
                    </p>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#666666]">Quantité :</span>
                        <span className="text-xs font-bold text-[#111111] bg-[#F5F5F5] px-2 py-0.5 rounded">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-[#00AEEF]">
                          {item.totalPrice.toFixed(2)} DT
                        </span>
                        <span className="text-[10px] text-[#666666] block">HT</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Code promo (ex: GSIMPRIMPRO)"
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#c6c5d8] focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] outline-none bg-white uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#E6F8FF] hover:bg-[#00AEEF] hover:text-white text-[#00AEEF] text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Appliquer
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] mt-1.5 font-semibold ${promoMessage.isError ? 'text-red-600' : 'text-emerald-700'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer Summary (only if not empty & not confirmed) */}
        {cart.length > 0 && !orderConfirmed && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#E5E5E5] space-y-3 shadow-lg">
            {!isCheckingOut && (
              <div className="space-y-1.5 text-xs text-[#333333]">
                <div className="flex justify-between">
                  <span>Sous-total HT</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} DT</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Remise ({discountPercent}%)</span>
                    <span>-{discountAmount.toFixed(2)} DT</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>TVA (19%)</span>
                  <span className="font-semibold">{totalTVA.toFixed(2)} DT</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison Tunisie</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? <span className="text-[#EC008C] font-bold">Gratuite</span> : `${shippingCost.toFixed(2)} DT`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#111111] pt-2 border-t border-slate-100">
                  <span>Total TTC</span>
                  <span className="text-[#00AEEF] text-lg font-black">{totalTTC.toFixed(2)} DT</span>
                </div>
              </div>
            )}

            {!isCheckingOut && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="flex-1 py-3 bg-[#00AEEF] hover:bg-[#008CC4] text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  Passer la commande
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
