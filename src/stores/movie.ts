import { defineStore } from "pinia";
import axios from "axios";

interface Movie {
  id: string;
  title: string;
  backdrop_path: string;
  overview: string;
}

interface Category {
  name: string;
  movies: Movie[];
}

// Definição da store
export const useMovieStore = defineStore("movie", {
  state: () => ({
    categories: [] as Category[],
    highlightMovie: {} as Movie, 
    error: "" as string, 
  }),

  actions: {
    async fetchMovies() {
      const API_KEY = import.meta.env.VITE_IMDB_API_KEY; 
      const API_URL = "https://imdb-top-100-movies.p.rapidapi.com"; // API
      const options = {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com",
        },
      };

      try {
        // Fazendo a requisição para a API
        const { data: movies } = await axios.get<Movie[]>(`${API_URL}/top100`, options);

        // Verificando se os dados retornados são válidos
        if (!movies || !Array.isArray(movies)) {
          throw new Error("Dados inválidos recebidos da API.");
        }

        // Atualizando categorias
        this.categories = [
          { name: "Novidades na Netflix", movies: movies.slice(0, 10) },
          { name: "Dramas Coreanos", movies: movies.slice(10, 20) },
          { name: "Filmes de Ação", movies: movies.slice(20, 30) },
        ];

        // Atualizando destaque
        this.highlightMovie = movies[0];
        this.error = ""; 
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        this.error = "Erro ao carregar os filmes. Tente novamente mais tarde.";
      }
    },
  },
});
