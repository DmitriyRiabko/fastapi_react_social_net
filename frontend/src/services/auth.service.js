import axios from "axios";
import { API_URL } from "../../config";

class AuthService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: API_URL,
    });
  }

  async signIn(inputData) {
    const { data } = await this.apiClient.post("/login", inputData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }
}

export const authService = new AuthService();
