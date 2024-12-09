<template>
    <div class="min-w-[1200px] relative">
      <div class="flex justify-between mr-6">
        <div class="flex items-center font-semibold text-white text-2xl cursor-pointer">
          {{ category }}
        </div>
      </div>
  
      <Carousel
        ref="carousel"
        v-model="currentSlide"
        :items-to-show="8"
        :items-to-scroll="1"
        :wrap-around="true"
        :transition="500"
        snapAlign="start"
        class="bg-transparent"
      >
        <Slide
          v-for="(movie, index) in movies"
          :key="movie.id"
          class="flex items-center object-cover text-white bg-transparent"
        >
          <div
            @click="fullScreenVideo(movie)"
            class="object-cover h-[100%] hover:brightness-125 cursor-pointer"
            :class="[
              currentSlide !== index ? 'border-4 border-transparent' : 'border-4 border-white',
            ]"
          >
            <img
              style="user-select: none"
              class="pointer-events-none h-[100%] z-[-1]"
              :src="movie.image || '/images/default.png'"
              alt="Poster do filme"
            />
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide, Navigation } from 'vue3-carousel';
  
  import { useMovieStore } from '@/stores/movie'; 
  import { storeToRefs } from 'pinia';
  
  const movieStore = useMovieStore();
  const { movies, showFullVideo } = storeToRefs(movieStore); 
  
  const currentSlide = ref(0);
  
  const props = defineProps({
    category: String, 
  });
  
  const fullScreenVideo = (movie) => {
    movieStore.setCurrentMovie(movie); 
    showFullVideo.value = true; // Mostra o vídeo em tela cheia
  };
  </script>
  
  <style scoped>
  .carousel__prev,
  .carousel__next,
  .carousel__prev:hover,
  .carousel__next:hover {
    color: white;
  }
  </style>
  