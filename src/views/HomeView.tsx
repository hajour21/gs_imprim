import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Palette, Sparkles, X } from 'lucide-react';
import type { ViewType } from '../types';

type NodeKey = 'catalog' | 'portfolio' | 'quote-express' | 'contact';
type Panel = { key: NodeKey; label: string; color: string; text: string; items: Array<[string, string]>; view: ViewType };

const PANELS: Panel[] = [
  { key: 'catalog', label: 'Catalogue', color: '#00AEEF', text: 'Des supports imprimés conçus pour donner une présence nette à vos idées, du petit format au grand affichage.', items: [['Papeterie', 'cartes · flyers · brochures'], ['Signalétique', 'roll-up · plaques · bâches'], ['Personnalisation', 'stickers · textile · objets']], view: 'catalog' },
  { key: 'portfolio', label: 'Réalisations', color: '#EC008C', text: 'Une sélection de matières, de couleurs et de gestes imprimés par l’atelier GS Imprim.', items: [['Identité', 'supports de marque'], ['Événement', 'formats qui se voient'], ['Finition', 'détails qui restent']], view: 'portfolio' },
  { key: 'quote-express', label: 'Devis express', color: '#FFD100', text: 'Décrivez votre projet et recevez une réponse claire de notre atelier sous 2 heures ouvrées.', items: [['1', 'décrivez le besoin'], ['2', 'ajoutez votre fichier'], ['3', 'recevez votre estimation']], view: 'quote-express' },
  { key: 'contact', label: 'Contact', color: '#101828', text: 'Une question technique, un format atypique ou une envie de créer autrement ? Parlons-en.', items: [['Sfax', 'atelier & showroom'], ['Téléphone', '74 461 868'], ['WhatsApp', '56 495 697']], view: 'contact' },
];

export const HomeView: React.FC<{ onNavigate: (view: ViewType) => void }> = ({ onNavigate }) => {
  const [activePanel, setActivePanel] = useState<Panel | null>(null);
  const [mode, setMode] = useState<'ink' | 'neon' | 'paper'>('ink');
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const move = (event: PointerEvent) => setPointer({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  const openPanel = (panel: Panel) => setActivePanel(panel);

  return (
    <div className={`creative-home creative-home-${mode}`} style={{ '--pointer-x': `${pointer.x}%`, '--pointer-y': `${pointer.y}%` } as React.CSSProperties}>
      <div className="creative-grain" aria-hidden="true" />
      <div className="creative-switcher" role="group" aria-label="Styles visuels">
        <button aria-pressed={mode === 'ink'} onClick={() => setMode('ink')}>01 Encre</button>
        <button aria-pressed={mode === 'neon'} onClick={() => setMode('neon')}>02 Néon</button>
        <button aria-pressed={mode === 'paper'} onClick={() => setMode('paper')}>03 Papier</button>
      </div>

      <div className="creative-intro"><span><Palette size={14} /> GS Imprim · Sfax</span><span>Atelier d’impression & façonnage</span></div>
      <div className="creative-title"><p className="creative-kicker">Une interface qui se touche</p><h1>GS<br /><em>Imprim</em></h1><p className="creative-subtitle">Papier · couleur · précision · matière</p></div>

      <div className="creative-orbit creative-orbit-one" aria-hidden="true" />
      <div className="creative-orbit creative-orbit-two" aria-hidden="true" />
      {PANELS.map((panel, index) => <button key={panel.key} className={`creative-node creative-node-${index + 1}`} style={{ '--node-color': panel.color } as React.CSSProperties} onClick={() => openPanel(panel)}><span>{panel.label}</span><ArrowUpRight size={17} /></button>)}

      <div className="creative-footer"><span>Déplacez le curseur pour activer la matière</span><button onClick={() => onNavigate('catalog')}>Entrer dans l’atelier <ArrowUpRight size={15} /></button><span>© GS Imprim</span></div>

      {activePanel && <div className="creative-panel" style={{ '--panel-color': activePanel.color } as React.CSSProperties} role="dialog" aria-modal="true" aria-label={activePanel.label}>
        <button className="creative-close" aria-label="Fermer" onClick={() => setActivePanel(null)}><X size={19} /> Fermer</button>
        <div className="creative-panel-inner"><p className="creative-kicker"><Sparkles size={14} /> GS Imprim / {activePanel.label}</p><h2>{activePanel.label}</h2><p>{activePanel.text}</p><ul>{activePanel.items.map(([title, detail]) => <li key={title}><strong>{title}</strong><small>{detail}</small></li>)}</ul><button className="creative-panel-action" onClick={() => { setActivePanel(null); onNavigate(activePanel.view); }}>Découvrir <ArrowUpRight size={17} /></button></div>
      </div>}
    </div>
  );
};
