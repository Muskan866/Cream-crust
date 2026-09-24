import { Product } from './data/bakeryData';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}

export interface CustomerOrderInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  instructions?: string;
  orderType: 'delivery' | 'pickup';
  paymentMethod: 'cod' | 'upi' | 'card';
}

export interface ConfirmedOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  customer: CustomerOrderInfo;
  createdAt: string;
  estimatedDelivery: string;
}
