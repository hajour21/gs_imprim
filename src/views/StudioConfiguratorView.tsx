import { useEffect, useMemo, useRef, useState } from 'react';
import { Stage as ThreeStage, StageFinish, StageProduct } from '../lib/Stage';

type ProductId = 'mug' | 'gourde' | 'carnet' | 'cartes' | 'nfc';
type Finish = 'Mat' | 'Brillant' | 'Soft-touch' | 'Métallisé';
type ColorKey = 'marine' | 'cyan' | 'magenta' | 'jaune' | 'blanc' | 'noir';

const PRODUCTS: Record<ProductId, { name: string; short: string; price: number; glyph: string }> = {
  mug: { name: 'Mug', short: 'Mugs', price: 12, glyph: '◒' },
  gourde: { name: 'Gourde', short: 'Gourdes', price: 28, glyph: '♢' },
  carnet: { name: 'Carnet', short: 'Carnets', price: 18, glyph: '▤' },
  cartes: { name: 'Cartes de visite', short: 'Cartes', price: 0.35, glyph: '▱' },
  nfc: { name: 'Porte-clé NFC', short: 'NFC', price: 8, glyph: '◎' },
};
const COLORS: { key: ColorKey; label: string; value: string }[] = [
  { key: 'marine', label: 'Marine', value: '#1b2a5c' }, { key: 'cyan', label: 'Cyan', value: '#00aeef' },
  { key: 'magenta', label: 'Magenta', value: '#ec008c' }, { key: 'jaune', label: 'Jaune', value: '#ffd100' },
  { key: 'blanc', label: 'Blanc', value: '#f2efe8' }, { key: 'noir', label: 'Noir', value: '#14171f' },
];
const FINISHES: { label: Finish; detail: string; extra: number }[] = [
  { label: 'Mat', detail: 'doux & profond', extra: 0 }, { label: 'Brillant', detail: 'reflets vernis', extra: .05 },
  { label: 'Soft-touch', detail: 'velours au toucher', extra: .1 }, { label: 'Métallisé', detail: 'éclat premium', extra: .2 },
];

function normalize(text: string) { return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }

function interpret(text: string) {
  const n = normalize(text); let product: ProductId = 'mug';
  if (n.includes('gourde') || n.includes('bouteille') || n.includes('thermos')) product = 'gourde';
  else if (n.includes('carnet') || n.includes('cahier')) product = 'carnet';
  else if (n.includes('carte') || n.includes('visite')) product = 'cartes';
  else if (n.includes('cle') || n.includes('nfc') || n.includes('porte')) product = 'nfc';
  let color: ColorKey = 'marine';
  if (n.includes('cyan') || n.includes('bleu')) color = 'cyan'; else if (n.includes('magenta') || n.includes('rose') || n.includes('rouge')) color = 'magenta';
  else if (n.includes('jaune') || n.includes('dore') || n.includes('orange')) color = 'jaune'; else if (n.includes('blanc')) color = 'blanc'; else if (n.includes('noir')) color = 'noir';
  let finish: Finish = n.includes('metal') ? 'Métallisé' : n.includes('soft') || n.includes('velours') ? 'Soft-touch' : n.includes('brill') || n.includes('glossy') ? 'Brillant' : 'Mat';
  const quantityMatch = n.match(/\b(\d{1,4})\b/); const quantity = quantityMatch ? Math.min(1000, Math.max(10, Math.round(Number(quantityMatch[1]) / 10) * 10)) : 50;
  const quoted = text.match(/[«"]([^»"]+)[»"]/); const afterName = text.match(/nom\s+([\p{L}\s-]{2,18})/iu); const name = (quoted?.[1] || afterName?.[1] || '').trim().slice(0, 18);
  return { product, color, finish, quantity, name };
}

function LegacyStage({ product, color, finish, text, logo }: { product: ProductId; color: string; finish: Finish; text: string; logo?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null); const drag = useRef({ x: 0, rotation: -.15 });
  useEffect(() => {
    const el = canvas.current; if (!el) return; const ctx = el.getContext('2d'); if (!ctx) return;
    let raf = 0; let angle = drag.current.rotation; let last = performance.now();
    const draw = (time: number) => { const d = Math.min(32, time - last); last = time; angle += d * .00018; drag.current.rotation = angle;
      const w = el.width = el.clientWidth * devicePixelRatio; const h = el.height = el.clientHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      const W = el.clientWidth, H = el.clientHeight; ctx.clearRect(0, 0, W, H); const cx = W * .47 + Math.sin(angle) * 12, cy = H * .53 + Math.sin(time * .0011) * 7; const scale = Math.min(W, H) / 330; ctx.save(); ctx.translate(cx, cy); ctx.scale(scale, scale); ctx.rotate(Math.sin(angle * .6) * .08);
      ctx.shadowColor = 'rgba(20,26,44,.22)'; ctx.shadowBlur = 28; ctx.shadowOffsetY = 28; ctx.fillStyle = 'rgba(20,26,44,.16)'; ctx.beginPath(); ctx.ellipse(0, 120, 100, 20, 0, 0, Math.PI * 2); ctx.fill(); ctx.shadowColor = 'transparent';
      const gradient = ctx.createLinearGradient(-110, -100, 100, 100); gradient.addColorStop(0, color); gradient.addColorStop(.52, color); gradient.addColorStop(1, finish === 'Métallisé' ? '#eef3ff' : color);
      ctx.fillStyle = gradient; ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2;
      if (product === 'mug') { ctx.beginPath(); ctx.roundRect(-78, -80, 126, 180, 20); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(-15, -80, 63, 15, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(48, 5, 48, -Math.PI / 2, Math.PI / 2); ctx.strokeStyle = color; ctx.lineWidth = 18; ctx.stroke(); }
      else if (product === 'gourde') { ctx.beginPath(); ctx.roundRect(-55, -98, 110, 205, 36); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(-28, -130, 56, 35); ctx.fillStyle = '#aab6c9'; ctx.fillRect(-30, -142, 60, 16); }
      else if (product === 'carnet') { ctx.beginPath(); ctx.roundRect(-90, -108, 180, 220, 14); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-73, -92, 5, 188); ctx.strokeStyle = '#14171f'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-65, -90); ctx.lineTo(-65, 88); ctx.stroke(); }
      else if (product === 'cartes') { for (let i = 0; i < 3; i++) { ctx.save(); ctx.rotate((i - 1) * .08); ctx.beginPath(); ctx.roundRect(-105, -65, 210, 130, 9); ctx.fill(); ctx.stroke(); ctx.restore(); } }
      else { ctx.beginPath(); ctx.arc(0, 0, 94, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#aab6c9'; ctx.lineWidth = 11; ctx.beginPath(); ctx.arc(0, 0, 110, -.5, .5); ctx.stroke(); }
      ctx.shadowColor = 'transparent'; const ink = ['marine', 'cyan', 'magenta', 'jaune'].includes(Object.keys({ marine: '#1b2a5c' })[0]) ? (['blanc', 'jaune'].includes(color) ? '#101828' : '#fff') : '#fff';
      ctx.fillStyle = color === '#ffd100' || color === '#f2efe8' ? '#101828' : ink; ctx.textAlign = 'center'; ctx.font = '800 16px Arial'; ctx.fillText(logo ? '◉' : (text || 'A'), 0, 0); if (text) { ctx.font = '600 13px Arial'; ctx.fillText(text, 0, 29); } ctx.restore(); raf = requestAnimationFrame(draw);
    }; raf = requestAnimationFrame(draw); return () => cancelAnimationFrame(raf);
  }, [product, color, finish, text, logo]);
  return <canvas ref={canvas} className="studio-stage" aria-label={`Aperçu 3D du ${PRODUCTS[product].name}`} />;
}

function Stage({ product, color, finish, text, logo }: { product: ProductId; color: string; finish: StageFinish; text: string; logo?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null); const engine = useRef<ThreeStage | undefined>(undefined);
  useEffect(() => { if (!canvas.current) return; try { engine.current = new ThreeStage(canvas.current); engine.current.update(product as StageProduct, color, finish, text, logo); } catch { canvas.current.replaceWith(Object.assign(document.createElement('div'), { className: 'studio-webgl-error', textContent: 'La 3D n’est pas disponible dans ce navigateur.' })); } return () => engine.current?.dispose(); }, []);
  useEffect(() => { engine.current?.update(product as StageProduct, color, finish, text, logo); }, [product, color, finish, text, logo]);
  return <canvas ref={canvas} className="studio-stage" aria-label={`Aperçu 3D du ${PRODUCTS[product].name}`} />;
}

export function StudioConfiguratorView() {
  const [product, setProduct] = useState<ProductId>('mug'); const [colorKey, setColorKey] = useState<ColorKey>('marine'); const [finish, setFinish] = useState<Finish>('Brillant'); const [quantity, setQuantity] = useState(50); const [text, setText] = useState('Sarah'); const [command, setCommand] = useState(''); const [understood, setUnderstood] = useState(''); const [logo, setLogo] = useState<string>(); const [cart, setCart] = useState<any[]>([]); const [cartOpen, setCartOpen] = useState(false);
  const color = COLORS.find((c) => c.key === colorKey)!; const base = PRODUCTS[product].price; const extra = FINISHES.find((f) => f.label === finish)!.extra; const discount = quantity >= 250 ? .2 : quantity >= 100 ? .1 : 0; const unit = base * (1 + extra) * (1 - discount); const total = unit * quantity;
  const applyCommand = () => { const result = interpret(command); setProduct(result.product); setColorKey(result.color); setFinish(result.finish); setQuantity(result.quantity); if (result.name) setText(result.name); setUnderstood(`✦ Compris : ${PRODUCTS[result.product].name} · ${COLORS.find(c => c.key === result.color)?.label} · ${result.finish} · ${result.quantity} pièces${result.name ? ` · « ${result.name} »` : ''}`); };
  const add = () => { setCart((c) => [{ id: Date.now(), product, color: color.label, finish, quantity, text, logo: !!logo, total }, ...c]); setCartOpen(true); };
  const file = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f && f.size <= 3 * 1024 * 1024) setLogo(URL.createObjectURL(f)); };
  const mailto = `mailto:devis@gs-imprim.com?subject=Demande de devis Atelier Print&body=${encodeURIComponent(cart.map(i => `${PRODUCTS[i.product].name} · ${i.quantity} pièces · ${i.color} · ${i.finish} · « ${i.text} »${i.logo ? ' · avec logo' : ''}`).join('\n') + `\n\nTotal estimé : ${cart.reduce((s, i) => s + i.total, 0).toFixed(2)} €`)}`;
  return <div className="studio-app" style={{ '--studio-glow': color.value } as React.CSSProperties}>
    <div className="studio-aurora studio-aurora-a" /><div className="studio-aurora studio-aurora-b" /><div className="studio-aurora studio-aurora-c" />
    <nav className="studio-nav glass"><div className="studio-brand"><span className="studio-logo"><i /> <i /> <i /></span><span><b>Atelier Print</b><small>GS Imprim · studio 3D</small></span></div><div className="studio-tabs">{(Object.keys(PRODUCTS) as ProductId[]).map((id) => <button key={id} aria-pressed={product === id} onClick={() => setProduct(id)}>{PRODUCTS[id].short}</button>)}</div><button className="studio-cart" onClick={() => setCartOpen(true)}>Panier <b>· {cart.length}</b></button></nav>
    <main className="studio-main"><div className="studio-word" key={product}>{PRODUCTS[product].name.toUpperCase()}</div><section className="studio-hero"><div className="studio-copy"><span>PERSONNALISATION À LA VOLÉE</span><h1>Imprimez l’objet<br /><em>qui vous ressemble.</em></h1><p>Tournez, recolorez et personnalisez vos essentiels imprimés. Le rendu se met à jour en direct.</p></div><div className="studio-stage-wrap"><Stage product={product} color={color.value} finish={finish} text={text} logo={logo} /><div className="studio-stage-hint">↔ Glissez pour tourner <span>•</span> aperçu en direct</div></div></section>
    <aside className="studio-panel glass"><div className="command-box"><div className="command-label">Commande express <span>Règles intelligentes</span></div><div className="command-input"><span>✦</span><input value={command} onChange={e => setCommand(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyCommand()} placeholder="Ex : mug rose brillant, 50 pièces, « Sarah »" /><button onClick={applyCommand} aria-label="Interpréter la commande">↵</button></div>{understood && <p className="understood">{understood}</p>}</div><div className="panel-section"><label>Couleur <small>{color.label}</small></label><div className="color-row">{COLORS.map(c => <button key={c.key} aria-label={c.label} aria-pressed={colorKey === c.key} className="color-dot" style={{ background: c.value }} onClick={() => setColorKey(c.key)} />)}</div></div><div className="panel-section"><label>Votre texte <small>{text.length}/18</small></label><input className="studio-text" maxLength={18} value={text} onChange={e => setText(e.target.value)} placeholder="Votre message" /></div><div className="panel-section"><label>Logo <small>3 Mo max.</small></label><label className="upload-box"><input type="file" accept="image/*" onChange={file} />{logo ? <><img src={logo} alt="Aperçu du logo" /><span>Logo ajouté · <button type="button" onClick={(e) => { e.preventDefault(); setLogo(undefined); }}>Retirer le logo</button></span></> : <><strong>＋</strong><span>Déposez votre logo ici</span></>}</label></div><div className="panel-section"><label>Finition <small>{finish}</small></label><div className="finish-list">{FINISHES.map(f => <button key={f.label} aria-pressed={finish === f.label} onClick={() => setFinish(f.label)}><b>{f.label}</b><small>{f.detail}</small></button>)}</div></div><div className="panel-section quantity"><label>Quantité <small aria-live="polite">{quantity} pièces</small></label><div><button onClick={() => setQuantity(Math.max(10, quantity - 10))}>−</button><strong>{quantity}</strong><button onClick={() => setQuantity(Math.min(1000, quantity + 10))}>＋</button></div></div><div className="buy-bar"><div><b>{total.toFixed(2).replace('.', ',')} €</b><small>{unit.toFixed(2).replace('.', ',')} € / pièce {discount ? `· −${discount * 100} %` : ''}</small></div><button onClick={add}>Ajouter au panier <span>↗</span></button></div></aside></main>
    {cartOpen && <div className="cart-overlay" role="dialog" aria-modal="true"><div className="cart-modal glass"><button className="modal-close" onClick={() => setCartOpen(false)}>×</button><span className="eyebrow">VOTRE SÉLECTION</span><h2>Panier <em>atelier</em></h2>{cart.length ? cart.map(i => <div className="cart-line" key={i.id}><div><b>{PRODUCTS[i.product].name}</b><small>{i.quantity} pièces · {i.color} · {i.finish} · « {i.text} »{i.logo && ' · avec logo'}</small></div><strong>{i.total.toFixed(2).replace('.', ',')} €</strong></div>) : <p>Votre panier est encore vide.</p>}<div className="cart-total"><span>Total estimé</span><b>{cart.reduce((s, i) => s + i.total, 0).toFixed(2).replace('.', ',')} €</b></div>{cart.length > 0 && <a className="quote-button" href={mailto}>Envoyer ma demande de devis <span>↗</span></a>}</div></div>}
  </div>;
}
