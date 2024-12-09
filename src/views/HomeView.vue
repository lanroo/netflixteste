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
      <div class="flex items-center space-x-4">
        <Magnify fillColor="white" size="24" />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/512px-Portrait_Placeholder.png"
          alt="Avatar"
          class="h-8 rounded-full"
        />
      </div>
    </header>

    <section
      class="hero-section relative bg-cover bg-center h-[500px]"
      :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/w1280/${highlightMovie.value?.backdrop_path}')` }"
    >
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      <div class="absolute bottom-8 left-8 space-y-4">
        <h1 class="text-4xl font-bold">{{ highlightMovie.value?.title }}</h1>
        <p class="text-sm max-w-md">{{ highlightMovie.value?.overview }}</p>
        <div class="flex space-x-4">
          <button class="bg-white text-black px-4 py-2 rounded-md flex items-center space-x-2">
            <PlayIcon fillColor="black" size="20" />
            <span>Assistir</span>
          </button>
          <button class="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <InfoIcon fillColor="white" size="20" />
            <span>Mais informações</span>
          </button>
        </div>
      </div>
    </section>

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
import { ref, onMounted } from "vue";
import { useMovieStore } from "../stores/movie";
import { storeToRefs } from "pinia";
import Magnify from "vue-material-design-icons/Magnify.vue";
import PlayIcon from "vue-material-design-icons/Play.vue";
import InfoIcon from "vue-material-design-icons/InformationOutline.vue";
import VideoCarousel from "../components/VideoCarousel.vue";

// Acessando a store de filmes
const useMovie = useMovieStore();
const { categories, highlightMovie } = storeToRefs(useMovie);

onMounted(async () => {
  await useMovie.fetchMovies(); 
});
</script>

<style scoped>
.home-container {
  min-height: 100vh;
}

.hero-section {
  position: relative;
}
</style>
