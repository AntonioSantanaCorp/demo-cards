import { DBSchema } from 'idb';

export type ProductRating = {
  rate: string;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  images: string[];
  rating: ProductRating;
};

export interface AwazonDB extends DBSchema {
  products: {
    key: number;
    value: Product;
    indexes: { category: string; name: string };
  };
  cartList: {
    key: number;
    value: Product;
  };
}
