import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  type Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export const ORDER_STATUSES = [
  'new',
  'pending_validation',
  'confirmed',
  'preparing',
  'printing',
  'finishing',
  'ready',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export type OrderStatus = typeof ORDER_STATUSES[number];

export type AdminOrder = {
  id: string;
  userId?: string;
  items: Array<{ title?: string; quantity?: number | string; totalPrice?: number; specs?: string }>;
  customer: { fullName?: string; company?: string; phone?: string; governorate?: string; address?: string; paymentMethod?: string; notes?: string };
  estimatedTotals: { total?: number; subtotal?: number; shipping?: number };
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
  estimatedDeliveryDate?: Date;
  paymentStatus?: string;
  priority?: boolean;
  adminNotes?: string;
  orderHistory: Array<{ status?: string; at?: Date; by?: string }>;
};

const toDate = (value: unknown): Date | undefined => {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  if (typeof value === 'string' || typeof value === 'number') return new Date(value);
  if (typeof value === 'object' && value !== null && 'toDate' in value) return (value as Timestamp).toDate();
  return undefined;
};

const statusOrDefault = (status: unknown): OrderStatus => (
  typeof status === 'string' && ORDER_STATUSES.includes(status as OrderStatus)
    ? status as OrderStatus
    : 'pending_validation'
);

export const normalizeOrder = (id: string, data: Record<string, any>): AdminOrder => ({
  id,
  userId: data.userId,
  items: Array.isArray(data.items) ? data.items : [],
  customer: data.customer ?? {},
  estimatedTotals: data.estimatedTotals ?? {},
  status: statusOrDefault(data.status),
  createdAt: toDate(data.createdAt),
  updatedAt: toDate(data.updatedAt),
  estimatedDeliveryDate: toDate(data.estimatedDeliveryDate),
  paymentStatus: data.paymentStatus,
  priority: data.priority === true,
  adminNotes: typeof data.adminNotes === 'string' ? data.adminNotes : '',
  orderHistory: Array.isArray(data.orderHistory)
    ? data.orderHistory.map((entry: Record<string, unknown>) => ({ ...entry, at: toDate(entry.at) }))
    : [],
});

export function subscribeToAdminOrders(onChange: (orders: AdminOrder[]) => void, onError: (error: Error) => void) {
  return onSnapshot(collection(db, 'orders'), (snapshot) => {
    const orders = snapshot.docs.map((item) => normalizeOrder(item.id, item.data()));
    orders.sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
    onChange(orders);
  }, onError);
}

export function updateAdminOrderStatus(orderId: string, status: OrderStatus, adminUid: string) {
  return updateDoc(doc(db, 'orders', orderId), {
    status,
    updatedAt: serverTimestamp(),
    orderHistory: arrayUnion({ status, at: new Date(), by: adminUid }),
  });
}

export function updateAdminOrderNotes(orderId: string, adminNotes: string) {
  return updateDoc(doc(db, 'orders', orderId), { adminNotes, updatedAt: serverTimestamp() });
}
