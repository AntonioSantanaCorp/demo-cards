import { DBSchema } from 'idb';

export type ProductRating = {
  rate: string;
  count: number;
};

export type Product = {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  images: string[];
  rating: ProductRating;
};

export interface AwazonDB extends DBSchema {
  products: {
    key: string;
    value: Product;
    indexes: { category: string; title: string };
  };
  cartList: {
    key: string;
    value: Product;
    indexes: { id: string };
  };
}
