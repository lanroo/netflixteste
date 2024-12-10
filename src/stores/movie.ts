import { defineStore } from "pinia";
import { fetchTopMovies } from "@/services/imdbService";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
}

interface Category {
  name: string;
  movies: Movie[];
}

export const useMovieStore = defineStore("movie", {
  state: () => ({
    categories: [] as Category[],
    highlightMovie: null as Movie | null,
  }),
  actions: {
    async fetchMovies() {
      try {
        console.log("Chamando API para buscar filmes...");
        const movies = await fetchTopMovies();

        if (!movies || movies.length === 0) {
          console.error("Nenhum filme encontrado.");
          return;
        }

        this.categories = [
          { name: "Populares", movies: movies.slice(0, 10) },
          { name: "Mais Assistidos", movies: movies.slice(10, 20) },
          { name: "Recomendados", movies: movies.slice(20, 30) },
        ];

        this.highlightMovie = movies[0];

        console.log("Categorias carregadas:", this.categories);
        console.log("Filme em destaque:", this.highlightMovie);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      }
    },
  },
});
