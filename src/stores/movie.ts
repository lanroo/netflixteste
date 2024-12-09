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

export const useMovieStore = defineStore("movie", {
  state: () => ({
    categories: [] as Category[],
    highlightMovie: {} as Movie,
  }),
  actions: {
    async fetchMovies() {
      const API_KEY = import.meta.env.VITE_IMDB_API_KEY;
      const API_URL = "https://imdb-top-100-movies.p.rapidapi.com";
      const options = {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com",
        },
      };

      try {
        const { data: movies } = await axios.get(`${API_URL}/top100`, options);

        // Atualizar categorias
        this.categories = [
          { name: "Novidades na Netflix", movies: movies.slice(0, 10) },
          { name: "Dramas Coreanos", movies: movies.slice(10, 20) },
          { name: "Filmes de Ação", movies: movies.slice(20, 30) },
        ];

        // Atualizar destaque
        this.highlightMovie = movies[0];
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    },
  },
});
