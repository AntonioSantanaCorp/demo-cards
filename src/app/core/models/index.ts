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
