export interface ProductType {
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
