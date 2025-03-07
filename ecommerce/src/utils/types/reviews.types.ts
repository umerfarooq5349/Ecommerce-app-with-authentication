export interface ReviewType_GET {
  userId: number | string;
  itemId: number | string;
  comment: string;
  createdAt?: Date;
  rating: number;
  name: string;
  photo: string;
}
export interface ReviewType_POST {
  itemId: number | string;
  comment: string;
  rating: number;
}

export interface ReviewModalType {
  isOpen: boolean;
  rating: number;
  hoverRating: number;
}
