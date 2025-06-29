import { API_ENDPOINTS } from "@/config/api";
import { IBanner, ICategory, ICreateEmail, IGender, IProduct, IUser, StrapiResponse } from "@/types/apiTypes";
import axios from "axios";

class ApiService {
  // Общий метод для GET-запросов с возможностью отмены
  async get<T>(endpoint: string, params?: any, signal?: AbortSignal): Promise<T> {
    const response = await axios.get<StrapiResponse<T>>(`${endpoint}`, {
      params,
      signal,
    });
    return response.data.data;
  }

  // Общий метод для POST-запросов с возможностью отмены
  async post<T>(endpoint: string, data: any, signal?: AbortSignal): Promise<T> {
    const response = await axios.post<StrapiResponse<T>>(
      `${endpoint}`,
      { data },
      {
        signal,
      },
    );
    return response.data.data;
  }

  // Специфичные методы с поддержкой отмены
  async sendEmail(emailData: ICreateEmail, signal?: AbortSignal): Promise<void> {
    await this.post("emails", emailData, signal);
  }

  async getUsers(filter: string = "", signal?: AbortSignal) {
    return this.get<IUser[]>("users" + filter, {}, signal);
  }

  async getProducts(filter: string = "", pagination?: { page?: number; pageSize?: number }, signal?: AbortSignal) {
    const params = {
      populate: "*",
      ...(pagination?.page && { "pagination[page]": pagination.page }),
      ...(pagination?.pageSize && {
        "pagination[pageSize]": pagination.pageSize,
      }),
    };
    return this.get<IProduct[]>(API_ENDPOINTS.PRODUCTS + filter, params, signal);
  }

  async getProductsWithPagination(filter: string = "", pagination?: { page?: number; pageSize?: number }, signal?: AbortSignal) {
    const params = {
      ...(pagination?.page && { "pagination[page]": pagination.page }),
      ...(pagination?.pageSize && {
        "pagination[pageSize]": pagination.pageSize,
      }),
    };
    const response = await axios.get<StrapiResponse<IProduct[]>>(API_ENDPOINTS.PRODUCTS + filter, {
      params,
      signal,
    });
    return {
      data: response.data.data,
      meta: response.data.meta,
    };
  }

  async getProductsByIds(ids: (number | string)[], pagination?: { page?: number; pageSize?: number }, signal?: AbortSignal) {
    // Формируем фильтр для массива ID
    const idFilter = ids.map((id) => `filters[id][$in][]=${id}`).join("&");

    const params = {
      populate: "*",
      ...(pagination?.page && { "pagination[page]": pagination.page }),
      ...(pagination?.pageSize && {
        "pagination[pageSize]": pagination.pageSize,
      }),
    };

    const response = await axios.get<StrapiResponse<IProduct[]>>(`${API_ENDPOINTS.PRODUCTS}?${idFilter}`, {
      params,
      signal,
    });

    return {
      data: response.data.data,
      meta: response.data.meta,
    };
  }

  async getBanners(slug: string, signal?: AbortSignal): Promise<{ blockBanners: IBanner[] }> {
    const params = {
      filters: { slug: { $eq: slug } },
      populate: {
        blocks: {
          on: {
            "blocks.block-banners": {
              populate: {
                // Явно указываем поля для популяции
                blockBanners: {
                  populate: "*",
                },
              },
            },
          },
        },
      },
    };

    const response = await this.get<{ blocks: Array<any> }[]>(API_ENDPOINTS.PAGES, params, signal);

    if (!response || !response.length || !response[0].blocks) {
      throw new Error("Page or blocks not found");
    }

    const page = response[0];
    const targetBlock = page.blocks.find((block) => block.__component === `blocks.block-banners`);

    if (!targetBlock) {
      throw new Error(`Block blocks.block-banners not found on page ${slug}`);
    }

    return targetBlock["blocks.block-banners"] || targetBlock;
  }

  async getCategories(filter: string = "", signal?: AbortSignal) {
    return this.get<ICategory[]>(API_ENDPOINTS.CATEGORIES + filter, { populate: "*" }, signal);
  }

  async getGenders(filter: string = "", signal?: AbortSignal) {
    return this.get<IGender[]>(API_ENDPOINTS.GENDERS + filter, { populate: "*" }, signal);
  }
}

export const apiService = new ApiService();
