<template>
  <div class="home-container bg-black text-white">
    <header class="flex justify-between items-center p-4">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        class="h-8"
      />
      <nav class="flex space-x-6">
        <a href="#" class="hover:underline">Início</a>
        <a href="#" class="hover:underline">Séries</a>
        <a href="#" class="hover:underline">Filmes</a>
        <a href="#" class="hover:underline">Bombando</a>
        <a href="#" class="hover:underline">Minha Lista</a>
      </nav>
    </header>

    <!-- Filme em destaque -->
    <section
      v-if="highlightMovie"
      class="hero-section relative bg-cover bg-center h-[500px]"
      :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/w1280/${highlightMovie.backdrop_path}')` }"
    >
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      <div class="absolute bottom-8 left-8 space-y-4">
        <h1 class="text-4xl font-bold">{{ highlightMovie.title }}</h1>
        <p class="text-sm max-w-md">{{ highlightMovie.overview }}</p>
      </div>
    </section>

    <!-- Categorias -->
    <section class="space-y-8 p-8">
      <VideoCarousel
        v-for="(category, index) in categories"
        :key="index"
        :category="category.name"
        :movies="category.movies"
      />
    </section>
  </div>
</template>

<script setup>
import VideoCarousel from "@/components/VideoCarousel.vue";
import { onMounted } from "vue";
import { useMovieStore } from "@/stores/movie";

const movieStore = useMovieStore();

onMounted(async () => {
  await movieStore.fetchMovies();
  console.log("Categorias carregadas:", movieStore.categories);
  console.log("Filme em destaque:", movieStore.highlightMovie);
});

const categories = movieStore.categories;
const highlightMovie = movieStore.highlightMovie;
</script>


<style scoped>
.home-container {
  min-height: 100vh;
}
.hero-section {
  position: relative;
}
</style>
