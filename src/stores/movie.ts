import { defineStore } from 'pinia';

interface MovieState {
  movie: Movie | null; 
  showFullVideo: boolean;
}

interface Movie {
  id: number;
  title: string;
  description: string;
}

export const useMovieStore = defineStore<'movie', MovieState>('movie', {
  state: (): MovieState => ({
    movie: null,
    showFullVideo: false,
  }),
});
