// Базовые типы для Strapi
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity {
  id: number;
  attributes: Record<string, any>;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  image?: IImage;
}

export interface IGender {
  id: number;
  name: string;
  slug: string;
  image: IImage;
}

export interface IImage {
  id: number;
  caption: string;
  url: string;
  height: string;
  width: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  inStock: number;
  oldPrice: number;
  price: number;
  category: ICategory;
  gender: IGender;
  images: IImage[];
}

export interface IBanner {
  id: number;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  image: IImage;
}

export interface ICreateEmail {
  email: string;
  name: string;
  message: string;
}

export interface IProductsWithPagination {
  data: IProduct[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IUser {
  id: number;
}

export interface IBreadcrumb {
  label: string;
  href?: string;
}
