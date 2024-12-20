export interface Products {
  thumbnail: string;
  title: string;
  price: number;
  brand: string;
  stock: number;
  _id?: number | string;
  description: string;
  discountPercentage: number;
  category: string;
}
