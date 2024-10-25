interface User {
  id: number;
  username: string;
  profileImage: string;
  email: string;
}

interface Like {
  id: number;
  user: User;
}

export interface IProduct {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  price: string;
  stock: number;
  viewCount: number;
  createdAt: string;
  user: User;
  likes: Like[];
  totalLikes: number;
  isLiked: boolean;
}