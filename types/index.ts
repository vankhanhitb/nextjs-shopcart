// Prodcut Type
export type Product = {
  _id: string;
  name: string;
  slug?: {current: string};
  images?: unknown[];
  price?: number;
  discount?: number;
  stock?: number;
  status?: "new" | "hot" | "sale";
  variant?: string;
  categories?: string[];
}