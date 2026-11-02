import React from 'react';
import type { ViewType } from '../types';

type Props = { onNavigate: (view: ViewType) => void };

export const NotFoundView: React.FC<Props> = ({ onNavigate }) => (
  <div className="page-shell flex min-h-[60vh] items-center justify-center px-4 py-20">
    <div className="surface-card w-full max-w-xl p-8 text-center sm:p-12">
      <span className="eyebrow">Erreur 404</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#101828] sm:text-5xl">Page introuvable</h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#526071]">Cette page n’existe pas ou n’est plus disponible.</p>
      <button onClick={() => onNavigate('home')} className="btn-primary mt-7">Retour à l’accueil</button>
    </div>
  </div>
);
