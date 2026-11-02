import React, { useState } from 'react';

export const WhatsAppFloating: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  const sendWhatsApp = (textToSend?: string) => {
    const finalMsg = encodeURIComponent(textToSend || message || 'Bonjour GS Imprim, je souhaite un renseignement sur une commande.');
    window.open(`https://wa.me/21656495697?text=${finalMsg}`, '_blank');
    setChatOpen(false);
    setMessage('');
  };

  const quickQuestions = [
    'Demande de validation BAT express',
    'Question sur papier couché 350g vs Rives',
    'Délai de fabrication urgent 24h',
    'Tarif dégressif pour gros tirage (+5000 ex)'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup */}
      {chatOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E5E5E5] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-[#075e54] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <div>
                <h4 className="font-bold text-sm">GS Imprim Sfax</h4>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Équipe PAO en ligne (Sfax)
                </p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="p-4 bg-[#ece5dd]/40 space-y-3 max-h-64 overflow-y-auto text-xs">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-xs text-[#111111] space-y-1">
              <p className="font-bold text-[#075e54]">Bonjour ! 👋</p>
              <p>Une question sur un format, un grammage papier ou un délai de livraison en Tunisie ? Notre chef d'atelier vous répond immédiatement.</p>
              <span className="text-[10px] text-slate-400 block text-right mt-1">À l'instant</span>
            </div>

            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Questions fréquentes :</p>
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendWhatsApp(q)}
                  className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 text-[11px] font-semibold text-[#111111] border border-slate-200 hover:border-emerald-500 transition-all flex items-center justify-between"
                >
                  <span>{q}</span>
                  <span className="material-symbols-outlined text-[14px] text-emerald-600">arrow_forward</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              onKeyDown={(e) => e.key === 'Enter' && sendWhatsApp()}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-emerald-600 outline-none"
            />
            <button
              onClick={() => sendWhatsApp()}
              className="w-9 h-9 rounded-xl bg-[#25d366] text-white flex items-center justify-center hover:bg-[#128c7e] transition-colors shrink-0"
              title="Envoyer sur WhatsApp"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="group relative flex items-center gap-2 px-4 py-3 bg-[#25d366] hover:bg-[#20bd5a] text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
        aria-label="Contacter sur WhatsApp"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping absolute -top-1 -right-1" />
        <span className="w-2.5 h-2.5 rounded-full bg-white absolute -top-1 -right-1" />
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.781 2.796.781 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.767-5.768-5.767zm6.541 5.766c-.001 3.606-2.934 6.54-6.541 6.54-1.127 0-2.222-.292-3.188-.847l-3.535.928.943-3.447c-.607-1.022-.927-2.195-.927-3.402.001-3.606 2.934-6.54 6.54-6.54 3.606 0 6.54 2.934 6.54 6.54zm-3.642 2.378c-.149-.074-.881-.435-1.018-.485-.137-.049-.236-.074-.336.075-.099.149-.385.485-.472.584-.087.099-.174.112-.323.037-.149-.074-.629-.232-1.198-.739-.443-.395-.742-.883-.829-1.032-.087-.149-.009-.23.065-.304.067-.067.149-.174.223-.261.074-.087.099-.149.149-.248.049-.099.025-.186-.012-.261-.037-.075-.336-.807-.46-1.106-.121-.29-.244-.251-.336-.256l-.286-.005c-.099 0-.261.037-.397.186-.137.149-.522.509-.522 1.242 0 .733.534 1.441.609 1.54.074.099 1.05 1.603 2.544 2.248 1.494.646 1.494.431 1.767.406.273-.025.881-.36 1.005-.708.124-.348.124-.646.087-.708-.037-.062-.136-.099-.285-.174z" />
        </svg>
        <span className="text-xs font-bold tracking-tight hidden sm:inline">WhatsApp Studio</span>
      </button>
    </div>
  );
};
