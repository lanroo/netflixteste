import type { Store } from "pinia";
import type { Category, Movie } from "@/stores/movie"; 

declare global {
  interface Window {
    movieStore: Store<"movie", { categories: Category[]; highlightMovie: Movie | null }, {}, { fetchMovies: () => Promise<void> }>;
  }
}

export {};
