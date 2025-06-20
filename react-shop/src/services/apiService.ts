import { IBanner, ICategory, ICreateEmail, IGender, IProduct, IProductsWithPagination, IUser } from "@/types/apiTypes";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

class ApiService {
  // Общий метод для GET-запросов с возможностью отмены
  async get<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
    const response = await axios.get<T>(`${API_BASE_URL}/${endpoint}`, {
      signal,
    });
    return response.data;
  }

  // Общий метод для POST-запросов с возможностью отмены
  async post<T>(endpoint: string, data: any, signal?: AbortSignal): Promise<T> {
    const response = await axios.post<T>(`${API_BASE_URL}/${endpoint}`, data, {
      signal,
    });
    return response.data;
  }

  // Специфичные методы с поддержкой отмены
  async sendEmail(emailData: ICreateEmail, signal?: AbortSignal): Promise<void> {
    await this.post("emails", emailData, signal);
  }

  async getUsers(filter: string = "", signal?: AbortSignal) {
    return this.get<IUser[]>("users" + filter, signal);
  }

  async getProducts(filter: string = "", signal?: AbortSignal) {
    return this.get<IProduct[]>("products" + filter, signal);
  }

  async getProductsWithPagination(filter: string = "", signal?: AbortSignal) {
    return this.get<IProductsWithPagination>("products" + filter, signal);
  }

  async getBanners(filter: string = "", signal?: AbortSignal) {
    return this.get<IBanner[]>("banners" + filter, signal);
  }

  async getCategories(filter: string = "", signal?: AbortSignal) {
    return this.get<ICategory[]>("categories" + filter, signal);
  }

  async getGenders(filter: string = "", signal?: AbortSignal) {
    return this.get<IGender[]>("genders" + filter, signal);
  }
}

export const apiService = new ApiService();
