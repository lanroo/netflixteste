<template>
    <div>
      <h2>{{ category }}</h2>
      <div v-for="movie in movies" :key="movie.id">
        <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title" />
        <p>{{ movie.title }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    category: String,
    movies: Array,
  });
  
  console.log("Categoria recebida:", category);
  console.log("Filmes recebidos:", movies);
  </script>
  
  <style scoped>
  .carousel-container {
    margin-bottom: 2rem;
  }
  .carousel {
    display: flex;
    overflow-x: auto;
  }
  .carousel-item {
    margin-right: 1rem;
    cursor: pointer;
  }
  .movie-poster {
    width: 150px;
    border-radius: 8px;
  }
  </style>
  