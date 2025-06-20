export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface IBanner {
  id: number;
  img: string;
  desc: string;
  title: string;
  link: string;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
}

export interface IGender {
  id: number;
  name: string;
  slug: string;
  img: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  old_price: number | null;
  category_id: number;
  gender_id: number;
  stock: number;
  img: string;
}

export interface IProductsWithPagination {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: IProduct[];
}

export interface IOrder {
  id: number;
  user_id: number;
  status: string;
  total_price: number;
}

export interface IOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface ICreateEmail {
  username: string;
  email: string;
  message: string;
}

export interface IEmail extends ICreateEmail {
  id: number;
}
