<template>
  <div class="carousel-container">
    <h2>{{ category }}</h2>
    <div class="carousel">
      <div class="carousel-item" v-for="movie in movies" :key="movie.id">
        <img
          class="movie-poster"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          :alt="movie.title"
        />
        <p>{{ movie.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  category: String,
  movies: Array,
});
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
