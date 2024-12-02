export type CartItem = {
  _id: string;
  userId: string;
  itemId: {
    _id: string;
    title: string;
    thumbnail: string;
  };
  addedAt: string;
  discount: number;
  isAvailable: boolean;
  price: number;
  quantity: number;
};
