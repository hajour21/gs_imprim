import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { CartItem } from '../types';

export type ContactMessage = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export type QuoteRequest = {
  name: string;
  email: string;
  phone?: string;
  product?: string;
  quantity?: string;
  details?: string;
};

export function saveContactMessage(message: ContactMessage) {
  return addDoc(collection(db, 'contactMessages'), {
    ...message,
    status: 'new',
    createdAt: serverTimestamp(),
  });
}

export function saveQuoteRequest(request: QuoteRequest) {
  return addDoc(collection(db, 'quoteRequests'), {
    ...request,
    status: 'new',
    createdAt: serverTimestamp(),
  });
}

export type OrderCustomer = {
  fullName: string;
  company?: string;
  phone: string;
  governorate: string;
  address: string;
  notes?: string;
  paymentMethod: string;
};

export type OrderTotals = {
  subtotal: number;
  shipping: number;
  total: number;
};

export function saveOrder(userId: string, items: CartItem[], customer: OrderCustomer, totals: OrderTotals) {
  return addDoc(collection(db, 'orders'), {
    userId,
    items,
    customer,
    estimatedTotals: totals,
    status: 'pending_quote',
    createdAt: serverTimestamp(),
  });
}
