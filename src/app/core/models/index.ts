export type ProductRating = {
  rate: string;
  count: number;
};

export type Product = {
  title: string;
  price: string;
  description: string;
  category: string;
  images: string[];
  rating: ProductRating;
};
