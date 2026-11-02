import React, { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { AlertTriangle, ArrowUpRight, BarChart3, Clock3, LockKeyhole, PackageCheck, RefreshCw, Search, X, type LucideIcon } from 'lucide-react';
import { auth } from '../lib/firebase';
import { ORDER_STATUSES, type AdminOrder, type OrderStatus, subscribeToAdminOrders, updateAdminOrderNotes, updateAdminOrderStatus } from '../lib/admin';
import type { ViewType } from '../types';

type RangeKey = 'today' | '7d' | '30d' | 'month' | 'previous';

const STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'Nouvelle', pending_validation: 'À valider', confirmed: 'Confirmée', preparing: 'Préparation',
  printing: 'Impression', finishing: 'Finition', ready: 'Prête', shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée',
};
const STATUS_COLORS: Record<OrderStatus, string> = {
  new: 'bg-slate-100 text-slate-700', pending_validation: 'bg-amber-50 text-amber-700', confirmed: 'bg-blue-50 text-blue-700',
  preparing: 'bg-violet-50 text-violet-700', printing: 'bg-cyan-50 text-cyan-700', finishing: 'bg-fuchsia-50 text-fuchsia-700',
  ready: 'bg-emerald-50 text-emerald-700', shipped: 'bg-indigo-50 text-indigo-700', delivered: 'bg-green-100 text-green-800', cancelled: 'bg-red-50 text-red-700',
};

const formatDate = (date?: Date) => date ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(date) : '—';
const formatMoney = (value?: number) => `${(value ?? 0).toLocaleString('fr-FR', { minimumFractionDigits: 3 })} DT`;
const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

function inRange(order: AdminOrder, range: RangeKey) {
  if (!order.createdAt) return false;
  const now = new Date();
  const today = startOfDay(now).getTime();
  const created = startOfDay(order.createdAt).getTime();
  if (range === 'today') return created === today;
  if (range === '7d') return created >= today - 6 * 86400000;
  if (range === '30d') return created >= today - 29 * 86400000;
  if (range === 'month') return order.createdAt.getMonth() === now.getMonth() && order.createdAt.getFullYear() === now.getFullYear();
  const previous = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return order.createdAt.getMonth() === previous.getMonth() && order.createdAt.getFullYear() === previous.getFullYear();
}

export const AdminView: React.FC<{ onNavigate: (view: ViewType) => void }> = ({ onNavigate }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [range, setRange] = useState<RangeKey>('30d');
  const [section, setSection] = useState<'analytics' | 'orders'>('analytics');
  const [queryText, setQueryText] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [selected, setSelected] = useState<AdminOrder | null>(null);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => onAuthStateChanged(auth, async (nextUser) => {
    setUser(nextUser);
    if (!nextUser) { setIsAdmin(false); setAuthLoading(false); return; }
    const token = await nextUser.getIdTokenResult();
    setIsAdmin(token.claims.admin === true);
    setAuthLoading(false);
  }), []);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    return subscribeToAdminOrders((nextOrders) => { setOrders(nextOrders); setLoading(false); }, (nextError) => { setError(nextError.message); setLoading(false); });
  }, [isAdmin]);

  const periodOrders = useMemo(() => orders.filter((order) => inRange(order, range)), [orders, range]);
  const lateOrders = useMemo(() => orders.filter((order) => order.estimatedDeliveryDate && order.estimatedDeliveryDate < new Date() && !['delivered', 'cancelled'].includes(order.status)), [orders]);
  const productionOrders = orders.filter((order) => ['preparing', 'printing', 'finishing'].includes(order.status));
  const deliveredOrders = orders.filter((order) => order.status === 'delivered');
  const revenue = periodOrders.reduce((sum, order) => sum + Number(order.estimatedTotals.total ?? 0), 0);
  const average = periodOrders.length ? revenue / periodOrders.length : 0;
  const searchedOrders = orders.filter((order) => {
    const text = `${order.id} ${order.customer.fullName ?? ''} ${order.customer.company ?? ''} ${order.items.map((item) => item.title ?? '').join(' ')}`.toLowerCase();
    return (!queryText || text.includes(queryText.toLowerCase())) && (statusFilter === 'all' || order.status === statusFilter);
  });

  const statusCounts = ORDER_STATUSES.map((status) => ({ status, count: periodOrders.filter((order) => order.status === status).length }));
  const maxStatus = Math.max(1, ...statusCounts.map((item) => item.count));
  const kpis: Array<{ label: string; value: string | number; Icon: LucideIcon }> = [
    { label: 'Commandes période', value: periodOrders.length, Icon: PackageCheck },
    { label: 'CA période', value: formatMoney(revenue), Icon: BarChart3 },
    { label: 'Panier moyen', value: formatMoney(average), Icon: ArrowUpRight },
    { label: 'Commandes en retard', value: lateOrders.length, Icon: AlertTriangle },
  ];
  const topProducts = useMemo(() => {
    const counts = new Map<string, number>();
    periodOrders.forEach((order) => order.items.forEach((item) => counts.set(item.title ?? 'Produit non renseigné', (counts.get(item.title ?? 'Produit non renseigné') ?? 0) + Number(item.quantity ?? 1))));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [periodOrders]);

  const selectOrder = (order: AdminOrder) => { setSelected(order); setNotes(order.adminNotes ?? ''); };
  const changeStatus = async (status: OrderStatus) => {
    if (!selected || !user) return;
    setSaving(true);
    try {
      await updateAdminOrderStatus(selected.id, status, user.uid);
      setSelected({ ...selected, status });
    } catch (nextError) { setError(nextError instanceof Error ? nextError.message : 'Mise à jour impossible.'); }
    finally { setSaving(false); }
  };
  const saveNotes = async () => {
    if (!selected) return;
    setSaving(true);
    try { await updateAdminOrderNotes(selected.id, notes); setSelected({ ...selected, adminNotes: notes }); }
    catch (nextError) { setError(nextError instanceof Error ? nextError.message : 'Enregistrement impossible.'); }
    finally { setSaving(false); }
  };

  if (authLoading) return <div className="page-shell flex min-h-[60vh] items-center justify-center"><div className="surface-card p-6" role="status">Vérification de l’accès…</div></div>;
  if (!user || !isAdmin) return <div className="page-shell flex min-h-[60vh] items-center justify-center px-4"><div className="surface-card max-w-md p-8 text-center"><LockKeyhole className="mx-auto mb-4 text-[#00AEEF]" size={34} /><h1 className="text-2xl font-extrabold">Accès administrateur requis</h1><p className="mt-2 text-sm text-[#526071]">Connectez-vous avec un compte autorisé par le claim Firebase <code>admin</code>.</p><button className="btn-primary mt-5" onClick={() => onNavigate('home')}>Retour au site</button></div></div>;

  return (
    <div className="page-shell min-h-screen bg-[#f7f8fa] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow">GS Imprim · Administration</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight">Pilotage des commandes</h1><p className="mt-2 max-w-2xl text-sm text-[#526071]">Analytics et suivi opérationnel alimentés directement par Firestore.</p></div><div className="flex gap-2"><button className={section === 'analytics' ? 'btn-primary' : 'btn-secondary'} onClick={() => setSection('analytics')}><BarChart3 size={16} /> Analytics</button><button className={section === 'orders' ? 'btn-primary' : 'btn-secondary'} onClick={() => setSection('orders')}><PackageCheck size={16} /> Commandes</button></div></header>
        {error && <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"><AlertTriangle size={16} /> {error}</div>}
        {section === 'analytics' ? <>
          <div className="flex flex-wrap gap-2">{([['today', "Aujourd’hui"], ['7d', '7 jours'], ['30d', '30 jours'], ['month', 'Ce mois'], ['previous', 'Mois précédent']] as [RangeKey, string][]).map(([key, label]) => <button key={key} className={range === key ? 'btn-primary' : 'btn-secondary'} onClick={() => setRange(key)}>{label}</button>)}</div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map(({ label, value, Icon }) => <div className="surface-card p-5" key={label}><div className="flex items-center justify-between text-sm text-[#526071]"><span>{label}</span><Icon size={18} className="text-[#00AEEF]" /></div><strong className="mt-3 block text-2xl font-extrabold">{value}</strong></div>)}
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <section className="surface-card p-5"><div className="flex items-center justify-between"><h2 className="text-lg font-extrabold">Répartition des statuts</h2><span className="text-xs text-[#526071]">Période sélectionnée</span></div><div className="mt-5 space-y-3">{statusCounts.filter((item) => item.count > 0).map((item) => <div key={item.status}><div className="mb-1 flex justify-between text-xs"><span>{STATUS_LABELS[item.status]}</span><strong>{item.count}</strong></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#00AEEF]" style={{ width: `${(item.count / maxStatus) * 100}%` }} /></div></div>)}{!periodOrders.length && <p className="py-8 text-center text-sm text-[#526071]">Aucune commande sur cette période.</p>}</div></section>
            <section className="surface-card p-5"><h2 className="text-lg font-extrabold">Produits les plus commandés</h2><div className="mt-5 space-y-3">{topProducts.map(([name, count]) => <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 text-sm" key={name}><span className="truncate">{name}</span><strong className="text-[#00AEEF]">{count}</strong></div>)}{!topProducts.length && <p className="py-8 text-center text-sm text-[#526071]">Pas encore de données produit.</p>}</div></section>
          </div>
          <div className="grid gap-4 sm:grid-cols-3"><div className="surface-card p-5"><p className="text-sm text-[#526071]">En production</p><strong className="mt-2 block text-2xl">{productionOrders.length}</strong></div><div className="surface-card p-5"><p className="text-sm text-[#526071]">Livrées</p><strong className="mt-2 block text-2xl">{deliveredOrders.length}</strong></div><div className="surface-card p-5"><p className="text-sm text-[#526071]">Clients distincts</p><strong className="mt-2 block text-2xl">{new Set(orders.map((order) => order.userId).filter(Boolean)).size}</strong></div></div>
        </> : <section className="surface-card overflow-hidden"><div className="flex flex-col gap-3 border-b border-slate-100 p-5 md:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input className="control-base w-full pl-10" value={queryText} onChange={(event) => setQueryText(event.target.value)} placeholder="Rechercher une commande ou un client" /></div><select className="control-base px-3" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}><option value="all">Tous les statuts</option>{ORDER_STATUSES.map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}</select></div>{loading ? <div className="p-8 text-center" role="status"><RefreshCw className="mx-auto animate-spin text-[#00AEEF]" /></div> : <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-[#526071]"><tr><th className="px-5 py-3">Référence</th><th className="px-5 py-3">Client</th><th className="px-5 py-3">Montant</th><th className="px-5 py-3">Création</th><th className="px-5 py-3">Statut</th><th className="px-5 py-3" /></tr></thead><tbody className="divide-y divide-slate-100">{searchedOrders.map((order) => <tr key={order.id} className="hover:bg-slate-50"><td className="px-5 py-4 font-bold">{order.id.slice(0, 12)}</td><td className="px-5 py-4">{order.customer.fullName ?? 'Client non renseigné'}<span className="block text-xs text-[#526071]">{order.items.length} article(s)</span></td><td className="px-5 py-4 font-bold">{formatMoney(order.estimatedTotals.total)}</td><td className="px-5 py-4 text-xs text-[#526071]">{formatDate(order.createdAt)}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_COLORS[order.status]}`}>{STATUS_LABELS[order.status]}</span>{lateOrders.some((item) => item.id === order.id) && <span className="ml-2 text-xs text-red-600">En retard</span>}</td><td className="px-5 py-4 text-right"><button className="btn-secondary" onClick={() => selectOrder(order)}>Détails</button></td></tr>)}</tbody></table>{!searchedOrders.length && <div className="p-10 text-center text-sm text-[#526071]">Aucune commande ne correspond aux filtres.</div>}</div>}</section>}
      </div>
      {selected && <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30" role="dialog" aria-modal="true"><button aria-label="Fermer" className="absolute inset-0 cursor-default" onClick={() => setSelected(null)} /><aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl"><button className="absolute right-5 top-5 text-slate-500" aria-label="Fermer les détails" onClick={() => setSelected(null)}><X size={20} /></button><p className="eyebrow">Commande {selected.id}</p><h2 className="mt-2 text-2xl font-extrabold">{selected.customer.fullName ?? 'Client non renseigné'}</h2><p className="mt-1 text-sm text-[#526071]">Créée le {formatDate(selected.createdAt)}</p><div className="mt-6 grid grid-cols-2 gap-3"><div className="surface-card p-4"><p className="text-xs text-[#526071]">Total</p><strong className="mt-1 block">{formatMoney(selected.estimatedTotals.total)}</strong></div><div className="surface-card p-4"><p className="text-xs text-[#526071]">Paiement</p><strong className="mt-1 block">{selected.paymentStatus ?? 'Non renseigné'}</strong></div></div><label className="mt-6 block text-sm font-bold">Statut<select className="control-base mt-2 w-full px-3" value={selected.status} disabled={saving} onChange={(event) => changeStatus(event.target.value as OrderStatus)}>{ORDER_STATUSES.map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}</select></label><div className="mt-6"><h3 className="font-extrabold">Produits</h3><div className="mt-2 space-y-2">{selected.items.map((item, index) => <div className="rounded-xl bg-slate-50 p-3 text-sm" key={`${item.title}-${index}`}><strong>{item.title ?? 'Produit'}</strong><span className="ml-2 text-[#526071]">× {item.quantity ?? 1}</span><p className="mt-1 text-xs text-[#526071]">{item.specs ?? 'Options non renseignées'}</p></div>)}</div></div><label className="mt-6 block text-sm font-bold">Notes internes<textarea className="control-base mt-2 min-h-28 w-full p-3" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Ajouter une note pour l’équipe…" /></label><button className="btn-primary mt-3 w-full" disabled={saving} onClick={saveNotes}>{saving ? 'Enregistrement…' : 'Enregistrer les notes'}</button><div className="mt-6 border-t pt-5"><h3 className="font-extrabold">Historique</h3><div className="mt-3 space-y-3">{selected.orderHistory.map((event, index) => <div className="flex gap-3 text-sm" key={`${event.status}-${index}`}><Clock3 className="mt-0.5 shrink-0 text-[#00AEEF]" size={16} /><div><strong>{event.status ? STATUS_LABELS[event.status as OrderStatus] ?? event.status : 'Mise à jour'}</strong><p className="text-xs text-[#526071]">{formatDate(event.at)}</p></div></div>)}</div></div></aside></div>}
    </div>
  );
};
