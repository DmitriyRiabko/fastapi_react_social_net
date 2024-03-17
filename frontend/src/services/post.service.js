import axios from "axios";
import { API_URL } from "../../config";

class PostService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: API_URL,
    });
  }

  async getAllPosts() {
    const { data } = await this.apiClient.get("/post/all");
    return data;
  }

  async sendImage(image, token) {
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await this.apiClient.post("/post/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  getPostImage(imageUrl, imageType) {
    if (imageType == "relative") {
      return `${API_URL}/${imageUrl}`;
    } else {
      return imageUrl;
    }
  }
}

export const postService = new PostService();
