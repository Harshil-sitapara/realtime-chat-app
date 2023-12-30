import axios from "axios";

export const BASE_API_URL = "http://localhost:5000/api";

export interface user {
  name: string;
  email: string;
  password: string;
}
export const postRequest = async (url: string, body: user) => {
  try {
    const response = await axios.post(`${BASE_API_URL}${url}`, body, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.data?.error) {
      return { error: response.data.error };
    }
    return response;
  } catch (error) {
    console.log("Error:", error);
  }
};
