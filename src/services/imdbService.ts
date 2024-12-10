import axios from "axios";

export const fetchTopMovies = async (): Promise<any[]> => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
        page: 1,
      },
    });
    console.log("Dados retornados da API:", response.data.results);
    return response.data.results || [];
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
};
