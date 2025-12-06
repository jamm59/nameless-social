// types.ts

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  rating: number;
  eta: string;
  deals?: string;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

export type Order = {
  id: string;
  status: 'Delivered' | 'Out for Delivery' | 'Preparing' | 'Cancelled';
  date: string;
  total?: number;
};

export type Promo = {
  id: string | number;
  title: string;
  image: string;
};
