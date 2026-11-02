import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

type Props = { isOpen: boolean; onClose: () => void };

export const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'register') {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        await setDoc(doc(db, 'users', result.user.uid), {
          name,
          email,
          createdAt: new Date(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de créer le compte.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/10 p-4" role="dialog" aria-modal="true" aria-labelledby="auth-dialog-title">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-[#E5E9EF] bg-white p-6 shadow-[0_18px_45px_rgba(16,24,40,0.16)]">
        <button onClick={onClose} aria-label="Fermer la fenêtre de connexion" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-50">✕</button>
        <h2 id="auth-dialog-title" className="text-xl font-extrabold text-[#101828]">{mode === 'login' ? 'Se connecter' : 'Créer un compte'}</h2>
        <p className="mt-1 text-sm text-slate-500">Gérez vos commandes GS Imprim.</p>
        <form onSubmit={submit} className="mt-5 space-y-3">
          {mode === 'register' && <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom complet" className="w-full rounded-lg border p-3 text-sm" />}
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adresse email" className="w-full rounded-lg border p-3 text-sm" />
          <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe (6 caractères minimum)" className="w-full rounded-lg border p-3 text-sm" />
          {error && <p className="rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</p>}
          <button disabled={loading} className="w-full rounded-lg bg-[#00AEEF] py-3 font-bold text-white disabled:opacity-60">
            {loading ? 'Patientez…' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
          </button>
        </form>
        <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }} className="mt-4 w-full text-sm font-semibold text-[#00AEEF]">
          {mode === 'login' ? 'Créer un nouveau compte' : 'J’ai déjà un compte'}
        </button>
      </div>
    </div>
  );
};
